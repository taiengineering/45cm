# API Analysis 01 — Router → Endpoint Map

> Source: tai-api @ analysis time | Routers: 22

| Router | Prefix | Registered | Endpoints | Lines |
|---|---|---|---:|---:|
| `oauth` | `(none)` | — | 6 | 478 |
| `auth_oauth` | `/auth` | — | 1 | 233 |
| `workers` | `/workers` | — | 5 | 197 |
| `alert_messages` | `/alert-messages` | — | 7 | 233 |
| `areas` | `/areas` | — | 5 | 39 |
| `buildings` | `/buildings` | — | 5 | 37 |
| `connect_provider` | `(none)` | — | 6 | 273 |
| `contacts` | `(none)` | — | 13 | 430 |
| `debug` | `(none)` | — | 3 | 117 |
| `emergency_report` | `/emergency` | — | 1 | 149 |
| `feature_flags` | `/feature-flags` | — | 2 | 123 |
| `fix_matching_api` | `/matching/requests` | — | 2 | 103 |
| `industry` | `/industry` | — | 4 | 137 |
| `kin_generate` | `/kin` | — | 3 | 169 |
| `posts` | `/posts` | — | 7 | 317 |
| `process_management` | `/process-management` | — | 8 | 378 |
| `roles` | `/roles` | — | 6 | 68 |
| `slack_kin` | `/slack/kin` | — | 3 | 242 |
| `teams` | `/teams` | — | 5 | 38 |
| `uploads` | `/uploads` | — | 1 | 88 |
| `workflow_integrity` | `/workflow/integrity` | — | 5 | 118 |
| `tbm_issue` | `/tbm` | — | 1 | 48 |

---


## `oauth` (`routers/oauth.py`)

- Prefix: `(none)`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `/{provider}` | `/{provider}` | `oauth_start` |
| GET | `/{provider}/callback` | `/{provider}/callback` | `oauth_callback` |
| POST | `/register` | `/register` | `oauth_register` |
| POST | `/link` | `/link` | `oauth_link` |
| POST | `/unlink` | `/unlink` | `oauth_unlink` |
| GET | `/links/{user_id}` | `/links/{user_id}` | `get_oauth_links` |

## `auth_oauth` (`routers/auth_oauth.py`)

- Prefix: `/auth`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| POST | `/oauth-login` | `/auth/oauth-login` | `oauth_login` |

## `workers` (`routers/workers.py`)

- Prefix: `/workers`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| POST | `/invite` | `/workers/invite` | `invite_worker` |
| GET | `/factory/{factory_id}` | `/workers/factory/{factory_id}` | `list_workers` |
| GET | `/home/{worker_id}` | `/workers/home/{worker_id}` | `worker_home` |
| PATCH | `/{worker_id}` | `/workers/{worker_id}` | `patch_worker` |
| GET | `/{worker_id}` | `/workers/{worker_id}` | `get_worker` |

## `alert_messages` (`routers/alert_messages.py`)

- Prefix: `/alert-messages`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `` | `/alert-messages/` | `list_alerts` |
| GET | `/codes` | `/alert-messages/codes` | `list_alert_codes` |
| GET | `/contexts` | `/alert-messages/contexts` | `list_contexts` |
| POST | `` | `/alert-messages/` | `create_alert` |
| PATCH | `/{alert_id}` | `/alert-messages/{alert_id}` | `update_alert` |
| PATCH | `/{alert_id}/toggle` | `/alert-messages/{alert_id}/toggle` | `toggle_alert` |
| DELETE | `/{alert_id}` | `/alert-messages/{alert_id}` | `delete_alert` |

## `areas` (`routers/areas.py`)

- Prefix: `/areas`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `` | `/areas/` | `get_areas` |
| GET | `/{area_id}` | `/areas/{area_id}` | `get_area` |
| POST | `` | `/areas/` | `create_area` |
| PATCH | `/{area_id}` | `/areas/{area_id}` | `update_area` |
| DELETE | `/{area_id}` | `/areas/{area_id}` | `delete_area` |

## `buildings` (`routers/buildings.py`)

