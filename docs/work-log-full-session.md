# 45cm Marketing Engine — Full Build Session Work Log

## 세션 정보

- **날짜**: 2026-05-17 ~ 05-18
- **엔진**: Marketing Engine v0.7.0
- **상태**: Operational Preview Mode
- **작업지시서**: 21개 전량 이행 완료
- **Engine 총 패키지**: 34개
- **Console 페이지**: 20개
- **API 엔드포인트**: 45+
- **DB 테이블**: 35+

---

## 인프라 현황

| 도메인 | 서비스 | 플랫폼 | 상태 |
|--------|---------|----------|------|
| api.45cm.com | Marketing API v0.7.0 | Railway | ✅ 가동 |
| app.45cm.com | Operations Console (20페이지) | Cloudflare Pages | ✅ 가동 |
| 45cm.com | Landing Site | Cloudflare Pages | ✅ 가동 |
| Redis | Queue Runtime | Railway (bitnami/redis) | ✅ 가동 |
| Supabase | DB (7 schemas, 35+ tables) | Supabase Cloud | ✅ 가동 |

---

## 작업지시서 이행 내역 (21개)

### 1. 엔진 경계 재정의 + 관재엔진 책임 분리
- ENGINE_BOUNDARY.md (Reach → Engage → Convert)
- CTA_BOUNDARY.md (CTA 이전 = Marketing, CTA 이후 = 관재)
- SCOPE.md (포함 12개 영역, 제외 7개 영역)
- EVENTS.md (출력 이벤트 9개 + 내부 이벤트 4개)
- engine.manifest.json 업데이트

### 2. Control Surface 구축
- Campaign Studio (/campaigns)
- Brand Studio (/brand) — 채널별 7축 슬라이더
- Lead Console (/leads)
- Engagement Console (/engagement)
- layout.tsx 운영자 중심 네비게이션

### 3. Brand Studio Multi Preview
- 4개 탭: Live Preview, Before/After, AI Smell, Persona
- Radar Chart (Brand DNA)
- AI Smell Meter (78% → 18%)
- Persona Matching (5개 Blend %)
- 채널 비교 + CTA 강도별 프리뷰

### 4. Visual Studio 구축
- 6개 Brand Preset
- 4개 Preview Tab
- Brand Consistency Meter (원형 게이지)
- Visual DNA Radar Chart
- AI Visual Smell Meter

### 5. Template-first Visual Runtime
- `runtime/visual/` 패키지 — 7개 템플릿, 6개 프리셋
- SVG Card Generator (`generateCardSVG()`)
- Channel-Template Mapping
- Visual Smell Analyzer

### 6. Content → Visual → Calendar → Publish 연결
- Draft Detail 4개 탭 (Overview/Visual/Publish Preview/Timeline)
- Flow Steps (Draft→Humanize→Visual→Schedule→Approval→Publish)
- LinkedIn 게시 목업 Publish Preview
- 예약 발행 UI + 발행 전 검사 5개

### 7. Adaptive Recommendation (Channel Health)
- `runtime/channel-health/` 패키지
- Channel Health Dashboard (/channels)
- Health Score 게이지 (LinkedIn 82%, Facebook 48%, Naver Blog 65%)
- Publish Density 바 차트
- Fatigue Detection + Recommendation Panel

### 8. Campaign Intelligence Layer
- `runtime/campaign-intelligence/` 패키지
- Campaign Intelligence Dashboard (/intelligence)
- Campaign Health Score + 5개 Key Metrics
- 채널 균형 + CTA 전략 분석 + Operator Notes

### 9. Strategy Memory Layer
- `runtime/strategy-memory/` 패키지
- Strategy Memory 페이지 (/memory) 3개 탭
- DB: strategy_notes, strategy_snapshots, recommendation_outcomes

### 10. Execution Stabilization Sprint
- Campaign CRUD API (POST/GET/PUT/DELETE)
- Visual Assets API
- Draft↔Campaign 연결 (campaign_id)
- Approval Gate (미승인 시 403)
- Publish Mode (mock/real)
- Calendar 라우트 통합 (routes-stabilization.ts)

### 11. Channel Integration Runtime 모듈화
- `runtime/channel-integration/` — 7개 Channel Adapter
- ChannelIntegrationAdapter 인터페이스 (7개 메서드)
- channelRegistry (register/get/list/hasCapability)
- Provider-agnostic OAuth (/oauth/:provider/start, callback)
- Integration Health API + Providers API
- Settings UI 범용화

### 12. Integration Runtime Stabilization Sprint
- Build 안정화
- Registry/OAuth/Health 검증
- Mock/Real Mode 검증
- Placeholder provider UX 안정화

