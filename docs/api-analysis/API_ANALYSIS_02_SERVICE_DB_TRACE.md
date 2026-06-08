# API Analysis 02 — Service & DB Table Trace

> Supabase `.table('...')` calls only

| Router | Services | Capabilities | Router imports | DB tables |
|---|---|---|---|---|
| `oauth` | — | — | `identity` | `users` |
| `auth_oauth` | — | — | — | `users` |
| `workers` | `inbox_notify_svc` | — | — | `factories`, `work_schedules`, `worker_registry` |
| `alert_messages` | — | — | `auth` | `system_alert_messages` |
| `areas` | — | — | — | `areas` |
| `buildings` | — | — | — | `buildings` |
| `connect_provider` | — | — | `auth` | `connect_provider_services`, `connect_providers`, `connect_service_master` |
| `contacts` | — | — | — | `companies`, `company_contacts`, `company_files`, `contracts`, `factories`, `factory_contacts` |
| `debug` | `payment_helpers` | — | — | `subscriptions` |
| `emergency_report` | — | — | `auth` | `emergency_reports`, `users` |
| `feature_flags` | `legal_rules` | — | — | `factory_features` |
| `fix_matching_api` | — | — | — | `fix_service_requests` |
| `industry` | — | — | — | `industry_master` |
| `kin_generate` | — | — | — | `naver_kin_log` |
| `posts` | — | — | — | `posts` |
| `process_management` | — | — | — | `factory_process`, `ksic_process_map`, `process_equipment_map`, `v_process_unified` |
| `roles` | — | — | — | `role_menu_permissions`, `role_permissions`, `roles` |
| `slack_kin` | `kin_draft_safety`, `kin_playwright_runner`, `slack_signature_verifier` | — | — | `naver_kin_log` |
| `teams` | — | — | — | `teams` |
| `uploads` | — | — | `auth` | — |
| `workflow_integrity` | — | — | — | — |
| `tbm_issue` | — | — | — | `tbm_attendees` |

---

## Unique DB tables (31)

- `areas` ← `areas`
- `buildings` ← `buildings`
- `companies` ← `contacts`
- `company_contacts` ← `contacts`
- `company_files` ← `contacts`
- `connect_provider_services` ← `connect_provider`
- `connect_providers` ← `connect_provider`
- `connect_service_master` ← `connect_provider`
- `contracts` ← `contacts`
- `emergency_reports` ← `emergency_report`
- `factories` ← `workers`, `contacts`
- `factory_contacts` ← `contacts`
- `factory_features` ← `feature_flags`
- `factory_process` ← `process_management`
- `fix_service_requests` ← `fix_matching_api`
- `industry_master` ← `industry`
- `ksic_process_map` ← `process_management`
- `naver_kin_log` ← `kin_generate`, `slack_kin`
- `posts` ← `posts`
- `process_equipment_map` ← `process_management`
- `role_menu_permissions` ← `roles`
- `role_permissions` ← `roles`
- `roles` ← `roles`
- `subscriptions` ← `debug`
- `system_alert_messages` ← `alert_messages`
- `tbm_attendees` ← `tbm_issue`
- `teams` ← `teams`
- `users` ← `oauth`, `auth_oauth`, `emergency_report`
- `v_process_unified` ← `process_management`
- `work_schedules` ← `workers`
- `worker_registry` ← `workers`