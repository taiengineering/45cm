# YouTube Platform Validation

## 연결 상태: ⚠️ 미연결 (Google Cloud Console 설정 필요)

## 사전 요구사항

| 항목 | 필요 여부 | 상태 |
|------|----------|------|
| Google Cloud Console | ❌ 필수 | 미설정 |
| YouTube Data API v3 활성화 | ❌ 필수 | 미활성 |
| OAuth consent screen | ❌ 필수 | 미설정 |
| YouTube 채널 | ❌ 필수 | TAI 채널 필요 |

## Capability 검증

| 기능 | API | 상태 |
|------|-----|------|
| Video Upload | videos.insert | ✅ 가능 |
| Shorts Upload | videos.insert (세로 영상) | ✅ 가능 |
| Thumbnail | thumbnails.set | ✅ 가능 |
| Analytics | YouTube Analytics API | ✅ 가능 |
| Comment | commentThreads.insert | ✅ 가능 |

## Quota 분석

- 일일 할당량: 10,000 units
- Video Upload: 1,600 units/건
- 일 6개 영상 업로드 가능
- Quota 초과 시 403 오류
- Quota 증가 신청 가능 (Google 심사)

## 판정: full_automation (App Review + Quota 관리 필수)
