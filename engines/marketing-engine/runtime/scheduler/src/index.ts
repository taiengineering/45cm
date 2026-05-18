// Scheduler Runtime — Cron publish, cooldown, publish window
import { createClient } from '@supabase/supabase-js';
const mkt = () => createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'marketing' } });

export interface PublishWindow { channel: string; startHour: number; endHour: number; timezone: string; daysOfWeek: number[]; }

const DEFAULT_WINDOWS: Record<string, PublishWindow> = {
  linkedin: { channel: 'linkedin', startHour: 8, endHour: 18, timezone: 'Asia/Seoul', daysOfWeek: [1,2,3,4,5] },
  facebook: { channel: 'facebook', startHour: 10, endHour: 20, timezone: 'Asia/Seoul', daysOfWeek: [1,2,3,4,5] },
  naver_blog: { channel: 'naver_blog', startHour: 8, endHour: 17, timezone: 'Asia/Seoul', daysOfWeek: [1,2,3,4,5] },
};

export function isInPublishWindow(channel: string, now: Date = new Date()): boolean {
  const w = DEFAULT_WINDOWS[channel];
  if (!w) return true;
  const hour = now.getUTCHours() + 9; // KST
  const day = now.getUTCDay();
  return w.daysOfWeek.includes(day === 0 ? 7 : day) && hour >= w.startHour && hour <= w.endHour;
}

export function getPublishWindow(channel: string): PublishWindow | null {
  return DEFAULT_WINDOWS[channel] ?? null;
}

export async function getDueSchedules(now: Date = new Date()): Promise<any[]> {
  const { data } = await mkt().from('scheduled_publishes').select('*').lte('scheduled_at', now.toISOString()).eq('status', 'pending').order('scheduled_at', { ascending: true }).limit(20);
  return data ?? [];
}

export async function markScheduleProcessed(id: string, status: string = 'queued') {
  await mkt().from('scheduled_publishes').update({ status }).eq('id', id);
}

// Cooldown: min interval between publishes per channel
export async function checkCooldown(wsId: string, channel: string, minIntervalMinutes: number = 120): Promise<boolean> {
  const since = new Date(Date.now() - minIntervalMinutes * 60000).toISOString();
  const { data } = await mkt().from('publish_jobs').select('id').eq('workspace_id', wsId).eq('channel', channel).gte('created_at', since).limit(1);
  return !(data && data.length > 0); // true = cooldown OK
}
