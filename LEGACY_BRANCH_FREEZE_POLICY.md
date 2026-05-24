# LEGACY_BRANCH_FREEZE_POLICY

> Legacy Runtime Isolation — Step 4
> Date: 2026-05-25

---

## Branch Freeze Policy

| 정책 | 상태 |
|------|------|
| main branch | ❄️ FROZEN — isolation docs only |
| Feature branches | ❌ FORBIDDEN |
| Runtime ownership | ❌ TERMINATED |
| Operational mutation | ❌ FORBIDDEN |
| Hotfix branches | ❌ FORBIDDEN (사용 45cminc/mkt-runtime) |

## 허용되는 변경

| 변경 | 조건 |
|------|------|
| Freeze notice 추가 | ✅ isolation 목적 |
| Canonical redirect 업데이트 | ✅ 링크 정정 |
| Archive metadata | ✅ GitHub topic/label |

## 권장 GitHub 설정

1. Branch protection on `main` — PR required
2. Direct push 제한
3. Topic: `frozen`, `legacy`, `archived`
4. Description: "FROZEN — See 45cminc/mkt-runtime"
