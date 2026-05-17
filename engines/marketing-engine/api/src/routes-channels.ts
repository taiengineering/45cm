// Channel Integration API routes — Provider-agnostic OAuth + Health + Test
import type { FastifyInstance } from 'fastify';

const PROVIDER_CONFIG: Record<string, { envKey: string; envSecret: string }> = {
  linkedin: { envKey: 'LINKEDIN_CLIENT_ID', envSecret: 'LINKEDIN_CLIENT_SECRET' },
  facebook: { envKey: 'FACEBOOK_APP_ID', envSecret: 'FACEBOOK_APP_SECRET' },
  naver_blog: { envKey: 'NAVER_CLIENT_ID', envSecret: 'NAVER_CLIENT_SECRET' },
  instagram: { envKey: 'INSTAGRAM_APP_ID', envSecret: 'INSTAGRAM_APP_SECRET' },
  youtube: { envKey: 'GOOGLE_CLIENT_ID', envSecret: 'GOOGLE_CLIENT_SECRET' },
  x_twitter: { envKey: 'X_CLIENT_ID', envSecret: 'X_CLIENT_SECRET' },
  threads: { envKey: 'THREADS_APP_ID', envSecret: 'THREADS_APP_SECRET' },
};

const PROVIDERS = [
  { provider:'linkedin', name:'LinkedIn', icon:'🔗', capabilities:['publish_post','publish_image','publish_comment','analytics'], status:'available' },
  { provider:'facebook', name:'Facebook', icon:'📘', capabilities:['publish_post','publish_image','publish_comment','analytics'], status:'available' },
  { provider:'naver_blog', name:'Naver Blog', icon:'🟢', capabilities:['publish_post','publish_image'], status:'available' },
  { provider:'instagram', name:'Instagram', icon:'📸', capabilities:['publish_image','publish_video','analytics'], status:'coming_soon' },
  { provider:'youtube', name:'YouTube', icon:'🎥', capabilities:['publish_video','analytics'], status:'coming_soon' },
  { provider:'x_twitter', name:'X (Twitter)', icon:'𝕏', capabilities:['publish_post','publish_image','analytics'], status:'coming_soon' },
  { provider:'threads', name:'Threads', icon:'🧵', capabilities:['publish_post','publish_image'], status:'coming_soon' },
];

