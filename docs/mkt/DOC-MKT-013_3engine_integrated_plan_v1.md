# TAI 마케팅 SaaS 3대 엔진 통합 기획서

> id: DOC-MKT-013
> class: records
> type: PLAN
> scope: MKT
> project: mkt
> title: TAI 마케팅 SaaS 3대 엔진 통합 기획서 — Knowledge Publishing + Channel Marketing + Contact Data Acquisition
> version: v1
> status: ACTIVE
> owner: taiwangsim
> date: 2026-07-25
> 근거: 일반문서규정 CONST-DOC-001. Goal=GOAL-MKT-001. DOC-MKT-012(DEPRECATED) 대체. 단계=Planning(WPA-STD-04).

---

## 3대 엔진

| 엔진 | 입력 | 핵심 처리 | 주요 출력 |
|---|---|---|---|
| 1. Knowledge Publishing Engine | 법령·고시·공공DB·검증된 사내DB | 질문 생성, 근거 검색, 답변 구성, 검증, 웹 게시 | 근거 있는 Q&A 페이지와 지식 자산 |
| 2. Channel Marketing Engine | 승인된 지식·캠페인 목적·채널 정책 | 채널 변환, 일정, 승인, 발행, 성과수집 | 채널별 게시물과 운영 데이터 |
| 3. Contact Data Acquisition Engine | 타겟 기업 목록·기업 식별정보·외부 데이터원 | 수집, 정규화, 중복제거, 출처기록, 검증 | 이메일·휴대전화 중심의 컨택 데이터 |

## 45CM 적용 원칙

세 엔진은 독립 객체군으로 구성하며 객체 간 연결은 계약으로만 수행한다. 엔진은 입력의 형식을 알지만 데이터 의미를 임의로 판단하지 않는다. 구조적 SoT는 DB이며 외부 서비스는 45CM 객체가 아니라 계약 경계 밖의 비신뢰 소스로 다룬다.

---

## 엔진 1: Knowledge Publishing Engine

법령·고시·행정규칙·공공기관 자료·검증된 사내 DB에서 사용자가 실제로 검색할 질문을 만들고, 근거가 연결된 답변을 생성하여 웹페이지로 게시한다.

8단계 처리: 원천 등록 → 원천 구조화 → 질문 생성 → 근거 검색 → 답변 구성 → 검증 → 게시 → 갱신

Q&A 출력 구조: Question, Short Answer, Applicability, Legal Basis, Detailed Explanation, Action, Validation Status, Version

품질 기준: 모든 답변은 하나 이상의 신뢰 원천과 연결. 답변 생성과 게시 승인 분리. 법령 변경 시 역추적 가능.

---

## 엔진 2: Channel Marketing Engine

승인된 콘텐츠를 각 채널의 형식·정책·주기·대상에 맞게 변환, 승인·발행·성과수집까지 운영한다.

채널 계층: Owned Web, Search/AI, Social, Video, Community, Direct Content

운영 객체: Channel, Channel Policy, Content Package, Publish Job, Approval, Performance Event, Emergency Stop

경계: 법률적 정답을 새로 만들지 않는다. 채널 성과가 낮다는 이유로 원문 의미를 바꾸지 않는다.

---

## 엔진 3: Contact Data Acquisition Engine

타겟 기업의 이메일과 휴대전화번호를 확보·검증·축적한다.

데이터 우선순위: 이메일 > 휴대전화 > 담당자 정보 > 기업 식별 > 사용 통제정보

수집원: 국내 B2B 데이터 서비스, 기업 홈페이지, PDF·전시회 자료, 채용·협회 페이지, 무료진단·회원 입력

최소 데이터 구조: 기업 식별(법인명·사업자번호·도메인), 담당자(이름·부서·직책), 핵심 연락처(이메일·휴대전화), 증거(출처·수집일·공개여부), 품질(유효성·최신성·적합성), 활동(접촉일·방식·회신·수신거부)

법적 통제: 정보통신망법 제50조 준수, 수집과 전송 분리 검토, 수신거부 즉시 반영, 출처·동의·거부 증적 관리

---

## 우선 실행: 100개 기업 PoC

개발 전에 대한민국 제조·산업시설 기업 100개 표본으로 연락처 확보율과 담당자 적합성을 실측한다.

검증 지표: 이메일 확보율, 휴대전화 확보율, 담당자 식별률, TAI 적합 담당자율, 중복·오류율, 기업 매칭률, 건당 비용

---

## 단계별 추진

1단계: 100개 기업 PoC → 2단계: 운영방식 결정 → 3단계: 최소 운영 → 4단계: 자동화 → 5단계: 확장

---

## 기존 mkt-app과의 관계

기존 mkt-app(45cm Marketing Engine, 40 Runtime 패키지, 90 DB 테이블)은 콘텐츠 운영 자동화 엔진(Layer 1)이다. 본 기획서의 3대 엔진은 고객획득 엔진(Layer 0)이다. 기존 구조와 테이블을 새 기획의 전제로 삼지 않는다.
