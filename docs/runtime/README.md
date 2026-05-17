# Runtime Documentation

## Logging
All logs use structured JSON with: trace_id, workspace_id, queue, job_id, engine, capability

## Error Handling
- OpenAI: 30s AbortController timeout
- BullMQ: 10s enqueue timeout
- Worker: catch errors, never crash
- Draft status: success / failed / timeout