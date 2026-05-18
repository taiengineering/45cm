// Policy Engine Runtime — Enforce operational rules

export interface PolicyRule { id: string; type: 'publish'|'cta'|'channel'|'approval'|'fatigue'; channel?: string; condition: string; limit: number; period?: string; action: 'block'|'warn'|'require_approval'; }

export const DEFAULT_POLICIES: PolicyRule[] = [
  { id:'pub-daily-max', type:'publish', condition:'daily_count', limit:2, period:'day', action:'block' },
  { id:'pub-weekly-max', type:'publish', condition:'weekly_count', limit:10, period:'week', action:'warn' },
  { id:'cta-hard-weekly', type:'cta', condition:'hard_cta_weekly', limit:3, period:'week', action:'require_approval' },
  { id:'cta-consecutive', type:'cta', condition:'consecutive_hard_cta', limit:2, action:'block' },
  { id:'channel-cooldown-linkedin', type:'channel', channel:'linkedin', condition:'cooldown_hours', limit:6, action:'block' },
  { id:'channel-cooldown-facebook', type:'channel', channel:'facebook', condition:'cooldown_hours', limit:4, action:'block' },
  { id:'fatigue-threshold', type:'fatigue', condition:'fatigue_score', limit:70, action:'warn' },
  { id:'approval-high-cta', type:'approval', condition:'cta_intensity', limit:4, action:'require_approval' },
];

export interface PolicyCheckResult { allowed: boolean; violations: { ruleId: string; action: string; detail: string }[]; warnings: string[]; }

export function checkPolicies(context: { publishCountToday: number; publishCountWeek: number; hardCtaWeek: number; consecutiveHardCta: number; lastPublishHours: number; fatigueScore: number; ctaIntensity: number; channel: string; }, policies: PolicyRule[] = DEFAULT_POLICIES): PolicyCheckResult {
  const violations: PolicyCheckResult['violations'] = [];
  const warnings: string[] = [];

  for (const p of policies) {
    if (p.channel && p.channel !== context.channel) continue;
    let violated = false;
    switch (p.condition) {
      case 'daily_count': violated = context.publishCountToday >= p.limit; break;
      case 'weekly_count': violated = context.publishCountWeek >= p.limit; break;
      case 'hard_cta_weekly': violated = context.hardCtaWeek >= p.limit; break;
      case 'consecutive_hard_cta': violated = context.consecutiveHardCta >= p.limit; break;
      case 'cooldown_hours': violated = context.lastPublishHours < p.limit; break;
      case 'fatigue_score': violated = context.fatigueScore >= p.limit; break;
      case 'cta_intensity': violated = context.ctaIntensity >= p.limit; break;
    }
    if (violated) {
      if (p.action === 'warn') warnings.push(`${p.id}: ${p.condition} >= ${p.limit}`);
      else violations.push({ ruleId: p.id, action: p.action, detail: `${p.condition} >= ${p.limit}` });
    }
  }
  return { allowed: violations.filter(v => v.action === 'block').length === 0, violations, warnings };
}
