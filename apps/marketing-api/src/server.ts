import Fastify from 'fastify';
import cors from '@fastify/cors';
import { v4 as uuid } from 'uuid';
import { enqueue, MARKETING_QUEUES, debugRedis, getQueue } from '@45cm/core-queue-runtime';
import { aiGenerate, debugOpenAI } from '@45cm/core-ai-runtime';
import { insertDraft, updateDraft, getDraftById, insertApprovalRequest, updateApprovalStatus, insertContent, insertAnalyticsEvent, insertLead, insertUsageLog, mkt, coreAi } from '@45cm/core-db-runtime';
import { collect } from '@45cm/channel-naver-kin';
import { checkUsageLimit, incrementUsage, getIntegration, saveIntegration, insertAuditLog, getWorkspacePlan, getWorkspaceUsage } from '@45cm/core-workspace-runtime';
import { getMonthlyUsage, getUsageHistory, getPlan, getInvoices } from '@45cm/core-billing-runtime';

const app = Fastify({ logger: true });
app.register(cors, { origin: true });

const WS = 'a0000000-0000-0000-0000-000000000001';

// ====== Health ======
app.get('/health', async () => ({ status:'healthy', engine:'marketing-engine', v:'0.4.0', ts:new Date().toISOString() }));
app.get('/debug/openai', async (_r, reply) => reply.send(await debugOpenAI()));
app.get('/debug/redis', async (_r, reply) => reply.send(await debugRedis()));

// ====== Drafts ======
app.get('/drafts', async (req: any, reply) => {
  const ws=req.query.ws??WS;
  let q=mkt().from('drafts').select('*').eq('workspace_id',ws).order('created_at',{ascending:false}).limit(parseInt(req.query.limit??'50',10));
  if(req.query.status) q=q.eq('status',req.query.status);
  const {data,error}=await q; if(error) return reply.status(500).send({error:error.message}); return reply.send(data??[]);
});

app.get('/drafts/:id', async (req: any, reply) => {
  const {data,error}=await mkt().from('drafts').select('*').eq('id',req.params.id).single();
  if(error) return reply.status(404).send({error:'Draft not found'});
  const {data:approvals}=await mkt().from('approval_requests').select('*').eq('draft_id',req.params.id).order('created_at',{ascending:false});
  const {data:publishes}=await mkt().from('publish_jobs').select('*').eq('draft_id',req.params.id).order('created_at',{ascending:false});
  let usage = null;
  if(data.ai_usage_log_id) { const r=await coreAi().from('ai_usage_log').select('*').eq('id',data.ai_usage_log_id).single(); usage=r.data; }
  return reply.send({...data, approvals: approvals??[], publishes: publishes??[], ai_usage: usage});
});

// ====== Analytics ======
app.get('/analytics/summary', async (req: any, reply) => {
  const ws=req.query.ws??WS;
  const [d,c,l,u,p]=await Promise.all([
    mkt().from('drafts').select('*',{count:'exact',head:true}).eq('workspace_id',ws),
    mkt().from('analytics_events').select('*',{count:'exact',head:true}).eq('workspace_id',ws).eq('event_type','cta.clicked'),
    mkt().from('leads').select('*',{count:'exact',head:true}).eq('workspace_id',ws),
    coreAi().from('ai_usage_log').select('estimated_cost_usd').eq('workspace_id',ws),
    mkt().from('publish_jobs').select('*',{count:'exact',head:true}).eq('workspace_id',ws).eq('status','published'),
  ]);
  const cost=(u.data??[]).reduce((s:number,r:any)=>s+(r.estimated_cost_usd??0),0);
  return reply.send({drafts:d.count??0,cta_clicks:c.count??0,leads:l.count??0,ai_cost_usd:Math.round(cost*1e6)/1e6,published:p.count??0});
});

app.get('/analytics/events', async (req: any, reply) => {
  const ws=req.query.ws??WS;
  const {data}=await mkt().from('analytics_events').select('*').eq('workspace_id',ws).order('created_at',{ascending:false}).limit(parseInt(req.query.limit??'20',10));
  return reply.send(data??[]);
});

