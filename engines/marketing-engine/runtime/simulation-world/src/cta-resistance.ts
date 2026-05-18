export class CTAResistance {
  calculate(exposures:number, ctaType:'soft'|'advisory'|'hard', trustScore:number): {resistance:number,effectiveConversion:number,trustImpact:number} {
    const base = {soft:0.3,advisory:0.5,hard:1.2}[ctaType];
    const resistance = Math.min(90, exposures*base*2 + (100-trustScore)*0.2);
    const effectiveConversion = Math.max(0.1, (100-resistance)/100 * (ctaType==='hard'?5:ctaType==='advisory'?3:1.5));
    const trustImpact = ctaType==='hard'? -exposures*0.5 : ctaType==='advisory'? -exposures*0.1 : exposures*0.05;
    return {resistance:Math.round(resistance), effectiveConversion:Math.round(effectiveConversion*10)/10, trustImpact:Math.round(trustImpact*10)/10};
  }
}
