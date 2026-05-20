# Zero-Friction Connection Architecture

## 철학

```
운영은 복잡해도, 사용자는 쉬워야 한다.
```

운영자는 채널을 "연결한다"고 느껴야지,
"API를 설정한다"고 느끼면 안 된다.

## 목표 UX

```
채널 선택 → 로그인 → 완료
```

## UI에서 숨기는 것

- OAuth, Access Token, Refresh Token
- Scope, Redirect URI, App ID
- Webhook, Callback URL
- Provider-specific 기술 용어

## UI에서 보여주는 것

- Connect / Reconnect / Connected
- 채널명 + 아이콘
- 가능한 기능 (✓ Post ✓ Image ✗ Video)
- 운영 위험도 / CTA 민감도
- 권장 발행 리듬
- 연결 상태 (연결됨 / 만료됨 / 확인 필요)

## Runtime 구조

### OAuth Runtime (내부)

| 모듈 | 역할 |
|------|------|
| SessionManager | OAuth state/session 관리 (10분 만료) |
| TokenStore | 토큰 저장/조회 (절대 UI 노출 안 함) |
| RefreshManager | 자동 토큰 갱신 (1시간 전 시도) |
| ScopeValidator | 권한 검증 (capability 매핑) |
| ReconnectEngine | 재연결 판단 + 사람 언어 메시지 |
| CapabilitySync | 연결 후 기능 자동 감지 |

### Provider Interface (표준화)

모든 채널이 동일한 인터페이스 사용:

```typescript
connect(workspaceId) → { url }
disconnect(workspaceId)
refresh(workspaceId) → boolean
health(workspaceId) → ConnectionHealth
capabilities() → ChannelCapabilityType[]
publishTargets(token) → PublishTarget[]
```

### Connection Health 상태

| 상태 | 뜻 | 사용자 메시지 |
|------|------|------------|
| healthy | 정상 | "연결됨" |
| warning | 확인 필요 | "연결 상태를 확인해주세요" |
| expired | 만료 | "다시 연결해주세요" |
| permission_required | 권한 부족 | "추가 권한이 필요합니다" |
| reconnect_required | 재연결 | "Reconnect를 눌러주세요" |
| degraded | 일부 제한 | "일부 기능이 제한되어 있습니다" |
| disconnected | 미연결 | "Connect를 눌러 연결하세요" |

## Silent Recovery

운영자가 인지하지 않게:
- 자동 token refresh (1시간 전)
- 자동 capability resync
- 자동 reconnect retry

문제 발생 시만 사람 언어로 알림.

## Provider Complexity Absorption

| 플랫폼 | Runtime 처리 |
|----------|-------------|
| Meta (FB/IG) | Page selection, Business Account 매핑 |
| LinkedIn | Organization lookup, Personal vs Company |
| Google (YT) | Channel mapping, Brand Account |
| Kakao | Channel 매핑, Alimtalk 템플릿 |
| Naver | Blog 인증, Place 인증 |

운영자는 이 복잡성을 절대 의식하지 않음.

## Zero-Config 우선순위

| 방식 | 우선 |
|------|------|
| OAuth Popup | 최고 |
| Embedded Login | 높음 |
| Email Verification | 가능 |
| API Key | 최후 (Advanced Setup) |

## Connection Event Logging

```sql
ops.connection_events
→ connected, reconnected, expired, recovered,
   capability_changed, permission_denied
```

## Browser QA Checklist

- [ ] Popup blocker 대응
- [ ] 모바일 브라우저 테스트
- [ ] OAuth 취소 처리
- [ ] Reconnect 흐름
- [ ] Redirect 후 새로고침
- [ ] 세션 손실 처리
- [ ] 느린 네트워크 처리
