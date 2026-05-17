// Strategy Memory Runtime — Operator strategy accumulation (NOT AI auto-learning)
import { createClient } from '@supabase/supabase-js';

function mkt() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'marketing' } }); }

export type NoteCategory = 'campaign' | 'brand' | 'cta' | 'channel' | 'publish' | 'general';

export async function addStrategyNote(wsId: string, category: NoteCategory, title: string, body?: string, campaignId?: string) {
  const { data } = await mkt().from('strategy_notes').insert({ workspace_id: wsId, category, title, body, campaign_id: campaignId }).select().single();
  return data;
}

export async function getStrategyNotes(wsId: string, category?: string, limit = 50) {
  let q = mkt().from('strategy_notes').select('*').eq('workspace_id', wsId).order('created_at', { ascending: false }).limit(limit);
  if (category) q = q.eq('category', category);
  const { data } = await q;
  return data ?? [];
}

export async function saveSnapshot(wsId: string, label: string, snapshot: Record<string, unknown>) {
  const { data } = await mkt().from('strategy_snapshots').insert({ workspace_id: wsId, label, snapshot }).select().single();
  return data;
}

export async function getSnapshots(wsId: string) {
  const { data } = await mkt().from('strategy_snapshots').select('*').eq('workspace_id', wsId).order('created_at', { ascending: false }).limit(20);
  return data ?? [];
}

export async function trackRecommendationOutcome(wsId: string, title: string, type: string, accepted: boolean, outcome?: string, comment?: string) {
  const { data } = await mkt().from('recommendation_outcomes').insert({ workspace_id: wsId, recommendation_title: title, recommendation_type: type, accepted, outcome, operator_comment: comment }).select().single();
  return data;
}

export async function getRecommendationOutcomes(wsId: string) {
  const { data } = await mkt().from('recommendation_outcomes').select('*').eq('workspace_id', wsId).order('created_at', { ascending: false }).limit(30);
  return data ?? [];
}
