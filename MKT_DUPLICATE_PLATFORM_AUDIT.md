# MKT Duplicate Platform Audit

> Duplicate platform capability detection in taiengineering/45cm
> Date: 2026-05-24

---

## Principle

Platform는 하나다. Runtime는 여러 개다.
Marketing는 Domain Capability다.

---

## Detected Duplications

### ❌ Shell Duplication

| Duplicate | Canonical | Action |
|-----------|-----------|--------|
| surfaces/admin/ | apps/shell (45cminc/ui) | Deprecate |
| surfaces/app-shell/ | apps/shell (45cminc/ui) | Deprecate |

### ❌ Governance Duplication

| Duplicate | Canonical | Action |
|-----------|-----------|--------|
| runtime/permissions | federation-governance/rbac | Extract or reference |
| runtime/policy + policy-engine | federation-governance/policy | Extract or reference |
| runtime/tenant-isolation | federation-governance/tenant | Extract or reference |
| platform/auth | federation-governance/identity | Extract or reference |

### ❌ Orchestration Duplication

| Duplicate | Canonical | Action |
|-----------|-----------|--------|
| runtime/operational-lifecycle | FGW/Core lifecycle | Remove or delegate |
| runtime/runtime-manager | FGW/Core orchestration | Remove or delegate |
| runtime/operational-control | FGW/Core orchestration | Remove or delegate |

### ⚠️ Naming Concern (not necessarily duplicated)

| Package | Concern |
|---------|--------|
| runtime/scheduler | OK if marketing-specific scheduling |
| runtime/operational-feed | OK if marketing-specific feed |
| runtime/operational-recommendations | OK if marketing-specific |
| runtime/operational-intelligence-memory | OK if marketing-specific |

---

## Resolution Priority

1. **Build fix first** — get 45cm-mkt building again
2. **Shell dedup** — surfaces/admin and app-shell are clear duplicates
3. **Governance extraction** — permissions/policy/tenant belong in governance
4. **Orchestration delegation** — lifecycle/runtime-manager/control → Core

## Important

Do NOT remove these packages now.
Document, then fix build, then gradually extract.
