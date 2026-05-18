export interface ChannelState { channel:string; health:number; fatigue:number; audienceSensitivity:number; ctaTolerance:number; publishPressure:number; }

export class ChannelStateMachine {
  update(s:ChannelState, postsToday:number, ctaIntensity:number): ChannelState {
    const pp = Math.min(100, s.publishPressure + postsToday*15 - 5);
    const fat = Math.max(0, Math.min(100, s.fatigue + postsToday*8 + ctaIntensity*3 - 4 + (Math.random()-0.5)*3));
    const as = Math.max(20, s.audienceSensitivity - fat*0.02 + (100-fat)*0.01);
    const ct = Math.max(10, s.ctaTolerance - ctaIntensity*2 + (100-fat)*0.05);
    const h = Math.max(0, Math.min(100, 100 - fat*0.4 - pp*0.2 + ct*0.1));
    return {...s, health:Math.round(h), fatigue:Math.round(fat), audienceSensitivity:Math.round(as), ctaTolerance:Math.round(ct), publishPressure:Math.round(pp)};
  }
  static defaults(ch:string): ChannelState {
    return {channel:ch, health:80, fatigue:10, audienceSensitivity:70, ctaTolerance:60, publishPressure:0};
  }
}
