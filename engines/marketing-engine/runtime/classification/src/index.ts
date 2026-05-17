import { aiGenerate } from '@45cm/core-ai-runtime';

export type Classification = { intent: string; confidence: number; tags: string[]; leadScore: 'high' | 'medium' | 'low'; };

export async function classifyContent(wsId: string, title: string, body: string): Promise<Classification> {
  const ai = await aiGenerate({
    workspaceId: wsId, engine: 'marketing', capability: 'marketing.classify_intent',
    input: `Title: ${title}\nBody: ${body}`,
    context: { systemPrompt: 'Classify this content. Return JSON only: {"intent":"question|complaint|info_request|consultation","confidence":0.0-1.0,"tags":[...],"leadScore":"high|medium|low"}. Respond ONLY with valid JSON.' },
  });
  try { return JSON.parse(ai.output); }
  catch { return { intent: 'unknown', confidence: 0, tags: [], leadScore: 'low' }; }
}

export async function scoreLeadFromContent(wsId: string, content: string): Promise<'high' | 'medium' | 'low'> {
  const c = await classifyContent(wsId, '', content);
  return c.leadScore;
}
