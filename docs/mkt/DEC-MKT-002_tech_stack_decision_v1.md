# DEC-MKT-002: MKT 구현 기술 스택 결정

> id: DEC-MKT-002
> class: governance
> type: DECISION
> scope: MKT
> project: mkt
> title: MKT 구현 기술 스택 결정
> version: v1
> status: ACTIVE
> owner: taiwangsim
> date: 2026-07-25
> 근거: 일반문서규정 CONST-DOC-001. PLAN-MKT-001. SPEC-MKT-001~003.

---

## 결정

MKT Phase 1~3(법령검색, 무료진단, SEO 콘텐츠)은 taieng.co.kr에 통합 구현한다.

### 프론트엔드

기존 taieng.co.kr(Next.js + Vuexy) 위에 법령검색(/laws), 무료진단(/diagnosis), SEO 페이지를 추가한다. 별도 사이트를 만들지 않는다.

### 백엔드

기존 tai-api(Python/FastAPI)에 법령 조회 API 엔드포인트를 추가한다. 법령엔진(leg-prod DB)에서 데이터를 직접 조회한다.

### 데이터

법령엔진 DB(leg-prod, wrfcedzgdrfupenzqhur)의 Applicable Rule/Obligation 데이터를 사용한다. 별도 DB를 만들지 않는다.

### 배포

taieng.co.kr은 이미 Vercel에 배포되어 있다. 추가 인프라 불필요.

---

## 근거

별도 사이트(45cm.com)를 만들면 도메인 권위 분산, 인증 중복, 관리 복잡도 증가. taieng.co.kr에 통합하면 기존 도메인 권위 활용, 기존 인증 재사용, 단일 배포.
