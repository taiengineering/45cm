# WORKORDER — API Analysis (22 Active Routers)

> 대상: `taiengineering/tai-api` `routers/` 복원 22개 (rollback #104)
> 분석 repo 산출: `taiengineering/45cm/docs/api-analysis/`
> 작성: 2026-06-08

## 목적

미등록·복원된 22개 라우터의 **Endpoint → Service → DB Table** 추적 및 **ACTIVE / ORPHAN / DEAD** 분류.

## 대상 라우터 (22)

oauth, auth_oauth, workers, alert_messages, areas, buildings,
connect_provider, contacts, debug, emergency_report, feature_flags,
fix_matching_api, industry, kin_generate, posts, process_management,
roles, slack_kin, teams, uploads, workflow_integrity, tbm_issue

## 분석 흐름

```
Router (22) → Endpoint → Service → DB Table → ACTIVE / ORPHAN / DEAD
```

## 분류 기준

| 등급 | 정의 |
|---|---|
| **ACTIVE** | `router_registry` 등록 **또는** taieng 등 프론트/문서에서 endpoint 경로 참조 |
| **ORPHAN** | endpoint+DB(또는 service) 구현 있으나 registry 미등록·프론트 참조 없음 |
| **DEAD** | debug stub, endpoint 없음, 또는 삭제 예정 임시 코드 |

## 산출물 (4)

1. `WORKORDER_API_ANALYSIS.md` — 본 지시서
2. `API_ANALYSIS_01_ROUTER_ENDPOINT_MAP.md` — 라우터별 prefix·endpoint 전수
3. `API_ANALYSIS_02_SERVICE_DB_TRACE.md` — service import·DB table 매핑
4. `API_ANALYSIS_03_CLASSIFICATION.md` — ACTIVE/ORPHAN/DEAD + 근거·다음 액션

## 제약

- 코드/DB/registry 변경 금지 (분석만)
- `_archive/` 22개·등록 검토군(C) 분석 범위 외
