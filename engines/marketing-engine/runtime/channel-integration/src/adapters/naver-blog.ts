import type { ChannelIntegrationAdapter, OAuthConfig, TokenResult, PublishPayload, PublishResult, HealthResult, ProviderProfile, ChannelCapability } from '../index';

export class NaverBlogAdapter implements ChannelIntegrationAdapter {
  provider = 'naver_blog';
  displayName = 'Naver Blog';
  icon = '🟢';
  capabilities: ChannelCapability[] = ['publish_post', 'publish_image'];
  oauthConfig: OAuthConfig = { authUrl: 'https://nid.naver.com/oauth2.0/authorize', tokenUrl: 'https://nid.naver.com/oauth2.0/token', scopes: ['blog'], callbackPath: '/oauth/naver-blog/callback' };
  async connect(wsId: string) { const cid = process.env.NAVER_CLIENT_ID; if (!cid) throw new Error('NAVER_CLIENT_ID not configured'); const state = Buffer.from(JSON.stringify({ ws: wsId, provider: 'naver_blog' })).toString('base64url'); return { url: `${this.oauthConfig.authUrl}?client_id=${cid}&redirect_uri=${encodeURIComponent('https://api.45cm.com' + this.oauthConfig.callbackPath)}&state=${state}&response_type=code` }; }
  async disconnect() {}
  async refresh(_w: string, rt: string): Promise<TokenResult> { return { accessToken: rt, expiresAt: new Date(Date.now() + 3600000).toISOString() }; }
  async validate(_t: string) { return false; }
  async publish(_t: string, _c: PublishPayload): Promise<PublishResult> { return { success: false, error: 'Naver Blog adapter not yet implemented' }; }
  async health(_t: string): Promise<HealthResult> { return { connected: false, tokenValid: false, publishReady: false, permissionValid: false, rateLimited: false }; }
  async getProfile(_t: string): Promise<ProviderProfile> { return { id: '', name: 'Naver Blog' }; }
}
