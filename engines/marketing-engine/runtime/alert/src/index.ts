import { createClient } from '@supabase/supabase-js';

function ops() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'ops' } }); }

export type Severity = 'info' | 'warning' | 'critical';

export interface AlertInput {
  severity: Severity;
  service: string;
  workspaceId?: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export async function createAlert(input: AlertInput) {
  const { data } = await ops().from('runtime_alerts').insert({
    severity: input.severity, service: input.service,
    workspace_id: input.workspaceId, message: input.message,
    metadata: input.metadata ?? {},
  }).select().single();

  // Slack notification for warning/critical
  if (input.severity !== 'info') {
    await sendSlackAlert(input).catch(() => {});
  }
  return data;
}

export async function resolveAlert(id: string, resolvedBy?: string) {
  await ops().from('runtime_alerts').update({ resolved: true, resolved_at: new Date().toISOString(), resolved_by: resolvedBy }).eq('id', id);
}

export async function getActiveAlerts() {
  const { data } = await ops().from('runtime_alerts').select('*').eq('resolved', false).order('created_at', { ascending: false }).limit(50);
  return data ?? [];
}

export async function getAllAlerts(limit = 50) {
  const { data } = await ops().from('runtime_alerts').select('*').order('created_at', { ascending: false }).limit(limit);
  return data ?? [];
}

async function sendSlackAlert(input: AlertInput) {
  const webhook = process.env.SLACK_ALERT_WEBHOOK ?? process.env.SLACK_BOT_TOKEN;
  if (!webhook) return;

  const emoji = input.severity === 'critical' ? '\ud83d\udea8' : '\u26a0\ufe0f';
  const color = input.severity === 'critical' ? '#ef4444' : '#f59e0b';

  // If it's a bot token, use chat.postMessage
  if (webhook.startsWith('xoxb-')) {
    const channel = process.env.SLACK_ALERT_CHANNEL ?? process.env.SLACK_CHANNEL_ID;
    if (!channel) return;
    await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: { Authorization: `Bearer ${webhook}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel,
        text: `${emoji} [45CM ALERT] ${input.message}`,
        attachments: [{
          color,
          fields: [
            { title: 'Service', value: input.service, short: true },
            { title: 'Severity', value: input.severity, short: true },
            ...(input.workspaceId ? [{ title: 'Workspace', value: input.workspaceId, short: true }] : []),
          ],
        }],
      }),
    });
  }
}

// Queue health checker
export async function checkQueueHealth(queues: Record<string, { waiting: number; failed: number; active: number }>) {
  const alerts: AlertInput[] = [];
  for (const [name, q] of Object.entries(queues)) {
    if (q.failed > 5) alerts.push({ severity: 'warning', service: 'queue', message: `Queue ${name}: ${q.failed} failed jobs`, metadata: { queue: name, ...q } });
    if (q.failed > 20) alerts.push({ severity: 'critical', service: 'queue', message: `Queue ${name}: ${q.failed} failed jobs (critical)`, metadata: { queue: name, ...q } });
    if (q.waiting > 50) alerts.push({ severity: 'warning', service: 'queue', message: `Queue ${name}: ${q.waiting} waiting (backlog)`, metadata: { queue: name, ...q } });
  }
  for (const a of alerts) await createAlert(a);
  return alerts;
}
