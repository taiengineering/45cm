# Production Runtime Topology

## 시스템 구조

```
┌─────────────────┐     ┌─────────────────┐
│  Cloudflare       │     │  Railway          │
│  Pages            │     │                   │
│                   │     │  ┌─────────────┐ │
│  app.45cm.com     │───▶│  │ API Server  │ │
│  (Next.js SSG)    │     │  │ v0.7.0      │ │
│  20 pages         │     │  │ Fastify     │ │
└─────────────────┘     │  └─────────────┘ │
                          │        │           │
                          │  ┌────┴────────┐ │
                          │  │ Workers      │ │
                          │  │ ai-worker    │ │
                          │  │ publish-wkr  │ │
                          │  │ humanize-wkr │ │
                          │  └─────────────┘ │
                          │        │           │
                          │  ┌────┴────────┐ │
                          │  │ Redis        │ │
                          │  │ BullMQ       │ │
                          │  │ Cache        │ │
                          │  └─────────────┘ │
                          └─────────────────┘
                                  │
                          ┌──────┴──────────┐
                          │  Supabase           │
                          │  PostgreSQL          │
                          │  7 schemas           │
                          │  30+ tables          │
                          │  Storage (assets)    │
                          └───────────────────┘
```

## Runtime Layer Topology

```
Layer 1: Core Execution
└─ ai → queue → publish → db → event → scheduler → cache

Layer 2: Safety
└─ tenant-isolation → policy-engine → permissions
└─ publish-safety → token-budget → retry-policy → emergency-stop

Layer 3: Operational
└─ campaign-intelligence → channel-health → strategy-memory
└─ channel-integration → visual → brand

Layer 4: Simulation (opt-in)
└─ simulation

Layer 5: Experimental (opt-in)
└─ simulation-world
```

## Worker Topology

| Worker | Queues | Concurrency |
|--------|--------|-------------|
| ai-worker | draft, humanize, classify, collect | 3 |
| publish-worker | publish, approval | 3 |
| scheduler | (cron) | 1 |

## Resource Budget

| Resource | Limit | Current |
|----------|-------|---------|
| Memory | 512MB | ~200MB |
| Redis | 256MB | ~50MB |
| Queue concurrency | 3/worker | 3 |
| Token budget | 500K/ws/month | configurable |
| Cache TTL | 1h (default) | configurable |

## Deployment Profiles

| Profile | Mode | Runtimes | Use Case |
|---------|------|----------|----------|
| minimal | minimal | 12 core+safety | 초기 SaaS |
| standard | operational | 20 | 일반 SaaS |
| enterprise | enterprise | 22 | 대규모 |
| sim-lab | development | 22 | 시뮬레이션 실험 |
