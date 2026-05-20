// Event Operations Runtime — Event-driven operations (burst, override, urgent)

export type EventType = 'product_launch'|'event'|'notice'|'incident'|'issue'|'recruitment'|'viral'|'seasonal';
export type EventPriority = 'low'|'normal'|'high'|'critical';

export interface EventOperation {
  type: EventType;
  title: string;
  priority: EventPriority;
  channels: string[];
  overrideCadence: boolean;
  burstLimit: number;
  approvalLevel: 'normal'|'fast'|'emergency';
}

export const EVENT_TEMPLATES: Record<EventType,Partial<EventOperation>> = {
  product_launch: {priority:'high',overrideCadence:true,burstLimit:5,approvalLevel:'fast'},
  event: {priority:'normal',overrideCadence:false,burstLimit:3,approvalLevel:'normal'},
  notice: {priority:'high',overrideCadence:true,burstLimit:2,approvalLevel:'fast'},
  incident: {priority:'critical',overrideCadence:true,burstLimit:1,approvalLevel:'emergency'},
  issue: {priority:'high',overrideCadence:true,burstLimit:2,approvalLevel:'fast'},
  recruitment: {priority:'low',overrideCadence:false,burstLimit:3,approvalLevel:'normal'},
  viral: {priority:'normal',overrideCadence:false,burstLimit:5,approvalLevel:'normal'},
  seasonal: {priority:'normal',overrideCadence:false,burstLimit:4,approvalLevel:'normal'},
};

// Event Risk Score
export function calculateEventRisk(event: EventOperation, currentFatigue: Record<string,number>): {score:number,risks:string[]} {
  const risks: string[] = [];
  let score = 0;
  if(event.overrideCadence) { score+=20; risks.push('cadence override 활성'); }
  if(event.burstLimit>3) { score+=15; risks.push('burst 게시 높음'); }
  for(const ch of event.channels) {
    const fat = currentFatigue[ch]??0;
    if(fat>50) { score+=20; risks.push(`${ch} 피로도 ${fat}%`); }
  }
  if(event.priority==='critical') { score+=10; risks.push('긴급 이벤트'); }
  return {score:Math.min(100,score),risks};
}
