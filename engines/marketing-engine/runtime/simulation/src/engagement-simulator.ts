import { CHANNEL_COEFFICIENTS } from './channel-coefficients';

export function simulateEngagement(channel: string, day: number, postsPerWeek: number, fatigueScore: number, ctaIntensity: number): number {
  const c = CHANNEL_COEFFICIENTS[channel] ?? CHANNEL_COEFFICIENTS.linkedin;
  const base = c.engagementBase;
  const decay = Math.max(0, 1 - c.engagementDecay * Math.max(0, postsPerWeek - 3));
  const fatiguePenalty = 1 - (fatigueScore / 100) * c.fatigueFactor * 3;
  const ctaPenalty = 1 - (ctaIntensity > 3 ? (ctaIntensity - 3) * c.ctaSensitivity * 0.1 : 0);
  const timeFactor = 1 + Math.sin(day * 0.1) * 0.1; // weekly rhythm
  const seo = 1 + c.seoBonus * Math.min(day / 30, 1) * 0.05;
  return Math.max(0.5, base * decay * fatiguePenalty * ctaPenalty * timeFactor * seo + (Math.random() - 0.5) * 0.8);
}
