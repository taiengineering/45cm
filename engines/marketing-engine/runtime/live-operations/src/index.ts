// Live Operations Runtime — Real operational data observation + validation

export interface OperatorFatigue {
  approvalCountToday: number;
  alertCountToday: number;
  decisionCountToday: number;
  interruptionCountToday: number;
  fatigueScore: number;
}

export function calculateOperatorFatigue(approvals:number, alerts:number, decisions:number, interruptions:number): OperatorFatigue {
  const score = Math.min(100, approvals*8 + alerts*5 + decisions*6 + interruptions*10);
  return { approvalCountToday:approvals, alertCountToday:alerts, decisionCountToday:decisions, interruptionCountToday:interruptions, fatigueScore:Math.round(score) };
}

export function isOperatorOverloaded(fatigue: OperatorFatigue): {overloaded:boolean,reasons:string[]} {
  const reasons:string[]=[];
  if(fatigue.approvalCountToday>5) reasons.push(`승인 ${fatigue.approvalCountToday}건 — 승인 피로`);
  if(fatigue.alertCountToday>8) reasons.push(`알림 ${fatigue.alertCountToday}건 — 알림 과다`);
  if(fatigue.interruptionCountToday>3) reasons.push(`중단 ${fatigue.interruptionCountToday}회 — 집중 불가`);
  if(fatigue.fatigueScore>70) reasons.push(`전체 피로도 ${fatigue.fatigueScore}%`);
  return {overloaded:reasons.length>0,reasons};
}

// Feed Compression: show only what matters
export function compressFeed(items:{priority:string,type:string,title:string}[], maxItems:number=5): typeof items {
  // Deduplicate similar items
  const seen = new Set<string>();
  const deduped = items.filter(i => { const key=i.type+i.title.slice(0,20); if(seen.has(key)) return false; seen.add(key); return true; });
  // Priority filter
  const order:Record<string,number> = {critical:0,important:1,recommended:2,informational:3};
  return deduped.sort((a,b)=>(order[a.priority]??3)-(order[b.priority]??3)).slice(0, maxItems);
}

// Focus Mode: only critical + important
export function focusMode(items:{priority:string}[]): typeof items {
  return items.filter(i=>i.priority==='critical'||i.priority==='important');
}

// Queue Stress: detect approval overload
export function detectQueueStress(pendingCount:number, avgResponseHours:number, abandonedCount:number): {stressed:boolean,level:'normal'|'busy'|'overloaded',reasons:string[]} {
  const reasons:string[]=[];
  if(pendingCount>5) reasons.push(`대기 ${pendingCount}건`);
  if(avgResponseHours>4) reasons.push(`평균 응답 ${avgResponseHours}시간`);
  if(abandonedCount>0) reasons.push(`방치 ${abandonedCount}건`);
  const level = reasons.length>=2?'overloaded':reasons.length===1?'busy':'normal';
  return {stressed:level!=='normal',level,reasons};
}

// Workspace Warmth: make it feel inviting
export function getWarmGreeting(operatorName?:string, status?:string): string {
  const name = operatorName??'운영자';
  const time = new Date().getHours();
  const greeting = time<12?'좋은 아침입니다':time<18?'오후도 파이팅':'수고하셨습니다';
  if(status==='stable') return `${greeting}, ${name}님. 오늘 운영은 안정적입니다. ☕`;
  if(status==='busy') return `${greeting}, ${name}님. 오늘 확인할 것이 몇 가지 있습니다.`;
  return `${greeting}, ${name}님.`;
}

// Daily Rhythm: optimal operator flow
export interface DailyRhythm { morning:string[]; afternoon:string[]; evening:string[]; }
export function suggestDailyRhythm(): DailyRhythm {
  return {
    morning: ['Feed 확인 + 승인 처리', 'Surface 상태 확인', '오늘 콘텐츠 준비'],
    afternoon: ['Studio에서 콘텐츠 제작', '채널별 발행 확인', 'CTA 성과 확인'],
    evening: ['내일 예약 확인', '이벤트 대응 점검', '운영 리포트 확인'],
  };
}

// Recommendation Feedback
export type FeedbackType = 'useful'|'ignored'|'rejected'|'wrong'|'excellent';

// Human Trust Score (from operator behavior)
export function calculateHumanTrust(followed:number, modified:number, rejected:number, ignored:number): {trustScore:number,level:'high'|'medium'|'low'} {
  const total = followed+modified+rejected+ignored;
  if(total===0) return {trustScore:50,level:'medium'};
  const score = Math.round((followed*100 + modified*60 + rejected*10 + ignored*20) / total);
  return {trustScore:score, level:score>70?'high':score>40?'medium':'low'};
}
