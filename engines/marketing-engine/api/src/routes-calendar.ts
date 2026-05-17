// Calendar + Engagement + Score API routes
// Injected into main server.ts via import

import type { FastifyInstance } from 'fastify';

export async function registerCalendarRoutes(app: FastifyInstance, mkt: () => any) {
  const WS = 'a0000000-0000-0000-0000-000000000001';

  // ====== Calendar / Scheduled Publishes ======
  app.get('/calendar', async (rq: any, rp) => {
    const ws = rq.query.ws ?? WS;
    const { data } = await mkt().from('scheduled_publishes').select('*, drafts(id, draft_type, status, body, humanized_body)').eq('workspace_id', ws).order('scheduled_at', { ascending: true });
    return rp.send(data ?? []);
  });

  app.post('/calendar/schedule', async (rq: any, rp) => {
    const { workspaceId, draftId, channel, scheduledAt, campaign } = rq.body;
    if (!workspaceId || !draftId || !scheduledAt) return rp.status(400).send({ error: 'required' });
    const { data, error } = await mkt().from('scheduled_publishes').insert({
      workspace_id: workspaceId ?? WS, draft_id: draftId,
      channel: channel || 'linkedin', scheduled_at: scheduledAt,
      campaign, status: 'scheduled',
    }).select().single();
    if (error) return rp.status(500).send({ error: error.message });
    return rp.send(data);
  });

  app.delete('/calendar/:id', async (rq: any, rp) => {
    await mkt().from('scheduled_publishes').update({ status: 'cancelled' }).eq('id', rq.params.id);
    return rp.send({ ok: true });
  });

  // ====== Engagement ======
  app.get('/engagement', async (rq: any, rp) => {
    const ws = rq.query.ws ?? WS;
    const { data } = await mkt().from('engagements').select('*').eq('workspace_id', ws).order('tracked_at', { ascending: false }).limit(20);
    return rp.send(data ?? []);
  });

  // ====== Content Score ======
  app.get('/drafts/:id/score', async (rq: any, rp) => {
    const { data } = await mkt().from('content_scores').select('*').eq('draft_id', rq.params.id).single();
    return rp.send(data ?? { readability: 0, brand_consistency: 0, engagement_potential: 0, cta_strength: 0, overall: 0 });
  });

  // ====== Comment Drafts ======
  app.get('/comments', async (rq: any, rp) => {
    const ws = rq.query.ws ?? WS;
    const { data } = await mkt().from('comment_drafts').select('*').eq('workspace_id', ws).order('created_at', { ascending: false }).limit(20);
    return rp.send(data ?? []);
  });
}
