// Content Quality Scoring
export interface ContentScore {
  readability: number;  // 0-10
  brandConsistency: number;  // 0-10
  engagementPotential: number;  // 0-10
  ctaStrength: number;  // 0-10
  overall: number;  // average
}

export function calculateOverall(s: Omit<ContentScore, 'overall'>): ContentScore {
  const overall = Math.round(((s.readability + s.brandConsistency + s.engagementPotential + s.ctaStrength) / 4) * 10) / 10;
  return { ...s, overall };
}
