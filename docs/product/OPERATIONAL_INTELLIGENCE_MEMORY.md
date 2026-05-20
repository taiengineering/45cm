# Operational Intelligence Memory

## 철학

```
좋은 운영은 한 번 잘하는 것이 아니라,
브랜드와 운영자를 점점 이해해가는 것이다.
```

## Memory 유형 (10개)

| Memory | 역할 | 예시 |
|--------|------|------|
| Operator Patterns | 운영자 행동 패턴 | "Hard CTA 자주 reject" |
| Brand Memory | 브랜드 장기 기억 | "trust 중심 운영" |
| Trust Learning | AI 신뢰 패턴 | "accepted 72%, improving" |
| Recovery Memory | 회복 성공 패턴 | "Blog trust recovery 효과적" |
| Cadence Memory | 리듬 기억 | "LinkedIn 주 2.5회 최적" |
| Surface Memory | Surface 선호 | "authority surface 반응 높음" |
| Event Memory | 이벤트 대응 | "burst 후 3일 회복" |
| Adaptation Memory | 적응 기억 | "채널별 변환 품질" |
| Recommendation Learning | 추천 학습 | "무시된 추천 제외" |
| Workspace Personality | Workspace 성격 | "trust_oriented" |

## Memory Confidence

| 상태 | 의미 | 조건 |
|------|------|------|
| low_memory | 학습 초기 | <10 결정, <7일 |
| learning | 학습 중 | <50 결정, <30일 |
| stable | 안정 | <200 결정, <90일 |
| high_confidence | 높은 신뢰도 | 200+ 결정, 90+일 |

low_memory 상태에서는 과한 personalization 제한.

## Adaptive 기능

### Adaptive Approval
Soft CTA를 항상 승인하는 운영자 → 해당 항목 자동 승인

### Adaptive Feed
위험 alert를 중요시하는 운영자 → risk 우선순위 증가

### Personalized Recommendation
```
기본: Blog recovery 추천
개인화: "이 브랜드는 이전에도 Blog recovery 효과가 좋았습니다."
```

## Brand Evolution

| 단계 | 의미 |
|------|------|
| early | 초기 (<14일, <10게시) |
| growing | 성장 (<60일, <50게시) |
| stable | 안정 (<180일, <3채널) |
| mature | 성숙 (180+일, 3+채널) |

## Workspace Personality

conservative / balanced / aggressive / trust_oriented / event_driven / authority_driven

## DB

operator_patterns · brand_memory · trust_learning · recovery_memory · cadence_memory · surface_memory · event_memory · workspace_personality
