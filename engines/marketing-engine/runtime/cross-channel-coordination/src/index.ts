// Cross-Channel Coordination Runtime — Prevent channel conflicts

export interface ChannelCoordination {
  overloadedChannels: string[];
  underutilizedChannels: string[];
  recommendations: {from:string,to:string,reason:string}[];
}

export function coordinateChannels(channels: {channel:string,presenceStatus:string,fatigueRisk:number,weeklyCadence:number}[]): ChannelCoordination {
  const overloaded = channels.filter(c=>c.presenceStatus==='overloaded'||c.presenceStatus==='fatigued');
  const under = channels.filter(c=>c.presenceStatus==='dormant'||c.weeklyCadence<1);
  const healthy = channels.filter(c=>c.presenceStatus==='healthy');
  const recs: {from:string,to:string,reason:string}[] = [];
  for(const o of overloaded) {
    const target = under[0] ?? healthy.find(h=>h.fatigueRisk<30);
    if(target) recs.push({from:o.channel,to:target.channel,reason:`${o.channel} 과부하 시 ${target.channel} trust 콘텐츠 우선`});
  }
  return { overloadedChannels:overloaded.map(c=>c.channel), underutilizedChannels:under.map(c=>c.channel), recommendations:recs };
}
