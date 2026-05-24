# LEGACY_PR_POLICY

> GitHub Legacy Repository Protection — Step 5
> Date: 2026-05-25

---

## PR Policy (taiengineering/45cm)

### 허용

| PR 유형 | 조건 |
|--------|------|
| Documentation | freeze/isolation marker 업데이트 |
| Migration marker | canonical redirect 정정 |
| Rollback emergency | canonical repo rollback 실패 시만 |
| Security hotfix | CVE 대응 필수 시만 |

### 금지

| PR 유형 | 이유 |
|--------|------|
| ❌ New capability | frozen runtime |
| ❌ Runtime expansion | ownership terminated |
| ❌ Orchestration | FGW ownership |
| ❌ Governance injection | federation-governance ownership |
| ❌ Active feature development | use 45cminc/mkt-runtime |
| ❌ Infrastructure change | use canonical repo |

### Merge Policy

- Owner review required (CODEOWNERS enforced)
- No direct push to main
- No feature branches
