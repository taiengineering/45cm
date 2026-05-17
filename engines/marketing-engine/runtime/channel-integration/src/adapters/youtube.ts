import type { ChannelIntegrationAdapter, OAuthConfig, TokenResult, PublishPayload, PublishResult, HealthResult, ProviderProfile, ChannelCapability } from '../index';

export class YouTubeAdapter implements ChannelIntegrationAdapter {
  provider = 'youtube'; displayName = 'YouTube'; icon = '🎬';
  capabilities: ChannelCapability[] = ['publish_video', 'analytics'];
  oauthConfig: OAuthConfig = { authUrl: 'https://accounts.google.com/o/oauth2/v2/auth', tokenUrl: 'https://oauth2.googleapis.com/token', scopes: ['https://www.googleapis.com/auth/youtube.upload'], callbackPath: '/oauth/youtube/callback' };
  async connect(wsId: string) { return { url: `${this.oauthConfig.authUrl}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent('https://api.45cm.com'+this.oauthConfig.callbackPath)}&scope=${this.oauthConfig.scopes.join(' ')}&response_type=code&state=${Buffer.from(JSON.stringify({ws:wsId,provider:'youtube'})).toString('base64url')}&access_type=offline` }; }
  async disconnect(){} async refresh(_w:string,rt:string):Promise<TokenResult>{return{accessToken:rt,expiresAt:new Date(Date.now()+3600000).toISOString()};}
  async validate(_t:string){return false;} async publish(_t:string,_c:PublishPayload):Promise<PublishResult>{return{success:false,error:'not implemented'};}
  async health(_t:string):Promise<HealthResult>{return{connected:false,tokenValid:false,publishReady:false,permissionValid:false,rateLimited:false};}
  async getProfile(_t:string):Promise<ProviderProfile>{return{id:'',name:'YouTube Channel'};}
}
