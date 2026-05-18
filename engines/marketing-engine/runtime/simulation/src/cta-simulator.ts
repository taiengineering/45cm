import { CHANNEL_COEFFICIENTS } from './channel-coefficients';

export function simulateCTA(channel: string, ctaType: 'soft'|'advisory'|'hard', day: number, fatigueScore: number): { clicks: number; conversionRate: number; dropoff: number } {
  const c = CHANNEL_COEFFICIENTS[channel] ?? CHANNEL_COEFFICIENTS.linkedin;
  const baseRates: Record<string, {click:number,conv:number}> = { soft:{click:2.5,conv:1.2}, advisory:{click:3.5,conv:2.0}, hard:{click:5.0,conv:3.5} };
  const r = baseRates[ctaType] ?? baseRates.soft;
  const fatigueMult = Math.max(0.3, 1 - fatigueScore / 100 * c.ctaSensitivity);
  const dayDecay = Math.max(0.5, 1 - day * 0.005);
  const clicks = Math.max(0.5, r.click * fatigueMult * dayDecay + (Math.random()-0.5)*0.5);
  const conv = Math.max(0.1, r.conv * fatigueMult * dayDecay + (Math.random()-0.5)*0.3);
  const dropoff = Math.min(80, 100 - conv * 20 + fatigueScore * 0.3);
  return { clicks: Math.round(clicks*10)/10, conversionRate: Math.round(conv*10)/10, dropoff: Math.round(dropoff) };
}
