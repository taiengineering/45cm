# Failure Response Playbook

## Publish 실패

| 원인 | 대응 |
|------|------|
| Network error | 자동 retry (최대 3회) |
| Auth error (token 만료) | Settings → Reconnect |
| Permission denied | LinkedIn App 권한 확인 |
| Rate limited | 1시간 대기 후 재시도 |
| Content rejected | 콘텐츠 수정 후 재발행 |

## OAuth 만료

```
Settings → LinkedIn → Reconnect
→ OAuth 재승인
→ Health 확인
```

## Approval Timeout (24시간 미처리)

1. Slack 재알림 확인
2. Dashboard에서 직접 승인
3. 긴급 시 자동 승인 검토

## CTA Redirect 오류

1. CTA URL 확인 (api.45cm.com/c/:ctaId)
2. Redirect 대상 URL 접근 가능 여부 확인
3. Analytics 기록 확인

## 무한 Retry 방지

- Network error: 최대 3회
- Auth error: 즉시 중단 → 운영자 액션
- Validation error: 즉시 중단 → 콘텐츠 수정
