# CTA 경계 정의

CTA(Call-to-Action)는 Marketing Engine과 관재엔진의 경계선이다.

## CTA 이전 = Marketing Engine

```
LinkedIn 게시
→ 클릭
→ 무료진단 신청
→ 리드 생성
```

여기까지 Marketing Engine.

## CTA 이후 = 관재엔진

```
무료진단 진행
→ 작업 배정
→ 운영 상태 관리
→ 고객 관리
```

여기부터 관재엔진.

## TAI 예시

| 단계 | 엔진 | 설명 |
|------|--------|------|
| 네이버 지식인 수집 | Marketing | 키워드 기반 콘텐츠 수집 |
| AI 드래프트 생성 | Marketing | 답변 콘텐츠 생성 |
| Humanize | Marketing | AI 느낌 제거 |
| Slack 승인 | Marketing | 운영자 검토 |
| LinkedIn 발행 | Marketing | 채널 발행 |
| CTA 클릭 | **경계** | 무료 법령진단 신청 |
| 리드 생성 | Marketing | lead.generated 이벤트 |
| 진단 진행 | 관재 | 작업 배정 + 운영 |
| 고객 관리 | 관재 | 리텐션 + 후속 운영 |

## 이벤트 전달

Marketing Engine이 관재엔진에 전달하는 이벤트:

```
lead.generated
cta.clicked
campaign.completed
publish.completed
engagement.detected
```

관재엔진은 이 이벤트를 소비하여 운영 흐름을 시작한다.
