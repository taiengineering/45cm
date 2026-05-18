export interface AudienceState { engagementInterest:number; ctaResistance:number; brandFamiliarity:number; contentFatigue:number; trustScore:number; }

export class AudienceBehavior {
  update(a:AudienceState, contentQuality:number, ctaIntensity:number, daysSinceStart:number): AudienceState {
    const ei = Math.max(10, Math.min(100, a.engagementInterest + contentQuality*0.5 - a.contentFatigue*0.1 + (Math.random()-0.5)*3));
    const cr = Math.min(90, a.ctaResistance + ctaIntensity*1.5 - (100-a.contentFatigue)*0.05);
    const bf = Math.min(100, a.brandFamiliarity + 0.3 + contentQuality*0.1);
    const cf = Math.max(0, Math.min(100, a.contentFatigue + 1.5 - (100-a.contentFatigue)*0.02));
    const ts = Math.max(10, Math.min(100, a.trustScore + contentQuality*0.2 - ctaIntensity*0.8 + (bf>50?0.5:0)));
    return {engagementInterest:Math.round(ei), ctaResistance:Math.round(cr), brandFamiliarity:Math.round(bf), contentFatigue:Math.round(cf), trustScore:Math.round(ts)};
  }
  static defaults(): AudienceState { return {engagementInterest:60,ctaResistance:20,brandFamiliarity:10,contentFatigue:5,trustScore:50}; }
}
