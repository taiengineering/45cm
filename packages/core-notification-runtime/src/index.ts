import { createClient } from '@supabase/supabase-js';

function opsDb() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'ops' } }); }

export type NotifyChannel = 'slack' | 'email' | 'webhook';

export interface NotifyInput {
  workspaceId?: string;
  channel: NotifyChannel;
  recipient?: string;
  subject?: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export async function notify(input: NotifyInput): Promise<boolean> {
  try {
    if (input.channel === 'slack') return await sendSlack(input);
    if (input.channel === 'webhook') return await sendWebhook(input);
    // email: future
    return false;
  } finally {
    await opsDb().from('notification_log').insert({
      workspace_id: input.workspaceId, channel: input.channel,
      recipient: input.recipient, subject: input.subject, body: input.body,
      metadata: input.metadata ?? {},
    }).catch(() => {});
  }
}

async function sendSlack(input: NotifyInput): Promise<boolean> {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = input.recipient ?? process.env.SLACK_CHANNEL_ID;
  if (!token || !channel) return false;
  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ channel, text: input.subject ? `*${input.subject}*\n${input.body}` : input.body }),
  });
  return res.ok;
}

async function sendWebhook(input: NotifyInput): Promise<boolean> {
  if (!input.recipient) return false;
  const res = await fetch(input.recipient, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject: input.subject, body: input.body, metadata: input.metadata }),
  });
  return res.ok;
}
