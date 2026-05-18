import { TimeEngine } from './time-engine';
import { CampaignLifecycle, type CampaignState } from './campaign-lifecycle';
import { ChannelStateMachine, type ChannelState } from './channel-state';
import { AudienceBehavior, type AudienceState } from './audience-behavior';
import { FatigueAccumulation } from './fatigue-accumulation';
import { CTAResistance } from './cta-resistance';
import { RecoveryEngine } from './recovery-engine';
import { OperatorLoad, type OperatorState } from './operator-load';
import { MarketDrift } from './market-drift';
import { DatasetAccumulator } from './dataset-accumulator';

export interface WorldConfig { channels:string[]; campaigns:{id:string,channel:string,postsPerWeek:number,ctaType:'soft'|'advisory'|'hard',ctaIntensity:number}[]; durationDays:number; speed:string; }

export interface WorldState {
  tick:number; day:number; week:number;
  channels: Record<string,ChannelState>;
  campaigns: CampaignState[];
  audience: AudienceState;
  operator: OperatorState;
  market: {interest:number,ctaSensitivity:number,trend:string};
}

export class WorldEngine {
  private time = new TimeEngine();
  private campaignLC = new CampaignLifecycle();
  private channelSM = new ChannelStateMachine();
  private audienceB = new AudienceBehavior();
  private fatigueA = new FatigueAccumulation();
  private ctaR = new CTAResistance();
  private recovery = new RecoveryEngine();
  private operatorL = new OperatorLoad();
  private marketD = new MarketDrift();
  private dataset = new DatasetAccumulator();

  run(config: WorldConfig): { states: WorldState[]; dataset: DatasetAccumulator } {
    const states: WorldState[] = [];
    let t = {tick:0,day:0,week:0};
    const chs: Record<string,ChannelState> = {};
    for(const ch of config.channels) chs[ch] = ChannelStateMachine.defaults(ch);
    let audience = AudienceBehavior.defaults();
    let operator = OperatorLoad.defaults();
    let campaigns: CampaignState[] = config.campaigns.map(c=>({id:c.id,stage:'planned' as const,daysSinceStart:0,engagement:0,fatigue:0,leads:0}));
    let market = {interest:60,ctaSensitivity:50,trend:'stable'};

    for(let i=0; i<config.durationDays; i++) {
      t = this.time.tick(t, config.speed);
      market = {...this.marketD.drift(t.day, market.interest), trend: this.marketD.drift(t.day,market.interest).trendShift};

      for(const cc of config.campaigns) {
        const idx = campaigns.findIndex(c=>c.id===cc.id);
        const ch = chs[cc.channel] ?? ChannelStateMachine.defaults(cc.channel);
        // Channel update
        const postsToday = cc.postsPerWeek/7;
        chs[cc.channel] = this.channelSM.update(ch, postsToday, cc.ctaIntensity);
        // Campaign lifecycle
        campaigns[idx] = this.campaignLC.advance(campaigns[idx], chs[cc.channel].fatigue);
        campaigns[idx].engagement = Math.max(0, chs[cc.channel].health*0.05 + audience.engagementInterest*0.03);
        campaigns[idx].fatigue = chs[cc.channel].fatigue;
        // CTA resistance
        const ctar = this.ctaR.calculate(t.day, cc.ctaType, audience.trustScore);
        campaigns[idx].leads += ctar.effectiveConversion > 1 ? 1 : 0;
        // Dataset
        this.dataset.record(t.day, cc.channel, 'health', chs[cc.channel].health);
        this.dataset.record(t.day, cc.channel, 'fatigue', chs[cc.channel].fatigue);
        this.dataset.record(t.day, cc.channel, 'engagement', campaigns[idx].engagement);
        this.dataset.record(t.day, cc.channel, 'cta_resistance', ctar.resistance);
      }

      // Audience
      const avgCTA = config.campaigns.reduce((s,c)=>s+c.ctaIntensity,0)/config.campaigns.length;
      audience = this.audienceB.update(audience, 6, avgCTA, t.day);
      // Operator
      operator = this.operatorL.update(operator, Math.ceil(config.campaigns.length*0.3), config.campaigns.length, Math.ceil(config.campaigns.reduce((s,c)=>s+c.postsPerWeek,0)/7));

      states.push({tick:t.tick,day:t.day,week:t.week, channels:{...chs}, campaigns:[...campaigns], audience:{...audience}, operator:{...operator}, market:{...market}});
    }
    return {states, dataset:this.dataset};
  }
}
