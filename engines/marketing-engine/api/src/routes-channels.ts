// Channel Integration API routes — Provider-agnostic OAuth + Health
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

  // Provider registry
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

    // Provider-specific auth URLs
    const urls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=openid%20profile%20w_member_social`,
      facebook: `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=pages_manage_posts,pages_read_engagement`,
      naver_blog: `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&response_type=code`,
      instagram: `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=user_profile,user_media&response_type=code`,
      youtube: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=https://www.googleapis.com/auth/youtube.upload&response_type=code&access_type=offline`,
      x_twitter: `https://twitter.com/i/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=tweet.read%20tweet.write%20users.read&response_type=code&code_challenge=challenge&code_challenge_method=plain`,
      threads: `https://threads.net/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=threads_basic,threads_content_publish&response_type=code`,
    };

    return rp.send({ url: urls[provider] ?? '' });
  });

  // Provider-agnostic OAuth callback
  app.get('/oauth/:provider/callback', async (rq: any, rp) => {
    const { provider } = rq.params;
    const { code, state } = rq.query;
    if (!code) return rp.status(400).send({ error: 'Missing code' });

    const config = PROVIDER_CONFIG[provider];
    if (!config) return rp.status(400).send({ error: `Unknown provider: ${provider}` });

    const clientId = process.env[config.envKey];
    const clientSecret = process.env[config.envSecret];
    if (!clientId || !clientSecret) return rp.status(500).send({ error: `${provider} not configured` });

    let ws = WS;
    try { ws = JSON.parse(Buffer.from(state, 'base64url').toString()).ws; } catch (_) {}

    // Token exchange URLs
    const tokenUrls: Record<string, string> = {
      linkedin: 'https://www.linkedin.com/oauth/v2/accessToken',
      facebook: 'https://graph.facebook.com/v19.0/oauth/access_token',
      naver_blog: 'https://nid.naver.com/oauth2.0/token',
      youtube: 'https://oauth2.googleapis.com/token',
      x_twitter: 'https://api.twitter.com/2/oauth2/token',
    };

    const tokenUrl = tokenUrls[provider];
    if (tokenUrl) {
      try {
        const r = await fetch(tokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code', code: code as string,
            redirect_uri: `https://api.45cm.com/oauth/${provider}/callback`,
            client_id: clientId, client_secret: clientSecret,
          }).toString(),
        });
        const t = await r.json() as any;
        if (t.error) return rp.status(400).send({ error: t.error_description ?? t.error });

        // Save integration
        await mkt().from('workspace_integrations').upsert({
          workspace_id: ws, provider,
          access_token: t.access_token, refresh_token: t.refresh_token,
          expires_at: t.expires_in ? new Date(Date.now() + t.expires_in * 1000).toISOString() : null,
          status: 'connected',
          capabilities: PROVIDERS.find(p => p.provider === provider)?.capabilities ?? [],
          metadata: { token_type: t.token_type, scope: t.scope },
        }, { onConflict: 'workspace_id,provider' }).select();

      } catch (e: any) {
        return rp.status(500).send({ error: e.message });
      }
    }

    return rp.redirect(302, `https://app.45cm.com/settings?${provider}=connected`);
  });

  // Integration health
  app.get('/integrations/health', async (rq: any, rp) => {
    const ws = rq.query.ws ?? WS;
    const { data } = await mkt().from('workspace_integrations')
      .select('provider,status,expires_at,capabilities')
      .eq('workspace_id', ws);

    const health = (data ?? []).map((i: any) => {
      const expired = i.expires_at ? new Date(i.expires_at) < new Date() : false;
      return {
        provider: i.provider,
        connected: i.status === 'connected',
        tokenValid: !expired,
        publishReady: i.status === 'connected' && !expired,
        capabilities: i.capabilities ?? [],
      };
    });

    return rp.send(health);
  });

  // Disconnect
  app.post('/integrations/:provider/disconnect', async (rq: any, rp) => {
    const ws = rq.body?.workspaceId ?? WS;
    await mkt().from('workspace_integrations')
      .update({ status: 'disconnected', access_token: null, refresh_token: null })
      .eq('workspace_id', ws).eq('provider', rq.params.provider);
    return rp.send({ ok: true });
  });
}
