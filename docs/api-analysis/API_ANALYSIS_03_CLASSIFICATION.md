# API Analysis 03 — ACTIVE / ORPHAN / DEAD Classification

> Summary (strict FE): ACTIVE=2, ORPHAN=19, DEAD=1

> **Note:** `frontend_refs_strict` = nexas/tadmin/safe HTML·JS only (excludes node_modules, docs).


## Summary
| Class | Count | Definition |
|---|---:|---|
| ACTIVE | 2 | Registry 등록 또는 FE HTML/JS에서 path 참조 |
| ORPHAN | 19 | 구현+미등록, FE 미연결 (문서 참조만 가능) |
| DEAD | 1 | debug stub / endpoint 없음 |

## Detail
| Router | Class | EP | Tables | FE | Docs | Reason |
|---|---|---:|---:|---:|---:|---|
| `oauth` | **ACTIVE** | 6 | 1 | 2 | 6 | 프론트 HTML/JS 참조 2건 |
| `posts` | **ACTIVE** | 7 | 1 | 2 | 7 | 프론트 HTML/JS 참조 2건 |
| `debug` | **DEAD** | 3 | 1 | 0 | 1 | 임시 debug (해결 후 삭제) |
| `alert_messages` | **ORPHAN** | 7 | 1 | 0 | 3 | 문서 참조만 3건 (FE 미연결·미등록) |
| `areas` | **ORPHAN** | 5 | 1 | 0 | 2 | 문서 참조만 2건 (FE 미연결·미등록) |
| `auth_oauth` | **ORPHAN** | 1 | 1 | 0 | 1 | 문서 참조만 1건 (FE 미연결·미등록) |
| `buildings` | **ORPHAN** | 5 | 1 | 0 | 2 | 문서 참조만 2건 (FE 미연결·미등록) |
| `connect_provider` | **ORPHAN** | 6 | 3 | 0 | 1 | 문서 참조만 1건 (FE 미연결·미등록) |
| `contacts` | **ORPHAN** | 13 | 6 | 0 | 6 | 문서 참조만 6건 (FE 미연결·미등록) |
| `emergency_report` | **ORPHAN** | 1 | 3 | 0 | 5 | 문서 참조만 5건 (FE 미연결·미등록) |
| `feature_flags` | **ORPHAN** | 2 | 2 | 0 | 5 | 문서 참조만 5건 (FE 미연결·미등록) |
| `fix_matching_api` | **ORPHAN** | 2 | 1 | 0 | 1 | 문서 참조만 1건 (FE 미연결·미등록) |
| `industry` | **ORPHAN** | 4 | 2 | 0 | 1 | 문서 참조만 1건 (FE 미연결·미등록) |
| `kin_generate` | **ORPHAN** | 3 | 3 | 0 | 0 | 구현·미등록 (3 ep, 3 tbl) |
| `process_management` | **ORPHAN** | 8 | 5 | 0 | 5 | 문서 참조만 5건 (FE 미연결·미등록) |
| `roles` | **ORPHAN** | 6 | 3 | 0 | 3 | 문서 참조만 3건 (FE 미연결·미등록) |
| `slack_kin` | **ORPHAN** | 3 | 3 | 0 | 0 | 구현·미등록 (3 ep, 3 tbl) |
| `tbm_issue` | **ORPHAN** | 1 | 1 | 0 | 5 | 문서 참조만 5건 (FE 미연결·미등록) |
| `teams` | **ORPHAN** | 5 | 1 | 0 | 3 | 문서 참조만 3건 (FE 미연결·미등록) |
| `uploads` | **ORPHAN** | 1 | 0 | 0 | 5 | 문서 참조만 5건 (FE 미연결·미등록) |
| `workers` | **ORPHAN** | 5 | 3 | 0 | 6 | 문서 참조만 6건 (FE 미연결·미등록) |
| `workflow_integrity` | **ORPHAN** | 5 | 0 | 0 | 1 | 문서 참조만 1건 (FE 미연결·미등록) |

---
## FE references (strict, sample)

### `oauth`
- `nexas/log-in.html` → `/register`
- `nexas/connect.html` → `/register`
### `posts`
- `nexas/assets/js/tai-safety-posts.js` → `/posts/stats/today`
- `nexas/assets/js/tai-safety-detail.js` → `/posts`

## ORPHAN — registration candidates

- **`alert_messages`** (7 ep, tables: `system_alert_messages`)
- **`areas`** (5 ep, tables: `areas`)
- **`auth_oauth`** (1 ep, tables: `users`)
- **`buildings`** (5 ep, tables: `buildings`)
- **`connect_provider`** (6 ep, tables: `connect_provider_services`, `connect_providers`, `connect_service_master`)
- **`contacts`** (13 ep, tables: `companies`, `company_contacts`, `company_files`, `contracts`, `factories`)
- **`emergency_report`** (1 ep, tables: `emergency_reports`, `users`, `utils`)
- **`feature_flags`** (2 ep, tables: `constants`, `factory_features`)
- **`fix_matching_api`** (2 ep, tables: `fix_service_requests`)
- **`industry`** (4 ep, tables: `industry_master`, `supabase`)
- **`kin_generate`** (3 ep, tables: `naver_kin_log`, `naver_monitor`, `supabase`)
- **`process_management`** (8 ep, tables: `factory_process`, `ksic_process_map`, `process_equipment_map`, `supabase`, `v_process_unified`)
- **`roles`** (6 ep, tables: `role_menu_permissions`, `role_permissions`, `roles`)
- **`slack_kin`** (3 ep, tables: `naver_kin_log`, `supabase`, `urllib`)
- **`tbm_issue`** (1 ep, tables: `tbm_attendees`)
- **`teams`** (5 ep, tables: `teams`)
- **`uploads`** (1 ep, tables: —)
- **`workers`** (5 ep, tables: `factories`, `work_schedules`, `worker_registry`)
- **`workflow_integrity`** (5 ep, tables: —)

## DEAD

- **`debug`**: 임시 debug (해결 후 삭제)