# 45cm Marketing Engine — Issue Log

## 해결된 이슈 (12개)

| ID | 이슈 | 원인 | 해결 |
|----|------|------|------|
| ISS-001 | Railway 502 | Python 감지 | Dockerfile 분리 |
| ISS-002 | Supabase 스키마 | PostgREST 인식불가 | NOTIFY pgrst |
| ISS-003 | OpenAI 행 | REDIS_URL+timeout | 환경변수+30초 |
| ISS-004 | Redis MISCONF | 볼륨없음 | persistent volume |
| ISS-005 | CTA UUID | text vs uuid | text 변경 |
| ISS-006 | BullMQ 행 | 연결대기무한 | 10초 timeout |
| ISS-007 | frozen-lockfile | lockfile 미업데이트 | --no-frozen-lockfile |
| ISS-008 | Engagement 크래시 | .filter() on non-array | Array.isArray |
| ISS-009 | 파비콘 | metadata icons 제한 | head 직접 link |
| ISS-010 | OAuth JSON | redirect 안됨 | rp.redirect(302) |
| ISS-011 | upsert 실패 | unique 없음 | UNIQUE+분기 |
| ISS-012 | Healthcheck | duplicate route | server.ts 제거 |

## 대기 중인 이슈 (8개)

| ID | 이슈 | 우선순위 |
|----|------|----------|
| P01 | Slack Interactivity URL | P1 |
| P02 | PUBLISH_MODE=real 전환 | P1 |
| P03 | Calendar→Publish cron | P1 |
| P04 | Cloudflare CI=false | P2 |
| P05 | Console mock→real API | P2 |
| P06 | AI Quality Scoring | P3 |
| P07 | 실제 Campaign 3개 운영 | P1 |
| P08 | lockfile push | P0 |

## 플랫폼 연동 현황

| 채널 | 연결 | 자동화 | 다음 |
|------|------|--------|------|
| LinkedIn | ✅ | full_automation | Products 승인 |
| Facebook | ⚠️ | full_automation | Meta App Review |
| Instagram | ⚠️ | full_automation | Meta Business Suite |
| Naver Blog | ⚠️ | assisted | 개발자센터 App |
| Kakao | ⚠️ | assisted | 비즈앱+딜러사 |
| YouTube | ⚠️ | full_automation | Google Console |
