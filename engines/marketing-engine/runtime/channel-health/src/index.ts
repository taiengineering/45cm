// Channel Health Runtime — Analysis + Recommendation (NOT automation)
// Engine suggests. Human decides.

export type HealthStatus = 'healthy' | 'cooling' | 'fatigue' | 'declining';
export type RecType = 'suggestion' | 'warning' | 'insight' | 'opportunity';

export interface ChannelHealth {
  channel: string;
  score: number; // 0-100
  status: HealthStatus;
  engagementTrend: number; // % change
  publishDensity: number; // posts/week
  ctaConversion: number; // %
  fatigue: boolean;
  factors: { name: string; value: number; trend: 'up' | 'down' | 'stable' }[];
}

export interface Recommendation {
  id: string;
  type: RecType;
  channel?: string;
  title: string;
  description: string;
  confidence: number; // 0-100
  action?: string;
  createdAt: string;
}

export function calculateHealthScore(metrics: {
  engagementRate: number; // 0-10
  publishConsistency: number; // 0-10
  ctaConversion: number; // 0-10
  reactionVelocity: number; // 0-10
  negativeTrend: number; // 0-10 (lower = more negative)
}): { score: number; status: HealthStatus } {
  const score = Math.round(
    (metrics.engagementRate * 0.3 +
     metrics.publishConsistency * 0.2 +
     metrics.ctaConversion * 0.25 +
     metrics.reactionVelocity * 0.15 +
     metrics.negativeTrend * 0.1) * 10
  );
  const status: HealthStatus =
    score >= 75 ? 'healthy' :
    score >= 55 ? 'cooling' :
    score >= 35 ? 'fatigue' : 'declining';
  return { score, status };
}

export function detectFatigue(publishesPerWeek: number, engagementTrend: number): boolean {
  return publishesPerWeek > 5 && engagementTrend < -10;
}

export function generateRecommendations(channels: ChannelHealth[]): Recommendation[] {
  const recs: Recommendation[] = [];
  const now = new Date().toISOString();
  let id = 1;

  for (const ch of channels) {
    if (ch.fatigue) {
      recs.push({
        id: `rec-${id++}`, type: 'warning', channel: ch.channel,
        title: `${ch.channel} 콘텐츠 피로도 감지`,
        description: `최근 발행 빈도(${ch.publishDensity}회/주)가 높고 반응률이 ${ch.engagementTrend}% 변화했습니다. 발행 간격 조정을 검토해보세요.`,
        confidence: 72, action: '발행 간격 증가 검토', createdAt: now,
      });
    }
    if (ch.engagementTrend < -15) {
      recs.push({
        id: `rec-${id++}`, type: 'warning', channel: ch.channel,
        title: `${ch.channel} 반응률 하락`,
        description: `최근 2주간 engagement가 ${ch.engagementTrend}% 감소했습니다. 콘텐츠 주제나 톤 변경을 검토해보세요.`,
        confidence: 65, createdAt: now,
      });
    }
    if (ch.status === 'healthy' && ch.ctaConversion > 3) {
      recs.push({
        id: `rec-${id++}`, type: 'opportunity', channel: ch.channel,
        title: `${ch.channel} CTA 전환 우수`,
        description: `현재 CTA 전환율이 ${ch.ctaConversion}%로 양호합니다. 현재 전략 유지를 권장합니다.`,
        confidence: 85, createdAt: now,
      });
    }
    if (ch.publishDensity < 1) {
      recs.push({
        id: `rec-${id++}`, type: 'suggestion', channel: ch.channel,
        title: `${ch.channel} 발행 빈도 낮음`,
        description: `최근 1주간 발행이 ${ch.publishDensity}회입니다. 채널 활성화를 위해 주 2-3회 발행을 검토해보세요.`,
        confidence: 60, createdAt: now,
      });
    }
  }

  // General insights
  const avgScore = channels.reduce((s, c) => s + c.score, 0) / (channels.length || 1);
  if (avgScore > 70) {
    recs.push({
      id: `rec-${id++}`, type: 'insight',
      title: '전체 채널 상태 양호',
      description: `평균 채널 건강도가 ${Math.round(avgScore)}%로 양호합니다. 현재 운영 리듬을 유지하세요.`,
      confidence: 80, createdAt: now,
    });
  }

  return recs;
}
