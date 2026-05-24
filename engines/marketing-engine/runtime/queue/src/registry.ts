// Queue Registry — Centralized queue management with priority + DLQ
import { Queue, Worker, QueueEvents } from 'bullmq';
import Redis from 'ioredis';

const connection = () => new Redis(process.env.REDIS_URL || 'redis://localhost:6379', { maxRetriesPerRequest: null });

interface RegisteredQueue { queue: Queue; priority: number; dlqName: string; }

class QueueRegistry {
  private queues = new Map<string, RegisteredQueue>();
  private workers = new Map<string, Worker>();

  register(name: string, priority: number = 5): Queue {
    if (this.queues.has(name)) return this.queues.get(name)!.queue;
    const queue = new Queue(name, { connection: connection() });
    const dlqName = `45.dead.${name.replace('45.mkt.', '')}`;
    this.queues.set(name, { queue, priority, dlqName });
    return queue;
  }

  getQueue(name: string): Queue | undefined { return this.queues.get(name)?.queue; }
  getPriority(name: string): number { return this.queues.get(name)?.priority ?? 5; }
  getDlqName(name: string): string { return this.queues.get(name)?.dlqName ?? `45.dead.${name}`; }

  registerWorker(name: string, processor: (job: any) => Promise<any>): Worker {
    const w = new Worker(name, processor, { connection: connection(), concurrency: 3 });
    this.workers.set(name, w);
    return w;
  }

  getWorker(name: string): Worker | undefined { return this.workers.get(name); }
  listQueues(): string[] { return Array.from(this.queues.keys()); }
  listWorkers(): string[] { return Array.from(this.workers.keys()); }

  async getHealthAll(): Promise<Record<string, any>> {
    const result: Record<string, any> = {};
    for (const [name, { queue }] of this.queues) {
      try {
        const [w, a, c, f, d] = await Promise.all([
          queue.getWaitingCount(), queue.getActiveCount(),
          queue.getCompletedCount(), queue.getFailedCount(), queue.getDelayedCount()
        ]);
        result[name] = { waiting: w, active: a, completed: c, failed: f, delayed: d };
      } catch (e: any) { result[name] = { error: e.message }; }
    }
    return result;
  }
}

export const queueRegistry = new QueueRegistry();

// Priority constants
export const QUEUE_PRIORITY = {
  PUBLISH: 1,
  APPROVAL: 2,
  DRAFT: 3,
  VISUAL: 4,
  ANALYTICS: 5,
  RECOMMENDATION: 6,
} as const;

// Enqueue with priority
// NOTE: 'timeout' removed from JobsOptions — not supported in BullMQ 5.x+
// Worker-level timeout should be used instead (lockDuration in Worker config)
export async function enqueueWithPriority(queueName: string, jobName: string, data: any, priority?: number): Promise<string | null> {
  const queue = queueRegistry.getQueue(queueName);
  if (!queue) return null;
  const p = priority ?? queueRegistry.getPriority(queueName);
  const job = await queue.add(jobName, data, { priority: p, attempts: 3, backoff: { type: 'exponential', delay: 2000 } });
  return job.id ?? null;
}

// Dead Letter Queue helper
export async function moveToDLQ(queueName: string, jobData: any, failureReason: string, retryCount: number = 0) {
  const dlqName = queueRegistry.getDlqName(queueName);
  let dlq = queueRegistry.getQueue(dlqName);
  if (!dlq) dlq = queueRegistry.register(dlqName, 99);
  await dlq.add('dead', { ...jobData, _failureReason: failureReason, _retryCount: retryCount, _originalQueue: queueName });
}
