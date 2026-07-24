# INV-013: 안전관리자는 법령 정보를 어떻게 운영에 연결하는가

> id: INV-MKT-016
> class: records
> type: REPORT
> scope: MKT
> project: mkt
> title: 안전관리자 법령→운영 연결 방식 조사
> version: v1
> status: ACTIVE
> owner: taiwangsim
> date: 2026-07-24
> 근거: 일반문서규정 CONST-DOC-001. Goal=GOAL-MKT-001. 선행=INV-MKT-001~015. 조사 단계(Investigation).
> 제외: TAI 운영 기능 설계

핵심 발견: (1) 법령 확인과 현장 운영 사이에 수동 변환 작업이 존재한다. (2) 이 변환은 표준화되지 않았으며 담당자 개인 역량에 의존한다. (3) 법령 → 적용 여부 확인 → 해당 의무 추출 → 일정/담당자/주기 설정 → 실행/점검 → 증빙 보관의 흐름이 반복된다.

수동 변환 작업 7단계: (1) 법령 원문 확인, (2) 자사 적용 여부 판단, (3) 해당 의무 목록 정리, (4) 점검/교육/검사 일정 수립, (5) 담당자 배정, (6) 실행 및 기록, (7) 증빙 보관 및 감독 대응.

이 전체 과정이 TAI 서비스 정의서(DOC-TAI-001)의 Code Layer → Property Layer → Legal Engine → Applicable Rule → Applicable Obligation → Operation Layer → Runtime Layer → Evidence Layer와 정확히 대응한다.
