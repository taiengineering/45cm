# 45cm Marketing Engine — Full Build Session Work Log

## 세션 정보

- **날짜**: 2026-05-17 ~ 05-20
- **엔진**: Marketing Engine v0.7.0
- **상태**: Operational Preview Mode
- **작업지시서**: 24개 전량 이행 완료
- **Engine 총 패키지**: 36개
- **Console 페이지**: 20개
- **API 엔드포인트**: 45+
- **DB 테이블**: 36+

---

## 인프라 현황

| 도메인 | 서비스 | 플랫폼 | 상태 |
|--------|---------|----------|------|
| api.45cm.com | Marketing API v0.7.0 | Railway | ✅ |
| app.45cm.com | Operations Console (20페이지) | Cloudflare Pages | ✅ |
| 45cm.com | Landing Site | Cloudflare Pages | ✅ |
| Redis | Queue Runtime | Railway (bitnami/redis) | ✅ |
| Supabase | DB (7 schemas, 36+ tables) | Supabase Cloud | ✅ |

---

## 작업지시서 이행 내역 (24개)

### WO-01. 엔진 경계 재정의 + 관재엔진 책임 분리
- ENGINE_BOUNDARY.md (Reach → Engage → Convert)
- CTA_BOUNDARY.md (CTA 이전 = Marketing, CTA 이후 = 관재)
- SCOPE.md / EVENTS.md / engine.manifest.json

### WO-02. Control Surface 구축
- Campaign Studio, Brand Studio, Lead Console, Engagement Console
- layout.tsx 운영자 중심 네비게이션

### WO-03. Brand Studio Multi Preview
- 4개 탭 (Live/Before-After/AI Smell/Persona)
- Radar Chart, AI Smell Meter (78%→18%), Persona Matching

### WO-04. Visual Studio 구축
- 6 Preset, 4 Preview Tab, Consistency Meter, Visual DNA Radar

### WO-05. Template-first Visual Runtime
- `runtime/visual/` — 7 템플릿, SVG Card Generator

### WO-06. Content→Visual→Calendar→Publish 연결
- Draft Detail 4탭, Flow Steps, LinkedIn Publish Preview

### WO-07. Adaptive Recommendation (Channel Health)
- `runtime/channel-health/` — Health Score, Fatigue Detection, Recommendation

### WO-08. Campaign Intelligence Layer
- `runtime/campaign-intelligence/` — Health Score, Channel Mix, CTA Strategy

### WO-09. Strategy Memory Layer
- `runtime/strategy-memory/` — Timeline/Outcomes/Snapshots
- DB: strategy_notes, strategy_snapshots, recommendation_outcomes

### WO-10. Execution Stabilization Sprint
- Campaign CRUD API, Visual Assets API, Approval Gate (403)
- Publish Mode (mock/real), routes-stabilization.ts

### WO-11. Channel Integration Runtime 모듈화
- `runtime/channel-integration/` — 7채널 Adapter, channelRegistry
- Provider-agnostic OAuth, Integration Health/Providers API

### WO-12. Integration Runtime Stabilization
- Build/Registry/OAuth/Health/Mock-Real 검증

### WO-13. Real Operations Launch
- LinkedIn Developer App 등록 (App ID: 236300022)
- **LinkedIn OAuth 실제 연결 성공**

### WO-14. Operations Playbook
- 10개 운영 정책 문서 (campaign/channel/cta/approval/publish-rhythm/daily-workflow/failure/launch/kpi/brand)

### WO-15. Channel Connection Simplification
- Connection Wizard, Test Connection API, Profile Auto-save

### WO-16. 파비콘 + UI 정리
- TAI 아이콘 (Supabase Storage 48/96/192px)

### WO-17. Core Runtime Stabilization Sprint
- `runtime/token-budget/` — Soft/Hard/Burst limit
- `runtime/cache/` — Redis 캐시 + Response Fingerprinting
- `runtime/retry-policy/` — 실패 분류 (network→retry, auth→stop, validation→DLQ)
- `runtime/scheduler/` — Publish Window, Cooldown
- Queue Registry + Priority Queue + DLQ
- DB: workspace_token_limits, runtime_metrics, dead_letter_jobs

### WO-18. Operational Simulation Runtime Sprint
- `runtime/simulation/` — 11모듈 (SimulationEngine, Engagement/CTA/Fatigue/Approval/Density Simulator)
- Channel Coefficients (4채널)
- Simulation Dashboard (/simulation) + Compare Mode
- DB: simulation_runs/events/metrics

### WO-19. SaaS Safety & Tenant Isolation Sprint
- `runtime/tenant-isolation/` — ws-scoped queue/cache/metric/dlq
- `runtime/publish-safety/` — 5개 pre-publish 검증
- `runtime/emergency-stop/` — 1클릭 중단
- `runtime/permissions/` — 5 Role (owner/strategist/operator/reviewer/viewer)
- `runtime/policy-engine/` — 8개 기본 정책
- DB: emergency_stop columns on workspace_settings

### WO-20. Persistent Simulation World Sprint
- `runtime/simulation-world/` — 12모듈 (WorldEngine, TimeEngine, CampaignLifecycle, ChannelStateMachine, AudienceBehavior, FatigueAccumulation, CTAResistance, RecoveryEngine, OperatorLoad, AudienceSegments, MarketDrift, DatasetAccumulator)
- World Dashboard (/world)
- DB: simulation_worlds, simulation_world_events, simulation_operational_history

