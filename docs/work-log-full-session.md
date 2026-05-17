# 45cm Marketing Engine — Full Build Session Work Log

## 세션 정보

- **날짜**: 2026-05-17
- **엔진**: Marketing Engine v0.7.0
- **상태**: Operational Preview Mode
- **작업지시서**: 16개 전량 이행 완료

---

## 인프라 현황

| 도메인 | 서비스 | 플랫폼 | 상태 |
|--------|---------|----------|------|
| api.45cm.com | Marketing API v0.7.0 | Railway | ✅ 가동 |
| app.45cm.com | Operations Console (18페이지) | Cloudflare Pages | ✅ 가동 |
| 45cm.com | Landing Site | Cloudflare Pages | ✅ 가동 |
| Redis | Queue Runtime | Railway (bitnami/redis) | ✅ 가동 |
| Supabase | DB (7 schemas, 30+ tables) | Supabase Cloud | ✅ 가동 |

## 작업지시서 이행 내역 (16개)

### 1. 엔진 경계 재정의 + 관재엔진 책임 분리
- ENGINE_BOUNDARY.md 생성 (Reach → Engage → Convert)
- CTA_BOUNDARY.md 생성 (CTA 이전 = Marketing, CTA 이후 = 관재)
- SCOPE.md 생성 (포함 12개 영역, 제외 7개 영역)
- EVENTS.md 생성 (출력 이벤트 9개 + 내부 이벤트 4개)
- engine.manifest.json 업데이트 (capabilities 12개, excluded 6개)

### 2. Control Surface 구축
- Campaign Studio (/campaigns) — 캔페인 생성/설정
- Brand Studio (/brand) — 채널별 7축 슬라이더
- Lead Console (/leads) — CTA/리드 추적
- Engagement Console (/engagement) — 반응/댓글 운영
- layout.tsx 운영자 중심 네비게이션 재정렬

### 3. Brand Studio Multi Preview
- 4개 탭: Live Preview, Before/After, AI Smell, Persona
- Radar Chart (Brand DNA 시각화)
- AI Smell Meter (78% → 18%)
- Persona Matching (최대 5개 Persona Blend %)
- 채널 비교 모드
- CTA 강도별 프리뷰

### 4. Visual Studio 구축
- 6개 Brand Preset (TAI Professional, Clean Corporate, Technical Insight, Safety Alert, Minimal B2B, Industrial Modern)
- 4개 Preview Tab (Live Preview, Channel Compare, CTA Preview, Brand Consistency)
- Brand Consistency Meter (원형 게이지)
- Visual DNA Radar Chart
- AI Visual Smell Meter (68% → 12%)

### 5. Template-first Visual Runtime
- `engines/marketing-engine/runtime/visual/` 패키지 생성
- 7개 템플릿 (linkedin-professional, linkedin-insight, safety-alert, clean-corporate, faq-card, cta-banner, blog-cover)
- 6개 Brand Visual Preset
- SVG Card Generator (`generateCardSVG()`)
- Channel-Template Mapping
- Visual Smell Analyzer

### 6. Content → Visual → Calendar → Publish 연결
- Draft Detail 페이지 4개 탭 (Overview, Visual Assets, Publish Preview, Timeline)
- Flow Steps 시각화 (Draft → Humanize → Visual → Schedule → Approval → Publish)
- LinkedIn 게시 목업 Publish Preview
- 예약 발행 UI
- 발행 전 검사 체크리스트 (5개 항목)

### 7. Adaptive Recommendation (Channel Health)
- `engines/marketing-engine/runtime/channel-health/` 패키지 생성
- Channel Health Dashboard (/channels)
- Health Score 원형 게이지 (LinkedIn 82%, Facebook 48%, Naver Blog 65%)
- Publish Density 바 차트 (28일)
- Fatigue Detection (발행 빈도 + 반응 하락 조합)
- Recommendation Panel (4유형: 제안/경고/인사이트/기회 + 신뢰도%)

### 8. Campaign Intelligence Layer
- `engines/marketing-engine/runtime/campaign-intelligence/` 패키지 생성
- Campaign Intelligence Dashboard (/intelligence)
- Campaign Health Score + 4단계 상태
- 5개 Key Metrics (Engagement/CTA/발행/피로도/브랜드)
- 채널 군형 분석
- CTA 전략 분석 (Soft/Hard/Advisory 비교)
- Operator Notes 시스템

