# Korea-first Universal Channel Model

## 범용 채널 카테고리 (7개)

| 카테고리 | 채널 | 설명 |
|----------|--------|------|
| SNS | Instagram, Facebook, LinkedIn, Threads | 소셜 미디어 |
| Blog | Naver Blog, Tistory, Brunch | 블로그/SEO |
| Short Video | YouTube Shorts, Instagram Reels, TikTok | 순동영상 |
| Video | YouTube | 장편 영상 |
| Community | Naver Cafe | 커뮤니티 |
| Messaging | Kakao Channel, Email, SMS, Alimtalk | 다이렉트 메시징 |
| Search Presence | Naver Place, Google Business | 검색 노출 |

## 제외 채널 기준

제외 대상:
- SmartStore, Coupang, 무신사, 오늘의집 → Commerce 특화
- Velog, Clien, DCInside, 믭봐리 → IT/커뮤니티 특화
- X(Twitter) → 한국 기업 사용률 낮음

포함 기준:
- 대부분 기업이 실제 사용하는 채널
- 업종 무관하게 범용적인 채널
- 한국 시장 우선

## 채널별 운영 특성

### 높은 CTA 민감도 (주의)
- LinkedIn: 전문성 중시, Hard CTA 기피
- Naver Cafe: 커뮤니티 신뢰 중시
- SMS: 빈도 제한 필수

### 높은 피로도 (주의)
- TikTok/Reels/Shorts: 매우 빠른 피로
- Kakao/Alimtalk/SMS: 메시징 피로
- Instagram: 시각 피로

### 낮은 피로도 (안정)
- Naver Blog: SEO 지속성
- Google Business: 검색 노출 지속
- Naver Place: 지역 검색 지속

## CTA 허용 정책

| 채널 | Soft | Advisory | Hard |
|------|------|----------|------|
| LinkedIn | ✅ | ✅ | ⚠️ 제한 |
| Naver Blog | ✅ | ✅ | ✅ |
| Facebook | ✅ | ✅ | ✅ |
| Instagram | ✅ | ⚠️ | ❌ |
| Naver Cafe | ✅ | ⚠️ | ❌ |
| Kakao Channel | ✅ | ✅ | ⚠️ |
| Email | ✅ | ✅ | ✅ |
| SMS | ❌ | ✅ | ✅ |
| TikTok | ❌ | ❌ | ❌ |
| YouTube | ✅ | ✅ | ⚠️ |

## Runtime Policy 구조

각 채널에 다음 정책이 적용됩니다:

- **cadence**: 발행 빈도 (very_low ~ very_high)
- **cooldownHours**: 최소 발행 간격
- **ctaTolerance**: CTA 허용 수준
- **fatigueWeight**: 피로도 가중치
- **approvalRequired**: 승인 필수 여부
- **trustSensitivity**: 신뢰 민감도
- **visualRequired**: 시각 자산 필수 여부
- **frequencyCap**: 발송 제한 (메시징 채널)
