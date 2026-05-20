// Operational Feed Runtime — Today Feed + Priority + Actions + Summary

export type FeedType = 'risk'|'approval'|'operational'|'recovery'|'event'|'insight'|'summary';
export type FeedPriority = 'critical'|'important'|'recommended'|'informational';

export interface FeedItem { type:FeedType; priority:FeedPriority; title:string; body:string; channel?:string; actionLabel?:string; actionUrl?:string; }

// Generate today's feed from operational state
export function generateTodayFeed(state:{channels:{ch:string,fatigue:number,presenceStatus:string,freshness:number}[],pendingApprovals:number,upcomingEvents:{title:string,daysUntil:number}[]}): FeedItem[] {
  const items:FeedItem[]=[];
  // Risk
  for(const c of state.channels){
    if(c.fatigue>60) items.push({type:'risk',priority:'important',title:`${c.ch} 피로도 증가`,body:`${c.ch} 피로도가 ${c.fatigue}%입니다. 오늘은 발행을 줄이는 것을 추천합니다.`,channel:c.ch,actionLabel:'오늘 쉬기',actionUrl:'/control'});
    if(c.presenceStatus==='dormant') items.push({type:'operational',priority:'recommended',title:`${c.ch} 휴면 상태`,body:`${c.ch}가 오래 업데이트되지 않았습니다.`,channel:c.ch,actionLabel:'Blog 추가',actionUrl:'/studio'});
    if(c.freshness<30) items.push({type:'recovery',priority:'recommended',title:`${c.ch} trust 회복 필요`,body:`${c.ch} trust 콘텐츠를 추가하세요.`,channel:c.ch,actionLabel:'Trust 콘텐츠',actionUrl:'/studio'});
  }
  // Approvals
  if(state.pendingApprovals>0) items.push({type:'approval',priority:'important',title:`승인 대기 ${state.pendingApprovals}건`,body:'CTA 또는 이벤트 콘텐츠 승인이 필요합니다.',actionLabel:'승인 확인',actionUrl:'/queue'});
  // Events
  for(const e of state.upcomingEvents){
    if(e.daysUntil<=3) items.push({type:'event',priority:e.daysUntil<=1?'critical':'important',title:`행사 ${e.daysUntil}일 남음: ${e.title}`,body:'Event cadence 준비가 필요합니다.',actionLabel:'이벤트 준비',actionUrl:'/events'});
  }
  // Sort by priority
  const order:Record<FeedPriority,number>={critical:0,important:1,recommended:2,informational:3};
  items.sort((a,b)=>order[a.priority]-order[b.priority]);
  return items;
}

// Operational Summary
export function generateDailySummary(channels:{ch:string,presenceStatus:string}[]): {status:string,warnings:string[],recommendations:string[]} {
  const healthy = channels.filter(c=>c.presenceStatus==='healthy').length;
  const total = channels.length;
  const status = healthy===total?'안정적':healthy>total*0.5?'대체로 양호':'주의 필요';
  const warnings = channels.filter(c=>['fatigued','overloaded'].includes(c.presenceStatus)).map(c=>`${c.ch}: ${c.presenceStatus==='fatigued'?'피로도 증가':'과부하'}`);
  const recs = channels.filter(c=>c.presenceStatus==='dormant').map(c=>`${c.ch}: trust 콘텐츠 추가 권장`);
  return {status,warnings,recommendations:recs};
}

// Runtime→Human Language
export const RUNTIME_TO_HUMAN:Record<string,string> = {
  fatigue:'너무 자주 올리고 있음',
  trust_decay:'광고 느낌이 강해지고 있음',
  surface_imbalance:'블로그가 방치되고 있음',
  overload:'운영량이 많아지고 있음',
  recovery:'쉬는 것이 좋음',
  dormant:'오래 업데이트 없음',
  cta_pressure:'CTA 비율이 너무 높음',
};
