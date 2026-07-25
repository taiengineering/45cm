# SPEC-MKT-001: 법령검색 페이지 사양서

> id: SPEC-MKT-001
> class: records
> type: STANDARD
> scope: MKT
> project: mkt
> title: 법령검색 페이지 사양서
> version: v1
> status: ACTIVE
> owner: taiwangsim
> date: 2026-07-24
> 근거: 일반문서규정 CONST-DOC-001. PLAN-MKT-001 Phase 1.
> 해결 대상: P1(발견 구조 부재), P4(신뢰 구조 부재)

---

## 목적

고객이 법령/의무/점검/처벌을 검색할 때 TAI 페이지가 노출되도록 한다. 법령엔진의 정확한 데이터를 기반으로 신뢰를 확보한다.

## 페이지 구조

법령 목록 페이지(/laws): 산업안전보건법 등 주요 법령 목록, 각 법령의 조문 수/적용 대상/최종 개정일 표시.

법령 상세 페이지(/laws/{id}): 법령명, 조문 목록, 각 조문의 의무 요약, 적용 대상, 처벌 기준, 관련 법령 링크, 시행일, 출처(국가법령정보센터 원문 링크).

의무 상세 페이지(/obligations/{id}): 의무명, 근거 조문, 적용 대상, 수행 방법, 주기, 처벌, 관련 체크리스트.

## 데이터 소스

법령엔진(leg-prod DB)의 Applicable Rule/Obligation 데이터. 국가법령정보센터 원문 링크.

## 신뢰 표시 요소

법령명+조문 번호, 시행일, 최종 확인일, 출처 링크, "본 정보는 법령엔진에 의해 자동 추출되었으며, 최종 확인은 국가법령정보센터를 참조하십시오" 면책 표시.

## SEO

각 페이지에 title/description/canonical, Schema.org LegalForceDocument 또는 FAQPage, sitemap.xml 자동 생성, robots.txt 허용.

## 연결

각 법령/의무 페이지에서 무료진단 CTA("우리 사업장에 적용되는지 확인하기") 배치.
