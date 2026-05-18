export interface OperatorState { approvalBacklog:number; reviewFatigue:number; campaignOverload:number; publishPressure:number; }

export class OperatorLoad {
  update(s:OperatorState, pendingApprovals:number, activeCampaigns:number, publishesToday:number): OperatorState {
    return {
      approvalBacklog: Math.max(0, s.approvalBacklog + pendingApprovals - 2 + (Math.random()-0.5)),
      reviewFatigue: Math.min(100, Math.max(0, s.reviewFatigue + pendingApprovals*3 - 5)),
      campaignOverload: Math.min(100, activeCampaigns > 3 ? (activeCampaigns-3)*20 : 0),
      publishPressure: Math.min(100, publishesToday > 2 ? (publishesToday-2)*25 : 0),
    };
  }
  static defaults(): OperatorState { return {approvalBacklog:0,reviewFatigue:0,campaignOverload:0,publishPressure:0}; }
}
