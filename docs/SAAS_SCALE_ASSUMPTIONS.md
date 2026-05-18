# SaaS Scale Assumptions

## 현재 설계 기준

### Workspace Scale
- Target: 100 workspaces
- Max concurrent draft generation: 10
- Max concurrent publish: 20
- Max scheduled publishes per day: 200

### Token Budget
- Default monthly limit: 500,000 tokens/workspace
- Soft limit: 400,000 (warning)
- Hard limit: 500,000 (block)
- Burst limit: 10,000 tokens/request
- Estimated cost: ~$0.50/workspace/month (GPT-4o-mini)

### Queue Scale
- Redis: single instance (Railway)
- BullMQ concurrency: 3 per worker
- Priority: Publish(1) > Approval(2) > Draft(3) > Visual(4) > Analytics(5)
- DLQ: per queue type (45.dead.ai, 45.dead.publish, 45.dead.visual)

### Worker Scaling
| Worker | 현재 | Scale 시 |
|--------|------|--------|
| ai-worker | 1 instance | horizontal scale |
| publish-worker | 1 instance | horizontal scale |
| analytics-worker | inline | 분리 가능 |
| visual-worker | inline | 분리 가능 |
| notification-worker | inline | 분리 가능 |

### Cache Strategy
- Humanize cache: 1h TTL
- Classification cache: 24h TTL
- Visual prompt cache: 1h TTL
- Response fingerprint: 24h TTL

### DB Scale
- Supabase Pro: connection pooling
- Read replicas: 불필요 (100 ws 기준)
- Partitioning: analytics_events 테이블 월별 분할 검토

### Cost Estimate (100 workspaces)
| 항목 | 월 비용 |
|------|--------|
| OpenAI (GPT-4o-mini) | ~$50 |
| Railway (API + Redis) | ~$20 |
| Supabase (Pro) | ~$25 |
| Cloudflare Pages | $0 |
| **Total** | **~$95/month** |

### Bottleneck 예상
1. OpenAI rate limit (Tier 1: 500 RPM)
2. Redis memory (1GB 이하 유지)
3. Supabase connection pool (max 60)

### Scale Trigger
- 100+ ws → Redis cluster 검토
- 500+ ws → Worker horizontal scaling
- 1000+ ws → DB read replica + queue sharding
