# SaaS Incident Playbook

## INC-001: Publish Incident (잘못된 게시)

### 증상
- 승인되지 않은 콘텐츠 게시
- 잘못된 채널에 게시
- 중복 게시

### 대응
1. **Emergency Stop** 활성화 (Settings → Emergency Stop)
2. 채널에서 직접 게시물 삭제/수정
3. Audit Log 확인 (Timeline)
4. 원인 분석 (Approval 미검증? 정책 미적용?)
5. Policy Rule 추가/강화
6. Emergency Stop 해제

### 예방
- Publish Safety 검증 활성화
- Duplicate Prevention 활성화
- Cooldown 정책 설정

---

## INC-002: Token Explosion (AI 비용 폭주)

### 증상
- 월간 토큰 한도 초과
- 예상 외 AI 비용 급증

### 대응
1. Token Budget 확인 (`/workspace/plan`)
2. Hard limit 도달 시 자동 차단 (429)
3. 최근 AI 사용 로그 확인 (`ai_usage_log`)
4. Cache 효율 확인
5. 필요 시 토큰 한도 조정

### 예방
- Soft limit 경고 모니터링
- Cache Runtime 활성화
- Response Fingerprinting

---

## INC-003: OAuth Failure (채널 연결 끊김)

### 증상
- Integration Health: tokenValid=false
- Publish 실패
- "Reconnect 필요" 표시

### 대응
1. Settings → 해당 채널 → Reconnect
2. OAuth 재승인
3. Integration Health 재확인
4. 실패 지속 시: 채널 개발자 앱 상태 확인

### 예방
- Token 만료 7일 전 알림
- Refresh token 자동 갱신

---

## INC-004: Queue Overload (큐 폭주)

### 증상
- Queue waiting 급증
- Worker 지연
- Publish 느려짐

### 대응
1. `/ops/queues` 확인
2. Stuck job 제거
3. DLQ 확인
4. 필요 시 Worker 재시작
5. 일시적으로 발행 빈도 감소

### 예방
- Priority Queue 활성화
- Queue Health 모니터링
- Dead Letter Queue 적용

---

## INC-005: Channel Ban (채널 차단)

### 증상
- Provider가 게시 차단
- Rate limit 초과
- 콘텐츠 정책 위반

### 대응
1. Emergency Stop 활성화
2. 채널 정책 확인
3. 콘텐츠 검토
4. 발행 빈도 감소
5. Provider 지원 연락 (필요 시)

### 예방
- Publish Window 정책
- Cooldown 정책
- 콘텐츠 품질 검증

---

## Emergency Stop 사용법

### 활성화
```
Settings → Emergency Stop → Activate
```
또는 API:
```
POST /emergency-stop { activate: true, reason: "..." }
```

### 해제
```
Settings → Emergency Stop → Deactivate
```

### 영향
- 모든 Publish 즉시 중단
- 예약 발행 일시 중단
- Draft 생성은 계속 가능
- Audit Log에 기록
