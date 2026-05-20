// Universal Provider Interface — Standard interface for all channel providers
import type { ChannelCapabilityType } from './capabilities';

export interface ProviderInterface {
  // Identity
  readonly provider: string;
  readonly displayName: string;
  readonly category: string;

  // Connection
  connect(workspaceId: string): Promise<{ url: string }>;
  disconnect(workspaceId: string): Promise<void>;
  refresh(workspaceId: string): Promise<boolean>;

  // Health
  health(workspaceId: string): Promise<ConnectionHealth>;

  // Capabilities
  capabilities(): ChannelCapabilityType[];

  // Publish targets (pages, channels, profiles)
  publishTargets(accessToken: string): Promise<PublishTarget[]>;
}

export interface ConnectionHealth {
  status: 'healthy' | 'warning' | 'expired' | 'permission_required' | 'reconnect_required' | 'degraded' | 'disconnected';
  message: string; // Always human-readable, never technical
  lastSync?: string;
  publishReady: boolean;
  capabilities: ChannelCapabilityType[];
}

export interface PublishTarget {
  id: string;
  name: string;
  type: 'page' | 'channel' | 'profile' | 'account' | 'blog';
  avatarUrl?: string;
  isDefault?: boolean;
}

// Human-readable connection status messages (never technical jargon)
export const CONNECTION_MESSAGES: Record<string, { title: string; description: string }> = {
  healthy:              { title: '연결됨', description: '정상적으로 연결되어 있습니다.' },
  warning:              { title: '확인 필요', description: '연결 상태를 확인해주세요.' },
  expired:              { title: '만료됨', description: '연결이 만료되었습니다. 다시 연결해주세요.' },
  permission_required:  { title: '권한 필요', description: '추가 권한이 필요합니다. 다시 연결해주세요.' },
  reconnect_required:   { title: '재연결 필요', description: 'Reconnect 버튼을 눌러 다시 연결해주세요.' },
  degraded:             { title: '일부 제한', description: '일부 기능이 제한되어 있습니다.' },
  disconnected:         { title: '연결 안 됨', description: 'Connect 버튼을 눌러 연결하세요.' },
};
