// Channel Runtime Policies — Per-channel operational rules

export type CadenceLevel = 'very_low' | 'low' | 'medium' | 'medium_high' | 'high' | 'very_high';
export type ToleranceLevel = 'very_low' | 'low' | 'medium' | 'high';
export type WeightLevel = 'very_low' | 'low' | 'medium' | 'high' | 'very_high';

export interface ChannelPolicy {
  channel: string;
  cadence: CadenceLevel;
  cooldownHours: number;
  ctaTolerance: ToleranceLevel;
  fatigueWeight: WeightLevel;
  approvalRequired: boolean;
  trustSensitivity: ToleranceLevel;
  visualRequired: boolean;
  frequencyCap?: string;
}

export const CHANNEL_POLICIES: Record<string, ChannelPolicy> = {
  // SNS
  instagram:      { channel:'instagram', cadence:'medium_high', cooldownHours:4, ctaTolerance:'low', fatigueWeight:'high', approvalRequired:false, trustSensitivity:'medium', visualRequired:true },
  facebook:       { channel:'facebook', cadence:'medium', cooldownHours:4, ctaTolerance:'medium', fatigueWeight:'medium', approvalRequired:false, trustSensitivity:'low', visualRequired:false },
  linkedin:       { channel:'linkedin', cadence:'medium', cooldownHours:6, ctaTolerance:'high', fatigueWeight:'medium', approvalRequired:true, trustSensitivity:'high', visualRequired:false },
  threads:        { channel:'threads', cadence:'medium_high', cooldownHours:2, ctaTolerance:'low', fatigueWeight:'medium', approvalRequired:false, trustSensitivity:'low', visualRequired:false },
  // Blog
  naver_blog:     { channel:'naver_blog', cadence:'low', cooldownHours:24, ctaTolerance:'medium', fatigueWeight:'low', approvalRequired:true, trustSensitivity:'high', visualRequired:false },
  tistory:        { channel:'tistory', cadence:'low', cooldownHours:24, ctaTolerance:'medium', fatigueWeight:'low', approvalRequired:false, trustSensitivity:'medium', visualRequired:false },
  brunch:         { channel:'brunch', cadence:'very_low', cooldownHours:48, ctaTolerance:'very_low', fatigueWeight:'very_low', approvalRequired:true, trustSensitivity:'high', visualRequired:false },
  // Short Video
  youtube_shorts: { channel:'youtube_shorts', cadence:'high', cooldownHours:2, ctaTolerance:'low', fatigueWeight:'very_high', approvalRequired:false, trustSensitivity:'low', visualRequired:true },
  instagram_reels:{ channel:'instagram_reels', cadence:'high', cooldownHours:2, ctaTolerance:'low', fatigueWeight:'very_high', approvalRequired:false, trustSensitivity:'low', visualRequired:true },
  tiktok:         { channel:'tiktok', cadence:'very_high', cooldownHours:1, ctaTolerance:'very_low', fatigueWeight:'very_high', approvalRequired:false, trustSensitivity:'low', visualRequired:true },
  // Video
  youtube:        { channel:'youtube', cadence:'low', cooldownHours:48, ctaTolerance:'medium', fatigueWeight:'medium', approvalRequired:true, trustSensitivity:'high', visualRequired:true },
  // Community
  naver_cafe:     { channel:'naver_cafe', cadence:'medium', cooldownHours:6, ctaTolerance:'high', fatigueWeight:'medium', approvalRequired:true, trustSensitivity:'high', visualRequired:false },
  // Messaging
  kakao_channel:  { channel:'kakao_channel', cadence:'low', cooldownHours:24, ctaTolerance:'medium', fatigueWeight:'very_high', approvalRequired:true, trustSensitivity:'high', visualRequired:false, frequencyCap:'strict' },
  email:          { channel:'email', cadence:'low', cooldownHours:168, ctaTolerance:'medium', fatigueWeight:'high', approvalRequired:true, trustSensitivity:'medium', visualRequired:false },
  sms:            { channel:'sms', cadence:'very_low', cooldownHours:168, ctaTolerance:'high', fatigueWeight:'very_high', approvalRequired:true, trustSensitivity:'very_low', visualRequired:false, frequencyCap:'strict' },
  alimtalk:       { channel:'alimtalk', cadence:'low', cooldownHours:24, ctaTolerance:'medium', fatigueWeight:'very_high', approvalRequired:true, trustSensitivity:'medium', visualRequired:false, frequencyCap:'strict' },
  // Search Presence
  naver_place:    { channel:'naver_place', cadence:'very_low', cooldownHours:720, ctaTolerance:'low', fatigueWeight:'very_low', approvalRequired:false, trustSensitivity:'low', visualRequired:false },
  google_business:{ channel:'google_business', cadence:'very_low', cooldownHours:720, ctaTolerance:'low', fatigueWeight:'very_low', approvalRequired:false, trustSensitivity:'low', visualRequired:false },
};

export function getChannelPolicy(channel: string): ChannelPolicy | undefined {
  return CHANNEL_POLICIES[channel];
}
