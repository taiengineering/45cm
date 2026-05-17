# 45cm Marketing Engine

> AI Marketing Operations Engine — Reach, Engage, Convert

## 개요

45cm은 사람 중심의 마케팅 운영 엔진입니다.
AI가 운영을 증폭하고, 운영자가 전략을 판단합니다.

## 아키텍처

```
engines/marketing-engine/    ← 엔진 코어
platform/                    ← auth, billing, workspace
surfaces/app-shell/          ← Operations Console (Next.js)
docs/                        ← 엔진 경계 + 운영 정책
infra/                       ← Dockerfile, 설정
```

## 인프라

| 도메인 | 역할 |
|--------|------|
| api.45cm.com | Marketing API v0.7.0 (Railway) |
| app.45cm.com | Operations Console (Cloudflare Pages) |
| Supabase | Database (30+ tables) |
| Redis | Queue Runtime (BullMQ) |

## 엔진 책임 범위

```
Marketing Engine: Reach → Engage → Convert
관재엔진: Operate → Manage → Retain
경계선: CTA
```

## 빠른 시작

```bash
# API 상태 확인
curl https://api.45cm.com/health

# 콘솔 접속
https://app.45cm.com/dashboard
```

## 문서

- [Engine Boundary](docs/engines/marketing-engine/ENGINE_BOUNDARY.md)
- [CTA Boundary](docs/engines/marketing-engine/CTA_BOUNDARY.md)
- [Scope](docs/engines/marketing-engine/SCOPE.md)
- [Events](docs/engines/marketing-engine/EVENTS.md)
- [Campaign Policy](docs/operations/campaign-policy.md)
- [Daily Workflow](docs/operations/daily-workflow.md)
- [Launch Checklist](docs/operations/launch-checklist.md)
- [Work Log](docs/work-log-full-session.md)
- [Issue Log](docs/issues/issue-log.md)
