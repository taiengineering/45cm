// Channel Integration Runtime — Pluggable channel architecture
// New channel = Adapter + Registry registration. That's it.

export type IntegrationStatus = 'connected' | 'expired' | 'revoked' | 'failed' | 'disconnected';
export type ChannelCapability = 'publish_post' | 'publish_image' | 'publish_video' | 'publish_comment' | 'analytics' | 'messaging';

export interface ChannelIntegrationAdapter {
  provider: string;
  displayName: string;
  icon: string;
  capabilities: ChannelCapability[];
  oauthConfig: OAuthConfig | null;
  connect(workspaceId: string): Promise<{ url: string }>;
  disconnect(workspaceId: string): Promise<void>;
  refresh(workspaceId: string, refreshToken: string): Promise<TokenResult>;
  validate(accessToken: string): Promise<boolean>;
  publish(accessToken: string, content: PublishPayload): Promise<PublishResult>;
  health(accessToken: string): Promise<HealthResult>;
  getProfile(accessToken: string): Promise<ProviderProfile>;
}

export interface OAuthConfig {
  authUrl: string;
  tokenUrl: string;
  scopes: string[];
  callbackPath: string;
}

export interface TokenResult {
  accessToken: string;
  refreshToken?: string;
  expiresAt: string;
}

export interface PublishPayload {
  text: string;
  imageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
  title?: string;
}

export interface PublishResult {
  success: boolean;
  externalPostId?: string;
  externalUrl?: string;
  error?: string;
  providerResponse?: any;
}

export interface HealthResult {
  connected: boolean;
  tokenValid: boolean;
  publishReady: boolean;
  permissionValid: boolean;
  rateLimited: boolean;
}

export interface ProviderProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  metadata?: Record<string, any>;
}

// ====== Channel Registry ======

class ChannelRegistry {
  private adapters = new Map<string, ChannelIntegrationAdapter>();

  register(provider: string, adapter: ChannelIntegrationAdapter): void {
    this.adapters.set(provider, adapter);
  }

  get(provider: string): ChannelIntegrationAdapter | undefined {
    return this.adapters.get(provider);
  }

  list(): ChannelIntegrationAdapter[] {
    return Array.from(this.adapters.values());
  }

  providers(): string[] {
    return Array.from(this.adapters.keys());
  }

  hasCapability(provider: string, cap: ChannelCapability): boolean {
    return this.adapters.get(provider)?.capabilities.includes(cap) ?? false;
  }

  getByCapability(cap: ChannelCapability): ChannelIntegrationAdapter[] {
    return this.list().filter(a => a.capabilities.includes(cap));
  }
}

export const channelRegistry = new ChannelRegistry();

// ====== Re-exports ======
export { LinkedInAdapter } from './adapters/linkedin';
export { FacebookAdapter } from './adapters/facebook';
export { NaverBlogAdapter } from './adapters/naver-blog';
export { InstagramAdapter } from './adapters/instagram';
export { YouTubeAdapter } from './adapters/youtube';
export { XTwitterAdapter } from './adapters/x-twitter';
export { ThreadsAdapter } from './adapters/threads';
export { registerAllAdapters } from './register';
