// Cache Runtime — Reduce duplicate AI calls
import Redis from 'ioredis';
import crypto from 'crypto';

let redis: Redis | null = null;
function getRedis(): Redis {
  if (!redis) redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', { maxRetriesPerRequest: 3, lazyConnect: true });
  return redis;
}

export function cacheKey(workspace: string, runtime: string, input: string): string {
  const hash = crypto.createHash('sha256').update(input).digest('hex').slice(0, 16);
  return `45.cache:${workspace}:${runtime}:${hash}`;
}

export async function getCached(key: string): Promise<string | null> {
  try { return await getRedis().get(key); } catch { return null; }
}

export async function setCache(key: string, value: string, ttlSeconds: number = 3600): Promise<void> {
  try { await getRedis().setex(key, ttlSeconds, value); } catch {}
}

export async function invalidateCache(pattern: string): Promise<number> {
  try { const keys = await getRedis().keys(pattern); if (keys.length) await getRedis().del(...keys); return keys.length; } catch { return 0; }
}

// AI Response Fingerprinting
export function responseFingerprint(response: string): string {
  return crypto.createHash('sha256').update(response.trim().toLowerCase().replace(/\s+/g, ' ')).digest('hex').slice(0, 32);
}

export async function isDuplicateResponse(wsId: string, runtime: string, response: string): Promise<boolean> {
  const fp = responseFingerprint(response);
  const key = `45.fp:${wsId}:${runtime}:${fp}`;
  const exists = await getCached(key);
  if (exists) return true;
  await setCache(key, '1', 86400); // 24h
  return false;
}
