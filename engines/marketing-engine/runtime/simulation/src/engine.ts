import { simulateEngagement } from './engagement-simulator';
import { simulateCTA } from './cta-simulator';
import { simulateFatigue } from './fatigue-simulator';
import { simulateApproval } from './approval-simulator';
import { simulatePublishDensity } from './publish-density';
import { generateMockLeads } from './lead-generator';
import type { SimEvent } from './events';

export interface SimConfig {
  channel: string;
  postsPerWeek: number;
  ctaType: 'soft'|'advisory'|'hard';
  ctaIntensity: number;
  durationDays: number;
  approvalAvgHours: number;
}

export interface SimResult {
  days: number;
  events: SimEvent[];
  summary: {
    avgEngagement: number;
    avgConversion: number;
    totalLeads: number;
    finalFatigue: number;
    avgApprovalDelay: number;
    publishBursts: number;
    cooldownDays: number;
  };
  daily: { day: number; engagement: number; fatigue: number; cta: number; leads: number }[];
}

export class SimulationEngine {
  run(config: SimConfig): SimResult {
    const events: SimEvent[] = [];
    const daily: SimResult['daily'] = [];
    let fatigue = 0, totalLeads = 0, totalEng = 0, totalConv = 0, totalDelay = 0, bursts = 0, cooldowns = 0;

    for (let day = 1; day <= config.durationDays; day++) {
      // Fatigue
      const fat = simulateFatigue(config.channel, config.postsPerWeek, config.ctaIntensity > 3 ? day : 0, day, fatigue);
      fatigue = fat.fatigueScore;
      if (fat.cooldownRecommended) { events.push({ day, type: 'channel.cooldown', channel: config.channel, value: fatigue }); cooldowns++; }
      if (fatigue > 70) events.push({ day, type: 'fatigue.increased', channel: config.channel, value: fatigue });

      // Engagement
      const eng = simulateEngagement(config.channel, day, config.postsPerWeek, fatigue, config.ctaIntensity);
      totalEng += eng;
      events.push({ day, type: 'engagement.detected', channel: config.channel, value: Math.round(eng * 10) / 10 });

      // CTA
      const cta = simulateCTA(config.channel, config.ctaType, day, fatigue);
      totalConv += cta.conversionRate;
      if (cta.clicks > 1) events.push({ day, type: 'cta.clicked', channel: config.channel, value: cta.clicks });

      // Leads
      const leads = generateMockLeads(Math.round(cta.clicks * 10), cta.conversionRate, day);
      totalLeads += leads.length;
      if (leads.length > 0) events.push({ day, type: 'lead.generated', channel: config.channel, value: leads.length });

      // Approval
      const appr = simulateApproval(Math.ceil(config.postsPerWeek / 5), config.approvalAvgHours, day);
      totalDelay += appr.delayHours;
      if (appr.delayHours > 8) events.push({ day, type: 'approval.delayed', channel: config.channel, value: appr.delayHours });

      // Publish density
      const pub = simulatePublishDensity(config.postsPerWeek, 1);
      if (pub.burst) { events.push({ day, type: 'publish.spike', channel: config.channel, value: config.postsPerWeek }); bursts++; }

      daily.push({ day, engagement: Math.round(eng * 10) / 10, fatigue, cta: cta.conversionRate, leads: leads.length });
    }

    return {
      days: config.durationDays, events,
      summary: {
        avgEngagement: Math.round(totalEng / config.durationDays * 10) / 10,
        avgConversion: Math.round(totalConv / config.durationDays * 10) / 10,
        totalLeads, finalFatigue: fatigue,
        avgApprovalDelay: Math.round(totalDelay / config.durationDays * 10) / 10,
        publishBursts: bursts, cooldownDays: cooldowns,
      },
      daily,
    };
  }
}
