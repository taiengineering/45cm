import { createWorker, MARKETING_QUEUES } from '@45cm/core-queue-runtime';
import { getPublishAdapter } from '@45cm/core-publish-runtime';
import { updateDraft, insertAnalyticsEvent, mkt } from '@45cm/core-db-runtime';

const w = createWorker(MARKETING_QUEUES.PUBLISH, async (job) => {
  const d = job.data as any;
  console.log(JSON.stringify({level:'info',msg:'publish.start',job_id:job.id,draft_id:d.draft_id,channel:d.channel,trace_id:d.trace_id}));

  const adapter = getPublishAdapter(d.channel);
  if (!adapter) {
    console.error(JSON.stringify({level:'error',msg:'publish.no_adapter',channel:d.channel}));
    await mkt().from('publish_jobs').update({status:'failed',error:'No adapter for '+d.channel,updated_at:new Date().toISOString()}).eq('id',d.publish_job_id);
    await updateDraft(d.draft_id,{status:'failed'});
    return;
  }

  try {
    const result = await adapter.publish({workspaceId:d.workspace_id,draftId:d.draft_id,channel:d.channel,content:d.content,traceId:d.trace_id});
    if (result.success) {
      await mkt().from('publish_jobs').update({status:'published',external_post_id:result.externalPostId,published_at:result.publishedAt,updated_at:new Date().toISOString()}).eq('id',d.publish_job_id);
      await updateDraft(d.draft_id,{status:'published'});
      await insertAnalyticsEvent({workspace_id:d.workspace_id,event_type:'publish_success',subject_type:'draft',subject_id:d.draft_id,metadata:{channel:d.channel,external_post_id:result.externalPostId,trace_id:d.trace_id}});
      console.log(JSON.stringify({level:'info',msg:'publish.done',draft_id:d.draft_id,channel:d.channel}));
    } else {
      await mkt().from('publish_jobs').update({status:'failed',error:result.error,updated_at:new Date().toISOString()}).eq('id',d.publish_job_id);
      await updateDraft(d.draft_id,{status:'failed'});
      await insertAnalyticsEvent({workspace_id:d.workspace_id,event_type:'publish_failed',subject_type:'draft',subject_id:d.draft_id,metadata:{channel:d.channel,error:result.error,trace_id:d.trace_id}});
      console.error(JSON.stringify({level:'error',msg:'publish.failed',error:result.error}));
    }
  } catch(err:any) {
    console.error(JSON.stringify({level:'error',msg:'publish.error',error:err.message}));
    await mkt().from('publish_jobs').update({status:'failed',error:err.message}).eq('id',d.publish_job_id);
    return;
  }
});

w.on('ready',()=>console.log(JSON.stringify({level:'info',msg:'publish-worker.ready'})));
w.on('error',e=>console.error(JSON.stringify({level:'error',msg:'publish-worker.error',error:String(e)})));
console.log(JSON.stringify({level:'info',msg:'publish-worker.started'}));