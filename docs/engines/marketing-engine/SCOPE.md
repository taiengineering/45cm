# Marketing Engine — 범위 정의

## 포함 범위

| 영역 | 설명 |
|------|------|
| Collect | 키워드 기반 콘텐츠 수집 |
| Classify | AI 기반 의도/리드 분류 |
| Generate | AI 드래프트 생성 |
| Humanize | AI 느낌 제거 + Brand Voice |
| Approval | 사람 검토 + Slack |
| Publish | 채널 발행 (LinkedIn, Facebook, Naver) |
| Campaign | 캠페인 오케스트레이션 + 예약 발행 |
| Engagement | 반응 추적 + 댓글 운영 |
| Analytics | CTR, CTA, 채널 성과, AI 비용 |
| Lead Gen | 리드 생성 + 스코어링 + 귀인 |
| Brand Voice | 톤/스타일 관리 + Anti-AI |
| Channel Ops | 채널 어댑터 + 발행 정책 |

## 제외 범위

| 영역 | 책임 엔진 |
|------|----------|
| 내부 사용자 운영 | 관재엔진 |
| DAU/Retention | 관재엔진 |
| 작업 흐름/배정 | 관재엔진 |
| 고객 관리 (CRM) | 관재엔진 |
| 조직 운영 | 관재엔진 |
| ERP/BPM | 별도 엔진 |
| 범용 Automation | 별도 엔진 |

## 관재엔진 연계 지점

Marketing Engine → 관재엔진 이벤트:

```
lead.generated      → 리드 처리 시작
cta.clicked         → 전환 후속 운영
campaign.completed  → 캔페인 결과 분석
publish.completed   → 발행 결과 기록
engagement.detected → 반응 기반 운영
```

## 플랫폼 의존성

| 시스템 | 상태 | 설명 |
|--------|------|------|
| Redis | 필수 | Queue Runtime |
| OpenAI | 필수 | AI 생성/분류 |
| Supabase | 대체 가능 | DB (PostgreSQL) |
| Slack | 선택 | 승인/알림 |
| LinkedIn | 선택 | 채널 발행 |
| Auth | 선택 | SaaS 모드 시 |
| Billing | 선택 | SaaS 모드 시 |
