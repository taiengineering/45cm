// Campaign Calendar Runtime
export interface ScheduledPublish {
  id: string; workspaceId: string; draftId: string; channel: string;
  scheduledAt: string; status: string; campaign?: string;
}

export function getWeekDates(offset = 0): { start: string; end: string } {
  const now = new Date();
  now.setDate(now.getDate() + offset * 7);
  const day = now.getDay();
  const start = new Date(now); start.setDate(now.getDate() - day + 1);
  const end = new Date(start); end.setDate(start.getDate() + 6);
  return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
}
