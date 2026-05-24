# DEPLOYMENT_LOCK

> Legacy Runtime Isolation — Step 3
> Date: 2026-05-25

---

## ⛔ Deployment Lock

**이 repository는 active deployment source가 아니다.**

| 항목 | 상태 |
|------|------|
| Railway deploy source | ❌ NOT this repo |
| Active deploy target | 45cminc/mkt-runtime |
| Last active deploy | 2026-05-24 (before migration) |
| Deploy reconnection | ❌ FORBIDDEN |

## 금지

1. ❌ Railway source를 이 repo로 재연결 금지
2. ❌ CI/CD pipeline 연결 금지
3. ❌ Docker build + push 금지
4. ❌ Production deploy 금지

## Rollback 용도

이 repo는 rollback reference로만 사용 가능.
Rollback 필요 시 canonical repo의 rollback plan을 따릅니다.
