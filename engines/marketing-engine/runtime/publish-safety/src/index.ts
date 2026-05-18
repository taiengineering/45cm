// Publish Safety Runtime — Pre-publish validation
import { createClient } from '@supabase/supabase-js';
const mkt = () => createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'marketing' } });

export interface PublishCheck { safe: boolean; reason?: string; checks: {name:string,passed:boolean,detail?:string}[]; }

export async function validatePublish(wsId: string, draftId: string, channel: string): Promise<PublishCheck> {
  const checks: PublishCheck['checks'] = [];

  // 1. Approval check
  const { data: approvals } = await mkt().from('approval_requests').select('status').eq('draft_id', draftId).eq('status', 'approved').limit(1);
  const approved = !!(approvals?.length);
  checks.push({ name: 'Approval', passed: approved, detail: approved ? 'Approved' : 'Not approved' });

  // 2. Duplicate check (same draft+channel in last 2h)
  const since = new Date(Date.now() - 7200000).toISOString();
  const { data: recent } = await mkt().from('publish_jobs').select('id').eq('draft_id', draftId).eq('channel', channel).gte('created_at', since).limit(1);
  const noDupe = !(recent?.length);
  checks.push({ name: 'Duplicate', passed: noDupe, detail: noDupe ? 'No duplicate' : 'Already published in last 2h' });

  // 3. Cooldown check (channel cooldown 2h)
  const { data: channelRecent } = await mkt().from('publish_jobs').select('id').eq('workspace_id', wsId).eq('channel', channel).gte('created_at', since).limit(1);
  const cooldownOk = !(channelRecent?.length);
  checks.push({ name: 'Cooldown', passed: cooldownOk, detail: cooldownOk ? 'Cooldown OK' : 'Channel cooldown active' });

  // 4. Integration check
  const { data: integ } = await mkt().from('workspace_integrations').select('status').eq('workspace_id', wsId).eq('provider', channel).single();
  const connected = integ?.status === 'connected';
  checks.push({ name: 'Integration', passed: connected, detail: connected ? 'Connected' : 'Not connected' });

  // 5. Emergency stop check
  const { data: emergency } = await mkt().from('workspace_settings').select('emergency_stop').eq('workspace_id', wsId).single();
  const notStopped = !emergency?.emergency_stop;
  checks.push({ name: 'Emergency Stop', passed: notStopped, detail: notStopped ? 'Normal' : 'EMERGENCY STOP ACTIVE' });

  const safe = checks.every(c => c.passed);
  return { safe, reason: safe ? undefined : checks.find(c => !c.passed)?.detail, checks };
}
