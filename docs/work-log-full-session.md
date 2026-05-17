# 45cm Marketing Engine — 전체 작업 기록

## 세션: 2026-05-17 (KST)

---

## 완료된 Phase

| Phase | 내용 | API 버전 |
|-------|------|----------|
| Phase 1 | Runtime 8단계 (Queue, AI, DB, Collect, Draft, Humanize, Slack, CTA) | v0.1.0 |
| Phase 2 | Humanize 규칙 + Brand Voice + Queue Observability | v0.2.0 |
| Phase 3 | Operations Console API + React 앱 | v0.2.0 |
| Phase 5 | Auth + Workspace + Publish Runtime + LinkedIn Adapter | v0.3.0 |
| Phase 6 | Auth Middleware + LinkedIn OAuth + Billing + Usage Guard + Audit | v0.4.0 |
| Phase 7 | Admin + Alerts + Invites + Members + Queue Health | v0.5.0 |
| Phase 9 | Workflow + Classification + Rule Engine + Notification | v0.6.0 |
| Engine 독립화 | engines/platform/surfaces 구조 재배치 | v0.6.0 |
| 운영 완성도 | Calendar + Brand Voice 채널분리 + Anti-AI + Engagement | v0.7.0 |

## 플랫폼 현황

| 도메인 | 서비스 | 플랫폼 | 버전 |
|--------|--------|--------|------|
| api.45cm.com | Marketing API | Railway | v0.7.0 |
| app.45cm.com | Operations Console | Cloudflare Pages | 11페이지 |
| 45cm.com | Landing | Cloudflare Pages | ✅ |
| redis.railway.internal | Queue | Railway | ✅ |
| Supabase | DB | Supabase Cloud | 7스키마 |

## 패키지 (16개)

### Engine Runtime (11)
ai, queue, db, event, publish, alert, classification, notification, workflow, rule, policy

### Platform (4)
auth, billing, workspace, shared-types

### Channel (1)
naver-kin

## DB 스키마 (7개)
public, marketing (20+ 테이블), core_ai (5), billing (3), ops (3), workflow (3), graphql_public

## Console 페이지 (11개)
Dashboard, Drafts, Draft Detail, Calendar, Workflows, Queues, Analytics, Alerts, System, Settings, Login

## API 엔드포인트 (30+)
/health, /debug/openai, /debug/redis, /drafts, /drafts/:id, /drafts/:id/score,
/draft/generate, /collect, /publish, /calendar, /calendar/schedule,
/approval/request, /approval/callback, /c/:ctaId,
/workflows, /workflows/:id, /workflows/:id/run, /workflows/runs, /workflows/runs/:id,
/analytics/summary, /analytics/events, /engagement, /comments,
/ops/queues, /ops/alerts, /ops/audit,
/workspace/settings, /workspace/plan, /workspace/members, /workspace/invite, /workspace/integrations,
/admin/stats, /admin/workspaces, /oauth/linkedin/start, /oauth/linkedin/callback

## 해결된 이슈 (7건)
1. Railway 502 (Python 감지) → 전용 레포 + Dockerfile
2. Supabase 스키마 미노출 → ALTER ROLE + NOTIFY
3. OpenAI hang → REDIS_URL 누락 + AbortController 30s
4. Redis MISCONF → Redis 재생성 + 볼륨
5. CTA subject_id UUID → text 타입
6. BullMQ enqueue hang → 10s timeout + non-blocking
7. Vuexy 빌드 실패 → 데모 제거 + 클린 페이지

## 남은 TODO
| 우선 | 항목 |
|------|------|
| P1 | Supabase Auth 실제 연결 (ANON KEY 확보됨) |
| P1 | LinkedIn Developer App 키 등록 |
| P1 | Calendar routes를 server.ts에 연결 |
| P2 | Workflow Step Executor (자동 실행) |
| P2 | Scheduler (cron → workflow trigger) |
| P2 | Content Quality AI Scoring |
| P3 | Admin Web (admin.45cm.com) |
| P3 | 45cm-mkt 레포 archive |
