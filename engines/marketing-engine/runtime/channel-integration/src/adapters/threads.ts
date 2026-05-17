import type { ChannelIntegrationAdapter, OAuthConfig, TokenResult, PublishPayload, PublishResult, HealthResult, ProviderProfile, ChannelCapability } from '../index';

export class ThreadsAdapter implements ChannelIntegrationAdapter {
  provider = 'threads'; displayName = 'Threads'; icon = '🧵';
  capabilities: ChannelCapability[] = ['publish_post', 'publish_image'];
  oauthConfig: OAuthConfig = { authUrl: 'https://threads.net/oauth/authorize', tokenUrl: 'https://graph.threads.net/oauth/access_token', scopes: ['threads_basic', 'threads_content_publish'], callbackPath: '/oauth/threads/callback' };
  async connect(wsId: string) { return { url: `${this.oauthConfig.authUrl}?client_id=${process.env.THREADS_APP_ID}&redirect_uri=${encodeURIComponent('https://api.45cm.com'+this.oauthConfig.callbackPath)}&scope=${this.oauthConfig.scopes.join(',')}&response_type=code&state=${Buffer.from(JSON.stringify({ws:wsId,provider:'threads'})).toString('base64url')}` }; }
  async disconnect(){} async refresh(_w:string,rt:string):Promise<TokenResult>{return{accessToken:rt,expiresAt:new Date(Date.now()+3600000).toISOString()};}
  async validate(_t:string){return false;} async publish(_t:string,_c:PublishPayload):Promise<PublishResult>{return{success:false,error:'not implemented'};}
  async health(_t:string):Promise<HealthResult>{return{connected:false,tokenValid:false,publishReady:false,permissionValid:false,rateLimited:false};}
  async getProfile(_t:string):Promise<ProviderProfile>{return{id:'',name:'Threads'};}
}
