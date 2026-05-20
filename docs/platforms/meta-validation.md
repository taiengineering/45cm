# Meta Platform Validation (Instagram / Facebook)

## 연결 상태: ⚠️ 미연결 (App Review 필요)

## 사전 요구사항

| 항목 | 필요 여부 | 상태 |
|------|----------|------|
| Meta Developer Account | ❌ 필수 | 미등록 |
| Meta Business Suite | ❌ 필수 | 미설정 |
| Facebook Page | ❌ 필수 | TAI Page 필요 |
| Instagram Business Account | ❌ 필수 | 전환 필요 |
| App Review | ❌ 필수 | 심사 2-4주 |
| Business Verification | ❌ 필수 | 사업자 인증 |

## Capability 검증

### Facebook Page
| 기능 | API | 상태 |
|------|-----|------|
| Text Post | Pages API | ✅ 가능 (심사 후) |
| Image Post | Photos API | ✅ 가능 |
| Video Post | Videos API | ✅ 가능 |
| Story | ❌ | API 미지원 |
| Analytics | Insights API | ✅ 가능 |

### Instagram
| 기능 | API | 상태 |
|------|-----|------|
| Feed Post | Content Publishing API | ✅ 가능 (심사 후) |
| Reel | Reels Publishing API | ✅ 가능 |
| Story | ❌ | API 미지원 |
| Comment | Comments API | ✅ 가능 |
| Analytics | Insights API | ✅ 가능 |

## 위험도 분석

- Meta 정책 변경 빈번 (연 2-3회 대규모 변경)
- App Review 엄격 (publish 권한 특히)
- 자동화 민감 (스팸 감지)
- Rate Limit: 200회/시간

## 다음 단계

1. Meta Developer 등록
2. Meta Business Suite 설정
3. Facebook Page 생성/연결
4. Instagram Business 전환
5. App 생성 + publish 권한 신청
6. App Review 제출 (2-4주 소요)

## 판정: full_automation (App Review 통과 후)
