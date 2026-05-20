// Platform Restriction Runtime — Channel-specific constraints

export interface PlatformRestriction {
  channel: string;
  maxPublishesPerDay: number;
  maxPublishesPerHour: number;
  cooldownMinutes: number;
  requiresAppReview: boolean;
  requiresBusinessVerification: boolean;
  automationSensitivity: 'low' | 'medium' | 'high';
  quotaPerDay?: number;
  templateReviewRequired: boolean;
  dealerRequired: boolean;
}

export const PLATFORM_RESTRICTIONS: Record<string, PlatformRestriction> = {
  linkedin: { channel:'linkedin', maxPublishesPerDay:10, maxPublishesPerHour:3, cooldownMinutes:360, requiresAppReview:false, requiresBusinessVerification:false, automationSensitivity:'low', quotaPerDay:100, templateReviewRequired:false, dealerRequired:false },
  facebook: { channel:'facebook', maxPublishesPerDay:25, maxPublishesPerHour:5, cooldownMinutes:240, requiresAppReview:true, requiresBusinessVerification:true, automationSensitivity:'medium', quotaPerDay:200, templateReviewRequired:false, dealerRequired:false },
  instagram: { channel:'instagram', maxPublishesPerDay:25, maxPublishesPerHour:5, cooldownMinutes:240, requiresAppReview:true, requiresBusinessVerification:true, automationSensitivity:'high', quotaPerDay:200, templateReviewRequired:false, dealerRequired:false },
  naver_blog: { channel:'naver_blog', maxPublishesPerDay:3, maxPublishesPerHour:1, cooldownMinutes:1440, requiresAppReview:false, requiresBusinessVerification:false, automationSensitivity:'medium', templateReviewRequired:false, dealerRequired:false },
  kakao_channel: { channel:'kakao_channel', maxPublishesPerDay:5, maxPublishesPerHour:2, cooldownMinutes:1440, requiresAppReview:false, requiresBusinessVerification:true, automationSensitivity:'high', templateReviewRequired:true, dealerRequired:true },
  youtube: { channel:'youtube', maxPublishesPerDay:6, maxPublishesPerHour:2, cooldownMinutes:2880, requiresAppReview:true, requiresBusinessVerification:false, automationSensitivity:'low', quotaPerDay:10000, templateReviewRequired:false, dealerRequired:false },
  threads: { channel:'threads', maxPublishesPerDay:25, maxPublishesPerHour:10, cooldownMinutes:120, requiresAppReview:true, requiresBusinessVerification:false, automationSensitivity:'low', templateReviewRequired:false, dealerRequired:false },
  tiktok: { channel:'tiktok', maxPublishesPerDay:10, maxPublishesPerHour:3, cooldownMinutes:120, requiresAppReview:true, requiresBusinessVerification:false, automationSensitivity:'high', templateReviewRequired:false, dealerRequired:false },
};

export type AutomationLevel = 'full_automation' | 'assisted' | 'manual_required' | 'blocked';

export const AUTOMATION_LEVELS: Record<string, AutomationLevel> = {
  linkedin: 'full_automation',
  facebook: 'full_automation',
  instagram: 'full_automation',
  youtube: 'full_automation',
  threads: 'full_automation',
  naver_blog: 'assisted',
  kakao_channel: 'assisted',
  tistory: 'manual_required',
  brunch: 'manual_required',
  naver_cafe: 'manual_required',
  email: 'assisted',
  sms: 'blocked',
  alimtalk: 'assisted',
  naver_place: 'manual_required',
  google_business: 'full_automation',
};

export function getRestriction(channel: string): PlatformRestriction | undefined {
  return PLATFORM_RESTRICTIONS[channel];
}

export function getAutomationLevel(channel: string): AutomationLevel {
  return AUTOMATION_LEVELS[channel] ?? 'manual_required';
}

export function canFullAutomate(channel: string): boolean {
  return AUTOMATION_LEVELS[channel] === 'full_automation';
}

// Publish Risk Score
export function calculatePublishRisk(channel: string, ctaIntensity: number, publishFrequency: number): { score: number; level: 'low'|'medium'|'high' } {
  const r = PLATFORM_RESTRICTIONS[channel];
  if (!r) return { score: 50, level: 'medium' };
  const automationRisk = r.automationSensitivity === 'high' ? 30 : r.automationSensitivity === 'medium' ? 15 : 5;
  const ctaRisk = ctaIntensity > 3 ? 20 : ctaIntensity > 1 ? 10 : 0;
  const freqRisk = publishFrequency > r.maxPublishesPerDay * 0.7 ? 25 : publishFrequency > r.maxPublishesPerDay * 0.4 ? 10 : 0;
  const score = Math.min(100, automationRisk + ctaRisk + freqRisk);
  return { score, level: score > 60 ? 'high' : score > 30 ? 'medium' : 'low' };
}
