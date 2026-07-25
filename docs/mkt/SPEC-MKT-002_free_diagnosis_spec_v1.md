# SPEC-MKT-002: 무료진단 셀프서비스 사양서

> id: SPEC-MKT-002
> class: records
> type: STANDARD
> scope: MKT
> project: mkt
> title: 무료진단 셀프서비스 사양서
> version: v1
> status: ACTIVE
> owner: taiwangsim
> date: 2026-07-24
> 근거: 일반문서규정 CONST-DOC-001. PLAN-MKT-001 Phase 2.
> 해결 대상: P2(첫 경험 구조 부재), P3(전환 구조 부재)

---

## 목적

방문자가 회원가입 없이 즉시 법령진단을 경험하고, TAI의 핵심 가치(Applicable Obligation)를 확인한다.

## 사용자 흐름

1단계(입력): KSIC 선택 → 시설/설비/공정/작업 입력. 최소 KSIC만으로도 기본 결과 제공.

2단계(결과 미리보기): Applicable Rule 수, Applicable Obligation 수, 주요 의무 3~5개 미리보기, "전체 결과 보기" CTA.

3단계(전환): 전체 결과는 이메일 입력 또는 회원가입 후 제공. Excel 다운로드 또는 SaaS 대시보드로 연결.

## 데이터 수집

행동 이벤트: 페이지 방문, 진단 시작, KSIC 선택, 속성 입력, 결과 미리보기 확인, 전체 결과 요청, 이메일 등록, Excel 다운로드, 재방문.

PQL 후보 조건: 진단 완료 + 결과 열람 + 이메일 등록 또는 재방문.

## API

기존 법령엔진 API(api.45cm.com 또는 tai-api)를 호출. KSIC/속성 입력 → Applicable Rule → Applicable Obligation 반환.

## 신뢰 표시

결과에 법령명+조문 번호, 시행일, 출처 링크 표시. 면책 문구 포함.
