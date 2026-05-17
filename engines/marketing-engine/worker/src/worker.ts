import { createWorker, MARKETING_QUEUES } from '@45cm/core-queue-runtime';
import { aiGenerate, buildHumanizeSystemPrompt, getBrandVoice } from '@45cm/core-ai-runtime';
import { updateDraft, insertUsageLog, mkt } from '@45cm/core-db-runtime';

// Humanize Worker
const hw = createWorker(MARKETING_QUEUES.HUMANIZE, async (job) => {
  const d = job.data as any; const traceId=d.trace_id??'unknown';
  const brandVoice=getBrandVoice(d.brand_voice??'tai'); const systemPrompt=buildHumanizeSystemPrompt(brandVoice);
  console.log(JSON.stringify({level:'info',msg:'humanize.start',job_id:job.id,draft_id:d.draft_id,trace_id:traceId}));
  try {
    const ai=await aiGenerate({workspaceId:d.workspace_id,engine:'marketing',capability:'marketing.rewrite_humanize',input:d.body,context:{systemPrompt,trace_id:traceId}});
    await insertUsageLog({workspace_id:d.workspace_id,engine:'marketing',capability:'marketing.rewrite_humanize',provider:'openai',model:ai.model,prompt_tokens:ai.usage.promptTokens,completion_tokens:ai.usage.completionTokens,estimated_cost_usd:ai.usage.estimatedCostUsd,latency_ms:ai.latencyMs,status:'success',trace_id:traceId});
    await updateDraft(d.draft_id,{humanized_body:ai.output,status:'humanized'});
    console.log(JSON.stringify({level:'info',msg:'humanize.done',draft_id:d.draft_id,model:ai.model}));
  } catch(err:any) {
    console.error(JSON.stringify({level:'error',msg:'humanize.failed',draft_id:d.draft_id,error:err.message}));
    try{await updateDraft(d.draft_id,{status:err.status??'failed'});}catch(_){}
    return;
  }
});
hw.on('ready',()=>console.log(JSON.stringify({level:'info',msg:'humanize-worker.ready'})));
hw.on('error',e=>console.error(JSON.stringify({level:'error',msg:'worker.error',error:String(e)})));

// Import publish worker
import './publish-worker';

setInterval(()=>{},60000);
process.on('SIGTERM',async()=>{await hw.close();process.exit(0);});
console.log(JSON.stringify({level:'info',msg:'workers.started',queues:[MARKETING_QUEUES.HUMANIZE,MARKETING_QUEUES.PUBLISH]}));