- Prefix: `/buildings`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `` | `/buildings/` | `get_buildings` |
| GET | `/{building_id}` | `/buildings/{building_id}` | `get_building` |
| POST | `` | `/buildings/` | `create_building` |
| PATCH | `/{building_id}` | `/buildings/{building_id}` | `update_building` |
| DELETE | `/{building_id}` | `/buildings/{building_id}` | `delete_building` |

## `connect_provider` (`routers/connect_provider.py`)

- Prefix: `(none)`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `/connect/provider/profile` | `/connect/provider/profile` | `get_provider_profile` |
| GET | `/connect/services` | `/connect/services` | `list_connect_services` |
| GET | `/connect/provider/services` | `/connect/provider/services` | `get_my_provider_services` |
| POST | `/connect/provider/services/upsert` | `/connect/provider/services/upsert` | `upsert_provider_service` |
| POST | `/connect/provider/services/batch` | `/connect/provider/services/batch` | `batch_upsert_provider_services` |
| DELETE | `/connect/provider/services/{record_id}` | `/connect/provider/services/{record_id}` | `delete_provider_service` |

## `contacts` (`routers/contacts.py`)

- Prefix: `(none)`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `/companies/{company_id}/contacts` | `/companies/{company_id}/contacts` | `get_company_contacts` |
| POST | `/companies/{company_id}/contacts` | `/companies/{company_id}/contacts` | `add_company_contact` |
| PATCH | `/companies/{company_id}/contacts/{contact_id}` | `/companies/{company_id}/contacts/{contact_id}` | `update_company_contact` |
| DELETE | `/companies/{company_id}/contacts/{contact_id}` | `/companies/{company_id}/contacts/{contact_id}` | `delete_company_contact` |
| GET | `/factories/{factory_id}/contacts` | `/factories/{factory_id}/contacts` | `get_factory_contacts` |
| POST | `/factories/{factory_id}/contacts` | `/factories/{factory_id}/contacts` | `add_factory_contact` |
| PATCH | `/factories/{factory_id}/contacts/{contact_id}` | `/factories/{factory_id}/contacts/{contact_id}` | `update_factory_contact` |
| DELETE | `/factories/{factory_id}/contacts/{contact_id}` | `/factories/{factory_id}/contacts/{contact_id}` | `delete_factory_contact` |
| GET | `/companies/{company_id}/files` | `/companies/{company_id}/files` | `get_company_files` |
| POST | `/companies/{company_id}/files/upload` | `/companies/{company_id}/files/upload` | `upload_company_file` |
| POST | `/companies/{company_id}/files/url` | `/companies/{company_id}/files/url` | `save_contract_url` |
| DELETE | `/companies/{company_id}/files/{file_id}` | `/companies/{company_id}/files/{file_id}` | `delete_company_file` |
| GET | `/companies/{company_id}/contracts` | `/companies/{company_id}/contracts` | `get_company_contracts` |

## `debug` (`routers/debug.py`)

- Prefix: `(none)`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `/debug/env-check` | `/debug/env-check` | `debug_env_check` |
| GET | `/debug/db-columns` | `/debug/db-columns` | `debug_db_columns` |
| POST | `/debug/billing-test` | `/debug/billing-test` | `debug_billing_test` |

## `emergency_report` (`routers/emergency_report.py`)

- Prefix: `/emergency`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| POST | `/report` | `/emergency/report` | `create_emergency_report` |

## `feature_flags` (`routers/feature_flags.py`)

- Prefix: `/feature-flags`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `` | `/feature-flags/` | `get_feature_flags` |
| GET | `/all` | `/feature-flags/all` | `get_all_features` |

## `fix_matching_api` (`routers/fix_matching_api.py`)

- Prefix: `/matching/requests`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| POST | `` | `/matching/requests/` | `create_service_request` |
| GET | `` | `/matching/requests/` | `list_service_requests` |

## `industry` (`routers/industry.py`)

- Prefix: `/industry`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `/search` | `/industry/search` | `search_industry` |
| GET | `/lv1` | `/industry/lv1` | `get_lv1` |
| GET | `/lv2` | `/industry/lv2` | `get_lv2` |
| GET | `/lv3` | `/industry/lv3` | `get_lv3` |

## `kin_generate` (`routers/kin_generate.py`)

