// Operational Intelligence Memory Runtime — Adaptive learning from operations

// Operator Patterns
export interface OperatorPattern { type:string; value:string; count:number; }
export function detectOperatorPatterns(decisions:{type:string,item:string,action:string}[]): OperatorPattern[] {
  const counts = new Map<string,number>();
  for(const d of decisions) { const k=`${d.type}:${d.action}:${d.item}`; counts.set(k,(counts.get(k)??0)+1); }
  return Array.from(counts.entries()).filter(([,c])=>c>=2).map(([k,c])=>{ const [type,,item]=k.split(':'); return {type,value:item,count:c}; }).sort((a,b)=>b.count-a.count);
}

// Brand Memory
export interface BrandMemory { type:string; value:string; confidence:number; }
export function inferBrandPersonality(memories:BrandMemory[]): {personality:string,topTraits:string[]} {
  const traits = memories.filter(m=>m.confidence>60).map(m=>m.value);
  const hasTrust = traits.some(t=>t.includes('trust'));
  const hasAuthority = traits.some(t=>t.includes('authority'));
  const hasAggressive = traits.some(t=>t.includes('aggressive')||t.includes('hard'));
  const personality = hasAggressive?'aggressive':hasTrust?'trust_oriented':hasAuthority?'authority_driven':'balanced';
  return {personality, topTraits:traits.slice(0,5)};
}

// Trust Learning
export function calculateTrustTrend(actions:{action:string}[]): {score:number,trend:'improving'|'stable'|'declining'} {
  const weights:Record<string,number> = {accepted:100,modified:60,rejected:10,ignored:20};
  if(actions.length===0) return {score:50,trend:'stable'};
  const recent = actions.slice(-10);
  const older = actions.slice(-20,-10);
  const recentScore = recent.reduce((s,a)=>s+(weights[a.action]??50),0)/recent.length;
  const olderScore = older.length>0 ? older.reduce((s,a)=>s+(weights[a.action]??50),0)/older.length : recentScore;
  return {score:Math.round(recentScore), trend:recentScore>olderScore+10?'improving':recentScore<olderScore-10?'declining':'stable'};
}

// Recovery Intelligence
export function findBestRecovery(memories:{channel:string,strategy:string,effectiveness:number}[], channel:string): {strategy:string,confidence:number}|null {
  const channelMem = memories.filter(m=>m.channel===channel).sort((a,b)=>b.effectiveness-a.effectiveness);
  return channelMem[0] ? {strategy:channelMem[0].strategy,confidence:channelMem[0].effectiveness} : null;
}

// Cadence Memory
export function getOptimalCadence(memories:{channel:string,optimal_weekly:number,fatigue_threshold:number}[], channel:string): {weekly:number,fatigueThreshold:number}|null {
  const m = memories.find(m=>m.channel===channel);
  return m ? {weekly:m.optimal_weekly,fatigueThreshold:m.fatigue_threshold} : null;
}

// Surface Preference
export function getRankedSurfaces(memories:{channel:string,surface_type:string,effectiveness:number}[]): {surface:string,score:number}[] {
  return memories.sort((a,b)=>b.effectiveness-a.effectiveness).map(m=>({surface:m.surface_type??m.channel,score:m.effectiveness}));
}

// Memory Confidence
export type MemoryConfidence = 'low_memory'|'learning'|'stable'|'high_confidence';
export function assessMemoryConfidence(totalDecisions:number, daysActive:number): MemoryConfidence {
  if(totalDecisions<10||daysActive<7) return 'low_memory';
  if(totalDecisions<50||daysActive<30) return 'learning';
  if(totalDecisions<200||daysActive<90) return 'stable';
  return 'high_confidence';
}

// Recommendation Personalization
export function personalizeRecommendation(base:string, patterns:OperatorPattern[], brandMem:BrandMemory[]): string {
  const rejectsCTA = patterns.some(p=>p.type==='reject_tendency'&&p.value.includes('cta'));
  const trustFocused = brandMem.some(m=>m.type==='trust_focus'&&m.confidence>60);
  let msg = base;
  if(rejectsCTA) msg += ' (이 운영자는 강한 CTA를 선호하지 않습니다)';
  if(trustFocused) msg += ' (이 브랜드는 신뢰 중심 운영이 효과적입니다)';
  return msg;
}

// Brand Evolution
export type MaturityStage = 'early'|'growing'|'stable'|'mature';
export function assessBrandMaturity(daysActive:number, totalPublishes:number, channelCount:number): MaturityStage {
  if(daysActive<14||totalPublishes<10) return 'early';
  if(daysActive<60||totalPublishes<50) return 'growing';
  if(daysActive<180||channelCount<3) return 'stable';
  return 'mature';
}

// Adaptive Approval: reduce unnecessary approvals
export function shouldAutoApprove(patterns:OperatorPattern[], itemType:string, riskLevel:string): boolean {
  if(riskLevel==='high') return false;
  const alwaysApproves = patterns.find(p=>p.type==='approval_tendency'&&p.value===itemType&&p.count>=5);
  return !!alwaysApproves && riskLevel==='low';
}

// Adaptive Feed: personalize feed priority
export function adaptFeedPriority(patterns:OperatorPattern[]): Record<string,number> {
  const weights:Record<string,number> = {risk:1,approval:1,operational:1,recovery:1,event:1,insight:0.5};
  for(const p of patterns) {
    if(p.type==='preferred_surface'&&p.value==='risk') weights.risk=1.5;
    if(p.type==='ignored_recommendations') weights.insight=0.3;
  }
  return weights;
}
