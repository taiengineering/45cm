# Operational Control Runtime

## 철학

```
AI는 운영을 대신하는 것이 아니라,
운영 판단을 보조한다.
```

## 운영 모드 (3개)

| 모드 | 설명 | 적합 대상 |
|------|------|----------|
| **Auto** | AI가 운영 자동 수행 | 초보자, low-touch |
| **Assisted** (권장) | AI 추천 + 운영자 승인 | 대부분 기업 |
| **Manual** | 분석/추천만, 실행은 사람 | 대기업, 보수적 조직 |

## 기능별 세부 설정

전체를 하나로 자동화하지 않음:

```typescript
{
  cadence: "auto",      // 리듬 유지는 자동
  cta: "assisted",       // CTA는 추천+승인
  blog_publish: "manual", // 블로그는 수동
  event: "manual",       // 이벤트는 수동
  recovery: "auto",      // 회복은 자동
  routing: "assisted"    // 라우팅은 추천+승인
}
```

## 운영 프로필

| 프로필 | 설명 |
|--------|------|
| conservative | 대부분 수동, 초기 도입 |
| balanced | 추천+승인 중심 (권장) |
| aggressive | 대부분 자동 |
| human_first | 모두 수동 |

## AI Confidence Engine

요소: historical stability, brand consistency, surface familiarity, risk level, event pressure, CTA intensity

결과: low / medium / high / critical_review_required

## Safety Override (Auto→Assisted 자동 전환)

자동 운영 중 위험 발생 시:
- fatigue 급증 → Assisted로 전환
- 정책 위반 → Assisted로 전환
- 브랜드 불일치 → Assisted로 전환
- 신뢰도 하락 → Assisted로 전환

## Approval Runtime

### 자동 승인 가능
- low-risk, stable cadence, soft CTA, recovery

### 승인 필수
- event burst, hard CTA, brand tone deviation, cross-channel overload

## Human Intervention

운영자 즉시 개입: pause / override / rollback / approve / reject / reroute / cooldown

## Explainability

AI가 왓 그렇게 판단했는지 설명:
```
Instagram은 fatigue가 높아 cadence를 감소시켰습니다.
LinkedIn은 authority consistency가 안정적이므로 유지합니다.
```

## Emergency Manual Mode

전체 자동운영 즉시 중단 가능 (비상 시)

## DB

operational_control · approval_queue · human_decisions · operational_preview · automation_profiles