// ====== Queues ======
app.get('/ops/queues', async (_r, reply) => {
  const names=[MARKETING_QUEUES.DRAFT,MARKETING_QUEUES.HUMANIZE,MARKETING_QUEUES.COLLECT,MARKETING_QUEUES.CLASSIFY,MARKETING_QUEUES.APPROVAL,MARKETING_QUEUES.PUBLISH];
  const result:Record<string,unknown>={};
  for(const n of names){try{const q=getQueue(n);const[w,a,c,f,d]=await Promise.all([q.getWaitingCount(),q.getActiveCount(),q.getCompletedCount(),q.getFailedCount(),q.getDelayedCount()]);result[n]={waiting:w,active:a,completed:c,failed:f,delayed:d};}catch(e:any){result[n]={error:e.message};}}
  return reply.send({ts:new Date().toISOString(),queues:result});
});

// ====== Workspace + Billing ======
app.get('/workspace/settings', async (req: any, reply) => {
  const ws=req.query.ws??WS;
  const {data}=await mkt().from('workspace_settings').select('*').eq('workspace_id',ws).single();
  return reply.send(data??{});
});

app.put('/workspace/settings', async (req: any, reply) => {
  const {workspaceId,...updates}=req.body; const ws=workspaceId??WS;
  const {data}=await mkt().from('workspace_settings').update({...updates,updated_at:new Date().toISOString()}).eq('workspace_id',ws).select().single();
  await insertAuditLog(ws,'settings.updated',undefined,'workspace_settings',ws,updates);
  return reply.send(data);
});

app.get('/workspace/plan', async (req: any, reply) => {
  const ws=req.query.ws??WS;
  const plan = await getPlan(ws);
  const usage = await getMonthlyUsage(ws);
  return reply.send({ plan: plan??{plan:'free'}, usage: usage??{} });
});

app.get('/workspace/usage/history', async (req: any, reply) => {
  const ws=req.query.ws??WS;
  return reply.send(await getUsageHistory(ws));
});

app.get('/workspace/invoices', async (req: any, reply) => {
  const ws=req.query.ws??WS;
  return reply.send(await getInvoices(ws));
});

app.get('/workspace/integrations', async (req: any, reply) => {
  const ws=req.query.ws??WS;
  const {data}=await mkt().from('workspace_integrations').select('id,workspace_id,provider,status,expires_at,created_at').eq('workspace_id',ws);
  return reply.send(data??[]);
});

