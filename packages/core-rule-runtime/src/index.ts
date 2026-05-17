export interface Rule {
  id: string;
  name: string;
  conditions: Condition[];
  actions: Action[];
  enabled: boolean;
}

export interface Condition {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains' | 'in';
  value: unknown;
}

export interface Action {
  type: 'notify' | 'publish' | 'tag' | 'assign' | 'escalate';
  config: Record<string, unknown>;
}

export function evaluateCondition(condition: Condition, context: Record<string, unknown>): boolean {
  const val = context[condition.field];
  switch (condition.operator) {
    case 'eq': return val === condition.value;
    case 'neq': return val !== condition.value;
    case 'gt': return Number(val) > Number(condition.value);
    case 'lt': return Number(val) < Number(condition.value);
    case 'gte': return Number(val) >= Number(condition.value);
    case 'lte': return Number(val) <= Number(condition.value);
    case 'contains': return String(val).includes(String(condition.value));
    case 'in': return Array.isArray(condition.value) && (condition.value as unknown[]).includes(val);
    default: return false;
  }
}

export function evaluateRule(rule: Rule, context: Record<string, unknown>): { matched: boolean; actions: Action[] } {
  if (!rule.enabled) return { matched: false, actions: [] };
  const matched = rule.conditions.every(c => evaluateCondition(c, context));
  return { matched, actions: matched ? rule.actions : [] };
}
