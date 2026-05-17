// Stabilization routes: Campaign CRUD + Visual Assets + Publish Mode
import type { FastifyInstance } from 'fastify';

export async function registerStabilizationRoutes(app: FastifyInstance, mkt: () => any, WS: string) {

  // ====== Campaign CRUD ======
  app.post('/campaigns', async (rq: any, rp) => {
    const { workspaceId, name, goal, channel, cta_id, brand_preset, publish_frequency } = rq.body;
    if (!name) return rp.status(400).send({ error: 'name required' });
    const { data, error } = await mkt().from('campaigns').insert({
      workspace_id: workspaceId ?? WS, name, goal, channel: channel || 'linkedin',
      cta_id: cta_id || '무료 법령진단', brand_preset: brand_preset || 'tai',
      publish_frequency: publish_frequency || 'weekly',
    }).select().single();
    if (error) return rp.status(500).send({ error: error.message });
    return rp.status(201).send(data);
  });

  app.get('/campaigns', async (rq: any, rp) => {
    const ws = rq.query.ws ?? WS;
    const { data } = await mkt().from('campaigns').select('*').eq('workspace_id', ws).order('created_at', { ascending: false });
    return rp.send(data ?? []);
  });

  app.get('/campaigns/:id', async (rq: any, rp) => {
    const { data, error } = await mkt().from('campaigns').select('*').eq('id', rq.params.id).single();
    if (error) return rp.status(404).send({ error: 'not found' });
    // Related drafts
    const { data: drafts } = await mkt().from('drafts').select('id,status,draft_type,created_at,humanized_body').eq('campaign_id', rq.params.id).order('created_at', { ascending: false });
    // Related visual assets
    const { data: visuals } = await mkt().from('visual_assets').select('*').eq('campaign_id', rq.params.id).order('created_at', { ascending: false });
    // Related scheduled publishes
    const { data: scheduled } = await mkt().from('scheduled_publishes').select('*').eq('draft_id', rq.params.id);
    return rp.send({ ...data, drafts: drafts ?? [], visuals: visuals ?? [], scheduled: scheduled ?? [] });
  });

  app.put('/campaigns/:id', async (rq: any, rp) => {
    const { ...updates } = rq.body;
    delete updates.id;
    const { data, error } = await mkt().from('campaigns').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', rq.params.id).select().single();
    if (error) return rp.status(500).send({ error: error.message });
    return rp.send(data);
  });

  app.delete('/campaigns/:id', async (rq: any, rp) => {
    await mkt().from('campaigns').update({ status: 'archived' }).eq('id', rq.params.id);
    return rp.send({ ok: true });
  });

  // ====== Visual Assets CRUD ======
  app.post('/drafts/:id/visual-assets', async (rq: any, rp) => {
    const draftId = rq.params.id;
    const { asset_type, template_id, brand_preset, channel, cta_level, title, subtitle, svg_data, campaign_id } = rq.body;
    if (!asset_type) return rp.status(400).send({ error: 'asset_type required' });
    const { data, error } = await mkt().from('visual_assets').insert({
      workspace_id: rq.body.workspaceId ?? WS, draft_id: draftId, campaign_id,
      asset_type, template_id, brand_preset, channel, cta_level, title, subtitle, svg_data,
    }).select().single();
    if (error) return rp.status(500).send({ error: error.message });
    return rp.status(201).send(data);
  });

  app.get('/drafts/:id/visual-assets', async (rq: any, rp) => {
    const { data } = await mkt().from('visual_assets').select('*').eq('draft_id', rq.params.id).order('created_at', { ascending: false });
    return rp.send(data ?? []);
  });

  app.delete('/visual-assets/:id', async (rq: any, rp) => {
    await mkt().from('visual_assets').delete().eq('id', rq.params.id);
    return rp.send({ ok: true });
  });

  // ====== Calendar routes ======
  app.get('/calendar', async (rq: any, rp) => {
    const ws = rq.query.ws ?? WS;
    const { data } = await mkt().from('scheduled_publishes').select('*').eq('workspace_id', ws).order('scheduled_at', { ascending: true });
    return rp.send(data ?? []);
  });

  app.post('/calendar/schedule', async (rq: any, rp) => {
    const { workspaceId, draftId, channel, scheduledAt, campaign } = rq.body;
    if (!draftId || !scheduledAt) return rp.status(400).send({ error: 'draftId and scheduledAt required' });
    const { data, error } = await mkt().from('scheduled_publishes').insert({
      workspace_id: workspaceId ?? WS, draft_id: draftId,
      channel: channel || 'linkedin', scheduled_at: scheduledAt, campaign,
    }).select().single();
    if (error) return rp.status(500).send({ error: error.message });
    return rp.send(data);
  });

  // ====== Engagement + Comments ======
  app.get('/engagement', async (rq: any, rp) => {
    const ws = rq.query.ws ?? WS;
    const { data } = await mkt().from('engagements').select('*').eq('workspace_id', ws).order('tracked_at', { ascending: false }).limit(20);
    return rp.send(data ?? []);
  });

  app.get('/comments', async (rq: any, rp) => {
    const ws = rq.query.ws ?? WS;
    const { data } = await mkt().from('comment_drafts').select('*').eq('workspace_id', ws).order('created_at', { ascending: false }).limit(20);
    return rp.send(data ?? []);
  });

  // ====== Content Score ======
  app.get('/drafts/:id/score', async (rq: any, rp) => {
    const { data } = await mkt().from('content_scores').select('*').eq('draft_id', rq.params.id).single();
    return rp.send(data ?? { readability: 0, brand_consistency: 0, engagement_potential: 0, cta_strength: 0, overall: 0 });
  });
}
