# Runtime Dependency Map

## Runtime Tier Classification

### Core Execution (Always Active)
| Runtime | Dependencies | Owner |
|---------|-------------|-------|
| ai | openai | ai-worker |
| queue | redis (BullMQ) | queue-registry |
| publish | queue, db, channel-integration | publish-worker |
| db | supabase | — (shared) |
| event | db | — (shared) |
| scheduler | queue, db | scheduler-worker |
| cache | redis | — (shared) |

### Operational (Toggleable)
| Runtime | Dependencies | Owner |
|---------|-------------|-------|
| campaign-intelligence | db, analytics | — |
| channel-health | db, analytics | — |
| strategy-memory | db | — |
| channel-integration | db, oauth providers | — |
| visual | — (standalone) | — |
| brand | — (config-based) | — |

### Safety (Always Active)
| Runtime | Dependencies | Owner |
|---------|-------------|-------|
| tenant-isolation | — | — |
| policy-engine | — | — |
| permissions | — | — |
| publish-safety | db | publish-worker |
| token-budget | db (billing) | ai-worker |
| retry-policy | — | queue |
| emergency-stop | db | — |

### Simulation (Opt-in)
| Runtime | Dependencies | Owner |
|---------|-------------|-------|
| simulation | — (standalone) | — |
| simulation-world | — (standalone) | — |

## Bootstrap Order

```
1. core (ai, queue, publish, db, event, scheduler, cache)
2. safety (tenant-isolation, policy-engine, permissions, publish-safety, token-budget, retry-policy, emergency-stop)
3. operational (campaign-intelligence, channel-health, strategy-memory, channel-integration, visual, brand)
4. simulation (simulation)
5. experimental (simulation-world)
```

## Queue Ownership

| Queue | Owner Worker | Priority |
|-------|-------------|----------|
| 45.mkt.draft | ai-worker | 3 |
| 45.mkt.humanize | ai-worker | 3 |
| 45.mkt.classify | ai-worker | 3 |
| 45.mkt.publish | publish-worker | 1 |
| 45.mkt.approval | publish-worker | 2 |
| 45.mkt.collect | ai-worker | 5 |
| 45.simulation | simulation-worker | 6 |
| 45.dead.* | DLQ (no worker) | 99 |
