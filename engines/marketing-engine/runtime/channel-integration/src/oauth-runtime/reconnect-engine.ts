// Reconnect Engine — Auto reconnect on failure
export class ReconnectEngine {
  async shouldReconnect(wsId: string, provider: string, db: any): Promise<{ needed: boolean; reason?: string }> {
    const { data } = await db.from('workspace_integrations').select('status,expires_at').eq('workspace_id', wsId).eq('provider', provider).single();
    if (!data) return { needed: false };
    if (data.status === 'expired') return { needed: true, reason: '연결이 만료되었습니다. 다시 연결해주세요.' };
    if (data.expires_at && new Date(data.expires_at) < new Date()) return { needed: true, reason: '인증이 만료되었습니다. Reconnect를 눌러주세요.' };
    if (data.status === 'failed') return { needed: true, reason: '연결에 문제가 있습니다. 다시 연결해주세요.' };
    return { needed: false };
  }

  getHumanMessage(reason: string): string {
    // Convert technical reasons to human language
    const map: Record<string, string> = {
      'token_expired': '연결이 만료되었습니다. 다시 연결해주세요.',
      'refresh_failed': '자동 갱신에 실패했습니다. Reconnect를 눌러주세요.',
      'permission_denied': '권한이 변경되었습니다. 다시 연결하면 복구됩니다.',
      'scope_changed': '기능이 변경되었습니다. 다시 연결하면 새 기능을 사용할 수 있습니다.',
    };
    return map[reason] ?? reason;
  }
}
