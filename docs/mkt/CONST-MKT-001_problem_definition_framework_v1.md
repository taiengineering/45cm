# CONST-MKT-001: 문제 정의 5단계 계층 구조

> id: CONST-MKT-001
> class: governance
> type: STANDARD
> scope: MKT
> project: mkt
> title: 문제 정의 5단계 계층 구조 (Problem Definition Framework)
> version: v1
> status: ACTIVE
> owner: taiwangsim
> date: 2026-07-25
> 근거: 일반문서규정 CONST-DOC-001. PROB-MKT-001. INV-MKT-001~016.

---

## 1. 구조 정의

문제 정의는 추상에서 구체로 내려가는 5단계로 구성한다.

| Level | 명칭 | 질문 | 예시 |
|---|---|---|---|
| Level 1 | 전략 문제 (Strategic Problem) | Goal을 방해하는 가장 큰 문제는 무엇인가? | 시장은 TAI를 발견하지 못한다. |
| Level 2 | 영역 문제 (Domain Problem) | 그 전략 문제는 어떤 영역으로 구성되는가? | 인지, 탐색, 신뢰, 선택 등 |
| Level 3 | 구조 문제 (Structural Problem) | 그 영역에는 어떤 구조적 문제가 있는가? | 사용자는 업무 질문을 검색한다, 검색어 체계가 정의되지 않았다 등 |
| Level 4 | 접점 문제 (Touchpoint Problem) | 그 구조 문제는 어디에서 발생하는가? | 검색, AI, 협회, 거래처, 정부, 커뮤니티 등 (개별 채널이 아니라 접점 유형) |
| Level 5 | 채널 문제 (Channel Problem) | 어떤 채널에서 그 문제가 나타나는가? | Google, 네이버, ChatGPT, Claude, Perplexity, YouTube 등 |

---

## 2. 적용 예시

### Level 1 (전략 문제)

시장은 TAI를 발견하지 못한다.

### Level 2 (영역 문제)

시장은 TAI를 찾지 않는다.

### Level 3 (구조 문제)

사용자는 서비스명이 아니라 업무 질문을 검색한다.

### Level 4 (접점 문제)

사용자는 AI, 검색엔진, 커뮤니티에서 업무 질문을 한다.

### Level 5 (채널 문제)

ChatGPT에서는 발견되지 않는다. Google에서는 발견되지 않는다. 네이버에서는 발견되지 않는다.

---

## 3. Level 3이 가장 중요한 층이다

Level 3에서 다음이 정의되어야 한다.

- 사용자는 무엇을 질문하는가?
- 어떤 언어를 사용하는가?
- 어떤 기준으로 판단하는가?
- 어떤 정보를 찾는가?

이 구조적 문제가 정의된 이후에야 자연스럽게 접점(Level 4)과 채널(Level 5)로 내려갈 수 있다.

---

## 4. 이 구조의 장점

큰 문제에서 작은 문제까지 추적 가능하다. Planning에서 각 문제에 대한 해결책을 계층적으로 연결할 수 있다. Level 5의 채널이 변해도 Level 1~3의 문제 정의는 변하지 않는다.

---

## 5. Investigation과의 매핑

| Level | 대응 Investigation |
|---|---|
| Level 1 | GOAL-MKT-001 |
| Level 2 | PROB-MKT-001 (P1~P5) |
| Level 3 | INV-MKT-001 (질문 언어), INV-MKT-007 (반복 수요), INV-MKT-009 (신뢰), INV-MKT-010 (첫 관계) |
| Level 4 | INV-MKT-002 (탐색 장소), INV-MKT-008 (시장 무료 자산), INV-MKT-011 (구매 프로세스) |
| Level 5 | INV-MKT-006 (검색/AI 노출), INV-MKT-015 (정보 정확성) |

---

## 6. 적용 원칙

문제 정의 시 반드시 Level 1부터 시작한다. Level을 건너뛰지 않는다. Level 3이 정의되지 않은 상태에서 Level 5 해결책을 설계하지 않는다. 각 Level의 문제는 상위 Level의 문제에서 파생된다.
