// Emergency Stop Runtime — Instant halt all publishing
import { createClient } from '@supabase/supabase-js';
const mkt = () => createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'marketing' } });

export async function activateEmergencyStop(wsId: string, reason?: string): Promise<void> {
  await mkt().from('workspace_settings').update({ emergency_stop: true, emergency_stop_reason: reason, emergency_stop_at: new Date().toISOString() }).eq('workspace_id', wsId);
}

export async function deactivateEmergencyStop(wsId: string): Promise<void> {
  await mkt().from('workspace_settings').update({ emergency_stop: false, emergency_stop_reason: null, emergency_stop_at: null }).eq('workspace_id', wsId);
}

export async function isEmergencyStopped(wsId: string): Promise<boolean> {
  const { data } = await mkt().from('workspace_settings').select('emergency_stop').eq('workspace_id', wsId).single();
  return !!data?.emergency_stop;
}

// Global stop (all workspaces)
export async function activateGlobalStop(): Promise<void> {
  await mkt().from('workspace_settings').update({ emergency_stop: true, emergency_stop_reason: 'GLOBAL_STOP' });
}
