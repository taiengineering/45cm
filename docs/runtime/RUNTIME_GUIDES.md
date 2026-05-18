# Runtime Guides

## Core Execution
- [ai](../../engines/marketing-engine/runtime/ai/) — OpenAI 기반 콘텐츠 생성
- [queue](../../engines/marketing-engine/runtime/queue/) — BullMQ 기반 작업 큐
- [publish](../../engines/marketing-engine/runtime/publish/) — 채널 발행
- [db](../../engines/marketing-engine/runtime/db/) — Supabase CRUD
- [event](../../engines/marketing-engine/runtime/event/) — 이벤트 발행
- [scheduler](../../engines/marketing-engine/runtime/scheduler/) — 예약 발행 + Publish Window
- [cache](../../engines/marketing-engine/runtime/cache/) — Redis 캐시 + 응답 Fingerprint

## Safety
- [tenant-isolation](../../engines/marketing-engine/runtime/tenant-isolation/) — Workspace 격리
- [policy-engine](../../engines/marketing-engine/runtime/policy-engine/) — 운영 정책 강제
- [permissions](../../engines/marketing-engine/runtime/permissions/) — Role 기반 접근 제어
- [publish-safety](../../engines/marketing-engine/runtime/publish-safety/) — 발행 전 5개 검증
- [token-budget](../../engines/marketing-engine/runtime/token-budget/) — AI 비용 제어
- [retry-policy](../../engines/marketing-engine/runtime/retry-policy/) — 실패 분류 + 재시도 정책
- [emergency-stop](../../engines/marketing-engine/runtime/emergency-stop/) — 1클릭 중단

## Operational
- [campaign-intelligence](../../engines/marketing-engine/runtime/campaign-intelligence/) — 캔페인 분석
- [channel-health](../../engines/marketing-engine/runtime/channel-health/) — 채널 건강도
- [strategy-memory](../../engines/marketing-engine/runtime/strategy-memory/) — 전략 축적
- [channel-integration](../../engines/marketing-engine/runtime/channel-integration/) — 채널 연동
- [visual](../../engines/marketing-engine/runtime/visual/) — 시각 자산 생성

## Simulation
- [simulation](../../engines/marketing-engine/runtime/simulation/) — 단발 시뮬레이션
- [simulation-world](../../engines/marketing-engine/runtime/simulation-world/) — 지속 운영 세계

## Infrastructure
- [runtime-manager](../../engines/marketing-engine/runtime/runtime-manager/) — Runtime 토글/모드/부트스트랩
