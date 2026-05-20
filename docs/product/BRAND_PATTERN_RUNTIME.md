# Brand Pattern Runtime

## 철학

```
브랜드는 결과물을 반복하는 것이 아니라,
패턴을 유지하면서 표현을 변화시킨다.
```

## Pattern vs Instance

| 저장 (패턴) | 생성 (인스턴스) |
|------|------|
| tone | 실제 문장 |
| structure | 실제 표현 |
| CTA style | 실제 자막 |
| hook style | 실제 비유 |
| pacing | 실제 intro |

## Brand Operational DSL

```yaml
tone:
  authority: high
  humor: low
  trust: high
cta:
  intensity: soft
  frequency: low
structure:
  - hook
  - insight
  - proof
  - CTA
shorts:
  pacing: medium_fast
  caption_density: medium
```

## Controlled Variation

### 변경 가능 (신선도)
hook, intro, caption, example, visual emphasis, scene ordering, CTA wording

### 변경 불가 (브랜드 정체성)
brand tone, CTA intensity limit, brand philosophy, surface identity

## Variation Safety

검사: tone deviation, CTA deviation, brand mismatch, aggressive drift, surface inconsistency

## Hook Rotation

- frequency cap: 사용 3회+ → cooldown
- cooldown: 3일
- fatigue detection: 사용 8회+ → 새 Hook 필요

## Pattern Lifecycle

```
experimental → active → stable → fatigued → deprecated → revivable
```

## Surface-specific Patterns

| Surface | Pattern |
|---------|--------|
| Shorts | fast hook + short CTA |
| Blog | trust-heavy |
| LinkedIn | authority-first |
| Instagram | visual-presence |

## Adaptive Variation

fatigue 증가 → hook variation 증가
trust 감소 → CTA variation 감소

## Pattern Explainability

```
반복 피로를 줄이기 위해 opening variation을 증가시켰습니다.
```

## DB

brand_patterns · pattern_variations · pattern_lifecycle · pattern_performance · pattern_recommendations · hook_rotation · cta_patterns · scene_patterns
