// Token Budget Runtime — Cost control per workspace
import { createClient } from '@supabase/supabase-js';
const billing = () => createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'billing' } });

export interface TokenLimits { monthly_limit: number; soft_limit: number; hard_limit: number; burst_limit: number; regen_limit: number; }
export interface TokenCheck { allowed: boolean; reason?: string; remaining: number; used: number; limit: number; }

export async function getTokenLimits(wsId: string): Promise<TokenLimits> {
  const { data } = await billing().from('workspace_token_limits').select('*').eq('workspace_id', wsId).single();
  return data ?? { monthly_limit: 500000, soft_limit: 400000, hard_limit: 500000, burst_limit: 10000, regen_limit: 5 };
}

export async function checkTokenBudget(wsId: string, requestedTokens: number = 0): Promise<TokenCheck> {
  const limits = await getTokenLimits(wsId);
  const mkt = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'core_ai' } });
  const month = new Date().toISOString().slice(0, 7);
  const { data } = await mkt.from('ai_usage_log').select('prompt_tokens,completion_tokens').eq('workspace_id', wsId).gte('created_at', month + '-01');
  const used = (data ?? []).reduce((s: number, r: any) => s + (r.prompt_tokens ?? 0) + (r.completion_tokens ?? 0), 0);
  const remaining = limits.hard_limit - used;
  if (used + requestedTokens > limits.hard_limit) return { allowed: false, reason: 'hard_limit_exceeded', remaining, used, limit: limits.hard_limit };
  if (used + requestedTokens > limits.soft_limit) return { allowed: true, reason: 'soft_limit_warning', remaining, used, limit: limits.hard_limit };
  return { allowed: true, remaining, used, limit: limits.hard_limit };
}

export async function setTokenLimits(wsId: string, limits: Partial<TokenLimits>) {
  const { data: existing } = await billing().from('workspace_token_limits').select('id').eq('workspace_id', wsId).single();
  if (existing) return (await billing().from('workspace_token_limits').update(limits).eq('workspace_id', wsId).select().single()).data;
  return (await billing().from('workspace_token_limits').insert({ workspace_id: wsId, ...limits }).select().single()).data;
}
