# LinkedIn Platform Validation

## 연결 상태: ✅ 실제 연결 완료

- App ID: 236300022
- Client ID: 86cug49ujwidrz
- OAuth: ✅ 완료
- Integration Health: connected=true, publishReady=true

## OAuth 유지

| 항목 | 상태 |
|------|------|
| Access Token 만료 | 60일 |
| Refresh Token 만료 | 365일 |
| 자동 Refresh | 구현 필요 (RefreshManager) |
| Reconnect UX | ✅ 1클릭 |

## 실제 게시 가능 기능

| 기능 | API | 상태 |
|------|-----|------|
| Text Post | Posts API | ✅ 가능 |
| Image Post | Image Upload + Posts API | ✅ 가능 |
| Article Link | Posts API (article) | ✅ 가능 |
| Video Post | Video Upload API | ✅ 가능 |
| Carousel | Posts API (multi-image) | ✅ 가능 |

## Publish Target

| 대상 | 필요 Scope | 상태 |
|------|------------|------|
| 개인 프로필 | w_member_social | ✅ 활성 |
| Organization Page | w_organization_social | ⚠️ 추가 신청 필요 |

## API 버전

- UGC Posts API → Posts API 마이그레이션 필요
- 헤더 필수: `Linkedin-Version: 202604`, `X-Restli-Protocol-Version: 2.0.0`
- 버전 지원: 최소 1년

## Rate Limit

- ~100 API calls/일/멤버
- 75% 도달 시 이메일 알림

## 리스크

- 과도한 자동화 시 계정 제한 가능성 낮음
- Community Management API 승인 권장

## 판정: full_automation ✅
