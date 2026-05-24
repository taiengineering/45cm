# ⚠️ FROZEN LEGACY RUNTIME

> 이 repository는 historical/migration origin 용도로만 유지됩니다.
> **Canonical active runtime:** → [45cminc/mkt-runtime](https://github.com/45cminc/mkt-runtime)
> 신규 개발/배포/운영은 canonical repository에서만 수행합니다.

---

## Status: ❄️ FROZEN HISTORICAL ORIGIN

**Date:** 2026-05-25
**Previous role:** 45cm Marketing Engine monorepo
**Current role:** Frozen historical origin — DO NOT use for active development

---

## What This Repo Was

45cm Marketing Engine monorepo containing:
- Marketing domain runtime (campaign, funnel, channels)
- Platform capabilities (auth, billing, workspace)
- Surfaces (admin, app-shell)

## What Happened

1. Marketing capabilities physically migrated to `taiengineering/mkt-runtime`
2. Organizational ownership repatriated to `45cminc/mkt-runtime`
3. Platform capabilities (auth/billing/workspace) remain frozen here
4. This repo is now historical origin only

## Canonical Ownership

| Capability | Canonical Owner |
|-----------|----------------|
| Marketing Runtime | [45cminc/mkt-runtime](https://github.com/45cminc/mkt-runtime) |
| Marketing UI | 45cminc/ui/apps/mkt-ui |
| Shell | 45cminc/ui/apps/shell |
| Orchestration | 45cminc/fgw |
| Governance | taiengineering/federation-governance |

## Rules

1. ❌ DO NOT add new features
2. ❌ DO NOT deploy from this repo
3. ❌ DO NOT create feature branches
4. ❌ DO NOT reconnect to Railway
5. ✅ Use as migration reference only
6. ✅ Retained for git history + rollback reference