### 13. Real Operations Launch Sprint
- LinkedIn Developer App 실제 등록 (App ID: 236300022)
- Railway 환경변수 (LINKEDIN_CLIENT_ID/SECRET)
- **LinkedIn OAuth 실제 연결 성공** (connected: true, publishReady: true)
- Dashboard 실행 중심 재정렬

### 14. Operations Playbook Sprint
- campaign-policy.md, channel-policy.md, cta-policy.md
- approval-policy.md, publish-rhythm.md, daily-workflow.md
- failure-playbook.md, launch-checklist.md, kpi.md, brand-rule.md

### 15. Channel Connection Simplification Sprint
- Settings UI 전면 개선 (Connection Wizard, Test Connection)
- DB 확장 (publish_target, profile_name/avatar)
- OAuth callback 프로필 자동 저장
- Test Connection API (/integrations/:provider/test)
- Channel Connection Playbook

### 16. 파비콘 + UI 정리
- TAI 아이콘 파비콘 (Supabase Storage 48/96/192px)
- head 직접 link 태그 방식

### 17. Core Runtime Stabilization Sprint
- `runtime/token-budget/` — Workspace별 토큰 제어 (soft/hard/burst)
- `runtime/cache/` — Redis 캐시 + Response Fingerprinting
- `runtime/retry-policy/` — 실패 분류 (network→retry, auth→stop, validation→DLQ)
- `runtime/scheduler/` — 예약 발행, Publish Window, Cooldown
- Queue Registry + Priority Queue + DLQ
- DB: workspace_token_limits, runtime_metrics, dead_letter_jobs
- docs: SAAS_SCALE_ASSUMPTIONS.md, PRODUCTION_READINESS.md

### 18. Operational Simulation Runtime Sprint
- `runtime/simulation/` — 11개 모듈
- SimulationEngine, Engagement/CTA/Fatigue/Approval/Density Simulator
- Channel Coefficients (LinkedIn/Facebook/Naver Blog/Instagram)
- Simulation Dashboard (/simulation) — 비교 모드
- DB: simulation_runs, simulation_events, simulation_metrics
- docs: SIMULATION_DATASET.md

### 19. SaaS Safety & Tenant Isolation Sprint
- `runtime/tenant-isolation/` — ws-scoped namespace
- `runtime/publish-safety/` — 5개 pre-publish 검증
- `runtime/emergency-stop/` — 1클릭 중단
- `runtime/permissions/` — 5 Role
- `runtime/policy-engine/` — 8개 기본 정책
- DB: emergency_stop columns
- docs: SAAS_INCIDENT_PLAYBOOK.md, PRODUCTION_READINESS v2

### 20. Persistent Simulation World Sprint
- `runtime/simulation-world/` — 12개 모듈
- WorldEngine, TimeEngine, CampaignLifecycle, ChannelStateMachine
- AudienceBehavior, FatigueAccumulation, CTAResistance, RecoveryEngine
- OperatorLoad, AudienceSegments, MarketDrift, DatasetAccumulator
- World Dashboard (/world)
- DB: simulation_worlds, simulation_world_events, simulation_operational_history

### 21. Engine Consolidation Sprint
- `runtime/runtime-manager/` — Runtime 토글/모드/부트스트랩
- 4계층 분류: core(7)/safety(7)/operational(6)/simulation(1)/experimental(1)
- 5개 Engine Mode: minimal(12)/operational(20)/simulation(21)/enterprise(22)/development
- engine.manifest.json v2 (runtime_tiers + engine_modes + safety)
- docs: RUNTIME_DEPENDENCY_MAP, SAAS_MVP_PROFILE, PRODUCTION_RUNTIME_TOPOLOGY, RUNTIME_GUIDES

---

## Console 페이지 (20개)

| 페이지 | URL | 역할 |
|--------|-----|------|
| Dashboard | /dashboard | 실행 중심 (승인대기/발행/CTA/리드) |
| Campaigns | /campaigns | 캠페인 생성/설정 |
| Intelligence | /intelligence | 캠페인 전략 분석 |
| Strategy Memory | /memory | 운영 전략 축적 |
| Simulation | /simulation | 운영 시뮬레이션 |
| World | /world | Persistent 운영 세계 |
| Drafts | /drafts | Draft 목록 |
| Draft Detail | /drafts/detail/ | 통합 운영 흐름 |
| Calendar | /calendar | 예약 발행 |
| Brand Studio | /brand | 브랜드 조율 (4탭+Radar) |
| Visual Studio | /visual | 시각 운영 |
| Channel Health | /channels | 채널 상태+제안 |
| Leads | /leads | 리드/CTA 추적 |
| Engagement | /engagement | 반응/댓글 운영 |
| Analytics | /analytics | 전체 분석 |
| Settings | /settings | 채널 연동+운영 설정 |
| Workflows | /workflows | 워크플로 |
| System | /queues | Queue/Alerts/Audit |
| Alerts | /alerts | 런타임 알림 |
| Login | /login | 인증 |

