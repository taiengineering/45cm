// Channel Analysis Runtime — Analyze connected channel state

export type PresenceStatus = 'healthy'|'recovering'|'unstable'|'dormant'|'overloaded'|'fatigued';

export interface ChannelAnalysis {
  channel: string;
  // Activity
  lastPublishDaysAgo: number;
  weeklyCadence: number;
  monthlyCadence: number;
  isDormant: boolean;
  isBurst: boolean;
  // Brand
  visualConsistency: number;
  toneConsistency: number;
  ctaPressure: number;
  promotionRatio: number;
  trustRatio: number;
  // Operations
  operatorOverloadRisk: number;
  fatigueRisk: number;
  engagementDecay: number;
  channelHealth: number;
  // Presence
  presenceStatus: PresenceStatus;
  presenceScore: number;
}

export function analyzeChannel(data: {lastPublishDays:number,postsWeek:number,postsMonth:number,ctaCount:number,totalPosts:number,engagementTrend:number}): ChannelAnalysis {
  const isDormant = data.lastPublishDays > 30;
  const isBurst = data.postsWeek > 7;
  const ctaPressure = data.totalPosts>0 ? Math.round(data.ctaCount/data.totalPosts*100) : 0;
  const fatigueRisk = Math.min(100, isBurst?60:0 + ctaPressure*0.5 + Math.max(0,data.postsWeek-3)*10);
  const presenceScore = Math.max(0,Math.min(100, 100 - (isDormant?40:0) - fatigueRisk*0.3 - (isBurst?20:0) + data.engagementTrend*10));
  let presenceStatus: PresenceStatus = 'healthy';
  if(isDormant) presenceStatus='dormant';
  else if(fatigueRisk>60) presenceStatus='fatigued';
  else if(isBurst) presenceStatus='overloaded';
  else if(presenceScore<50) presenceStatus='unstable';
  else if(presenceScore<70) presenceStatus='recovering';
  return { channel:'', lastPublishDaysAgo:data.lastPublishDays, weeklyCadence:data.postsWeek, monthlyCadence:data.postsMonth, isDormant, isBurst, visualConsistency:70, toneConsistency:70, ctaPressure, promotionRatio:ctaPressure, trustRatio:100-ctaPressure, operatorOverloadRisk:isBurst?60:20, fatigueRisk:Math.round(fatigueRisk), engagementDecay:data.engagementTrend<0?Math.abs(data.engagementTrend)*20:0, channelHealth:Math.round(presenceScore), presenceStatus, presenceScore:Math.round(presenceScore) };
}

// Presence Score
export function calculatePresenceScore(cadence:number, consistency:number, freshnessDays:number, trustRatio:number, activity:number): number {
  const fresh = Math.max(0, 100 - freshnessDays*2);
  return Math.round(Math.min(100, cadence*0.2 + consistency*0.2 + fresh*0.2 + trustRatio*0.2 + activity*0.2));
}

// Operational Risk Score
export function calculateOperationalRisk(fatigue:number, burst:boolean, ctaPressure:number, eventOverload:boolean, approvalBypass:boolean): {score:number,level:'low'|'medium'|'high'} {
  const score = Math.min(100, fatigue*0.3 + (burst?20:0) + ctaPressure*0.2 + (eventOverload?20:0) + (approvalBypass?15:0));
  return {score:Math.round(score), level:score>60?'high':score>30?'medium':'low'};
}
