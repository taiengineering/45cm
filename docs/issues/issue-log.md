# 45cm Marketing Engine — Issue Log

## 해결된 이슈 (12개)

### ISS-001: Railway 502 오류
- **원인**: Python 파일 감지로 Nixpacks가 Python 빌더 사용
- **해결**: 전용 Dockerfile + repo 분리
- **상태**: ✅

### ISS-002: Supabase 스키마 미노출
- **원인**: PostgREST 스키마 인식 불가
- **해결**: `ALTER ROLE` + `NOTIFY pgrst`
- **상태**: ✅

### ISS-003: OpenAI API 행
- **원인**: REDIS_URL 미설정 + timeout 없음
- **해결**: REDIS_URL + 30초 timeout
- **상태**: ✅

### ISS-004: Redis MISCONF
- **원인**: 볼륨 없이 생성
- **해결**: Redis 재생성 (persistent volume)
- **상태**: ✅

### ISS-005: CTA subject_id UUID 타입
- **원인**: text vs UUID 타입 불일치
- **해결**: subject_id text 변경
- **상태**: ✅

### ISS-006: BullMQ enqueue 행
- **원인**: Redis 연결 대기 무한
- **해결**: 10초 timeout + non-blocking
- **상태**: ✅

### ISS-007: Cloudflare frozen-lockfile
- **원인**: GitHub API push 시 lockfile 미업데이트
- **해결**: `--no-frozen-lockfile` + 로컬 lockfile push
- **상태**: ✅ (반복 가능)

### ISS-008: Engagement 페이지 크래시
- **원인**: `.filter()` on non-array
- **해결**: `Array.isArray()` 방어
- **상태**: ✅

### ISS-009: 파비콘 미노출
- **원인**: Next.js static export metadata 제한
- **해결**: `<head>` 직접 `<link>` 태그
- **상태**: ✅

### ISS-010: OAuth JSON 반환
- **원인**: `rp.send({url})` 대신 redirect 필요
- **해결**: `rp.redirect(302, url)`
- **상태**: ✅

### ISS-011: workspace_integrations upsert
- **원인**: unique constraint 없음
- **해결**: UNIQUE 추가 + select→update/insert 분기
- **상태**: ✅

### ISS-012: Railway Healthcheck 실패 (duplicate route)
- **원인**: `/workspace/integrations` server.ts + routes-channels.ts 중복
- **해결**: server.ts에서 제거, routes-channels.ts 통합
- **상태**: ✅

---

## 대기 중인 이슈 (8개)

### ISS-P01: Slack Interactivity URL 미등록 [P1]
- Slack App → Interactivity → URL: `https://api.45cm.com/approval/callback`

### ISS-P02: PUBLISH_MODE=real 전환 [P1]
- 전환 기준: Mock 10회 + Approval 5회 + CTA 3회 정상

### ISS-P03: Calendar→Publish Queue 스케줄러 [P1]
- scheduler 패키지 구현 완료, cron 연결 필요

### ISS-P04: Cloudflare CI=false [P2]
- frozen-lockfile 근본 해결

### ISS-P05: Console 실제 데이터 연결 [P2]
- Intelligence/Channel Health/Simulation/World mock → real API

### ISS-P06: Content Quality AI Scoring [P3]
- /drafts/:id/score AI 스코어링 미구현

### ISS-P07: 실제 Campaign 3개 운영 [P1]
- 산업안전 FAQ / 중대재해 사례 / 무료 법령진단 CTA

### ISS-P08: lockfile push 필요 [P0]
- platform-restrictions, platform-strategy 신규 패키지 lockfile 미반영
- 해결: 로컬 `pnpm install --no-frozen-lockfile` 후 push

---

## 플랫폼별 연동 현황

| 채널 | 연결 | 자동화 레벨 | 다음 단계 |
|------|------|------------|----------|
| LinkedIn | ✅ OAuth 완료 | full_automation | Products 승인 확인 |
| Facebook | ⚠️ 미연결 | full_automation | Meta Developer 등록 + App Review |
| Instagram | ⚠️ 미연결 | full_automation | Meta Business Suite 설정 |
| Naver Blog | ⚠️ 미연결 | assisted | 개발자센터 App 등록 |
| Kakao Channel | ⚠️ 미연결 | assisted | 비즈앱 전환 + 딜러사 계약 |
| YouTube | ⚠️ 미연결 | full_automation | Google Cloud Console 설정 |
| Threads | ⚠️ 미연결 | full_automation | Meta App Review |

---

## 환경변수

### Railway (45cm-mkt)
PORT · SUPABASE_URL · SUPABASE_SERVICE_KEY · OPENAI_API_KEY · REDIS_URL · SLACK_BOT_TOKEN · SLACK_CHANNEL_ID · PUBLISH_MODE=mock · LINKEDIN_CLIENT_ID · LINKEDIN_CLIENT_SECRET — 모두 ✅

### Cloudflare Pages
NODE_VERSION=20 · NEXT_PUBLIC_API_BASE_URL=https://api.45cm.com — ✅ / CI=false ⚠️ 권장