- Prefix: `/kin`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| POST | `/generate` | `/kin/generate` | `manual_generate` |
| POST | `/collect` | `/kin/collect` | `manual_collect` |
| GET | `/pending-count` | `/kin/pending-count` | `pending_count` |

## `posts` (`routers/posts.py`)

- Prefix: `/posts`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `/latest` | `/posts/latest` | `get_latest_posts` |
| GET | `/stats/today` | `/posts/stats/today` | `get_today_stats` |
| GET | `` | `/posts/` | `get_posts` |
| GET | `/{post_id}` | `/posts/{post_id}` | `get_post` |
| POST | `` | `/posts/` | `create_post` |
| PATCH | `/{post_id}` | `/posts/{post_id}` | `update_post` |
| DELETE | `/{post_id}` | `/posts/{post_id}` | `delete_post` |

## `process_management` (`routers/process_management.py`)

- Prefix: `/process-management`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| POST | `` | `/process-management/` | `create_process` |
| GET | `` | `/process-management/` | `get_process_list` |
| GET | `/lv1-list` | `/process-management/lv1-list` | `get_process_lv1_list` |
| GET | `/{process_id}` | `/process-management/{process_id}` | `get_process_detail` |
| GET | `/{process_id}/equipments` | `/process-management/{process_id}/equipments` | `get_process_equipments` |
| GET | `/{process_id}/factories` | `/process-management/{process_id}/factories` | `get_process_factories` |
| PATCH | `/{process_id}` | `/process-management/{process_id}` | `update_process` |
| DELETE | `/{process_id}` | `/process-management/{process_id}` | `delete_process` |

## `roles` (`routers/roles.py`)

- Prefix: `/roles`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `` | `/roles/` | `get_roles` |
| GET | `/{role_id}` | `/roles/{role_id}` | `get_role` |
| POST | `` | `/roles/` | `create_role` |
| PATCH | `/{role_id}` | `/roles/{role_id}` | `update_role` |
| GET | `/{role_id}/permissions` | `/roles/{role_id}/permissions` | `get_role_permissions` |
| GET | `/{role_id}/menus` | `/roles/{role_id}/menus` | `get_role_menus` |

## `slack_kin` (`routers/slack_kin.py`)

- Prefix: `/slack/kin`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| POST | `/interactions` | `/slack/kin/interactions` | `slack_interactions` |
| POST | `/approve` | `/slack/kin/approve` | `slack_approve_alias` |
| GET | `/health` | `/slack/kin/health` | `slack_kin_health` |

## `teams` (`routers/teams.py`)

- Prefix: `/teams`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `` | `/teams/` | `get_teams` |
| GET | `/{team_id}` | `/teams/{team_id}` | `get_team` |
| POST | `` | `/teams/` | `create_team` |
| PATCH | `/{team_id}` | `/teams/{team_id}` | `update_team` |
| DELETE | `/{team_id}` | `/teams/{team_id}` | `delete_team` |

## `uploads` (`routers/uploads.py`)

- Prefix: `/uploads`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| POST | `/inspection-photo` | `/uploads/inspection-photo` | `post_inspection_photo` |

## `workflow_integrity` (`routers/workflow_integrity.py`)

- Prefix: `/workflow/integrity`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| GET | `/rules/list` | `/workflow/integrity/rules/list` | `api_list_rules` |
| GET | `/events/{workflow_id}` | `/workflow/integrity/events/{workflow_id}` | `api_get_events` |
| PATCH | `/events/{event_id}/resolve` | `/workflow/integrity/events/{event_id}/resolve` | `api_resolve_event` |
| POST | `/{workflow_id}/evaluate` | `/workflow/integrity/{workflow_id}/evaluate` | `api_evaluate_workflow` |
| GET | `/{workflow_id}` | `/workflow/integrity/{workflow_id}` | `api_integrity_timeline` |

## `tbm_issue` (`routers/tbm_issue.py`)

- Prefix: `/tbm`
- Registry: **NOT registered**

| Method | Route | Full path | Handler |
|---|---|---|---|
| PATCH | `/{tbm_id}/attendees/{attendee_id}/issue` | `/tbm/{tbm_id}/attendees/{attendee_id}/issue` | `update_attendee_issue` |