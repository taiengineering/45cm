export class MarketDrift {
  drift(day:number, currentInterest:number): {interest:number,ctaSensitivity:number,trendShift:string} {
    const seasonal = Math.sin(day*Math.PI/180)*10;
    const noise = (Math.random()-0.5)*5;
    const interest = Math.max(20, Math.min(100, currentInterest + seasonal*0.1 + noise));
    const ctaSens = 50 + Math.sin(day*Math.PI/90)*15 + noise;
    const trends = ['stable','rising','declining','volatile'];
    const trendShift = trends[Math.floor(day/30)%trends.length];
    return {interest:Math.round(interest), ctaSensitivity:Math.round(ctaSens), trendShift};
  }
}
