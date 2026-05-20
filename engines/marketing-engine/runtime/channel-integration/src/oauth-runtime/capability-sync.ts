// Capability Sync — Auto-detect capabilities after connection
import { CHANNEL_CAPABILITIES, type ChannelCapabilityType } from '../capabilities';

export class CapabilitySync {
  async syncCapabilities(provider: string, _accessToken: string): Promise<ChannelCapabilityType[]> {
    // In production: query provider API to detect actual capabilities
    // For now: return static capabilities from our registry
    return CHANNEL_CAPABILITIES[provider] ?? [];
  }

  async storeCapabilities(wsId: string, provider: string, capabilities: ChannelCapabilityType[], db: any): Promise<void> {
    await db.from('workspace_integrations').update({ capabilities }).eq('workspace_id', wsId).eq('provider', provider);
  }
}
