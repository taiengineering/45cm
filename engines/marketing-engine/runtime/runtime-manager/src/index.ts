// Runtime Manager — Enable/disable runtimes, engine modes, bootstrap

export type RuntimeTier = 'core' | 'operational' | 'safety' | 'simulation' | 'experimental';
export type EngineMode = 'minimal' | 'operational' | 'simulation' | 'enterprise' | 'development';

export interface RuntimeDef { name: string; tier: RuntimeTier; required: boolean; envToggle?: string; }

export const RUNTIME_REGISTRY: RuntimeDef[] = [
  // Core Execution
  { name: 'ai', tier: 'core', required: true },
  { name: 'queue', tier: 'core', required: true },
  { name: 'publish', tier: 'core', required: true },
  { name: 'db', tier: 'core', required: true },
  { name: 'event', tier: 'core', required: true },
  { name: 'scheduler', tier: 'core', required: false, envToggle: 'ENABLE_SCHEDULER' },
  // Operational
  { name: 'campaign-intelligence', tier: 'operational', required: false, envToggle: 'ENABLE_INTELLIGENCE' },
  { name: 'channel-health', tier: 'operational', required: false, envToggle: 'ENABLE_CHANNEL_HEALTH' },
  { name: 'strategy-memory', tier: 'operational', required: false, envToggle: 'ENABLE_MEMORY' },
  { name: 'channel-integration', tier: 'operational', required: false },
  { name: 'visual', tier: 'operational', required: false, envToggle: 'ENABLE_VISUAL' },
  { name: 'brand', tier: 'operational', required: false },
  // Safety
  { name: 'tenant-isolation', tier: 'safety', required: true },
  { name: 'policy-engine', tier: 'safety', required: true },
  { name: 'permissions', tier: 'safety', required: true },
  { name: 'publish-safety', tier: 'safety', required: true },
  { name: 'token-budget', tier: 'safety', required: true },
  { name: 'retry-policy', tier: 'safety', required: true },
  { name: 'emergency-stop', tier: 'safety', required: true },
  // Simulation
  { name: 'simulation', tier: 'simulation', required: false, envToggle: 'ENABLE_SIMULATION' },
  { name: 'simulation-world', tier: 'experimental', required: false, envToggle: 'ENABLE_WORLD' },
  { name: 'cache', tier: 'core', required: false, envToggle: 'ENABLE_CACHE' },
];

export const ENGINE_MODES: Record<EngineMode, string[]> = {
  minimal: ['ai','queue','publish','db','event','tenant-isolation','policy-engine','permissions','publish-safety','token-budget','retry-policy','emergency-stop'],
  operational: ['ai','queue','publish','db','event','scheduler','campaign-intelligence','channel-health','strategy-memory','channel-integration','visual','brand','tenant-isolation','policy-engine','permissions','publish-safety','token-budget','retry-policy','emergency-stop','cache'],
  simulation: ['ai','queue','publish','db','event','scheduler','campaign-intelligence','channel-health','strategy-memory','channel-integration','visual','brand','tenant-isolation','policy-engine','permissions','publish-safety','token-budget','retry-policy','emergency-stop','cache','simulation'],
  enterprise: ['ai','queue','publish','db','event','scheduler','campaign-intelligence','channel-health','strategy-memory','channel-integration','visual','brand','tenant-isolation','policy-engine','permissions','publish-safety','token-budget','retry-policy','emergency-stop','cache','simulation','simulation-world'],
  development: ['ai','queue','publish','db','event','scheduler','campaign-intelligence','channel-health','strategy-memory','channel-integration','visual','brand','tenant-isolation','policy-engine','permissions','publish-safety','token-budget','retry-policy','emergency-stop','cache','simulation','simulation-world'],
};

export function getActiveRuntimes(mode: EngineMode): string[] {
  const base = ENGINE_MODES[mode] ?? ENGINE_MODES.operational;
  return base.filter(name => {
    const def = RUNTIME_REGISTRY.find(r => r.name === name);
    if (!def) return true;
    if (def.envToggle && process.env[def.envToggle] === 'false') return false;
    return true;
  });
}

export function isRuntimeEnabled(name: string, mode: EngineMode): boolean {
  return getActiveRuntimes(mode).includes(name);
}

export function getRuntimesByTier(tier: RuntimeTier): RuntimeDef[] {
  return RUNTIME_REGISTRY.filter(r => r.tier === tier);
}

// Bootstrap order
export const BOOTSTRAP_ORDER: RuntimeTier[] = ['core', 'safety', 'operational', 'simulation', 'experimental'];

export function getBootstrapOrder(mode: EngineMode): RuntimeDef[] {
  const active = getActiveRuntimes(mode);
  const result: RuntimeDef[] = [];
  for (const tier of BOOTSTRAP_ORDER) {
    for (const rt of RUNTIME_REGISTRY) {
      if (rt.tier === tier && active.includes(rt.name)) result.push(rt);
    }
  }
  return result;
}

// Structured logger
export interface LogEntry { runtime: string; workspace?: string; event: string; severity: 'info'|'warn'|'error'|'debug'; trace_id?: string; data?: any; ts: string; }

export function runtimeLog(runtime: string, event: string, severity: LogEntry['severity'] = 'info', opts?: { workspace?: string; trace_id?: string; data?: any }): void {
  const entry: LogEntry = { runtime, event, severity, ts: new Date().toISOString(), ...opts };
  console.log(JSON.stringify(entry));
}

// Failure classification
export type FailureSeverity = 'fatal' | 'retryable' | 'transient' | 'tenant_scoped' | 'global';
export function classifyFailure(error: any, wsId?: string): { severity: FailureSeverity; scope: string } {
  const msg = (error?.message ?? '').toLowerCase();
  if (msg.includes('econnrefused') || msg.includes('redis')) return { severity: 'global', scope: 'infrastructure' };
  if (msg.includes('auth') || msg.includes('token')) return { severity: 'tenant_scoped', scope: wsId ?? 'unknown' };
  if (msg.includes('timeout')) return { severity: 'transient', scope: 'network' };
  if (msg.includes('rate limit')) return { severity: 'retryable', scope: wsId ?? 'api' };
  return { severity: 'retryable', scope: 'unknown' };
}
