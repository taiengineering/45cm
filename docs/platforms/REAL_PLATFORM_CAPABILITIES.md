# Real Platform Capabilities Matrix

## P0 채널 (즉시 검증)

### LinkedIn
| 항목 | 상태 | 비고 |
|------|------|------|
| OAuth | ✅ 완료 | OpenID Connect + w_member_social |
| 실제 게시 (text) | ✅ 가능 | Posts API (Community Management) |
| 이미지 게시 | ✅ 가능 | image upload + post |
| 영상 게시 | ✅ 가능 | video upload API |
| 댓글 | ✅ 가능 | comments API |
| Analytics | ✅ 가능 | Member Post Analytics (2025~) |
| Refresh Token | ✅ 365일 | access token 60일 |
| App Review | ⚠️ | Share on LinkedIn product 필요 |
| Rate Limit | ~100회/일/멤버 | 촩분 |
| Publish Target | 개인 + Organization | w_organization_social 추가 필요 |
| 자동화 범용성 | **full_automation** | ✅ |

### Meta (Instagram / Facebook)
| 항목 | 상태 | 비고 |
|------|------|------|
| OAuth | ✅ 가능 | Meta Business Suite 필수 |
| Facebook 게시 | ✅ 가능 | Pages API |
| Instagram Feed | ✅ 가능 | Content Publishing API |
| Instagram Reels | ✅ 가능 | Reels Publishing API |
| Story | ❌ 제한 | API로 불가 (수동만) |
| Analytics | ✅ 가능 | Insights API |
| Refresh Token | ✅ 60일 | long-lived token |
| App Review | ❌ **필수** | publish 권한 심사 필요 |
| Business Verification | ❌ **필수** | Meta Business Suite 인증 |
| Rate Limit | 200회/시간 | Graph API |
| 자동화 범용성 | **full_automation** (심사 후) | App Review 통과 필수 |

### Kakao Channel
| 항목 | 상태 | 비고 |
|------|------|------|
| OAuth | ✅ 가능 | Kakao Developers 비즈앱 |
| 친구톡 (FTS/FMS) | ✅ 가능 | 채널 친구 대상 발송 |
| 알림톡 (AT) | ⚠️ 공식 딜러사 필요 | 직접 API 불가, 딜러사 경유 |
| Segmentation | ✅ 가능 | 고객파일 업로드 |
| Analytics | ✅ 가능 | 발송 결과 조회 |
| Template 심사 | ❌ **필수** | 카카오 템플릿 검수 2-3일 |
| 비즈니스 인증 | ❌ **필수** | 사업자등록 + 비즈앱 전환 |
| 자동화 범용성 | **assisted** | 딜러사 계약 + 템플릿 심사 |

### Naver Blog
| 항목 | 상태 | 비고 |
|------|------|------|
| OAuth | ✅ 가능 | 네이버 로그인 OpenAPI |
| 글쓰기 API | ✅ 존재 | 블로그 글쓰기 API (로그인 필요) |
| 이미지 | ⚠️ 제한 | 본문 내 이미지 URL 방식 |
| 댓글 | ❌ 불가 | 댓글 API 없음 |
| Analytics | ❌ 불가 | 공식 통계 API 없음 |
| 검색 노출 | ✅ 우수 | 네이버 SEO 최고 |
| 자동화 리스크 | ⚠️ 중간 | 과도한 자동화 시 검색 페널티 가능성 |
| 자동화 범용성 | **assisted** | API 게시 가능하나 신중 운영 필요 |

---

## P1 채널

### YouTube
| 항목 | 상태 | 비고 |
|------|------|------|
| OAuth | ✅ 가능 | Google Cloud Console |
| Video Upload | ✅ 가능 | YouTube Data API v3 |
| Shorts Upload | ✅ 가능 | 일반 업로드 + shorts 태그 |
| Analytics | ✅ 가능 | YouTube Analytics API |
| Quota | ⚠️ **엄격** | 10,000 units/일 (업로드=1600 units) |
| App Review | ❌ **필수** | Google OAuth consent 심사 |
| 자동화 범용성 | **full_automation** (심사 후) | Quota 관리 필수 |

### Threads
| 항목 | 상태 | 비고 |
|------|------|------|
| OAuth | ✅ 가능 | Threads API (2024~) |
| 게시 | ✅ 가능 | Text + Image |
| Analytics | ✅ 가능 | Insights API |
| 자동화 범용성 | **full_automation** | Meta 앱 심사 필요 |

---

## 자동화 범용성 분류

| 상태 | 의미 | 채널 |
|------|------|--------|
| **full_automation** | API로 완전 자동 게시 가능 | LinkedIn, Facebook, Instagram, YouTube, Threads |
| **assisted** | API 가능하나 제약 있음 | Naver Blog, Kakao Channel |
| **manual_required** | API 없음, 수동 게시 | Tistory, Brunch, Naver Cafe |
| **blocked** | 자동화 불가 | SMS (딜러사 필수), Naver Place |
