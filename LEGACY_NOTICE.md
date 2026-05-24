# ⚠️ LEGACY NOTICE — MIGRATION COMPLETE

## taiengineering/45cm is FROZEN

**Date:** 2026-05-25
**Status:** FROZEN — Marketing capabilities physically migrated to `taiengineering/mkt-runtime`
**Previous status:** Legacy runtime source

---

## Migration Complete

Marketing domain capabilities have been physically relocated:

| Capability | Legacy Location | New Location |
|-----------|----------------|--------------|
| API Server | engines/marketing-engine/api/ | mkt-runtime/src/server.ts |
| Campaign CRUD | engines/marketing-engine/api/src/routes-stabilization.ts | mkt-runtime/src/routes-stabilization.ts |
| Channel Integration | engines/marketing-engine/api/src/routes-channels.ts | mkt-runtime/src/routes-channels.ts |
| Humanize Worker | engines/marketing-engine/worker/src/worker.ts | mkt-runtime/src/worker.ts |
| Publish Worker | engines/marketing-engine/worker/src/publish-worker.ts | mkt-runtime/src/publish-worker.ts |
| Queue Runtime | @45cm/core-queue-runtime (workspace:*) | mkt-runtime/src/queue.ts (inlined) |
| AI Runtime | @45cm/core-ai-runtime (workspace:*) | mkt-runtime/src/ai.ts (inlined) |
| Engine Manifest | engines/marketing-engine/engine.manifest.json | mkt-runtime/engine.manifest.json |

## What STAYS here (FROZEN)

| Item | Reason |
|------|--------|
| platform/auth | Platform ownership — not marketing |
| platform/billing | Platform ownership — not marketing |
| platform/shared-types | Platform ownership — not marketing |
| platform/workspace | Platform ownership — not marketing |
| engines/marketing-engine/scheduler | Forbidden per migration policy |
| surfaces/admin | Platform ownership |
| surfaces/app-shell | Platform ownership |

## Railway Rebind Status

| Item | Status |
|------|--------|
| 45cm-mkt source | ⏳ Pending rebind to taiengineering/mkt-runtime |
| Current deploy | Still from taiengineering/45cm |
| Rebind plan | mkt-runtime/docs/MKT_RUNTIME_REBIND_EXECUTION.md |

## Rules

1. ❌ DO NOT add new features to this repo
2. ❌ DO NOT modify engines/marketing-engine/ (migrated)
3. ✅ Use as reference during Railway rebind
4. ✅ Will be archived after Railway rebind completes
