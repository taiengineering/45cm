# Marketing Engine — 이벤트 명세

## 엔진 출력 이벤트

관재엔진 및 외부 시스템이 소비할 수 있는 이벤트.

| 이벤트 | 트리거 | 페이로드 |
|--------|--------|----------|
| `lead.generated` | CTA 클릭 + 리드 조건 충족 | `{ lead_id, workspace_id, source, score, contact }` |
| `cta.clicked` | CTA URL 클릭 | `{ cta_id, workspace_id, ref, channel, trace_id }` |
| `campaign.completed` | 캐페인 모든 단계 완료 | `{ campaign_id, workspace_id, results }` |
| `publish.completed` | 채널 발행 완료 | `{ draft_id, channel, external_post_id, published_at }` |
| `publish.failed` | 채널 발행 실패 | `{ draft_id, channel, error, retry_count }` |
| `engagement.detected` | 반응 감지 | `{ post_id, channel, likes, comments, shares }` |
| `draft.generated` | AI 드래프트 생성 | `{ draft_id, model, cost_usd, trace_id }` |
| `draft.humanized` | Humanize 완료 | `{ draft_id, model, trace_id }` |
| `approval.decided` | 승인/거절 결정 | `{ draft_id, status, decided_by }` |

## 엔진 내부 이벤트

엔진 내부에서만 사용되는 이벤트.

| 이벤트 | 용도 |
|--------|------|
| `queue.health.warning` | 큐 이상 감지 |
| `ai.usage.recorded` | AI 사용량 기록 |
| `workflow.step.completed` | 워크플로 단계 완료 |
| `alert.created` | 런타임 알림 생성 |
