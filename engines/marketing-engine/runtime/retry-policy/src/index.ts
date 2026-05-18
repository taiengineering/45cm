// Retry Policy Runtime — Prevent infinite retries
export type FailureType = 'network' | 'timeout' | 'auth' | 'permission' | 'validation' | 'rate_limit' | 'unknown';
export type RetryAction = 'retry' | 'stop' | 'operator_action' | 'dlq';

export interface RetryPolicy { maxRetries: number; action: RetryAction; backoffMs: number; }

const POLICIES: Record<FailureType, RetryPolicy> = {
  network:    { maxRetries: 3, action: 'retry', backoffMs: 2000 },
  timeout:    { maxRetries: 2, action: 'retry', backoffMs: 5000 },
  auth:       { maxRetries: 0, action: 'stop', backoffMs: 0 },
  permission: { maxRetries: 0, action: 'operator_action', backoffMs: 0 },
  validation: { maxRetries: 0, action: 'dlq', backoffMs: 0 },
  rate_limit: { maxRetries: 3, action: 'retry', backoffMs: 60000 },
  unknown:    { maxRetries: 1, action: 'dlq', backoffMs: 3000 },
};

export function classifyError(error: any): FailureType {
  const msg = (error?.message ?? '').toLowerCase();
  const status = error?.status ?? error?.statusCode ?? 0;
  if (status === 401 || status === 403 || msg.includes('auth') || msg.includes('token')) return 'auth';
  if (status === 403 || msg.includes('permission') || msg.includes('forbidden')) return 'permission';
  if (status === 429 || msg.includes('rate limit') || msg.includes('too many')) return 'rate_limit';
  if (status === 400 || msg.includes('invalid') || msg.includes('validation')) return 'validation';
  if (msg.includes('timeout') || msg.includes('timed out') || msg.includes('ETIMEDOUT')) return 'timeout';
  if (msg.includes('ECONNREFUSED') || msg.includes('ENOTFOUND') || msg.includes('network') || msg.includes('fetch')) return 'network';
  return 'unknown';
}

export function getRetryPolicy(failureType: FailureType): RetryPolicy {
  return POLICIES[failureType] ?? POLICIES.unknown;
}

export function shouldRetry(failureType: FailureType, attemptNumber: number): { retry: boolean; action: RetryAction; delayMs: number } {
  const policy = getRetryPolicy(failureType);
  if (attemptNumber >= policy.maxRetries) return { retry: false, action: policy.maxRetries === 0 ? policy.action : 'dlq', delayMs: 0 };
  return { retry: true, action: 'retry', delayMs: policy.backoffMs * Math.pow(2, attemptNumber) };
}
