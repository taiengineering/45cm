export interface MockCampaign {
  name: string; channel: string; postsPerWeek: number; ctaType: 'soft'|'advisory'|'hard'; ctaIntensity: number; durationDays: number; brandPreset: string;
}

const TEMPLATES: MockCampaign[] = [
  { name:'중대재해 주간 콘텐츠', channel:'linkedin', postsPerWeek:3, ctaType:'soft', ctaIntensity:3, durationDays:30, brandPreset:'tai' },
  { name:'안전관리자 FAQ', channel:'naver_blog', postsPerWeek:2, ctaType:'advisory', ctaIntensity:2, durationDays:60, brandPreset:'tai' },
  { name:'무료진단 CTA 캔페인', channel:'linkedin', postsPerWeek:5, ctaType:'hard', ctaIntensity:5, durationDays:14, brandPreset:'tai' },
  { name:'Facebook 인사이트', channel:'facebook', postsPerWeek:1, ctaType:'soft', ctaIntensity:1, durationDays:30, brandPreset:'tai' },
];

export function generateMockCampaign(index?: number): MockCampaign {
  return TEMPLATES[index ?? Math.floor(Math.random() * TEMPLATES.length)];
}

export function listCampaignTemplates(): MockCampaign[] { return [...TEMPLATES]; }
