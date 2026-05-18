export class RecoveryEngine {
  recover(fatigue:number, daysSinceCooldown:number, reducedPublish:boolean, softCTAOnly:boolean): {recoveredFatigue:number,recoveryRate:number} {
    let rate = 2;
    if(reducedPublish) rate += 3;
    if(softCTAOnly) rate += 2;
    rate += daysSinceCooldown * 0.5;
    const recovered = Math.max(0, fatigue - rate + (Math.random()-0.5)*2);
    return {recoveredFatigue:Math.round(recovered), recoveryRate:Math.round(rate*10)/10};
  }
}
