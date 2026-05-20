# Operational Studio & Feed Experience

## 철학

```
운영자는 시스템을 관리하고 싶어하지 않는다.
오늘 해야 할 것, 위험한 것, 승인할 것, 운영 상태를
직관적으로 알고 싶어한다.
```

## 메인 경험 전환

| Before | After |
|--------|-------|
| Dashboard 중심 | Today Feed 중심 |
| 차트 중심 | Action 중심 |
| 기능 목록 | 운영 흐름 |

## Workspace 구조

```
Home (피드)  →  오늘의 상태 + 해야 할 것
Studio      →  콘텐츠/쇼츠/비주얼/미리보기
Queue       →  승인/이벤트/회복/Surface
Surfaces    →  채널별 브랜드 Surface
Lifecycle   →  운영 단계
Control     →  Auto/Assisted/Manual
Events      →  이벤트 운영
Analytics   →  분석
Settings    →  채널/설정
```

## Feed Priority

| 우선순위 | 의미 | 예시 |
|----------|------|------|
| critical | 즉시 대응 | 이벤트 1일 남음 |
| important | 오늘 내 | 승인 대기, 피로도 경고 |
| recommended | 권장 | trust 콘텐츠 추가 |
| informational | 참고 | 안정적 운영 중 |

## Shorts Studio

전문 영상툴이 아니라, 운영자가 쇼츠를 생산 가능한 Runtime:

- 3초 Hook 생성
- Scene Flow (Intro→Problem→Value→CTA)
- Caption Runtime (짧은 자막, 읽기 속도)
- CTA 검사 (쇼츠 CTA 과압 여부)
- Shorts Surface Adaptation

## Runtime→사람 언어

| Runtime | UI 표현 |
|---------|--------|
| fatigue | 너무 자주 올리고 있음 |
| trust_decay | 광고 느낌이 강해지고 있음 |
| surface_imbalance | 블로그가 방치되고 있음 |
| overload | 운영량이 많아지고 있음 |
| recovery | 쉬는 것이 좋음 |

## DB

operational_feed · feed_actions · studio_memory · operator_focus · feed_priority
