import { createClient } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';

function wf() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { db: { schema: 'workflow' } }); }

export type StepType = 'collect' | 'classify' | 'generate' | 'humanize' | 'approval' | 'publish' | 'notify' | 'wait' | 'condition';
export type TriggerType = 'manual' | 'schedule' | 'event' | 'webhook' | 'queue';
export type RunStatus = 'running' | 'completed' | 'failed' | 'cancelled' | 'waiting_approval';

export interface WorkflowStep { type: StepType; config: Record<string, unknown>; }
export interface Workflow { id: string; workspace_id: string; name: string; trigger_type: TriggerType; steps: WorkflowStep[]; status: string; template?: string; }
export interface WorkflowRun { id: string; workflow_id: string; workspace_id: string; status: RunStatus; current_step: number; trace_id: string; results: Record<string, unknown>; }

export async function listWorkflows(wsId: string) {
  const { data } = await wf().from('workflows').select('*').eq('workspace_id', wsId).order('created_at', { ascending: false });
  return data ?? [];
}

export async function getWorkflow(id: string) {
  const { data } = await wf().from('workflows').select('*').eq('id', id).single();
  return data;
}

export async function createWorkflow(ws: string, name: string, triggerType: TriggerType, steps: WorkflowStep[], template?: string) {
  const { data } = await wf().from('workflows').insert({ workspace_id: ws, name, trigger_type: triggerType, steps, template }).select().single();
  return data;
}

export async function startRun(workflowId: string, wsId: string, triggerData?: Record<string, unknown>): Promise<WorkflowRun | null> {
  const traceId = uuid();
  const { data } = await wf().from('workflow_runs').insert({ workflow_id: workflowId, workspace_id: wsId, trace_id: traceId, trigger_data: triggerData ?? {}, status: 'running' }).select().single();
  return data;
}

export async function updateRunStatus(runId: string, status: RunStatus, currentStep?: number, results?: Record<string, unknown>, error?: string) {
  const update: Record<string, unknown> = { status };
  if (currentStep !== undefined) update.current_step = currentStep;
  if (results) update.results = results;
  if (error) update.error = error;
  if (status === 'completed' || status === 'failed') update.completed_at = new Date().toISOString();
  await wf().from('workflow_runs').update(update).eq('id', runId);
}

export async function logStep(runId: string, stepIndex: number, stepType: string, status: string, input?: unknown, output?: unknown, durationMs?: number, error?: string) {
  await wf().from('workflow_logs').insert({ run_id: runId, step_index: stepIndex, step_type: stepType, status, input: input ?? {}, output: output ?? {}, duration_ms: durationMs, error });
}

export async function listRuns(wsId: string, limit = 20) {
  const { data } = await wf().from('workflow_runs').select('*, workflows(name, template)').eq('workspace_id', wsId).order('started_at', { ascending: false }).limit(limit);
  return data ?? [];
}

export async function getRun(id: string) {
  const { data } = await wf().from('workflow_runs').select('*').eq('id', id).single();
  return data;
}

export async function getRunLogs(runId: string) {
  const { data } = await wf().from('workflow_logs').select('*').eq('run_id', runId).order('step_index', { ascending: true });
  return data ?? [];
}
