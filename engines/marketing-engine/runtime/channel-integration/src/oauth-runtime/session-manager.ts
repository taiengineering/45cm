// Session Manager — OAuth state/session tracking
import crypto from 'crypto';

const sessions = new Map<string, { wsId: string; provider: string; createdAt: number }>();

export class SessionManager {
  createSession(wsId: string, provider: string): string {
    const state = crypto.randomBytes(16).toString('base64url');
    sessions.set(state, { wsId, provider, createdAt: Date.now() });
    return state;
  }

  validateSession(state: string): { wsId: string; provider: string } | null {
    const s = sessions.get(state);
    if (!s) return null;
    if (Date.now() - s.createdAt > 600000) { sessions.delete(state); return null; } // 10min expiry
    sessions.delete(state);
    return { wsId: s.wsId, provider: s.provider };
  }

  cleanup(): void {
    const now = Date.now();
    for (const [k, v] of sessions) { if (now - v.createdAt > 600000) sessions.delete(k); }
  }
}
