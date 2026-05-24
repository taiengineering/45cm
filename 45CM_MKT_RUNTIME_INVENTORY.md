# 45CM MKT Runtime Inventory

> Full audit of taiengineering/45cm marketing platform
> Date: 2026-05-24
> Perspective: Marketing = Domain Runtime, NOT independent platform

---

## Structure

```
taiengineering/45cm/
  engines/marketing-engine/
    api/              ← @45cm/marketing-api (Fastify server)
    worker/           ← @45cm/marketing-worker
    scheduler/        ← scheduler
    runtime/          ← 38 workspace packages (!)
    channels/         ← channel integrations
    domain/           ← domain logic
    analytics/        ← analytics
    approval/         ← approval workflow
    brand/            ← brand management
    campaign/         ← campaign management
    config/           ← configuration
    engagement/       ← engagement tracking
    leads/            ← lead management
  platform/
    auth/             ← ⚠️ authentication (Governance overlap)
    billing/          ← billing
    shared-types/     ← @45cm/core-shared-types
    workspace/        ← @45cm/core-workspace-runtime
  surfaces/
    admin/            ← ⚠️ duplicate admin UI
    app-shell/        ← ⚠️ duplicate shell
```

## Platform Drift Detection

### ❌ Governance Layer Violations (should be in federation-governance)

| Package | Path | Issue |
|---------|------|-------|
| permissions | runtime/permissions | RBAC → Governance ownership |
| policy | runtime/policy | Policy → Governance ownership |
| policy-engine | runtime/policy-engine | Policy engine → Governance ownership |
| tenant-isolation | runtime/tenant-isolation | Tenant → Governance ownership |
| platform/auth | platform/auth | Auth → Governance ownership |

### ❌ Federation Core Violations (should be in federation-core/FGW)

| Package | Path | Issue |
|---------|------|-------|
| operational-lifecycle | runtime/operational-lifecycle | Lifecycle → Core ownership |
| runtime-manager | runtime/runtime-manager | Runtime management → Core ownership |
| operational-control | runtime/operational-control | Orchestration → Core ownership |

### ⚠️ Shell Duplication

| Path | Issue |
|------|-------|
| surfaces/admin/ | Duplicate admin → canonical = apps/shell |
| surfaces/app-shell/ | Duplicate shell → canonical = apps/shell |

### ✅ Legitimate Marketing Domain Capabilities

| Package | Purpose | Canonical |
|---------|---------|----------|
| campaign | Campaign management | ✅ |
| leads | Lead management | ✅ |
| brand, brand-assets, brand-patterns | Brand management | ✅ |
| channels, channel-* | Channel integration | ✅ |
| engagement | Engagement tracking | ✅ |
| analytics | Analytics | ✅ |
| content-surface | Content delivery | ✅ |
| approval | Approval workflow | ✅ |
| publish, publish-safety | Content publishing | ✅ |
| simulation, simulation-world | Campaign simulation | ✅ |
| queue | Job queue | ✅ |
| cache | Caching | ✅ |
| db | Database runtime | ✅ |
| event, event-operations | Event handling | ✅ |
| ai | AI integration | ✅ |
| token-budget | Token management | ✅ |
| visual | Visual assets | ✅ |
| notification | Marketing notifications | ✅ |
| alert | Marketing alerts | ✅ |

## API Dependencies (from engines/marketing-engine/api/package.json)

```
@45cm/core-shared-types       ← platform/shared-types
@45cm/core-ai-runtime         ← runtime/ai
@45cm/core-queue-runtime      ← runtime/queue
@45cm/core-event-runtime      ← runtime/event
@45cm/core-db-runtime         ← runtime/db
@45cm/core-workspace-runtime  ← platform/workspace
@45cm/core-billing-runtime    ← platform/billing
@45cm/core-alert-runtime      ← runtime/alert
@45cm/core-workflow-runtime   ← runtime/workflow
@45cm/channel-naver-kin       ← channels/naver-kin
```

## Railway

- Service: 45cm-mkt (project: tai-api)
- Source: taiengineering/45cm
- Builder: RAILPACK
- Status: **FAILED** (since 2026-05-18)