### 9. Strategy Memory Layer
- `engines/marketing-engine/runtime/strategy-memory/` 패키지 생성
- Strategy Memory 페이지 (/memory) 3개 탭
  - Timeline (시간순 전략 변경 이력 + 카테고리 필터)
  - Outcomes (추천 수용/거절 + 결과 추적)
  - Snapshots (전략 스냅샷 비교)
- DB 테이블: strategy_notes, strategy_snapshots, recommendation_outcomes

### 10. Execution Stabilization Sprint
- Campaign CRUD API (POST/GET/PUT/DELETE /campaigns)
- Visual Assets API (POST/GET/DELETE /drafts/:id/visual-assets)
- Draft ↔ Campaign 연결 (campaign_id)
- Approval Gate 강제 (미승인 시 403)
- Publish Mode 분리 (PUBLISH_MODE=mock/real)
- Calendar 라우트 통합 (routes-stabilization.ts)
- DB: campaigns, visual_assets 테이블 생성

### 11. Channel Integration Runtime 모듈화
- `engines/marketing-engine/runtime/channel-integration/` 패키지 생성
- ChannelIntegrationAdapter 인터페이스 (7개 메서드)
- channelRegistry (register/get/list/hasCapability/getByCapability)
- 7개 Channel Adapter: LinkedIn(실구현), Facebook, Naver Blog, Instagram, YouTube, X, Threads
- Provider-agnostic OAuth (/oauth/:provider/start, /oauth/:provider/callback)
- Integration Health API (/integrations/health)
- Integration Providers API (/integrations/providers)
- Settings UI 범용화 (7채널 + capability 뼉지)
- engine.manifest.json 업데이트 (8채널, integration_architecture 추가)

### 12. Integration Runtime Stabilization Sprint
- Build 안정화 (lockfile 정리)
- Registry 검증 (7개 provider 등록 확인)
- OAuth Route 검증 (/oauth/linkedin/start 정상)
- /integrations/providers 검증 (7채널 정상 반환)
- /integrations/health 검증
- Mock/Real Mode 검증 (publish_mode: mock 확인)

### 13. Real Operations Launch Sprint
- LinkedIn Developer App 실제 등록 (App ID: 236300022)
- Railway 환경변수 등록 (LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET)
- LinkedIn OAuth 실제 연결 성공 (connected: true, publishReady: true)
- Dashboard 실행 중심 재정렬 (승인대기/발행완료/실패/CTA/리드 상단)
- Work Log 문서화

### 14. Operations Playbook Sprint
- campaign-policy.md (캔페인 lifecycle, 목표, 채널/CTA/승인 정책, 발행 리듬)
- channel-policy.md (LinkedIn/Facebook/Naver Blog/지식인별 규칙)
- cta-policy.md (Soft/Advisory/Hard CTA 유형, 운영 규칙, 전환 목표)
- approval-policy.md (승인 기준, SLA, 거절 처리)
- publish-rhythm.md (일간/주간 리듬, Fatigue Prevention, Cooldown)
- daily-workflow.md (운영자 하루 6단계)
- failure-playbook.md (실패 대응, 무한 retry 방지)
- launch-checklist.md (출시 체크리스트)
- kpi.md (운영 KPI 7개 + 채널별 KPI + Retrospective)
- brand-rule.md (톤 범위, 채널별 Voice, 금지 표현, Mock→Real 기준)

### 15. Channel Connection Simplification Sprint
- Settings UI 전면 개선 (Connection Wizard, Test Connection, Reconnect)
- DB 확장 (publish_target_id/name, profile_name/avatar)
- OAuth callback에서 프로필 자동 저장
- Test Connection API (/integrations/:provider/test)
- Channel Connection Playbook 문서화
- Capability Badge 시각화 (연결 시 초록)
- 비개발자 운영자 중심 UX

### 16. 파비콘 + UI 정리
- TAI 아이콘 파비콘 등록 (Supabase Storage tai-icon 48/96/192px)
- head 직접 link 태그 방식

---

## Console 페이지 (18개)

| 페이지 | URL | 역할 |
|--------|-----|------|
| Dashboard | /dashboard | 실행 중심 현황 (승인대기/발행/CTA/리드) |
| Campaigns | /campaigns | 캔페인 생성/설정 |
| Intelligence | /intelligence | 캔페인 전략 분석 |
| Strategy Memory | /memory | 운영 전략 축적 |
| Drafts | /drafts | Draft 목록 |
| Draft Detail | /drafts/detail/ | 통합 운영 흐름 (Overview/Visual/Publish/Timeline) |
| Calendar | /calendar | 예약 발행 관리 |
| Brand Studio | /brand | 브랜드 조율 (4개 탭 + Radar) |
| Visual Studio | /visual | 브랜드 시각 운영 |
| Channel Health | /channels | 채널 상태 + 제안 |
| Leads | /leads | 리드/CTA 추적 |
| Engagement | /engagement | 반응/댓글 운영 |
| Analytics | /analytics | 전체 분석 |
| Settings | /settings | 채널 연동 + 운영 설정 |
| Workflows | /workflows | 워크플로 관리 |
| Queues | /queues | Queue 상태 (System) |
| Alerts | /alerts | 런타임 알림 |
| Login | /login | 인증 |

