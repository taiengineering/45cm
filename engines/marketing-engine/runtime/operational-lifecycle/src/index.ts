// Operational Lifecycle Runtime — Connect→Analyze→Intake→Baseline→Regular→Event→Recovery

export type LifecycleStage = 'connect'|'analyze'|'intake'|'baseline'|'regular'|'event'|'recovery';

export const LIFECYCLE_STAGES: {id:LifecycleStage,name:string,nameKo:string,order:number}[] = [
  {id:'connect',name:'Connect',nameKo:'채널 연결',order:1},
  {id:'analyze',name:'Analyze',nameKo:'현황 분석',order:2},
  {id:'intake',name:'Operational Intake',nameKo:'운영 정보 수집',order:3},
  {id:'baseline',name:'Baseline Config',nameKo:'초기 전략 설정',order:4},
  {id:'regular',name:'Regular Operations',nameKo:'정기 운영',order:5},
  {id:'event',name:'Event Operations',nameKo:'이벤트 운영',order:6},
  {id:'recovery',name:'Recovery',nameKo:'회복/적응',order:7},
];

export function getNextStage(current: LifecycleStage): LifecycleStage|null {
  const idx = LIFECYCLE_STAGES.findIndex(s=>s.id===current);
  return idx<LIFECYCLE_STAGES.length-1 ? LIFECYCLE_STAGES[idx+1].id : null;
}

export function canAdvance(current: LifecycleStage, conditions: Record<string,boolean>): boolean {
  switch(current) {
    case 'connect': return !!conditions.hasConnectedChannel;
    case 'analyze': return !!conditions.analysisComplete;
    case 'intake': return !!conditions.intakeComplete;
    case 'baseline': return !!conditions.baselineSet;
    default: return true;
  }
}
