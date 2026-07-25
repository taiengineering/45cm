# TAI Channel Map v4 — 최소 단위(Node) 정의 + Graph 구조

> id: DOC-MKT-009
> class: records
> type: PLAN
> scope: MKT
> project: mkt
> title: TAI Channel Map v4 — 채널 노드 정의 + Graph 구조 + Channel Dictionary
> version: v1
> status: ACTIVE
> owner: taiwangsim
> date: 2026-07-25
> 근거: 일반문서규정 CONST-DOC-001. Goal=GOAL-MKT-001. 선행=DOC-MKT-006,007,008. 단계=Planning(WPA-STD-04).

---

지도 제작자의 관점이다. 지금까지는 "무엇이 있는가"를 정리했다. 다음 단계는 지도를 그릴 최소 단위(Unit)를 정의하는 것이다.

---

## 1. 채널 노드 (Channel Node) 정의

노드 하나는 아래 정보만 가진다.

```
ID
이름
부모
유형
설명
```

아직 운영도 없고 자동화도 없다.

예시:

```
ID: CH-001, 이름: Google, 부모: 검색, 유형: 플랫폼
ID: CH-002, 이름: SEO, 부모: Google, 유형: 세부채널
ID: CH-003, 이름: FAQ, 부모: SEO, 유형: 접점
```

---

## 2. Tree의 한계

Tree로 그리면:

```
검색
 ├ Google
 │   ├ SEO
 │   │   ├ FAQ
 │   │   ├ 블로그
 │   │   └ 계산기
 │   ├ Maps
 │   └ Discover
 └ 네이버
      ├ 블로그
      ├ 카페
      └ 지식인
```

그러나 현실은 Tree가 아니다. FAQ는 Google에도 있고, 네이버에도 있고, ChatGPT에도 있다. Tree에서는 FAQ가 여러 번 생긴다.

---

## 3. Graph 구조 (45CM 방식)

Tree가 아니라 Graph이다.

```
FAQ ← Google SEO ← Google
FAQ ← 네이버 블로그 ← 네이버
FAQ ← ChatGPT Search ← ChatGPT
```

FAQ는 하나이고 여러 채널과 연결된다. 노드를 중복 생성하지 않는다.

---

## 4. 3가지 Object 유형

### Object 1: 채널 (Platform)

Google, 네이버, ChatGPT, YouTube

### Object 2: 세부채널 (Sub Channel)

SEO, 블로그, 카페, GPT, Shorts

### Object 3: 접점 (Touch Point)

FAQ, 영상, 게시글, 댓글, PDF, 체크리스트, 계산기

관계만 연결한다:

```
Google → SEO → FAQ
네이버 → 블로그 → FAQ
ChatGPT → Search → FAQ
```

FAQ를 수정하면 Google, 네이버, ChatGPT 전체에서 동일한 의미를 갖는다.

---

## 5. Channel Dictionary (표준 노드 사전)

| Node ID | Node Name | Node Type |
|---|---|---|
| CH-GOOGLE | Google | Platform |
| CH-NAVER | 네이버 | Platform |
| CH-CHATGPT | ChatGPT | Platform |
| CH-YOUTUBE | YouTube | Platform |
| CH-KOSHA | KOSHA | Platform |
| SUB-SEO | SEO | Sub Channel |
| SUB-BLOG | 블로그 | Sub Channel |
| SUB-CAFE | 카페 | Sub Channel |
| SUB-KIN | 지식인 | Sub Channel |
| SUB-SEARCH | Search | Sub Channel |
| SUB-SHORTS | Shorts | Sub Channel |
| SUB-GPT | GPT | Sub Channel |
| TP-FAQ | FAQ | Touch Point |
| TP-PDF | PDF | Touch Point |
| TP-CHECKLIST | 체크리스트 | Touch Point |
| TP-CALCULATOR | 계산기 | Touch Point |
| TP-VIDEO | 영상 | Touch Point |
| TP-POST | 게시글 | Touch Point |
| TP-COMMENT | 댓글 | Touch Point |
| TP-NEWS | 뉴스 | Touch Point |
| TP-CASE | 사례 | Touch Point |
| TP-FORM | 양식 | Touch Point |

---

## 6. 다음 단계

이 사전이 만들어지면, 이후에는 노드를 추가하는 것이 아니라 노드 간의 관계를 연결하는 작업만 하면 된다.

지도는 먼저 노드를 정의하고, 그 다음에 노드 간 연결을 그리는 방식으로 구축하는 것이 가장 안정적이다.
