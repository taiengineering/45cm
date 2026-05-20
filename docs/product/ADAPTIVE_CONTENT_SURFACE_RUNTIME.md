# Adaptive Content Surface Runtime

## 철학

```
같은 콘텐츠를 채널마다 복붙하지 않는다.
각 채널 Surface에 맞게 운영 목적, 리듬, 신뢰, 피로도에 따라 적응시킨다.
```

## Surface Types (9개)

| Surface | 목적 | 대표 채널 |
|---------|------|----------|
| social_feed | brand presence + engagement | Instagram, Facebook, Threads |
| authority_feed | 전문성 + B2B trust | LinkedIn |
| trust_blog | 신뢰 + SEO | Naver Blog, Tistory, Brunch |
| short_discovery | discovery + reach | YouTube Shorts, Reels, TikTok |
| authority_video | 교육 + authority | YouTube |
| community_trust | 커뮤니티 신뢰 | Naver Cafe |
| messaging_direct | 직접 메시징 | Kakao, Email, SMS |
| search_presence | 검색 노출 | Naver Place, Google Business |
| event_burst | 긴급 multi-channel | (이벤트 시) |

## Content Density

| Surface | Density | Max Words |
|---------|---------|----------|
| short_discovery | very_low | 30 |
| messaging_direct | low | 100 |
| social_feed | medium | 150 |
| authority_feed | high | 300 |
| trust_blog | very_high | 2000 |

## CTA Adaptation

| Surface | CTA 허용 | Style |
|---------|---------|-------|
| social_feed | soft only | 최소한 |
| authority_feed | ✅ | consultative |
| trust_blog | ✅ | advisory |
| short_discovery | ❌ | none |
| community_trust | minimal | 신뢰 중심 |
| messaging_direct | ✅ | direct |

## Trust Preservation

감지 항목:
- 과도한 CTA 비율
- 복붙 콘텐츠
- 반복 hook
- 과운영
- tone 불일치

## Surface Health Score

요소: freshness(20%) + (100-fatigue)(20%) + trust(20%) + cadence(15%) + consistency(15%) + engagement_stability(10%)

## Content Routing

콘텐츠 유형별 자동 라우팅:
- trust → trust_blog, community_trust
- authority → authority_feed, authority_video
- lifestyle → social_feed, short_discovery
- event → event_burst, messaging_direct
- cta → messaging_direct, authority_feed

## Human Explainability

AI가 위 그렇게 적응했는지 설명:
```
Instagram은 visual presence 중심으로 축약했습니다.
Blog은 신뢰 확보를 위해 상세 설명을 유지했습니다.
```

## DB

content_surface · surface_health · content_adaptation · surface_recommendations · surface_lifecycle
