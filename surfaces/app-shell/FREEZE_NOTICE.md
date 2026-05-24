# Surface Freeze Notice

## Freeze Declaration

| Item | Value |
|------|-------|
| Surface | taiengineering/45cm/surfaces/app-shell |
| Freeze date | 2025-05-24 |
| Freeze reason | Migration to canonical surface completed |
| Canonical migrated target | 45cminc/ui/apps/mkt-ui |
| Current state | Historical frozen surface |
| Ownership | No active development owner |

## Allowed

- Historical reference
- Debugging reference
- Migration comparison
- Code review for audit purposes

## Disallowed

- New feature development
- Bug fixes (fix in canonical surface instead)
- Deployment ownership
- Production routing changes
- Package updates
- Dependency changes
- Build configuration changes

## Ownership Status

| Aspect | Owner | Notes |
|--------|-------|-------|
| Active development | None | Frozen |
| Active deployment | None | No production routing |
| Historical maintenance | TAI Engineering | Reference only |
| Canonical successor | 45cminc/ui/apps/mkt-ui | All new work here |
