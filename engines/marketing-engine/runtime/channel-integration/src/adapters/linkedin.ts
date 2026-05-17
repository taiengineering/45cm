import type { ChannelIntegrationAdapter, OAuthConfig, TokenResult, PublishPayload, PublishResult, HealthResult, ProviderProfile, ChannelCapability } from '../index';

const API_BASE = 'https://api.linkedin.com/v2';

export class LinkedInAdapter implements ChannelIntegrationAdapter {
  provider = 'linkedin';
  displayName = 'LinkedIn';
  icon = '🔗';
  capabilities: ChannelCapability[] = ['publish_post', 'publish_image', 'publish_comment', 'analytics'];
  oauthConfig: OAuthConfig = {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    scopes: ['openid', 'profile', 'w_member_social'],
    callbackPath: '/oauth/linkedin/callback',
  };

  async connect(workspaceId: string): Promise<{ url: string }> {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    if (!clientId) throw new Error('LINKEDIN_CLIENT_ID not configured');
    const state = Buffer.from(JSON.stringify({ ws: workspaceId, provider: 'linkedin' })).toString('base64url');
    const redirectUri = encodeURIComponent(`https://api.45cm.com${this.oauthConfig.callbackPath}`);
    return { url: `${this.oauthConfig.authUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${this.oauthConfig.scopes.join('%20')}` };
  }

  async disconnect(_wsId: string): Promise<void> { /* revoke token */ }

  async refresh(_wsId: string, refreshToken: string): Promise<TokenResult> {
    const r = await fetch(this.oauthConfig.tokenUrl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken, client_id: process.env.LINKEDIN_CLIENT_ID!, client_secret: process.env.LINKEDIN_CLIENT_SECRET! }).toString() });
    const t = await r.json() as any;
    return { accessToken: t.access_token, refreshToken: t.refresh_token, expiresAt: new Date(Date.now() + t.expires_in * 1000).toISOString() };
  }

  async validate(accessToken: string): Promise<boolean> {
    const r = await fetch(`${API_BASE}/userinfo`, { headers: { Authorization: `Bearer ${accessToken}` } });
    return r.ok;
  }

  async publish(accessToken: string, content: PublishPayload): Promise<PublishResult> {
    const profile = await this.getProfile(accessToken);
    const body: any = { author: `urn:li:person:${profile.id}`, lifecycleState: 'PUBLISHED', specificContent: { 'com.linkedin.ugc.ShareContent': { shareCommentary: { text: content.text }, shareMediaCategory: 'NONE' } }, visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' } };
    const r = await fetch(`${API_BASE}/ugcPosts`, { method: 'POST', headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'X-Restli-Protocol-Version': '2.0.0' }, body: JSON.stringify(body) });
    if (!r.ok) { const err = await r.text(); return { success: false, error: err }; }
    const data = await r.json() as any;
    return { success: true, externalPostId: data.id, externalUrl: `https://www.linkedin.com/feed/update/${data.id}`, providerResponse: data };
  }

  async health(accessToken: string): Promise<HealthResult> {
    const valid = await this.validate(accessToken).catch(() => false);
    return { connected: true, tokenValid: valid, publishReady: valid, permissionValid: valid, rateLimited: false };
  }

  async getProfile(accessToken: string): Promise<ProviderProfile> {
    const r = await fetch(`${API_BASE}/userinfo`, { headers: { Authorization: `Bearer ${accessToken}` } });
    const d = await r.json() as any;
    return { id: d.sub, name: d.name, avatarUrl: d.picture };
  }
}
