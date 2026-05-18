export function generateMockLeads(ctaClicks: number, conversionRate: number, day: number): { count: number; quality: 'high'|'medium'|'low'; source: string }[] {
  const count = Math.max(0, Math.round(ctaClicks * conversionRate / 100 + (Math.random()-0.5)));
  return Array.from({ length: count }, (_, i) => ({
    count: 1,
    quality: conversionRate > 3 ? 'high' : conversionRate > 1.5 ? 'medium' : 'low',
    source: `sim-day-${day}-lead-${i}`,
  }));
}
