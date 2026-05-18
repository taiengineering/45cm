# 45cm Marketing Engine

> AI Marketing Operations Engine — Reach, Engage, Convert

사람이 전략을 넣고, 엔진이 운영을 증폭하는 시스템.

## 현재 상태

- **API**: v0.7.0 (Railway) — `api.45cm.com`
- **Console**: 20 pages (Cloudflare) — `app.45cm.com`
- **Engine Packages**: 34
- **DB Tables**: 35+
- **Channel Adapters**: 7 (LinkedIn 실제 연결)
- **운영 모드**: Operational Preview (mock publish)

## 아키텍처

```
engines/marketing-engine/    ← 엔진 코어 (34 packages)
  runtime/ai/                ← AI 생성
  runtime/queue/             ← BullMQ 큐
  runtime/publish/           ← 채널 발행
  runtime/publish-safety/    ← 발행 안전
  runtime/token-budget/      ← 비용 제어
  runtime/policy-engine/     ← 운영 정책
  runtime/permissions/       ← 역할 권한
  runtime/simulation/        ← 시뮬레이션
  runtime/simulation-world/  ← 운영 세계
  runtime/runtime-manager/   ← 엔진 모드
platform/                    ← auth, billing, workspace
surfaces/app-shell/          ← Console (Next.js)
docs/                        ← 엔진 경계 + 운영 정책 + Runtime 문서
```

## Runtime Tiers

| Tier | Packages | 설명 |
|------|----------|------|
| Core | 7 | ai, queue, publish, db, event, scheduler, cache |
| Safety | 7 | tenant-isolation, policy-engine, permissions, publish-safety, token-budget, retry-policy, emergency-stop |
| Operational | 6 | campaign-intelligence, channel-health, strategy-memory, channel-integration, visual, brand |
| Simulation | 1 | simulation |
| Experimental | 1 | simulation-world |

## Engine Modes

| Mode | Runtimes | Use Case |
|------|----------|----------|
| minimal | 12 | 초기 SaaS |
| operational | 20 | 일반 운영 |
| simulation | 21 | 시뮬레이션 포함 |
| enterprise | 22 | 전체 |

## 빠른 시작

```bash
curl https://api.45cm.com/health
# → {"status":"healthy","engine":"marketing-engine","v":"0.7.0","publish_mode":"mock"}

https://app.45cm.com/dashboard
```

## 문서

### 엔진 경계
- [ENGINE_BOUNDARY](docs/engines/marketing-engine/ENGINE_BOUNDARY.md)
- [CTA_BOUNDARY](docs/engines/marketing-engine/CTA_BOUNDARY.md)
- [SCOPE](docs/engines/marketing-engine/SCOPE.md)
- [EVENTS](docs/engines/marketing-engine/EVENTS.md)

### 운영 정책
- [Campaign Policy](docs/operations/campaign-policy.md)
- [Channel Policy](docs/operations/channel-policy.md)
- [CTA Policy](docs/operations/cta-policy.md)
- [Daily Workflow](docs/operations/daily-workflow.md)
- [Launch Checklist](docs/operations/launch-checklist.md)
- [KPI](docs/operations/kpi.md)

### Runtime
- [Runtime Guides](docs/runtime/RUNTIME_GUIDES.md)
- [Dependency Map](docs/runtime/RUNTIME_DEPENDENCY_MAP.md)
- [SaaS MVP Profile](docs/runtime/SAAS_MVP_PROFILE.md)
- [Production Topology](docs/runtime/PRODUCTION_RUNTIME_TOPOLOGY.md)

### SaaS
- [Scale Assumptions](docs/SAAS_SCALE_ASSUMPTIONS.md)
- [Production Readiness](docs/PRODUCTION_READINESS.md)
- [Incident Playbook](docs/SAAS_INCIDENT_PLAYBOOK.md)

### 기록
- [Work Log](docs/work-log-full-session.md)
- [Issue Log](docs/issues/issue-log.md)