export async function registerChannelRoutes(app: FastifyInstance, mkt: () => any, WS: string) {

  app.get('/integrations/providers', async (_rq, rp) => rp.send(PROVIDERS));

  // Provider-agnostic OAuth start
  app.get('/oauth/:provider/start', async (rq: any, rp) => {
    const { provider } = rq.params;
    const config = PROVIDER_CONFIG[provider];
    if (!config) return rp.status(400).send({ error: `Unknown provider: ${provider}` });
    const clientId = process.env[config.envKey];
    if (!clientId) return rp.status(500).send({ error: `${config.envKey} not configured` });
    const ws = rq.query.ws ?? WS;
    const state = Buffer.from(JSON.stringify({ ws, provider })).toString('base64url');
    const redirectUri = encodeURIComponent(`https://api.45cm.com/oauth/${provider}/callback`);
    const urls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=openid%20profile%20w_member_social`,
      facebook: `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=pages_manage_posts,pages_read_engagement`,
      naver_blog: `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&response_type=code`,
    };
    const url = urls[provider];
    if (!url) return rp.status(400).send({ error: `OAuth not configured for ${provider}` });
    return rp.redirect(302, url);
  });

  // Provider-agnostic OAuth callback
  app.get('/oauth/:provider/callback', async (rq: any, rp) => {
    const { provider } = rq.params;
    const { code, state } = rq.query;
    if (!code) return rp.status(400).send({ error: 'Missing code' });
    const config = PROVIDER_CONFIG[provider];
    if (!config) return rp.status(400).send({ error: `Unknown provider` });
    const clientId = process.env[config.envKey];
    const clientSecret = process.env[config.envSecret];
    if (!clientId || !clientSecret) return rp.status(500).send({ error: `${provider} not configured` });
    let ws = WS;
    try { ws = JSON.parse(Buffer.from(state, 'base64url').toString()).ws; } catch (_) {}

    const tokenUrls: Record<string, string> = {
      linkedin: 'https://www.linkedin.com/oauth/v2/accessToken',
      facebook: 'https://graph.facebook.com/v19.0/oauth/access_token',
      naver_blog: 'https://nid.naver.com/oauth2.0/token',
    };
    const tokenUrl = tokenUrls[provider];
    if (!tokenUrl) return rp.redirect(302, `https://app.45cm.com/settings?${provider}=error`);

    try {
      const r = await fetch(tokenUrl, {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ grant_type: 'authorization_code', code: code as string, redirect_uri: `https://api.45cm.com/oauth/${provider}/callback`, client_id: clientId, client_secret: clientSecret }).toString(),
      });
      const t = await r.json() as any;
      if (t.error) return rp.redirect(302, `https://app.45cm.com/settings?${provider}=error&reason=${encodeURIComponent(t.error_description||t.error)}`);

      // Fetch profile for display
      let profileName = '', profileAvatar = '', publishTargetName = '';
      if (provider === 'linkedin' && t.access_token) {
        try {
          const pr = await fetch('https://api.linkedin.com/v2/userinfo', { headers: { Authorization: `Bearer ${t.access_token}` } });
          const pd = await pr.json() as any;
          profileName = pd.name || '';
          profileAvatar = pd.picture || '';
          publishTargetName = pd.name || 'Personal Profile';
        } catch (_) {}
      }

      // Upsert integration
      const caps = PROVIDERS.find(p => p.provider === provider)?.capabilities ?? [];
      const { data: existing } = await mkt().from('workspace_integrations').select('id').eq('workspace_id', ws).eq('provider', provider).single();
      if (existing) {
        await mkt().from('workspace_integrations').update({
          access_token: t.access_token, refresh_token: t.refresh_token,
          expires_at: t.expires_in ? new Date(Date.now() + t.expires_in * 1000).toISOString() : null,
          status: 'connected', capabilities: caps, profile_name: profileName, profile_avatar: profileAvatar, publish_target_name: publishTargetName,
          metadata: { token_type: t.token_type, scope: t.scope },
        }).eq('id', existing.id);
      } else {
        await mkt().from('workspace_integrations').insert({
          workspace_id: ws, provider, access_token: t.access_token, refresh_token: t.refresh_token,
          expires_at: t.expires_in ? new Date(Date.now() + t.expires_in * 1000).toISOString() : null,
          status: 'connected', capabilities: caps, profile_name: profileName, profile_avatar: profileAvatar, publish_target_name: publishTargetName,
          metadata: { token_type: t.token_type, scope: t.scope },
        });
      }

      // Audit log
      try { const { insertAuditLog } = await import('@45cm/core-workspace-runtime'); await insertAuditLog(ws, 'channel.connected', undefined, 'integration', provider, { profile: profileName }); } catch(_) {}

    } catch (e: any) {
      return rp.redirect(302, `https://app.45cm.com/settings?${provider}=error&reason=${encodeURIComponent(e.message)}`);
    }

    return rp.redirect(302, `https://app.45cm.com/settings?${provider}=connected`);
  });

  // Integration health
  app.get('/integrations/health', async (rq: any, rp) => {
    const ws = rq.query.ws ?? WS;
    const { data } = await mkt().from('workspace_integrations').select('provider,status,expires_at,capabilities,profile_name,publish_target_name').eq('workspace_id', ws);
    const health = (data ?? []).map((i: any) => {
      const expired = i.expires_at ? new Date(i.expires_at) < new Date() : false;
      return { provider: i.provider, connected: i.status === 'connected', tokenValid: !expired, publishReady: i.status === 'connected' && !expired, capabilities: i.capabilities ?? [], profileName: i.profile_name, publishTarget: i.publish_target_name };
    });
    return rp.send(health);
  });

  // Workspace integrations (with profile info)
  app.get('/workspace/integrations', async (rq: any, rp) => {
    const { data } = await mkt().from('workspace_integrations').select('id,workspace_id,provider,status,expires_at,capabilities,profile_name,publish_target_name,created_at').eq('workspace_id', rq.query.ws ?? WS);
    return rp.send(data ?? []);
  });

  // Test connection
  app.post('/integrations/:provider/test', async (rq: any, rp) => {
    const ws = rq.body?.workspaceId ?? WS;
    const { data } = await mkt().from('workspace_integrations').select('*').eq('workspace_id', ws).eq('provider', rq.params.provider).single();
    if (!data) return rp.send({ connected: false, tokenValid: false, publishReady: false, message: '연결되지 않았습니다' });
    const expired = data.expires_at ? new Date(data.expires_at) < new Date() : false;
    if (expired) return rp.send({ connected: true, tokenValid: false, publishReady: false, message: '토큰이 만료되었습니다. Reconnect가 필요합니다.' });
    // LinkedIn-specific validation
    if (rq.params.provider === 'linkedin' && data.access_token) {
      try {
        const r = await fetch('https://api.linkedin.com/v2/userinfo', { headers: { Authorization: `Bearer ${data.access_token}` } });
        if (r.ok) return rp.send({ connected: true, tokenValid: true, publishReady: true, message: '✅ 게시 가능한 상태입니다' });
        return rp.send({ connected: true, tokenValid: false, publishReady: false, message: '토큰이 유효하지 않습니다. Reconnect가 필요합니다.' });
      } catch (e: any) {
        return rp.send({ connected: true, tokenValid: false, publishReady: false, message: `검증 실패: ${e.message}` });
      }
    }
    return rp.send({ connected: true, tokenValid: true, publishReady: data.status === 'connected', message: '연결 상태 정상' });
  });

  // Disconnect
  app.post('/integrations/:provider/disconnect', async (rq: any, rp) => {
    const ws = rq.body?.workspaceId ?? WS;
    await mkt().from('workspace_integrations').update({ status: 'disconnected', access_token: null, refresh_token: null }).eq('workspace_id', ws).eq('provider', rq.params.provider);
    return rp.send({ ok: true });
  });
}
