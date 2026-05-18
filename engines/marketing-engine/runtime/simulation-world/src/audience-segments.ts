export interface AudienceSegment { id:string; name:string; size:number; engagementMult:number; ctaSensitivity:number; trustBase:number; }

export const AUDIENCE_SEGMENTS: AudienceSegment[] = [
  {id:'technical',name:'Technical Operator',size:30,engagementMult:0.8,ctaSensitivity:0.4,trustBase:60},
  {id:'corporate',name:'Corporate Decision Maker',size:15,engagementMult:0.6,ctaSensitivity:0.9,trustBase:40},
  {id:'safety',name:'Safety-Sensitive',size:25,engagementMult:1.2,ctaSensitivity:0.3,trustBase:70},
  {id:'price',name:'Price-Sensitive',size:10,engagementMult:0.7,ctaSensitivity:1.0,trustBase:35},
  {id:'decision',name:'Decision Maker',size:10,engagementMult:0.5,ctaSensitivity:0.8,trustBase:45},
  {id:'operator',name:'Field Operator',size:10,engagementMult:1.0,ctaSensitivity:0.2,trustBase:65},
];
