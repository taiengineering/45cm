// Tenant Isolation Runtime — Workspace-scoped everything

export function wsQueueName(base: string, wsId: string): string { return `${base}:${wsId.slice(0,8)}`; }
export function wsCacheKey(wsId: string, runtime: string, key: string): string { return `ws:${wsId.slice(0,8)}:${runtime}:${key}`; }
export function wsMetricKey(wsId: string, metric: string): string { return `ws:${wsId.slice(0,8)}:metric:${metric}`; }
export function wsDlqName(base: string, wsId: string): string { return `45.dead.${base}:${wsId.slice(0,8)}`; }

export interface TenantContext { workspaceId: string; channel?: string; userId?: string; role?: string; }

export function validateTenantAccess(ctx: TenantContext, resourceWsId: string): boolean {
  return ctx.workspaceId === resourceWsId;
}

export function createTenantScope(wsId: string) {
  return {
    queue: (base: string) => wsQueueName(base, wsId),
    cache: (runtime: string, key: string) => wsCacheKey(wsId, runtime, key),
    metric: (m: string) => wsMetricKey(wsId, m),
    dlq: (base: string) => wsDlqName(base, wsId),
  };
}
