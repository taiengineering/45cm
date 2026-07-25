# PLAN-MKT-001: MKT 마케팅 실행 계획서

> id: PLAN-MKT-001
> class: records
> type: PLAN
> scope: MKT
> project: mkt
> title: MKT 마케팅 실행 계획서
> version: v1
> status: ACTIVE
> owner: taiwangsim
> date: 2026-07-24
> 근거: 일반문서규정 CONST-DOC-001. Goal=GOAL-MKT-001. 선행=SOL-MKT-001.
> 단계: 실행 계획(Implementation Plan)

---

## 실행 순서

### Phase 1: 법령검색 페이지 (1~2주)

SPEC-MKT-001에 따라 taieng.co.kr에 법령검색 페이지를 구축한다. 법령엔진 데이터 기반, 조문/출처/시행일 표시, 구조화 데이터(Schema.org) 적용, 검색엔진 색인 대응.

### Phase 2: 무료진단 셀프서비스 (2~3주)

SPEC-MKT-002에 따라 무료진단 페이지를 구축한다. KSIC/시설/설비/공정/작업 입력 → Applicable Obligation 결과 표시, 결과 일부 공개 + 전체는 이메일/가입 후, 행동 데이터 수집.

### Phase 3: SEO 콘텐츠 자동화 (3~4주)

SPEC-MKT-003에 따라 10가지 수요군 대응 페이지를 법령 데이터 기반으로 생성한다. 법령 개정 시 자동 업데이트, sitemap/robots.txt/Schema.org 적용.

### Phase 4: 전환 자동화 (4~5주)

PQL 판정 기준 설정, 행동 데이터 기반 자동 분류, 이메일 시퀀스 자동 발송, 상담 신청 자동 연결.

---

## 측정

Phase 1: 검색 노출 수, 페이지 유입 수, 체류 시간.
Phase 2: 진단 시작 수, 완료 수, 결과 열람 수, 이메일 등록 수.
Phase 3: 검색 유입 페이지 수, 총 유입 수, 진단 연결 수.
Phase 4: PQL 수, 상담 전환 수, 유료 전환 수.

---

## 제약

1인 운영. Phase 1~2를 빠르게 실행하고 데이터를 수집한 후 Phase 3~4를 조정한다.
