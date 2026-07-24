# TAI 서비스 정의서

> id: DOC-TAI-001
> class: records
> type: STANDARD
> scope: TAI
> project: tai-platform
> title: TAI 서비스 정의서
> version: v1
> status: DRAFT
> owner: taiwangsim
> date: 2026-07-24
> 근거: 일반문서규정 CONST-DOC-001

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

TAI는 두 가지 운영모델을 제공한다.

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

## 10. 서비스 정의 (요약)

TAI는 산업현장의 Property를 기반으로 법령을 분석하여 Applicable Obligation을 생성하고, 기업이 이를 Excel 또는 SaaS를 통해 지속적으로 운영할 수 있도록 지원하는 법령 운영 플랫폼이다.
