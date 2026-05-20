# 45cm Marketing Engine

> AI Marketing Operations Engine — Reach, Engage, Convert

사람이 전략을 넣고, 엔진이 운영을 증폭하는 시스템.

## 현재 상태

- **API**: v0.7.0 (Railway) — `api.45cm.com`
- **Console**: 20 pages (Cloudflare) — `app.45cm.com`
- **Engine Packages**: 36
- **DB Tables**: 36+
- **Channel Adapters**: 18채널 (LinkedIn 실제 연결)
- **작업지시서**: 24개 완료
- **해결된 이슈**: 12개
- **운영 모드**: Operational Preview (mock publish)

## 아키텍처

```
engines/marketing-engine/      ← 36 packages
  runtime/ai/                  ← AI 생성
  runtime/queue/               ← BullMQ Queue
  runtime/publish/             ← 채널 발행
  runtime/publish-safety/      ← 발행 안전 (5개 검증)
  runtime/token-budget/        ← 비용 제어
  runtime/policy-engine/       ← 8개 운영 정책
  runtime/permissions/         ← 5 Role
  runtime/emergency-stop/      ← 1클릭 중단
  runtime/channel-integration/ ← 18채널 + OAuth Runtime
  runtime/platform-restrictions/← 플랫폼 제약
  runtime/platform-strategy/   ← 자동화 전략
  runtime/simulation/          ← 시뮬레이션
  runtime/simulation-world/    ← 운영 세계
  runtime/runtime-manager/     ← 엔진 모드
platform/                      ← auth, billing, workspace
surfaces/app-shell/            ← Console (Next.js, 20페이지)
docs/                          ← 25+ 문서
```

## Runtime Tiers (5계층)

| Tier | Packages |
|------|----------|
| Core | ai, queue, publish, db, event, scheduler, cache |
| Safety | tenant-isolation, policy-engine, permissions, publish-safety, token-budget, retry-policy, emergency-stop |
| Operational | campaign-intelligence, channel-health, strategy-memory, channel-integration, visual, brand |
| Simulation | simulation |
| Experimental | simulation-world |

## 플랫폼 자동화 레벨

| 레벨 | 채널 |
|------|--------|
| full_automation | LinkedIn, Facebook, Instagram, YouTube, Threads, Google Business |
| assisted | Naver Blog, Kakao Channel, Email, Alimtalk |
| manual_required | Tistory, Brunch, Naver Cafe, Naver Place |

## 문서

- [Work Log](docs/work-log-full-session.md) — 24개 작업지시서 상세
- [Issue Log](docs/issues/issue-log.md) — 12 해결 + 8 대기
- [Runtime Guides](docs/runtime/RUNTIME_GUIDES.md)
- [Platform Capabilities](docs/platforms/REAL_PLATFORM_CAPABILITIES.md)
- [Production Readiness](docs/PRODUCTION_READINESS.md)
- [Incident Playbook](docs/SAAS_INCIDENT_PLAYBOOK.md)
