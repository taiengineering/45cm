export function simulateApproval(pendingCount: number, avgResponseHours: number, day: number): { delayHours: number; rejectionRate: number; backlog: number } {
  const baseDelay = avgResponseHours;
  const backlogPressure = Math.max(0, (pendingCount - 3) * 2);
  const dayFactor = (day % 7 >= 5) ? 8 : 0; // weekend delay
  const delayHours = Math.round((baseDelay + backlogPressure + dayFactor + (Math.random()-0.5)*2) * 10) / 10;
  const rejectionRate = Math.min(30, 5 + pendingCount * 2 + (Math.random()-0.5)*3);
  const backlog = Math.max(0, Math.round(pendingCount + (Math.random()-0.5)*2));
  return { delayHours: Math.max(0.5, delayHours), rejectionRate: Math.round(rejectionRate), backlog };
}
