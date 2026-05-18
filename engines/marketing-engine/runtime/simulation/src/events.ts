export type SimEventType = 'engagement.detected'|'cta.clicked'|'lead.generated'|'fatigue.increased'|'publish.spike'|'approval.delayed'|'channel.cooldown';

export interface SimEvent {
  day: number;
  type: SimEventType;
  channel: string;
  value: number;
  metadata?: Record<string, any>;
}

export const SIMULATION_EVENTS: SimEventType[] = [
  'engagement.detected','cta.clicked','lead.generated',
  'fatigue.increased','publish.spike','approval.delayed','channel.cooldown'
];
