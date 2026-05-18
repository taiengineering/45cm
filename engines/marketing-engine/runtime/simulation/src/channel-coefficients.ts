export interface ChannelCoefficient {
  channel: string;
  engagementBase: number;
  engagementDecay: number;
  ctaSensitivity: number;
  fatigueFactor: number;
  recoveryRate: number;
  seoBonus: number;
  visualImpact: number;
}

export const CHANNEL_COEFFICIENTS: Record<string, ChannelCoefficient> = {
  linkedin: { channel:'linkedin', engagementBase:4.2, engagementDecay:0.08, ctaSensitivity:0.7, fatigueFactor:0.12, recoveryRate:0.3, seoBonus:0, visualImpact:0.5 },
  facebook: { channel:'facebook', engagementBase:5.5, engagementDecay:0.15, ctaSensitivity:0.4, fatigueFactor:0.18, recoveryRate:0.5, seoBonus:0, visualImpact:0.7 },
  naver_blog: { channel:'naver_blog', engagementBase:3.0, engagementDecay:0.03, ctaSensitivity:0.3, fatigueFactor:0.05, recoveryRate:0.2, seoBonus:2.0, visualImpact:0.3 },
  instagram: { channel:'instagram', engagementBase:6.0, engagementDecay:0.20, ctaSensitivity:0.3, fatigueFactor:0.22, recoveryRate:0.6, seoBonus:0, visualImpact:0.9 },
};
