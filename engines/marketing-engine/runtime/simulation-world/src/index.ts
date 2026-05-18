// Persistent Simulation World — A living, breathing operational world
export { WorldEngine, type WorldState, type WorldConfig } from './engine';
export { TimeEngine } from './time-engine';
export { CampaignLifecycle, type CampaignState } from './campaign-lifecycle';
export { ChannelStateMachine, type ChannelState } from './channel-state';
export { AudienceBehavior, type AudienceState } from './audience-behavior';
export { FatigueAccumulation } from './fatigue-accumulation';
export { CTAResistance } from './cta-resistance';
export { RecoveryEngine } from './recovery-engine';
export { OperatorLoad, type OperatorState } from './operator-load';
export { AUDIENCE_SEGMENTS, type AudienceSegment } from './audience-segments';
export { MarketDrift } from './market-drift';
export { DatasetAccumulator } from './dataset-accumulator';
