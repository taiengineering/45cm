# Infrastructure

## Railway
- Runtime API (marketing-api)
- Worker (marketing-worker)
- Redis (queue runtime)

## Cloudflare
- Pages: 45cm.com (landing), marketing.45cm.com (console)
- DNS: api.45cm.com → Railway

## Supabase
- DB: marketing.* (13 tables) + core_ai.* (5 tables)
- Auth: future

## Redis
- Queue Runtime only
- bitnami/redis on Railway
- Internal: redis.railway.internal:6379