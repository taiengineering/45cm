// Token Store — Secure token management (tokens never exposed to UI)
export class TokenStore {
  // Tokens are stored in workspace_integrations DB table
  // This class provides the abstraction layer
  async getAccessToken(wsId: string, provider: string, db: any): Promise<string | null> {
    const { data } = await db.from('workspace_integrations').select('access_token,expires_at').eq('workspace_id', wsId).eq('provider', provider).single();
    if (!data?.access_token) return null;
    if (data.expires_at && new Date(data.expires_at) < new Date()) return null; // expired
    return data.access_token;
  }

  async storeTokens(wsId: string, provider: string, tokens: { accessToken: string; refreshToken?: string; expiresAt?: string }, db: any): Promise<void> {
    await db.from('workspace_integrations').update({ access_token: tokens.accessToken, refresh_token: tokens.refreshToken, expires_at: tokens.expiresAt, status: 'connected' }).eq('workspace_id', wsId).eq('provider', provider);
  }

  async revokeTokens(wsId: string, provider: string, db: any): Promise<void> {
    await db.from('workspace_integrations').update({ access_token: null, refresh_token: null, status: 'disconnected' }).eq('workspace_id', wsId).eq('provider', provider);
  }

  async isExpired(wsId: string, provider: string, db: any): Promise<boolean> {
    const { data } = await db.from('workspace_integrations').select('expires_at').eq('workspace_id', wsId).eq('provider', provider).single();
    return data?.expires_at ? new Date(data.expires_at) < new Date() : false;
  }
}