// ====== LinkedIn OAuth ======
app.get('/oauth/linkedin/start', async (req: any, reply) => {
  const ws=req.query.ws??WS;
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  if(!clientId) return reply.status(500).send({error:'LINKEDIN_CLIENT_ID not configured'});
  const redirectUri = `https://api.45cm.com/oauth/linkedin/callback`;
  const state = Buffer.from(JSON.stringify({ws})).toString('base64url');
  const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=openid%20profile%20w_member_social`;
  return reply.send({url});
});

app.get('/oauth/linkedin/callback', async (req: any, reply) => {
  const {code,state}=req.query;
  if(!code) return reply.status(400).send({error:'Missing code'});
  const {ws} = JSON.parse(Buffer.from(state,'base64url').toString());
  const clientId=process.env.LINKEDIN_CLIENT_ID, clientSecret=process.env.LINKEDIN_CLIENT_SECRET;
  if(!clientId||!clientSecret) return reply.status(500).send({error:'LinkedIn not configured'});

  const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body: new URLSearchParams({grant_type:'authorization_code',code:code as string,redirect_uri:'https://api.45cm.com/oauth/linkedin/callback',client_id:clientId,client_secret:clientSecret}).toString()
  });
  const tokens = await tokenRes.json() as any;
  if(tokens.error) return reply.status(400).send({error:tokens.error_description||tokens.error});

  await saveIntegration(ws,'linkedin',{access_token:tokens.access_token,refresh_token:tokens.refresh_token,expires_at:new Date(Date.now()+tokens.expires_in*1000).toISOString()});
  await insertAuditLog(ws,'oauth.connected',undefined,'integration','linkedin');
  return reply.redirect(302,'https://app.45cm.com/settings?linkedin=connected');
});

// ====== Draft Generate (with Usage Guard) ======
app.post('/draft/generate', async (req: any, reply) => {
  const {workspaceId,input,contentId,brandVoice}=req.body;
  if(!workspaceId||!input) return reply.status(400).send({error:'workspaceId and input required'});

  // Usage Guard
  const limit = await checkUsageLimit(workspaceId, 'draft');
  if(!limit.allowed) return reply.status(429).send({error:'usage_limit_exceeded',reason:limit.reason});

  const traceId=uuid();
  let ai; try { ai=await aiGenerate({workspaceId,engine:'marketing',capability:'marketing.generate_draft',input,context:{trace_id:traceId}}); }
  catch(err:any){const s=err.status??'failed';try{const dr=await insertDraft({workspace_id:workspaceId,source_content_id:contentId,draft_type:'reply',body:'',status:s,metadata:{trace_id:traceId,error:err.message}});return reply.status(502).send({error:'OpenAI '+s,draft_id:dr.id,trace_id:traceId});}catch(_){return reply.status(502).send({error:'OpenAI '+s,trace_id:traceId});}}

  const log=await insertUsageLog({workspace_id:workspaceId,engine:'marketing',capability:'marketing.generate_draft',provider:'openai',model:ai.model,prompt_tokens:ai.usage.promptTokens,completion_tokens:ai.usage.completionTokens,estimated_cost_usd:ai.usage.estimatedCostUsd,latency_ms:ai.latencyMs,status:'success',trace_id:traceId});
  const draft=await insertDraft({workspace_id:workspaceId,source_content_id:contentId,draft_type:'reply',body:ai.output,ai_usage_log_id:log.id,metadata:{trace_id:traceId}});

  // Track usage
  await incrementUsage(workspaceId,'draft_count');
  await incrementUsage(workspaceId,'ai_tokens',ai.usage.promptTokens+ai.usage.completionTokens);
  await incrementUsage(workspaceId,'ai_cost_usd',ai.usage.estimatedCostUsd);

  let queued=false; try{await enqueue(MARKETING_QUEUES.HUMANIZE,'humanize',{workspace_id:workspaceId,draft_id:draft.id,body:ai.output,trace_id:traceId,brand_voice:brandVoice??'tai'});queued=true;}catch(e:any){console.error(JSON.stringify({level:'error',msg:'enqueue.failed',error:e.message}));}
  return reply.status(201).send({draft_id:draft.id,trace_id:traceId,model:ai.model,cost_usd:ai.usage.estimatedCostUsd,queued});
});

// ====== Collect ======
app.post('/collect', async (req: any, reply) => {
  const {workspaceId,keyword,maxResults}=req.body; if(!workspaceId||!keyword) return reply.status(400).send({error:'required'});
  const items=await collect({workspaceId,keyword,maxResults}); const saved=[];
  for(const i of items){saved.push(await insertContent({workspace_id:workspaceId,source:i.source,external_id:i.externalId,content_type:'question',title:i.title,body:i.body,url:i.url,raw_payload:i.rawPayload,collected_at:i.collectedAt}));}
  return reply.send({keyword,collected:saved.length,contents:saved});
});

// ====== Publish (with Usage Guard) ======
app.post('/publish', async (req: any, reply) => {
  const {workspaceId,draftId,channel}=req.body;
  if(!workspaceId||!draftId) return reply.status(400).send({error:'required'});

  const limit = await checkUsageLimit(workspaceId,'publish');
  if(!limit.allowed) return reply.status(429).send({error:'usage_limit_exceeded',reason:limit.reason});

  const draft=await getDraftById(draftId) as any;
  const content=draft.humanized_body||draft.body||'';
  const {data:job,error}=await mkt().from('publish_jobs').insert({workspace_id:workspaceId,draft_id:draftId,channel:channel||'linkedin',status:'pending',metadata:{trace_id:draft.metadata?.trace_id}}).select().single();
  if(error) return reply.status(500).send({error:error.message});
  try{await enqueue(MARKETING_QUEUES.PUBLISH,'publish',{workspace_id:workspaceId,draft_id:draftId,publish_job_id:job.id,channel:channel||'linkedin',content,trace_id:draft.metadata?.trace_id});}catch(e:any){return reply.status(500).send({error:'enqueue failed'});}
  await updateDraft(draftId,{status:'publishing'});
  await incrementUsage(workspaceId,'publish_count');
  await insertAuditLog(workspaceId,'draft.published',undefined,'draft',draftId);
  return reply.send({publish_job_id:job.id,status:'pending'});
});

// ====== Approval ======
app.post('/approval/request', async (req: any, reply) => {
  const {workspaceId,draftId,keyword,channel}=req.body; if(!workspaceId||!draftId) return reply.status(400).send({error:'required'});
  const draft=await getDraftById(draftId) as any; await updateDraft(draftId,{status:'pending_approval'});
  const approval=await insertApprovalRequest({workspace_id:workspaceId,draft_id:draftId});
  const body=draft.humanized_body??draft.body??''; const preview=body.length>500?body.slice(0,500)+'...':body;
  const slk=process.env.SLACK_BOT_TOKEN,ch=process.env.SLACK_CHANNEL_ID;
  if(slk&&ch){await fetch('https://slack.com/api/chat.postMessage',{method:'POST',headers:{Authorization:'Bearer '+slk,'Content-Type':'application/json'},body:JSON.stringify({channel:ch,text:'Draft approval',blocks:[{type:'header',text:{type:'plain_text',text:'\ud83d\udcdd Draft Approval'}},{type:'section',fields:[{type:'mrkdwn',text:'*Keyword:* '+(keyword??'N/A')},{type:'mrkdwn',text:'*Channel:* '+(channel??'naver_kin')}]},{type:'section',text:{type:'mrkdwn',text:'```'+preview+'```'}},{type:'actions',elements:[{type:'button',text:{type:'plain_text',text:'\u2705 Approve'},style:'primary',action_id:'approve',value:'approve:'+approval.id},{type:'button',text:{type:'plain_text',text:'\u274c Reject'},style:'danger',action_id:'reject',value:'reject:'+approval.id},{type:'button',text:{type:'plain_text',text:'\u270f\ufe0f Edit'},action_id:'edit',value:'edit:'+approval.id}]}]})});}
  await insertAuditLog(workspaceId,'approval.requested',undefined,'draft',draftId);
  return reply.send({approval_id:approval.id,status:'pending'});
});

app.post('/approval/callback', async (req: any, reply) => {
  const p=typeof req.body==='string'?JSON.parse(req.body):req.body?.payload?JSON.parse(req.body.payload):req.body;
  const a=p?.actions?.[0]; if(!a) return reply.status(400).send({error:'no action'});
  const [cmd,id]=(a.value??'').split(':'); if(!id) return reply.status(400).send({error:'bad value'});
  const m:Record<string,string>={approve:'approved',reject:'rejected',edit:'edit_requested'};
  await updateApprovalStatus(id,m[cmd]??'rejected',p?.user?.id); return reply.send({text:cmd+' done'});
});

// ====== CTA ======
app.get('/c/:ctaId', async (req: any, reply) => {
  const {ctaId}=req.params,ws=req.query.ws??'unknown';
  await insertAnalyticsEvent({workspace_id:ws,event_type:'cta.clicked',subject_type:'cta',subject_id:ctaId,metadata:{ref:req.query.ref,ip:req.ip,ua:req.headers['user-agent']}});
  if(req.query.ref) await insertLead({workspace_id:ws,source:'cta_click',source_ref_id:ctaId});
  await incrementUsage(ws,'cta_clicks').catch(()=>{});
  return reply.redirect(302,'https://taieng.co.kr/diagnosis?utm_source=45cm&utm_campaign='+ctaId);
});

// ====== Audit Log ======
app.get('/ops/audit', async (req: any, reply) => {
  const ws=req.query.ws??WS;
  const {data}=await mkt().from('audit_log').select('*').eq('workspace_id',ws).order('created_at',{ascending:false}).limit(50);
  return reply.send(data??[]);
});

const port=parseInt(process.env.PORT??'3100',10);
app.listen({port,host:'0.0.0.0'}).then(()=>console.log(JSON.stringify({level:'info',msg:'api.started',port,version:'0.4.0'})));