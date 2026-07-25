# DEC-MKT-001: MKT 엔진 구조와 45cm 마케팅 엔진의 관계 정의

> id: DEC-MKT-001
> class: governance
> type: DECISION
> scope: MKT
> project: mkt
> title: MKT 엔진 구조와 45cm 마케팅 엔진의 관계 정의
> version: v1
> status: ACTIVE
> owner: taiwangsim
> date: 2026-07-25
> 근거: 일반문서규정 CONST-DOC-001. DOC-TAI-001 v2. DOC-MKT-002.

---

## 결정 배경

45cm repo에는 이미 Marketing Engine이라는 이름으로 49개 Runtime 패키지, 90개 DB 테이블, 9개 Console 페이지가 구현되어 있다. 이 엔진은 콘텐츠 운영, 채널 관리, 브랜드 패턴, CTA 제어, 피로도 관리 등 마케팅 운영 자동화를 목적으로 설계되었다.

동시에 MKT 마케팅 서비스 정의서(DOC-MKT-002)는 TAI를 아직 모르는 고객이 TAI를 발견하고 첫 관계를 시작하도록 만드는 마케팅 서비스를 정의했다.

이 두 가지가 같은 것인지, 다른 것인지 명확히 해야 한다.

---

## 결정

45cm Marketing Engine과 MKT 마케팅 서비스는 같은 플랫폼의 서로 다른 계층이다.

### 45cm Marketing Engine = 운영 엔진 (Layer 1)

콘텐츠 생성/발행/관리, 채널 건강도/피로도/cadence, 브랜드 패턴/자산/CTA, 운영 피드/승인/제어, 이벤트 운영, Intelligence Memory. 이것은 마케팅 운영을 실행하는 엔진이다.

### MKT 마케팅 서비스 = 고객 획득 (Layer 0)

법령검색 페이지, 무료진단 셀프서비스, SEO 콘텐츠, PQL/전환 자동화. 이것은 고객이 TAI를 발견하고 첫 관계를 시작하는 구조이다.

### 관계

```
Layer 0: MKT 마케팅 서비스 (고객 획득)
→ 고객이 TAI를 발견하고 가입한다
    ↓
Layer 1: 45cm Marketing Engine (운영 엔진)
→ 가입한 고객이 마케팅을 운영한다
```

---

## 결론

두 계층은 분리하여 관리한다. MKT 백로그(WO-MKT-P0-001)는 Layer 0을 구축한다. 45cm Marketing Engine 백로그는 Layer 1을 구축한다.
