// Operational Control Runtime — Auto/Assisted/Manual co-pilot

export type OperatingMode = 'auto'|'assisted'|'manual';
export type AutomationProfile = 'conservative'|'balanced'|'aggressive'|'human_first';
export type ControlStatus = 'draft'|'reviewing'|'approved'|'active'|'paused'|'recovery'|'emergency_manual';

export interface OperationalControl {
  globalMode: OperatingMode;
  cadence: OperatingMode;
  cta: OperatingMode;
  publish: OperatingMode;
  event: OperatingMode;
  recovery: OperatingMode;
  routing: OperatingMode;
  profile: AutomationProfile;
  status: ControlStatus;
}

export const DEFAULT_CONTROL: OperationalControl = {
  globalMode:'assisted', cadence:'auto', cta:'assisted', publish:'assisted',
  event:'manual', recovery:'auto', routing:'assisted', profile:'balanced', status:'active'
};

export const PROFILE_PRESETS: Record<AutomationProfile,Partial<OperationalControl>> = {
  conservative: {globalMode:'manual',cadence:'assisted',cta:'manual',publish:'manual',event:'manual',recovery:'assisted',routing:'manual'},
  balanced: {globalMode:'assisted',cadence:'auto',cta:'assisted',publish:'assisted',event:'manual',recovery:'auto',routing:'assisted'},
  aggressive: {globalMode:'auto',cadence:'auto',cta:'auto',publish:'auto',event:'assisted',recovery:'auto',routing:'auto'},
  human_first: {globalMode:'manual',cadence:'manual',cta:'manual',publish:'manual',event:'manual',recovery:'manual',routing:'manual'},
};

export function getEffectiveMode(control: OperationalControl, capability: string): OperatingMode {
  if(control.status==='emergency_manual') return 'manual';
  const cap = (control as any)[capability];
  return cap ?? control.globalMode;
}

// Confidence Engine
export type ConfidenceLevel = 'low'|'medium'|'high'|'critical_review_required';
export function calculateConfidence(stability:number, brandConsistency:number, surfaceFamiliarity:number, riskLevel:number, eventPressure:number, ctaIntensity:number): {score:number,level:ConfidenceLevel} {
  const score = Math.round(stability*0.2 + brandConsistency*0.2 + surfaceFamiliarity*0.15 + (100-riskLevel)*0.2 + (100-eventPressure)*0.1 + (100-ctaIntensity*20)*0.15);
  const s = Math.max(0,Math.min(100,score));
  return {score:s, level:s>75?'high':s>50?'medium':s>25?'low':'critical_review_required'};
}

// Approval Decision
export function needsApproval(mode:OperatingMode, riskLevel:string, ctaIntensity:number, isEvent:boolean): boolean {
  if(mode==='manual') return true;
  if(mode==='auto' && riskLevel==='low' && ctaIntensity<=2 && !isEvent) return false;
  return true; // assisted default
}

// Safety Override: auto→assisted fallback
export function shouldFallbackToAssisted(fatigue:number, policyViolation:boolean, brandInconsistency:boolean, trustDegradation:boolean): {fallback:boolean,reasons:string[]} {
  const reasons:string[]=[];
  if(fatigue>70) reasons.push(`피로도 급증(${fatigue}%)`);
  if(policyViolation) reasons.push('정책 위반 감지');
  if(brandInconsistency) reasons.push('브랜드 불일치');
  if(trustDegradation) reasons.push('신뢰도 하락');
  return {fallback:reasons.length>0,reasons};
}

// Explainability
export function explainDecision(channel:string, action:string, reason:string): string {
  return `${channel}: ${action}. ${reason}`;
}

// Intervention actions
export type InterventionAction = 'pause'|'override'|'rollback'|'approve'|'reject'|'reroute'|'cooldown';
export const INTERVENTION_ACTIONS: {id:InterventionAction,name:string,nameKo:string}[] = [
  {id:'pause',name:'Pause',nameKo:'일시중지'},{id:'override',name:'Override',nameKo:'재정의'},
  {id:'rollback',name:'Rollback',nameKo:'되돌리기'},{id:'approve',name:'Approve',nameKo:'승인'},
  {id:'reject',name:'Reject',nameKo:'거절'},{id:'reroute',name:'Reroute',nameKo:'재라우팅'},
  {id:'cooldown',name:'Cooldown',nameKo:'쉬어가기'},
];
