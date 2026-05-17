export interface PublishRequest {
  workspaceId: string;
  draftId: string;
  channel: string;
  content: string;
  traceId?: string;
}

export interface PublishResult {
  success: boolean;
  externalPostId?: string;
  error?: string;
  publishedAt?: string;
}

export interface PublishAdapter {
  name: string;
  publish(req: PublishRequest): Promise<PublishResult>;
}

// LinkedIn Adapter (placeholder — needs OAuth token)
export class LinkedInAdapter implements PublishAdapter {
  name = 'linkedin';
  async publish(req: PublishRequest): Promise<PublishResult> {
    const token = process.env.LINKEDIN_ACCESS_TOKEN;
    if (!token) return { success: false, error: 'LINKEDIN_ACCESS_TOKEN not configured' };

    console.log(JSON.stringify({ level:'info', msg:'linkedin.publish.start', draft_id:req.draftId, trace_id:req.traceId }));

    try {
      const res = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: `urn:li:person:${process.env.LINKEDIN_PERSON_ID || 'me'}`,
          lifecycleState: 'PUBLISHED',
          specificContent: { 'com.linkedin.ugc.ShareContent': { shareCommentary: { text: req.content }, shareMediaCategory: 'NONE' } },
          visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        return { success: false, error: `LinkedIn API ${res.status}: ${err}` };
      }

      const data = await res.json() as any;
      return { success: true, externalPostId: data.id, publishedAt: new Date().toISOString() };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
}

const adapters: Record<string, PublishAdapter> = { linkedin: new LinkedInAdapter() };

export function getPublishAdapter(channel: string): PublishAdapter | null {
  return adapters[channel] ?? null;
}

export function registerAdapter(adapter: PublishAdapter) {
  adapters[adapter.name] = adapter;
}
