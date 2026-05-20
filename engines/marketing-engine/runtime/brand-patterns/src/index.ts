// Brand Pattern Runtime — Pattern-based generation with Controlled Variation
// Patterns are remembered; outputs are always fresh

export type PatternType = 'tone'|'structure'|'cta_style'|'scene_flow'|'authority_level'|'trust_ratio'|'caption_density'|'hook_style'|'pacing';
export type PatternStatus = 'experimental'|'active'|'stable'|'fatigued'|'deprecated'|'revivable';
export type VariationArea = 'hook'|'intro'|'caption'|'example'|'visual_emphasis'|'scene_ordering'|'cta_wording';

// Variation: what CAN change vs what CANNOT
export const VARIATION_ALLOWED: VariationArea[] = ['hook','intro','caption','example','visual_emphasis','scene_ordering','cta_wording'];
export const VARIATION_LOCKED: PatternType[] = ['tone','cta_style','authority_level','trust_ratio']; // brand identity = locked

// Brand Operational DSL
export interface BrandDSL {
  tone: { authority: 'low'|'medium'|'high'; humor: 'low'|'medium'|'high'; trust: 'low'|'medium'|'high' };
  cta: { intensity: 'soft'|'advisory'|'moderate'|'hard'; frequency: 'low'|'medium'|'high' };
  structure: string[]; // e.g. ['hook','insight','proof','CTA']
  shorts: { pacing: 'slow'|'medium'|'medium_fast'|'fast'; captionDensity: 'low'|'medium'|'high' };
}

export const DEFAULT_DSL: BrandDSL = {
  tone: { authority:'high', humor:'low', trust:'high' },
  cta: { intensity:'soft', frequency:'low' },
  structure: ['hook','insight','proof','CTA'],
  shorts: { pacing:'medium_fast', captionDensity:'medium' },
};

// Variation Safety: check if variation stays within brand bounds
export interface VariationCheck { safe:boolean; violations:string[]; }
export function checkVariationSafety(dsl:BrandDSL, variation:{toneDeviation?:number,ctaDeviation?:number,authorityShift?:number}): VariationCheck {
  const violations:string[]=[];
  if((variation.toneDeviation??0)>20) violations.push('톤 이탈 감지');
  if((variation.ctaDeviation??0)>15) violations.push('CTA 강도 이탈');
  if((variation.authorityShift??0)>25) violations.push('authority 급변');
  if(dsl.cta.intensity==='soft'&&(variation.ctaDeviation??0)>10) violations.push('soft CTA 브랜드에서 CTA 과다');
  return {safe:violations.length===0,violations};
}

// Pattern Validator: is output within pattern range?
export function validatePattern(output:{authority:number,trust:number,cta:number,density:number,energy:number,humor:number}, pattern:{authorityRange:[number,number],trustRange:[number,number],ctaRange:[number,number]}): {valid:boolean,deviations:string[]} {
  const dev:string[]=[];
  if(output.authority<pattern.authorityRange[0]||output.authority>pattern.authorityRange[1]) dev.push(`authority ${output.authority} 범위 밖`);
  if(output.trust<pattern.trustRange[0]||output.trust>pattern.trustRange[1]) dev.push(`trust ${output.trust} 범위 밖`);
  if(output.cta<pattern.ctaRange[0]||output.cta>pattern.ctaRange[1]) dev.push(`CTA ${output.cta} 범위 밖`);
  return {valid:dev.length===0,deviations:dev};
}

// Adaptive Variation: adjust variation level based on fatigue
export function adaptVariation(fatigue:number, trustDecline:boolean): {hookVariation:'low'|'medium'|'high',ctaVariation:'low'|'medium'|'high'} {
  return {
    hookVariation: fatigue>50?'high':fatigue>25?'medium':'low',
    ctaVariation: trustDecline?'low':'medium',
  };
}

// Pattern Lifecycle
export function transitionPattern(current:PatternStatus, performanceScore:number, daysSinceCreation:number, fatigueScore:number): PatternStatus {
  if(current==='deprecated') return fatigueScore<15&&daysSinceCreation>90?'revivable':'deprecated';
  if(fatigueScore>70) return 'fatigued';
  if(current==='experimental'&&performanceScore>60&&daysSinceCreation>7) return 'active';
  if(current==='active'&&performanceScore>75&&daysSinceCreation>30) return 'stable';
  if(current==='fatigued'&&fatigueScore<20) return 'revivable';
  return current;
}

// Hook Rotation: prevent same hook repetition
export function shouldRotateHook(useCount:number, lastUsedDaysAgo:number, cooldownDays:number=3): {rotate:boolean,reason?:string} {
  if(useCount>3&&lastUsedDaysAgo<cooldownDays) return {rotate:true,reason:`${cooldownDays}일 cooldown 필요`};
  if(useCount>8) return {rotate:true,reason:'사용 횟수 초과, 새 Hook 필요'};
  return {rotate:false};
}

// Surface-specific patterns
export const SURFACE_PATTERNS:Record<string,{style:string,emphasis:string}> = {
  short_discovery:{style:'fast hook + short CTA',emphasis:'discovery'},
  trust_blog:{style:'trust-heavy',emphasis:'authority + SEO'},
  authority_feed:{style:'authority-first',emphasis:'professional'},
  social_feed:{style:'visual-presence',emphasis:'engagement'},
  community_trust:{style:'conversational',emphasis:'trust'},
  messaging_direct:{style:'concise + direct',emphasis:'action'},
};

// Pattern Diff: compare pattern changes
export function diffPatterns(before:{authority:number,trust:number,cta:number}, after:{authority:number,trust:number,cta:number}): {changes:{metric:string,before:number,after:number,delta:number}[]} {
  return {changes:[
    {metric:'authority',before:before.authority,after:after.authority,delta:after.authority-before.authority},
    {metric:'trust',before:before.trust,after:after.trust,delta:after.trust-before.trust},
    {metric:'cta',before:before.cta,after:after.cta,delta:after.cta-before.cta},
  ]};
}

// Pattern Explainability
export function explainVariation(area:VariationArea, reason:string): string {
  const reasons:Record<string,string> = {
    fatigue:'반복 피로를 줄이기 위해',
    trust_recovery:'신뢰 회복을 위해',
    freshness:'신선도 유지를 위해',
    performance:'성과 개선을 위해',
  };
  return `${area} variation을 조정했습니다. ${reasons[reason]??reason}`;
}

// Pattern Recommendation
export function generatePatternRecommendations(patterns:{type:string,status:PatternStatus,performanceScore:number}[]): {text:string,severity:'info'|'warning'|'action'}[] {
  const recs:{text:string,severity:'info'|'warning'|'action'}[]=[];
  const fatigued = patterns.filter(p=>p.status==='fatigued');
  const lowPerf = patterns.filter(p=>p.performanceScore<40&&p.status==='active');
  if(fatigued.length>0) recs.push({text:`${fatigued.map(p=>p.type).join(', ')} 패턴이 피로 상태입니다. variation을 높이거나 새 패턴을 실험하세요.`,severity:'warning'});
  if(lowPerf.length>0) recs.push({text:`${lowPerf.map(p=>p.type).join(', ')} 패턴 성과가 낮습니다. 조정이 필요합니다.`,severity:'action'});
  if(fatigued.length===0&&lowPerf.length===0) recs.push({text:'브랜드 패턴이 안정적입니다. 현재 운영을 유지하세요.',severity:'info'});
  return recs;
}