---

## API 엔드포인트 (40+)

### Core
- GET /health
- GET /debug/openai
- GET /debug/redis

### Campaign
- POST /campaigns
- GET /campaigns
- GET /campaigns/:id
- PUT /campaigns/:id
- DELETE /campaigns/:id

### Draft
- GET /drafts
- GET /drafts/:id
- GET /drafts/:id/score
- POST /draft/generate

### Visual Assets
- POST /drafts/:id/visual-assets
- GET /drafts/:id/visual-assets
- DELETE /visual-assets/:id

### Calendar
- GET /calendar
- POST /calendar/schedule

### Publish
- POST /publish
- POST /approval/request
- POST /approval/callback

### CTA
- GET /c/:ctaId

### Analytics
- GET /analytics/summary
- GET /analytics/events

### Engagement
- GET /engagement
- GET /comments

### Channel Integration
- GET /integrations/providers
- GET /integrations/health
- POST /integrations/:provider/test
- POST /integrations/:provider/disconnect
- GET /oauth/:provider/start
- GET /oauth/:provider/callback

### Workspace
- GET /workspace/settings
- PUT /workspace/settings
- GET /workspace/plan
- GET /workspace/members
- POST /workspace/invite
- GET /workspace/integrations

### Workflows
- GET /workflows
- GET /workflows/:id
- POST /workflows
- POST /workflows/:id/run
- GET /workflows/runs
- GET /workflows/runs/:id

### Admin
- GET /admin/stats
- GET /admin/workspaces

### Ops
- GET /ops/queues
- GET /ops/alerts
- POST /ops/alerts/:id/resolve
- GET /ops/audit

### Collect
- POST /collect

---

## Engine Packages (21개)

### Runtime
ai, queue, db, event, publish, alert, classification, notification, workflow, rule, policy, visual, channel-health, campaign-intelligence, strategy-memory, channel-integration

### Platform
auth, billing, workspace, shared-types

### Channel
naver-kin

---

## DB 테이블 (30+)

### marketing schema
workspaces, drafts, campaigns, visual_assets, contents, analytics_events, leads, approval_requests, publish_jobs, scheduled_publishes, engagements, comment_drafts, content_scores, strategy_notes, strategy_snapshots, recommendation_outcomes, workspace_integrations, workspace_settings, workspace_members, workspace_invites, audit_log

### core_ai schema
ai_usage_log

### billing schema
workspace_plans, workspace_usage, workspace_invoices

### ops schema
runtime_alerts, platform_admins

### workflow schema
workflow_definitions, workflow_runs, workflow_step_logs

---

## Channel Adapter 현황 (7개)

| 채널 | Adapter | OAuth | Publish | 상태 |
|------|---------|-------|---------|------|
| LinkedIn | Full | ✅ 연결됨 | ✅ | Active |
| Facebook | Placeholder | ✅ URL | ❌ | Available |
| Naver Blog | Placeholder | ✅ URL | ❌ | Available |
| Instagram | Placeholder | ✅ URL | ❌ | Coming Soon |
| YouTube | Placeholder | ✅ URL | ❌ | Coming Soon |
| X (Twitter) | Placeholder | ✅ URL | ❌ | Coming Soon |
| Threads | Placeholder | ✅ URL | ❌ | Coming Soon |

---

## 운영 문서 (10개)

- docs/operations/campaign-policy.md
- docs/operations/channel-policy.md
- docs/operations/cta-policy.md
- docs/operations/approval-policy.md
- docs/operations/publish-rhythm.md
- docs/operations/daily-workflow.md
- docs/operations/failure-playbook.md
- docs/operations/launch-checklist.md
- docs/operations/kpi.md
- docs/operations/brand-rule.md
- docs/operations/channel-connections.md

---

## 엔진 경계 문서 (4개)

- docs/engines/marketing-engine/ENGINE_BOUNDARY.md
- docs/engines/marketing-engine/CTA_BOUNDARY.md
- docs/engines/marketing-engine/SCOPE.md
- docs/engines/marketing-engine/EVENTS.md
