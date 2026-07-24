# 45cm Marketing Engine — 종합 현황 분석서

> id: DOC-MKT-001  
> type: REPORT  
> scope: MKT  
> project: mkt  
> title: 45cm Marketing Engine 종합 현황 분석서  
> version: v1  
> status: ACTIVE  
> owner: taiwangsim  
> date: 2026-07-24  

---

## 1. 제품 정의

45cm Marketing Engine은 브랜드를 망치지 않으면서 지속 가능한 마케팅 운영을 돕는 시스템이다. AI 콘텐츠 생성기도, 공격적 퍼포먼스 자동화 도구도 아니다. 핵심은 더 많이 생성이 아니라 더 건강하게 운영이며, Brand Operations Platform으로 포지셔닝한다.

### 핵심 철학 (10 원칙)
- Healthy Cadence: 무리하지 않는 운영 리듬
- Human-first AI: AI는 조언만, 최종 판단은 사람
- Brand Safety: 브랜드 훼손 방지
- Operational Sustainability: 운영자 burnout 감소
- Anti Content Factory: 콘텐츠 공장화 지양
- Channel Health: 채널 상태 유지
- Sustainable Performance: 단기 CTR보다 장기 신뢰
- Consumer Respect: 소비자가 싫어하지 않는 상태
- Operator-first: 운영자 피로 관리
- Guidance over Automation: 자동화보다 운영 보조

---

## 2. 도메인 및 인프라

| 도메인 | 용도 | 플랫폼 |
|---|---|---|
| mkt.45cm.com | Marketing Engine SaaS | Vercel (예정) |
| ods.45cm.com | ODS 관제 Engine | Vercel (예정) |
| 45cm.com | 마케팅 사이트 | Cloudflare |
| api.45cm.com | API | Railway |
| DB | Supabase | vwlahtguyggrhvslabax |

---

## 3. 개발 현황

### Engine Runtime: 40 패키지
Core(7) + Safety(7) + Operational(10) + Experience(6) + Brand(2) + Platform(3) + Simulation(2) + Infra(6)

### Console: 9 페이지 (MUI)
Home, Studio, Queue, Surfaces, Memory, Lifecycle, Control, Events, Settings — 모두 Mock 데이터

### DB: 90 테이블
marketing(28) + ops(62)

### API: Railway 배포
Express/BullMQ, PUBLISH_MODE=mock, LinkedIn OAuth 연결

---

## 4. 사용 가능 기능

### 사용 가능
- Console UI 9페이지 접근
- Today Feed (Mock)
- Studio 콘텐츠/쇼츠/미리보기 (UI)
- 승인함 (Mock)
- 채널 상태 (Mock)
- 운영 제어 모드 전환 (UI)

### 구조 있으나 미연결
- 캠페인 관리, 실 콘텐츠 발행, AI 생성, 채널 연동, 브랜드 기억 학습

### 미구현
- 인증/결제, Assets/Patterns 페이지, Analytics, Mobile 최적화, Multi-workspace

---

## 5. 기획 모듈 요약

| 모듈 | 설명 |
|---|---|
| Operational Lifecycle | 7단계 브랜드 운영 생애주기 |
| Content Operating System | 10가지 Operational Stream으로 콘텐츠 관리 |
| 한국형 18채널 모델 | 7카테고리 18채널 |
| Adaptive Content Surface | 9개 Surface Type 자동 적응 |
| Controlled Variation | 패턴 유지 + 표현만 변화 |
| Brand Asset Pipeline | 9단계 콘텐츠 파이프라인 |
| Intelligence Memory | 10가지 적응형 기억 시스템 |
| Operational Control | Auto/Assisted/Manual Co-Pilot |
| 한국형 UX | 사람 언어 + Warmth + Action-first |

---

## 6. 기획 문서 (20+개)

### 철학
- docs/philosophy/OPERATIONAL_MARKETING_MANIFESTO.md

### 제품 (11개)
- docs/product/45CM_SAAS_PRODUCT_ARCHITECTURE.md
- docs/product/ADAPTIVE_CONTENT_SURFACE_RUNTIME.md
- docs/product/BRAND_ASSET_AND_CONTENT_PIPELINE.md
- docs/product/BRAND_PATTERN_RUNTIME.md
- docs/product/KOREA_UNIVERSAL_CHANNEL_MODEL.md
- docs/product/OPERATIONAL_CONTROL_RUNTIME.md
- docs/product/OPERATIONAL_INTELLIGENCE_MEMORY.md
- docs/product/OPERATIONAL_LIFECYCLE_RUNTIME.md
- docs/product/OPERATIONAL_STUDIO_AND_FEED.md
- docs/product/REAL_OPERATIONS_VALIDATION.md
- docs/product/REAL_USER_OPERATIONAL_WORKSPACE_UX.md
- docs/product/ZERO_FRICTION_CONNECTION_ARCHITECTURE.md

### 엔진 경계 (4개)
- docs/engines/marketing-engine/ENGINE_BOUNDARY.md
- docs/engines/marketing-engine/CTA_BOUNDARY.md
- docs/engines/marketing-engine/SCOPE.md
- docs/engines/marketing-engine/EVENTS.md

---

## 7. 해결 이슈 18개 / 대기 이슈 12개

해결: Railway 502, Supabase 스키마, OpenAI hang, Redis MISCONF, Vuexy SSR 빌드 실패 등 18건
대기: PUBLISH_MODE=real, Vercel 전환, repo 이전, Assets/Patterns 페이지, 인증/결제 등 12건

---

## 8. MVP까지 남은 작업

| 우선순위 | 작업 |
|---|---|
| P0 | repo 이전 (45cminc/mkt), lockfile |
| P1 | Vercel 전환, Console-API 실연결, PUBLISH_MODE=real, 캠페인 3개 |
| P2 | 인증, Assets/Patterns 페이지, 채널 확대 |
| P3 | 결제, Mobile, Multi-workspace |

---

## 9. 결론

구조적으로 완성. 40 Runtime, 90 DB 테이블, 9 Console 페이지, API 서버 동작. 남은 것은 실운영 연결 (Console-API, PUBLISH_MODE=real, 인증/결제).
