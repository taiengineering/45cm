# DEC-MKT-004: MKT 법령 데이터 소스 결정

> id: DEC-MKT-004
> class: governance
> type: DECISION
> scope: MKT
> project: mkt
> title: MKT 법령 데이터 소스 결정
> version: v1
> status: ACTIVE
> owner: taiwangsim
> date: 2026-07-25
> 근거: 일반문서규정 CONST-DOC-001. SPEC-MKT-001. WO-MKT-001.

---

## 결정

MKT 법령검색 페이지와 SEO 콘텐츠의 데이터 소스는 leg-prod DB(wrfcedzgdrfupenzqhur)의 staging 테이블을 사용한다.

### 사용 테이블

requirement_atom_v3: 법령 의무 원자 단위.
expression_v3: 의무의 조건/수량/행위 표현.
input_resolution_v3: 입력 해상도 (KSIC/시설/설비 매핑).
semantic_clause (public): 법령 조문 원문.
law_article (public): 법령 조항 정보.
law_master (public): 법령 마스터 (법령명, 시행일).

### 조회 패턴

법령 목록: SELECT DISTINCT law_name, enforcement_date FROM public.law_master.
법령 상세: JOIN law_master → law_article → semantic_clause → requirement_atom_v3.
의무 목록: SELECT FROM staging.requirement_atom_v3 WHERE law_id = ?.

### 제약

Generator Baseline은 FROZEN 상태이다(ATOM 8f80d6f6, EXPRESSION ef31ff8c, RESOLUTION 29e32448). MKT는 이 데이터를 읽기 전용으로 사용한다. MKT가 법령 데이터를 수정하지 않는다.

---

## 근거

별도 DB를 만들면 데이터 동기화 문제 발생. leg-prod를 직접 읽으면 법령엔진과 동일한 최신 데이터를 사용하여 정확성과 신뢰성 확보.
