export class FatigueAccumulation {
  accumulate(currentFatigue:number, weeklyPosts:number, monthlyCTA:number, channelRecovery:number): {weekly:number,monthly:number,burnout:boolean} {
    const weekly = Math.min(100, currentFatigue + weeklyPosts*4 - channelRecovery*2 + (Math.random()-0.5)*5);
    const monthly = Math.min(100, weekly*0.7 + monthlyCTA*2);
    return {weekly:Math.round(Math.max(0,weekly)), monthly:Math.round(Math.max(0,monthly)), burnout:monthly>80};
  }
}
