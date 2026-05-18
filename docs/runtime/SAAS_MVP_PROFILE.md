# SaaS MVP Runtime Profile

## MVP 포함 Runtime

### Core (필수)
- ai
- queue
- publish
- db
- event
- cache

### Safety (필수)
- tenant-isolation
- policy-engine
- permissions
- publish-safety
- token-budget
- retry-policy
- emergency-stop

### Operational (포함)
- campaign-intelligence
- channel-health
- channel-integration
- strategy-memory
- visual
- scheduler

## MVP 제외 Runtime

### Simulation (제외)
- simulation
- simulation-world

## MVP 운영 모드

```
ENGINE_MODE=operational
PUBLISH_MODE=real
ENABLE_SIMULATION=false
ENABLE_WORLD=false
```

## MVP Console 페이지 (15개)

| 페이지 | 포함 | 비고 |
|--------|------|------|
| Dashboard | ✅ | 실행 중심 |
| Campaigns | ✅ | CRUD |
| Intelligence | ✅ | 전략 분석 |
| Strategy Memory | ✅ | 전략 축적 |
| Drafts | ✅ | 콘텐츠 관리 |
| Draft Detail | ✅ | 통합 흐름 |
| Calendar | ✅ | 예약 발행 |
| Brand Studio | ✅ | 브랜드 조율 |
| Visual Studio | ✅ | 시각 운영 |
| Channel Health | ✅ | 채널 상태 |
| Leads | ✅ | 리드 추적 |
| Engagement | ✅ | 반응 운영 |
| Analytics | ✅ | 전체 분석 |
| Settings | ✅ | 채널 연동 |
| System | ✅ | Queue/Alerts |
| Simulation | ❌ | MVP 제외 |
| World | ❌ | MVP 제외 |

## MVP 비용 추정 (10 workspace)

| 항목 | 월 비용 |
|------|--------|
| OpenAI | ~$5 |
| Railway | ~$10 |
| Supabase (Free) | $0 |
| Cloudflare | $0 |
| **Total** | **~$15/month** |