### WO-21. Engine Consolidation Sprint
- `runtime/runtime-manager/` — Runtime 토글/모드/부트스트랩
- 4계층 분류: core(7)/safety(7)/operational(6)/simulation(1)/experimental(1)
- 5개 Engine Mode: minimal/operational/simulation/enterprise/development
- engine.manifest.json v2

### WO-22. Korea-first Universal Channel Runtime Sprint
- 7개 카테고리 (social/blog/short_video/video/community/messaging/search_presence)
- 18개 범용 채널 등록 (categories.ts, universal-registry.ts)
- 12개 Capability 유형 (capabilities.ts)
- 18개 채널 정책 (channel-policies.ts)
- Settings UI 카테고리 탭
- KOREA_UNIVERSAL_CHANNEL_MODEL.md

### WO-23. Zero-Friction Channel Connection Sprint
- OAuth Runtime 6모듈 (SessionManager, TokenStore, RefreshManager, ScopeValidator, ReconnectEngine, CapabilitySync)
- Universal Provider Interface (connect/disconnect/refresh/health/capabilities/publishTargets)
- Connection Health 7상태 + Human Language Alerts
- Silent Recovery Runtime
- DB: ops.connection_events
- ZERO_FRICTION_CONNECTION_ARCHITECTURE.md

### WO-24. Real Platform Validation Sprint
- 웹 리서치: LinkedIn/Meta/Naver Blog/Kakao/YouTube API 검증
- `runtime/platform-restrictions/` — 채널별 제약, 자동화 레벨, Publish Risk Score
- `runtime/platform-strategy/` — 자동화 전략 + Manual Assist Fallback
- 5개 플랫폼 검증 문서:
  - linkedin-validation.md — full_automation ✅
  - meta-validation.md — full_automation (App Review 필요)
  - naver-blog-validation.md — assisted (API 존재, 신중 운영)
  - kakao-validation.md — assisted (딜러사 필요)
  - youtube-validation.md — full_automation (Quota 관리)
- REAL_PLATFORM_CAPABILITIES.md — 전체 매트릭스

---

## Engine Packages (36개)

### Core Execution (7)
ai · queue · publish · db · event · scheduler · cache

### Safety (7)
tenant-isolation · policy-engine · permissions · publish-safety · token-budget · retry-policy · emergency-stop

### Operational (6)
campaign-intelligence · channel-health · strategy-memory · channel-integration · visual · brand

### Simulation (1)
simulation

### Experimental (1)
simulation-world

### Manager (1)
runtime-manager

### Platform Validation (2)
platform-restrictions · platform-strategy

### Platform (4)
auth · billing · workspace · shared-types

### Channel (1)
naver-kin

### Other (6)
alert · classification · notification · workflow · rule · policy

---

## Console 페이지 (20개)

Dashboard · Campaigns · Intelligence · Strategy Memory · Simulation · World · Drafts · Draft Detail · Calendar · Brand Studio · Visual Studio · Channel Health · Leads · Engagement · Analytics · Settings · Workflows · System · Alerts · Login

---

## 문서 전체 목록 (25+)

### 엔진 경계
docs/engines/marketing-engine/ENGINE_BOUNDARY.md · CTA_BOUNDARY.md · SCOPE.md · EVENTS.md

### 운영 정책 (11)
docs/operations/campaign-policy.md · channel-policy.md · cta-policy.md · approval-policy.md · publish-rhythm.md · daily-workflow.md · failure-playbook.md · launch-checklist.md · kpi.md · brand-rule.md · channel-connections.md

### Runtime 문서 (4)
docs/runtime/RUNTIME_DEPENDENCY_MAP.md · SAAS_MVP_PROFILE.md · PRODUCTION_RUNTIME_TOPOLOGY.md · RUNTIME_GUIDES.md

### 플랫폼 검증 (6)
docs/platforms/REAL_PLATFORM_CAPABILITIES.md · linkedin-validation.md · meta-validation.md · naver-blog-validation.md · kakao-validation.md · youtube-validation.md

### 제품 문서 (2)
docs/product/KOREA_UNIVERSAL_CHANNEL_MODEL.md · ZERO_FRICTION_CONNECTION_ARCHITECTURE.md

### SaaS 문서 (4)
docs/SAAS_SCALE_ASSUMPTIONS.md · PRODUCTION_READINESS.md · SAAS_INCIDENT_PLAYBOOK.md · SIMULATION_DATASET.md

---

## Key IDs & Config

- Railway project: `7c3ab53b-feb6-40a4-a4f0-7ade3f6e524b`
- Railway 45cm-mkt service: `28d42605-e6b8-40fb-9b03-f266a2cea57b`
- Railway Redis: `b9277361-4c87-499d-bc11-4e77fd03588c`
- Supabase: `vwlahtguyggrhvslabax.supabase.co`
- Default workspace: `a0000000-0000-0000-0000-000000000001`
- First campaign: `bdd9f7a2-6dc4-4f69-bd15-773e214142e1`
- LinkedIn App ID: 236300022 / Client ID: 86cug49ujwidrz
- PUBLISH_MODE: mock
