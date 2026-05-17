// Engagement Runtime — comment monitoring, reaction tracking
export const ENGAGEMENT_TYPES = ['like', 'comment', 'share', 'impression', 'click'] as const;

export interface EngagementMetrics {
  likes: number; comments: number; shares: number; impressions: number;
  engagementScore: number; // (likes + comments*3 + shares*5) / impressions * 100
}

export function calculateEngagementScore(metrics: { likes: number; comments: number; shares: number; impressions: number }): number {
  if (metrics.impressions === 0) return 0;
  return Math.round(((metrics.likes + metrics.comments * 3 + metrics.shares * 5) / metrics.impressions) * 10000) / 100;
}
