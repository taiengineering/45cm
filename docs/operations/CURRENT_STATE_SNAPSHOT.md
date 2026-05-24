# TAI Platform Current State Snapshot

> Updated: 2025-05-24

## Infrastructure

| Component | Technology | URL |
|-----------|-----------|-----|
| Shell (UI) | Vuexy v5.0.1 + Next.js 15 + MUI 7 | 45cm-shell-45cm.vercel.app |
| ops-ui (legacy) | Next.js 14 + Sneat style | ops-app.45cm.com |
| API | Railway (v0.7.0) | api.45cm.com |
| Database | Supabase | schema.sql ready, not yet applied |

## Runtime Instances

| Code | Name | Service | Health | Readiness |
|------|------|---------|--------|----------|
| RTM-001 | taieng-prod-runtime | SRV-001 | healthy | 7/7 |
| RTM-002 | safe-prod-runtime | SRV-002 | attention | 6/7 |
| RTM-003 | 45cm-staging-runtime | SRV-003 | offline | 3/7 |

## Known Issues

1. Supabase MCP needs_reconnect
2. AuthGuard bypassed for development
3. Wiring layer uses in-memory seed data
4. ops-ui divergence (shell is canonical)
