// Approval Runtime — human approval, slack approval, fallback
export const APPROVAL_TRANSPORTS = ['slack', 'console', 'email'] as const;
export const APPROVAL_STATUSES = ['pending', 'approved', 'rejected', 'edit_requested', 'expired'] as const;
