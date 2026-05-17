import { createClient } from '@supabase/supabase-js';

function bill() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'billing' } }); }

export async function getMonthlyUsage(wsId: string, month?: string) {
  const m = month ?? new Date().toISOString().slice(0, 7);
  const { data } = await bill().from('workspace_usage').select('*').eq('workspace_id', wsId).eq('month', m).single();
  return data;
}

export async function getUsageHistory(wsId: string, months: number = 6) {
  const { data } = await bill().from('workspace_usage').select('*').eq('workspace_id', wsId).order('month', { ascending: false }).limit(months);
  return data ?? [];
}

export async function getPlan(wsId: string) {
  const { data } = await bill().from('workspace_plans').select('*').eq('workspace_id', wsId).single();
  return data;
}

export async function getInvoices(wsId: string) {
  const { data } = await bill().from('workspace_invoices').select('*').eq('workspace_id', wsId).order('created_at', { ascending: false });
  return data ?? [];
}
