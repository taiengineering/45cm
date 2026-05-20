# Operational Lifecycle Runtime

## 철학

```
연결 후 바로 게시하지 않는다.
먼저 분석하고, 운영 상태를 파악하고,
운영 전략을 세팅한 뒤,
정기 운영과 이벤트 운영을 분리한다.
```

## 운영 Lifecycle

```
Connect → Analyze → Operational Intake → Baseline Config → Regular Ops → Event Ops → Recovery
```

| 단계 | 역할 |
|------|------|
| Connect | 채널 연결 (OAuth, Zero-Friction) |
| Analyze | 연결된 채널 상태 분석 (활동성/브랜드/운영) |
| Intake | 운영 정보 수집 (브랜드 톤/목표/리소스/CTA 정책) |
| Baseline | 초기 운영 전략 생성 (권장 cadence/콘텐츠 비율/CTA 강도) |
| Regular | 정기 운영 (slow, stable, trust-oriented) |
| Event | 이벤트 운영 (burst, override, 긴급) |
| Recovery | 피로도 회복 (cooldown, CTA 감소, trust 콘텐츠) |

## Presence Health

채널별 운영 상태:

| 상태 | 의미 |
|------|------|
| healthy | 안정적 운영 |
| recovering | 회복 중 |
| unstable | 불안정 |
| dormant | 휴면 (30일+ 미업데이트) |
| overloaded | 과운영 |
| fatigued | 피로 |

## Regular vs Event Operations

| 항목 | Regular | Event |
|------|---------|-------|
| 속도 | slow, stable | 즉시, burst |
| cadence | 유지 | override 가능 |
| 승인 | normal | fast/emergency |
| 목적 | trust, consistency | 전달, 대응 |
| 리스크 | 낮음 | 높음 (피로도 주의) |

## 이벤트 유형

신제품 / 행사 / 공지 / 장애 / 이슈 / 채용 / 바이럴 / 시즌성

## Recommendation Runtime

AI는 결정하지 않습니다. 운영 판단 정보를 제공합니다.

예시:
```
현재 Instagram 과운영 상태입니다.
Blog authority recovery를 추천합니다.
LinkedIn consistency는 양호합니다.
```

## Cross-Channel Coordination

채널 간 충돌 방지:

```
Instagram overload 시 → Blog trust 콘텐츠 우선
Shorts 피로 시 → LinkedIn authority 콘텐츠 전환
```

## Recovery 전략

- cooldown (발행 중단)
- CTA 감소 (전환 압력 해제)
- trust 콘텐츠 증가
- channel rest (주력 채널 교체)

## DB 테이블

- ops.operational_lifecycle
- ops.presence_health
- ops.operational_intake
- ops.event_operations
- ops.operational_memory
- ops.operational_recommendations
