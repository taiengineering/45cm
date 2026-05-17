# Railway Configuration

## 45cm-mkt Service
- Source: taiengineering/45cm (Dockerfile)
- Start: node start-mkt.js
- Port: 3100
- Health: GET /health

## Redis Service
- Image: bitnami/redis:latest
- Volume: /bitnami/redis/data
- Password: configured via REDIS_PASSWORD

## Environment Variables
- PORT, NODE_ENV
- OPENAI_API_KEY
- NAVER_CLIENT_ID, NAVER_CLIENT_SECRET
- SLACK_BOT_TOKEN, SLACK_CHANNEL_ID
- SUPABASE_URL, SUPABASE_SERVICE_KEY
- REDIS_URL