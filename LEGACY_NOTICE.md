# ⚠️ LEGACY NOTICE

## taiengineering/45cm is LEGACY

**Date:** 2026-05-24
**Status:** Legacy runtime source — DO NOT add new features
**Canonical ownership:** migrating to `taiengineering/mkt-runtime`

---

## What happened

This repo was the original 45cm Marketing Engine monorepo. It contained:
- Marketing domain runtime (campaign, funnel, channels, etc.)
- Platform capabilities (auth, billing, workspace)
- Governance capabilities (permissions, policy, tenant-isolation)
- Orchestration capabilities (lifecycle, runtime-manager, scheduler)
- Duplicate shell (surfaces/admin, surfaces/app-shell)

This created **platform drift** — the marketing engine grew into a full platform
instead of staying as a domain runtime within Federation.

## Current state

- Railway `45cm-mkt` still deploys from this repo
- Build status: **FAILED** (since 2026-05-18)
- Migration to `taiengineering/mkt-runtime` in progress

## Canonical ownership (post-migration)

| Capability | Canonical Owner |
|-----------|----------------|
| Campaign/Funnel/Channels | `taiengineering/mkt-runtime` |
| Auth/Permissions/Policy | `taiengineering/federation-governance` |
| Lifecycle/Orchestration | Federation Core (FGW) |
| Shell/Admin UI | `45cminc/ui/apps/shell` |
| Marketing UI | `45cminc/ui/apps/mkt-ui` |

## Rules

1. ❌ DO NOT add new features to this repo
2. ❌ DO NOT create new runtime packages here
3. ✅ Use as reference during migration
4. ✅ Will be archived when mkt-runtime is operational
