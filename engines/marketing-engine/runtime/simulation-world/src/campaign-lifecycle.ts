export type LifecycleStage = 'planned'|'active'|'growing'|'fatigued'|'declining'|'cooldown'|'completed';
export interface CampaignState { id:string; stage:LifecycleStage; daysSinceStart:number; engagement:number; fatigue:number; leads:number; }

export class CampaignLifecycle {
  advance(c:CampaignState, channelFatigue:number): CampaignState {
    const days = c.daysSinceStart+1;
    let stage = c.stage;
    if(stage==='planned'&&days>0) stage='active';
    if(stage==='active'&&days>7&&c.engagement>3) stage='growing';
    if(stage==='growing'&&(c.fatigue>50||channelFatigue>60)) stage='fatigued';
    if(stage==='fatigued'&&c.engagement<2) stage='declining';
    if(stage==='declining'&&days>5) stage='cooldown';
    if(stage==='cooldown'&&c.fatigue<20) stage='completed';
    return {...c, stage, daysSinceStart:days};
  }
}
