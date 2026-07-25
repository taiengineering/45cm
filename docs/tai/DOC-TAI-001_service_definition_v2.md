# TAI 서비스 정의서 V2

> id: DOC-TAI-001
> class: governance
> type: STANDARD
> scope: TAI
> project: tai-platform
> title: TAI 서비스 정의서
> version: v2
> status: ACTIVE
> owner: taiwangsim
> date: 2026-07-25
> 근거: 일반문서규정 CONST-DOC-001. DOC-TAI-001 v1에서 개정.

---

## 1. 서비스 정의

TAI는 산업현장에 적용되는 법령을 자동으로 분석하여 사업장에 필요한 법적 의무를 추출하고, 사용자가 원하는 방식(Excel 또는 SaaS)으로 운영할 수 있도록 지원하는 법령 운영 플랫폼이다.

TAI는 단순한 안전관리 시스템이나 점검 시스템이 아니라, 법령을 운영 가능한 업무로 변환하는 플랫폼이다.

---

## 2. 서비스 목적

기업은 수천 개의 법령과 의무를 모두 이해하기 어렵다. TAI는 어떤 법령이 적용되는지, 어떤 의무가 발생하는지, 어떻게 운영해야 하는지를 자동으로 정리하여 법적 리스크를 줄인다.

---

## 3. 서비스 철학

TAI는 법을 만드는 시스템이 아니다. TAI는 이미 존재하는 법령을 분석하여 기업에 필요한 의무를 추출하고 운영 가능한 업무로 변환하는 플랫폼이다.

> 법령 → 의무 → 운영

으로 변환하는 것이 TAI의 핵심 역할이다.

---

## 4. 서비스 구성

### ① 법령진단

사용자는 다음 정보를 입력한다: KSIC, 한국건설표준코드, 시설, 설비, 공정, 작업, 건설현장, 공종, 작업유형.

입력이 완료되면 사용자가 법령진단을 실행한다. 법령엔진은 Applicable Rule과 Applicable Obligation을 생성한다.

### ② Excel 운영

법령진단 결과는 Excel로 제공된다. 기업은 Excel, ERP, 그룹웨어, 자체 시스템 등 원하는 방식으로 운영할 수 있다. TAI는 기존 운영체계를 강제하지 않는다.

### ③ SaaS 운영

기업이 SaaS를 선택하면 안전관리자는 각 의무에 대해 최초 시행일, 담당자, 반복주기, 운영 여부를 설정한다. 설정이 완료되면 Schedule, Task, Notification, Evidence가 자동 생성된다.

---

## 5. 서비스 구조

```
Code Layer (KSIC, 한국건설표준코드)
    ↓
Property Layer (시설, 설비, 공정, 작업, 공종, 작업유형)
    ↓
Legal Engine
    ↓
Applicable Rule
    ↓
Applicable Obligation
    ↓
Operation Layer (최초 시행일, 담당자, 반복주기, 운영 여부)
    ↓
Runtime Layer (Schedule, Task, Notification)
    ↓
Evidence Layer (점검결과, 사진, 문서, 증빙)
```

---

## 6. 운영 방식

### Model A: Excel

법령진단 → Applicable Obligation → Excel Export → 고객 자체 운영

### Model B: SaaS

법령진단 → Applicable Obligation → 운영 설정 → Schedule → Task → Notification → Evidence

---

## 7. 고객 성장 단계

```
무료 법령진단 → 유료 법령진단 → Excel 운영 → SaaS 운영
```

기업은 원하는 단계까지만 사용할 수 있다.

---

## 8. 핵심 Object

```
Property → Applicable Rule → Applicable Obligation → Operation Setting → Schedule → Task → Evidence
```

Applicable Obligation은 TAI의 핵심 Object이다.

---

## 9. 서비스 특징

- KSIC 및 한국건설표준코드를 기반으로 법령을 탐색한다.
- Property 기반으로 Applicable Rule을 생성한다.
- 법령을 운영 가능한 의무(Object)로 변환한다.
- Excel과 SaaS를 동시에 지원한다.
- 기업의 기존 운영체계를 변경하지 않고도 활용할 수 있다.
- SaaS에서는 운영 자동화를 지원한다.

---

## 10. 서비스 영역 구분

TAI는 하나의 법령 운영 플랫폼 아래에 세 가지 서비스 영역을 운영한다.

### TAI 법령진단 (Core)

법령엔진이 직접 수행하는 진단 서비스이다. 사용자의 Property를 기반으로 Applicable Rule과 Applicable Obligation을 생성한다. 이 영역은 TAI의 핵심이며, 다른 모든 서비스의 기반이 된다.

### TAI 운영 (SaaS)

법령진단 결과를 기반으로 기업이 의무를 지속적으로 운영할 수 있도록 지원하는 서비스이다. Schedule, Task, Notification, Evidence를 포함한다. Excel 운영과 SaaS 운영 모두 이 영역에 해당한다.

### TAI 마케팅 (MKT)

TAI를 아직 모르는 고객이 자신의 문제를 해결하는 과정에서 TAI를 발견하고 첫 관계를 시작하도록 하는 서비스이다. 법령검색 페이지, 무료진단 셀프서비스, SEO 콘텐츠가 이 영역에 해당한다.

---

## 11. 서비스 영역 간 관계

```
TAI 마케팅 (MKT)
→ 고객이 문제를 찾다가 TAI를 발견한다
→ 무료진단으로 첫 경험을 한다

TAI 법령진단 (Core)
→ 법령엔진이 Applicable Obligation을 생성한다
→ 무료/유료 진단 모두 이 엔진을 사용한다

TAI 운영 (SaaS)
→ 진단 결과를 기반으로 운영을 시작한다
→ Excel 또는 SaaS로 의무를 관리한다
```

세 영역은 독립적으로 발전하되, Applicable Obligation이라는 공통 Object로 연결된다.

---

## 12. 서비스 정의 (요약)

TAI는 산업현장의 Property를 기반으로 법령을 분석하여 Applicable Obligation을 생성하고, 기업이 이를 Excel 또는 SaaS를 통해 지속적으로 운영할 수 있도록 지원하는 법령 운영 플랫폼이다.

TAI 마케팅은 이 플랫폼을 아직 모르는 고객이 자신의 문제를 해결하는 과정에서 TAI를 발견하고 첫 관계를 시작하도록 한다.
