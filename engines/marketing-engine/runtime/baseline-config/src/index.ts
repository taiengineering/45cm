// Baseline Configuration Runtime — Generate initial operational strategy from analysis

export interface BaselineConfig {
  recommendedCadence: Record<string,string>;
  contentMix: {trust:number,authority:number,lifestyle:number,event:number,cta:number};
  ctaRecommendation: {maxIntensity:'soft'|'advisory'|'moderate', maxPerWeek:number};
  recoveryNotes: string[];
}

export function generateBaseline(channels: {channel:string,presenceStatus:string,fatigueRisk:number,weeklyCadence:number}[], intake: {goals:string[],weeklyCapacity:number,ctaMaxIntensity:number}): BaselineConfig {
  const cadence: Record<string,string> = {};
  const recovery: string[] = [];
  const cap = intake.weeklyCapacity;
  for(const ch of channels) {
    if(ch.presenceStatus==='dormant') { cadence[ch.channel]='주 1회 (재시작)'; recovery.push(`${ch.channel}: 휴면 상태. 주 1회부터 천천히 시작하세요.`); }
    else if(ch.presenceStatus==='fatigued') { cadence[ch.channel]='주 1회 (회복)'; recovery.push(`${ch.channel}: 피로 상태. ${Math.ceil(ch.fatigueRisk/20)}일 cooldown 후 재개하세요.`); }
    else if(ch.presenceStatus==='overloaded') { cadence[ch.channel]='주 2회 (감소)'; recovery.push(`${ch.channel}: 과운영 상태. 빈도를 줄이세요.`); }
    else cadence[ch.channel] = cap>=10?'주 3-4회':cap>=5?'주 2-3회':'주 1-2회';
  }
  const hasTrust = intake.goals.includes('trust')||intake.goals.includes('authority');
  return {
    recommendedCadence: cadence,
    contentMix: { trust:hasTrust?35:25, authority:hasTrust?25:20, lifestyle:15, event:15, cta:hasTrust?10:25 },
    ctaRecommendation: { maxIntensity:intake.ctaMaxIntensity<=2?'soft':intake.ctaMaxIntensity<=3?'advisory':'moderate', maxPerWeek:Math.min(intake.ctaMaxIntensity, 3) },
    recoveryNotes: recovery,
  };
}
