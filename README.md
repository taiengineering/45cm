# 45cm

**Operational Runtime Platform**

45cm는 서비스 모음이 아니라, Operational Runtime Platform이다.

## 아키텍처 원칙

```
Repo는 하나
Runtime은 분리
Domain은 Pack화
Surface는 Subdomain화
```

## 구조

```
45cm/
├─ apps/                    # Surface Layer
│   ├─ marketing-api/       # api.45cm.com (Runtime API)
│   ├─ marketing-worker/    # BullMQ Worker
│   ├─ marketing-web/       # marketing.45cm.com (Ops Console)
│   ├─ app-shell/           # app.45cm.com (SaaS Shell)
│   ├─ admin-web/           # admin.45cm.com (Platform Admin)
│   ├─ scheduler/           # Cron / Periodic Jobs
│   └─ marketing-ai-worker/ # AI Queue Worker
├─ packages/                # Runtime Layer
│   ├─ core-ai-runtime/     # OpenAI Gateway + Humanize + Brand Voice
│   ├─ core-queue-runtime/  # BullMQ + Redis
│   ├─ core-event-runtime/  # Event Envelope
│   ├─ core-db-runtime/     # Supabase CRUD
│   ├─ core-policy-runtime/ # Approval Policy
│   ├─ core-shared-types/   # Platform Types
│   └─ channel-naver-kin/   # Naver API Adapter
├─ domain-packs/            # Domain Layer
│   ├─ tai/                 # TAI Engineering (Brand, CTA, Keywords)
│   └─ default/             # Default Pack
├─ docs/                    # Documentation
├─ infra/                   # Infrastructure Config
└─ scripts/                 # Bootstrap / Migration / Seed
```

## Runtime 흐름

```
Keyword → Collect → AI Draft → Humanize → Approval → Publish → CTA Track
```

## 인프라

| 서비스 | 플랫폼 | 도메인 |
|--------|--------|--------|
| Marketing API + Worker | Railway | api.45cm.com |
| Redis | Railway (내부) | redis.railway.internal |
| Database | Supabase | vwlahtguyggrhvslabax.supabase.co |
| Landing | Cloudflare Pages | 45cm.com |
| Ops Console | Cloudflare Pages | marketing.45cm.com |
| TAI API (기존) | Railway | api.taieng.co.kr |

## API Endpoints

| Method | Path | 설명 |
|--------|------|------|
| GET | /health | 서비스 상태 |
| GET | /debug/openai | OpenAI 연결 진단 |
| GET | /debug/redis | Redis 연결 진단 |
| GET | /drafts | Draft 목록 |
| GET | /ops/queues | Queue 상태 |
| GET | /analytics/summary | 통계 요약 |
| POST | /collect | 키워드 수집 |
| POST | /draft/generate | AI 드래프트 생성 |
| POST | /approval/request | Slack 승인 요청 |
| GET | /c/:ctaId | CTA 추적 + 리다이렉트 |

## 로컬 실행

```bash
pnpm install
pnpm dev:marketing  # API + Worker
pnpm dev:web        # Ops Console
```