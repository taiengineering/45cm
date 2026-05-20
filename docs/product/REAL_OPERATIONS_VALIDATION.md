# Real Operations Validation

## 철학

```
이제 기능 추가보다,
실제 운영자가 편한지가 중요하다.
```

## 검증 영역

### Feed Validation
- Feed Overload: 너무 많은 항목 노출 여부
- Feed Noise: 쓸모없는 추천 존재 여부
- Priority Accuracy: critical이 진짜 critical인가
- Action Utility: 버튼 액션이 실제 도움 되는가

### Operator Fatigue
- 승인 5건+ → 피로
- 알림 8건+ → 과다
- 중단 3회+ → 집중 불가
- 전체 70%+ → overload

### Feed Compression
- 중복 제거 (deduplication)
- 우선순위 정렬
- Focus Mode (중요한 것만)
- 최대 5개 노출

### Queue Stress
- 대기 5건+ → busy
- 응답 4시간+ → 지연
- 방치 1건+ → 문제

### Human Trust
- followed: 신뢰 100%
- modified: 60%
- rejected: 10%
- ignored: 20%

## Workspace Warmth

딸딸한 시스템이 아니라, 매일 들어오고 싶은 Workspace:

- 사람 언어 피드백
- 상태 표현 ("오늘 운영은 안정적입니다")
- 운영 안심감 ("수고하셨습니다")

## Daily Rhythm

| 시간 | 활동 |
|------|------|
| 오전 | Feed 확인 + 승인 + Surface 점검 |
| 오후 | Studio 제작 + 발행 + CTA 확인 |
| 저녁 | 내일 예약 + 이벤트 점검 + 리포트 |

## DB

operator_fatigue · feed_feedback · recommendation_feedback · operational_friction · trust_validation
