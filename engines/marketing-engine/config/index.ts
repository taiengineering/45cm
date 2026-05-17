export const ENGINE_CONFIG = {
  name: 'marketing-engine',
  version: '1.0.0',
  defaultBrandVoice: 'tai',
  defaultCta: '무료 법령진단',
  humanize: { enabled: true, rules: 8 },
  approval: { required: true, transport: 'slack' },
  publish: { autoPublish: false, defaultChannel: 'linkedin' },
  queue: { concurrency: 2, retryAttempts: 3, retryDelay: 30000 },
  ai: { provider: 'openai', model: 'gpt-4o-mini', timeout: 30000 },
};
