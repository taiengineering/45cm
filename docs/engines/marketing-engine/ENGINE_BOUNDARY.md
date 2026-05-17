# Marketing Engine — 엔진 책임 경계

## 핵심 원칙

Marketing Engine은 **외부 유입과 전환**까지만 책임진다.

```
Reach → Engage → Convert
```

## Marketing Engine 책임

| 단계 | 역할 |
|------|------|
| Reach | 콘텐츠 수집, AI 생성, 채널 발행 |
| Engage | 반응 추적, 댓글 운영, 인게이지먼트 |
| Convert | CTA 추적, 리드 생성, 전환 귀인 |

## 관재엔진 책임

| 단계 | 역할 |
|------|------|
| Operate | 리드 처리, 작업 배정, 운영 상태 |
| Manage | 고객 관리, 조직 운영, 내부 프로세스 |
| Retain | 사용 빈도, DAU, 리텐션, Feature usage |

## 경계선 = CTA

```
Marketing Engine          관재엔진
콘텐츠 → 채널 → CTA 클릭 │ 리드 처리 → 작업 배정 → 고객 관리
                    ┴─────┘
                  이벤트 전달
```

## 절대 포함 금지

- 내부 사용자 운영
- 사용빈도/DAU/Retention 분석
- 업무 흐름/작업 추적
- ERP/BPM 프로세스
- Feature usage analytics
- 조직 운영
