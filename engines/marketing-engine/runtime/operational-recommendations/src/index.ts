// Operational Recommendations Runtime — Human-language operational advice

export interface OpRecommendation { channel?:string; text:string; severity:'info'|'warning'|'action'|'critical'; }

export function generateRecommendations(channels: {channel:string,presenceStatus:string,fatigueRisk:number,ctaPressure:number,weeklyCadence:number}[]): OpRecommendation[] {
  const recs: OpRecommendation[] = [];
  for(const ch of channels) {
    if(ch.presenceStatus==='dormant') recs.push({channel:ch.channel,text:`${ch.channel}이(가) 30일 이상 업데이트되지 않았습니다. 주 1회 가벼운 콘텐츠부터 시작하세요.`,severity:'action'});
    if(ch.presenceStatus==='fatigued') recs.push({channel:ch.channel,text:`${ch.channel} 피로도가 높습니다(${ch.fatigueRisk}%). cooldown을 추천합니다.`,severity:'warning'});
    if(ch.presenceStatus==='overloaded') recs.push({channel:ch.channel,text:`${ch.channel} 과운영 상태입니다. 발행 빈도를 줄이세요.`,severity:'warning'});
    if(ch.ctaPressure>40) recs.push({channel:ch.channel,text:`${ch.channel} CTA 비율이 높습니다(${ch.ctaPressure}%). trust 콘텐츠를 늘려주세요.`,severity:'action'});
    if(ch.presenceStatus==='healthy'&&ch.weeklyCadence>=2) recs.push({channel:ch.channel,text:`${ch.channel} 운영이 안정적입니다. 현재 리듬을 유지하세요.`,severity:'info'});
  }
  if(recs.length===0) recs.push({text:'전체적으로 안정적입니다. 현재 운영을 유지하세요.',severity:'info'});
  return recs;
}

// Human Report
export function generateHumanReport(channels: {channel:string,presenceStatus:string,fatigueRisk:number}[]): string {
  const lines: string[] = ['# 운영 상태 리포트\n'];
  const healthy = channels.filter(c=>c.presenceStatus==='healthy');
  const issues = channels.filter(c=>c.presenceStatus!=='healthy');
  if(healthy.length>0) lines.push(`현재 ${healthy.map(c=>c.channel).join(', ')}은(는) 안정적으로 운영 중입니다.\n`);
  for(const ch of issues) {
    if(ch.presenceStatus==='dormant') lines.push(`${ch.channel}이(가) 휴면 상태입니다. 주 1회부터 천천히 재시작하세요.\n`);
    if(ch.presenceStatus==='fatigued') lines.push(`${ch.channel}의 피로도가 ${ch.fatigueRisk}%입니다. cooldown을 추천합니다.\n`);
    if(ch.presenceStatus==='overloaded') lines.push(`${ch.channel}이(가) 과운영 상태입니다. 빈도를 줄이세요.\n`);
  }
  return lines.join('');
}