---

## Engine Packages (34개)

### Core Execution (7)
ai · queue · publish · db · event · scheduler · cache

### Safety (7)
tenant-isolation · policy-engine · permissions · publish-safety · token-budget · retry-policy · emergency-stop

### Operational (6)
campaign-intelligence · channel-health · strategy-memory · channel-integration · visual · brand (config)

### Simulation (1)
simulation

### Experimental (1)
simulation-world

### Manager (1)
runtime-manager

### Platform (4)
auth · billing · workspace · shared-types

### Channel (1)
naver-kin

### Other (6)
alert · classification · notification · workflow · rule · policy

---

## API 엔드포인트 (45+)

### Core
GET /health · GET /debug/openai · GET /debug/redis

### Campaign
POST /campaigns · GET /campaigns · GET /campaigns/:id · PUT /campaigns/:id · DELETE /campaigns/:id

### Draft
GET /drafts · GET /drafts/:id · GET /drafts/:id/score · POST /draft/generate

### Visual Assets
POST /drafts/:id/visual-assets · GET /drafts/:id/visual-assets · DELETE /visual-assets/:id

### Calendar
GET /calendar · POST /calendar/schedule

### Publish
POST /publish · POST /approval/request · POST /approval/callback

### CTA
GET /c/:ctaId

### Analytics
GET /analytics/summary · GET /analytics/events

### Engagement
GET /engagement · GET /comments

### Channel Integration
GET /integrations/providers · GET /integrations/health · POST /integrations/:provider/test · POST /integrations/:provider/disconnect · GET /oauth/:provider/start · GET /oauth/:provider/callback

### Workspace
GET /workspace/settings · PUT /workspace/settings · GET /workspace/plan · GET /workspace/members · POST /workspace/invite · GET /workspace/integrations

### Workflows
GET /workflows · GET /workflows/:id · POST /workflows · POST /workflows/:id/run · GET /workflows/runs · GET /workflows/runs/:id

### Admin
GET /admin/stats · GET /admin/workspaces

### Ops
GET /ops/queues · GET /ops/alerts · POST /ops/alerts/:id/resolve · GET /ops/audit

### Collect
POST /collect

---

## DB 테이블 (35+)

### marketing schema
workspaces · drafts · campaigns · visual_assets · contents · analytics_events · leads · approval_requests · publish_jobs · scheduled_publishes · engagements · comment_drafts · content_scores · strategy_notes · strategy_snapshots · recommendation_outcomes · workspace_integrations · workspace_settings · workspace_members · workspace_invites · audit_log

### core_ai schema
ai_usage_log

### billing schema
workspace_plans · workspace_usage · workspace_invoices · workspace_token_limits

### ops schema
runtime_alerts · platform_admins · runtime_metrics · dead_letter_jobs · simulation_runs · simulation_events · simulation_metrics · simulation_worlds · simulation_world_events · simulation_operational_history

### workflow schema
workflow_definitions · workflow_runs · workflow_step_logs

---

## Channel Adapter 현황 (7개)

| 채널 | Adapter | OAuth | Publish | 상태 |
|------|---------|-------|---------|------|
| LinkedIn | Full | ✅ 실제 연결됨 | ✅ (mock) | Active |
| Facebook | Placeholder | ✅ URL | ❌ | Available |
| Naver Blog | Placeholder | ✅ URL | ❌ | Available |
| Instagram | Placeholder | ✅ URL | ❌ | Coming Soon |
| YouTube | Placeholder | ✅ URL | ❌ | Coming Soon |
| X (Twitter) | Placeholder | ✅ URL | ❌ | Coming Soon |
| Threads | Placeholder | ✅ URL | ❌ | Coming Soon |

---

## 운영 문서 (15+)

### 엔진 경계
docs/engines/marketing-engine/ENGINE_BOUNDARY.md · CTA_BOUNDARY.md · SCOPE.md · EVENTS.md

### 운영 정책
docs/operations/campaign-policy.md · channel-policy.md · cta-policy.md · approval-policy.md · publish-rhythm.md · daily-workflow.md · failure-playbook.md · launch-checklist.md · kpi.md · brand-rule.md · channel-connections.md

### Runtime 문서
docs/runtime/RUNTIME_DEPENDENCY_MAP.md · SAAS_MVP_PROFILE.md · PRODUCTION_RUNTIME_TOPOLOGY.md · RUNTIME_GUIDES.md

### SaaS 문서
docs/SAAS_SCALE_ASSUMPTIONS.md · PRODUCTION_READINESS.md · SAAS_INCIDENT_PLAYBOOK.md · SIMULATION_DATASET.md
