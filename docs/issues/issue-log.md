# 45cm Marketing Engine — Issue Log

## 해결된 이슈 (Resolved)

### ISS-001: Railway 502 오류
- **원인**: Python 파일 감지로 Nixpacks가 Python 빌더 사용
- **해결**: 전용 Dockerfile 생성 + 전용 repo 분리
- **상태**: ✅ 해결

### ISS-002: Supabase 스키마 미노출
- **원인**: PostgREST가 새 스키마를 인식 못함
- **해결**: `ALTER ROLE` + `NOTIFY pgrst, 'reload schema'`
- **상태**: ✅ 해결

### ISS-003: OpenAI API 행
- **원인**: REDIS_URL 미설정 + AbortController timeout 없음
- **해결**: REDIS_URL 환경변수 설정 + 30초 timeout 추가
- **상태**: ✅ 해결

### ISS-004: Redis MISCONF 오류
- **원인**: Redis 볼륨 없이 생성되어 디스크 쓰기 실패
- **해결**: Redis 재생성 with persistent volume (bitnami/redis)
- **상태**: ✅ 해결

### ISS-005: CTA subject_id UUID 타입 오류
- **원인**: CTA ID가 text인데 DB가 UUID 기대
- **해결**: subject_id 컨럼 text로 변경
- **상태**: ✅ 해결

### ISS-006: BullMQ enqueue 행
- **원인**: Redis 연결 대기 무한
- **해결**: 10초 timeout + non-blocking enqueue
- **상태**: ✅ 해결

### ISS-007: Cloudflare frozen-lockfile 실패
- **원인**: GitHub API로 새 패키지 push 시 pnpm-lock.yaml 미업데이트
- **해결**: 빌드 명령어 `pnpm install --no-frozen-lockfile && pnpm build` + 로컬에서 lockfile push
- **근본 해결**: Cloudflare 환경변수 `CI=false` 추가 권장
- **상태**: ✅ 해결 (반복 발생 가능, lockfile push로 대응)

### ISS-008: Engagement 페이지 크래시
- **원인**: API가 배열이 아닌 응답 반환 시 `.filter()` 오류
- **해결**: `Array.isArray(d) ? setEngagements(d) : null` 방어 코드
- **상태**: ✅ 해결

### ISS-009: Next.js metadata icons 파비콘 미노출
- **원인**: Next.js static export에서 metadata icons가 제대로 동작 안 함
- **해결**: `<head>` 직접 `<link rel="icon">` 태그 방식으로 변경
- **상태**: ✅ 해결

### ISS-010: OAuth start가 JSON 반환 (redirect 안 됨)
- **원인**: OAuth start 라우트가 `rp.send({url})` 반환
- **해결**: `rp.redirect(302, url)` 로 변경
- **상태**: ✅ 해결

### ISS-011: workspace_integrations upsert 실패
- **원인**: unique constraint 없음
- **해결**: `uq_integration_ws_provider` UNIQUE (workspace_id, provider) 추가
- **후속**: upsert 대신 select 후 update/insert 분기 방식으로 변경
- **상태**: ✅ 해결

---

## 대기 중인 이슈 (Pending)

### ISS-P01: Slack Interactivity URL 미등록
- **영향**: Slack 버튼 클릭 시 approval 상태 변경 안 됨
- **해결 방법**: Slack App → Interactivity → URL: `https://api.45cm.com/approval/callback`
- **우선순위**: P1

### ISS-P02: PUBLISH_MODE=real 전환 전 검증
- **현재**: mock 모드
- **전환 기준**: Mock 10회 성공, Approval 5회 정상, CTA 3회 정상
- **우선순위**: P1

### ISS-P03: Calendar → Publish Queue 스케줄러
- **설명**: scheduled_at 시간이 되면 자동으로 publish queue에 추가하는 cron job 필요
- **우선순위**: P1

### ISS-P04: Cloudflare CI=false 환경변수
- **설명**: Cloudflare Pages 환경변수에 CI=false 추가 시 frozen-lockfile 근본 해결
- **우선순위**: P2

### ISS-P05: Console 페이지 실제 데이터 연결
- **설명**: Intelligence, Channel Health 페이지가 아직 mock 데이터 사용
- **해결**: 실제 운영 데이터 누적 후 API 연결
- **우선순위**: P2

### ISS-P06: Content Quality AI Scoring
- **설명**: /drafts/:id/score 엔드포인트는 있으나 AI 기반 스코어링 미구현
- **우선순위**: P3

### ISS-P07: 실제 Campaign 3개 운영 시작
- **설명**: 산업안전 FAQ, 중대재해 사례 분석, 무료 법령진단 CTA
- **우선순위**: P1 (TAI 준비 후)

---

## 환경변수 현황

### Railway (45cm-mkt)
| 변수 | 상태 |
|------|------|
| PORT | ✅ |
| SUPABASE_URL | ✅ |
| SUPABASE_SERVICE_KEY | ✅ |
| OPENAI_API_KEY | ✅ |
| REDIS_URL | ✅ |
| SLACK_BOT_TOKEN | ✅ |
| SLACK_CHANNEL_ID | ✅ |
| PUBLISH_MODE | ✅ (mock) |
| LINKEDIN_CLIENT_ID | ✅ |
| LINKEDIN_CLIENT_SECRET | ✅ |

### Cloudflare Pages (app.45cm.com)
| 변수 | 상태 |
|------|------|
| NODE_VERSION | ✅ (20) |
| NEXT_PUBLIC_API_BASE_URL | ✅ (https://api.45cm.com) |
| CI | ⚠️ (false 추가 권장) |
