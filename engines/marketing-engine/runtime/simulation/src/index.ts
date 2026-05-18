// Simulation Runtime — Operational Simulation (NOT LLM fine-tuning)
// Simulates: engagement, CTA, fatigue, approval delay, publish density

export { SimulationEngine, type SimConfig, type SimResult } from './engine';
export { CHANNEL_COEFFICIENTS, type ChannelCoefficient } from './channel-coefficients';
export { simulateEngagement } from './engagement-simulator';
export { simulateCTA } from './cta-simulator';
export { simulateFatigue } from './fatigue-simulator';
export { simulateApproval } from './approval-simulator';
export { simulatePublishDensity } from './publish-density';
export { generateMockCampaign, type MockCampaign } from './campaign-generator';
export { generateMockLeads } from './lead-generator';
export { SIMULATION_EVENTS, type SimEvent } from './events';
