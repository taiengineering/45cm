// Scope Validator — Check required capabilities after OAuth
import { CHANNEL_CAPABILITIES, type ChannelCapabilityType } from '../capabilities';

export class ScopeValidator {
  validate(provider: string, grantedScopes: string[]): { valid: boolean; missing: string[] } {
    // Map provider scopes to capabilities
    // Each provider has different scope naming
    const required = CHANNEL_CAPABILITIES[provider] ?? [];
    // For now, if we got any scopes, consider it valid
    return { valid: grantedScopes.length > 0, missing: [] };
  }

  getRequiredScopes(provider: string): string[] {
    const scopeMap: Record<string, string[]> = {
      linkedin: ['openid', 'profile', 'w_member_social'],
      facebook: ['pages_manage_posts', 'pages_read_engagement'],
      instagram: ['user_profile', 'user_media'],
      youtube: ['https://www.googleapis.com/auth/youtube.upload'],
      kakao_channel: ['talk_message'],
    };
    return scopeMap[provider] ?? [];
  }
}
