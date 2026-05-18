// Permissions Runtime — Role-based access control

export type Role = 'owner' | 'strategist' | 'operator' | 'reviewer' | 'viewer';

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  owner: ['billing','integration','campaign','brand','publish','calendar','approval','analytics','settings','admin','emergency_stop'],
  strategist: ['campaign','brand','publish','calendar','approval','analytics','visual','simulation'],
  operator: ['publish','calendar','approval','drafts','engagement','visual'],
  reviewer: ['approval','drafts','analytics'],
  viewer: ['analytics','dashboard'],
};

export function hasPermission(role: Role, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function getPermissions(role: Role): string[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function canPublish(role: Role): boolean { return hasPermission(role, 'publish'); }
export function canApprove(role: Role): boolean { return hasPermission(role, 'approval'); }
export function canManageBrand(role: Role): boolean { return hasPermission(role, 'brand'); }
export function canEmergencyStop(role: Role): boolean { return hasPermission(role, 'emergency_stop'); }
export function canAccessBilling(role: Role): boolean { return hasPermission(role, 'billing'); }
