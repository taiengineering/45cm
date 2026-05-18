import { CHANNEL_COEFFICIENTS } from './channel-coefficients';

export function simulateFatigue(channel: string, postsPerWeek: number, ctaRepetition: number, daysSinceStart: number, currentFatigue: number): { fatigueScore: number; cooldownRecommended: boolean; engagementDecline: number } {
  const c = CHANNEL_COEFFICIENTS[channel] ?? CHANNEL_COEFFICIENTS.linkedin;
  const densityPressure = Math.max(0, (postsPerWeek - 2) * c.fatigueFactor * 8);
  const ctaPressure = ctaRepetition * c.ctaSensitivity * 3;
  const timePressure = Math.min(20, daysSinceStart * 0.3);
  const recovery = currentFatigue * c.recoveryRate * 0.05;
  const raw = currentFatigue + densityPressure + ctaPressure + timePressure - recovery + (Math.random()-0.5)*5;
  const fatigueScore = Math.max(0, Math.min(100, Math.round(raw)));
  const cooldownRecommended = fatigueScore > 60;
  const engagementDecline = Math.round(-fatigueScore * c.engagementDecay * 3);
  return { fatigueScore, cooldownRecommended, engagementDecline };
}
