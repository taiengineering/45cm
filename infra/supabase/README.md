# Supabase Configuration

## Schemas
- marketing: workspaces, channels, keywords, contents, drafts, approval_requests, publish_jobs, ctas, leads, conversions, analytics_events, channel_policies, domain_pack_bindings
- core_ai: ai_usage_log, ai_budget, ai_model_policy, prompt_registry, ai_call_audit

## Schema Exposure
ALTER ROLE authenticator SET pgrst.db_schemas TO 'public, graphql_public, marketing, core_ai';
NOTIFY pgrst, 'reload schema';