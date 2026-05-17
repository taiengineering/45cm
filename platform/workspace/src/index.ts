import { createClient } from '@supabase/supabase-js';

function svc() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!); }
function mkt() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'marketing' } }); }
function bill() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'billing' } }); }

export async function getWorkspace(id: string) {
  const { data } = await mkt().from('workspaces').select('*').eq('id', id).single();
  return data;
}

export async function getWorkspaceSettings(wsId: string) {
  const { data } = await mkt().from('workspace_settings').select('*').eq('workspace_id', wsId).single();
  return data;
}

export async function getWorkspacePlan(wsId: string) {
  const { data } = await bill().from('workspace_plans').select('*').eq('workspace_id', wsId).single();
  return data;
}

export async function getWorkspaceUsage(wsId: string, month?: string) {
  const m = month ?? new Date().toISOString().slice(0, 7);
  const { data } = await bill().from('workspace_usage').select('*').eq('workspace_id', wsId).eq('month', m).single();
  return data;
}

export async function incrementUsage(wsId: string, field: string, amount: number = 1) {
  const month = new Date().toISOString().slice(0, 7);
  // Upsert usage
  const { data: existing } = await bill().from('workspace_usage').select('*').eq('workspace_id', wsId).eq('month', month).single();
  if (existing) {
    const update: Record<string, any> = { updated_at: new Date().toISOString() };
    update[field] = (existing as any)[field] + amount;
    await bill().from('workspace_usage').update(update).eq('id', existing.id);
  } else {
    const insert: Record<string, any> = { workspace_id: wsId, month, [field]: amount };
    await bill().from('workspace_usage').insert(insert);
  }
}

export async function checkUsageLimit(wsId: string, action: 'draft' | 'publish'): Promise<{ allowed: boolean; reason?: string }> {
  const plan = await getWorkspacePlan(wsId);
  if (!plan) return { allowed: true }; // No plan = no limits
  const month = new Date().toISOString().slice(0, 7);
  const usage = await getWorkspaceUsage(wsId, month);
  if (!usage) return { allowed: true };

  if (action === 'draft' && plan.max_drafts_per_day > 0) {
    // Simplified: check monthly cost limit
    if ((usage as any).ai_cost_usd >= plan.max_ai_cost_per_month) {
      return { allowed: false, reason: `Monthly AI cost limit ($${plan.max_ai_cost_per_month}) exceeded` };
    }
  }
  if (action === 'publish' && plan.max_publishes_per_day > 0) {
    if ((usage as any).publish_count >= plan.max_publishes_per_day * 30) {
      return { allowed: false, reason: 'Monthly publish limit exceeded' };
    }
  }
  return { allowed: true };
}

export async function getIntegration(wsId: string, provider: string) {
  const { data } = await mkt().from('workspace_integrations').select('*').eq('workspace_id', wsId).eq('provider', provider).single();
  return data;
}

export async function saveIntegration(wsId: string, provider: string, tokens: { access_token: string; refresh_token?: string; expires_at?: string }) {
  const { data } = await mkt().from('workspace_integrations').upsert({ workspace_id: wsId, provider, ...tokens, status: 'connected', updated_at: new Date().toISOString() }, { onConflict: 'workspace_id,provider' }).select().single();
  return data;
}

export async function insertAuditLog(wsId: string, action: string, actorId?: string, resourceType?: string, resourceId?: string, metadata?: Record<string, unknown>) {
  await mkt().from('audit_log').insert({ workspace_id: wsId, actor_id: actorId, action, resource_type: resourceType, resource_id: resourceId, metadata });
}
