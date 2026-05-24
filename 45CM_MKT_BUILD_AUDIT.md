# 45CM MKT Build Audit

> Build failure root cause analysis guide
> Date: 2026-05-24
> Status: Awaiting local diagnosis

---

## Build Command

```bash
pnpm install --no-frozen-lockfile
pnpm build:mkt
# equivalent to: pnpm --filter @45cm/marketing-api... --filter @45cm/marketing-worker... build
```

## Likely Failure Categories

### 1. Workspace Resolution (most likely)

The API depends on 10 workspace packages. If ANY of them:
- Changed package name
- Removed build script
- Has missing dependencies
- Has broken tsconfig

The build cascade fails.

**Diagnosis:**
```bash
# Check each workspace resolves
pnpm --filter @45cm/core-shared-types build
pnpm --filter @45cm/core-ai-runtime build
pnpm --filter @45cm/core-queue-runtime build
pnpm --filter @45cm/core-event-runtime build
pnpm --filter @45cm/core-db-runtime build
pnpm --filter @45cm/core-workspace-runtime build
pnpm --filter @45cm/core-billing-runtime build
pnpm --filter @45cm/core-alert-runtime build
pnpm --filter @45cm/core-workflow-runtime build
pnpm --filter @45cm/channel-naver-kin build
```

### 2. TypeScript Errors

```bash
cd engines/marketing-engine/api && npx tsc --noEmit
```

### 3. RAILPACK Builder Issues

RAILPACK auto-detects pnpm workspace. If workspace structure changed:
- Check pnpm-workspace.yaml includes all needed paths
- Check start command resolves: `node start-mkt.js`

### 4. Boundary Contamination

Check for:
```bash
grep -r 'federation-governance' engines/
grep -r 'federation-core' engines/
grep -r '@45cm/ops' engines/
```

## Classification Template

After running build locally, classify each error:

| Error | File | Category |
|-------|------|----------|
| (paste from build output) | (file path) | workspace / typescript / contamination / infra |

## Recovery Principle

❌ Do NOT just patch the build.
✅ Classify each error by boundary ownership.
✅ Fix workspace resolution first.
✅ Then fix typescript errors.
✅ Then verify no contamination.
