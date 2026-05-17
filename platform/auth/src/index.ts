import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

export function getAuthClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function getServiceClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function signInWithOtp(email: string) {
  const client = getAuthClient();
  return client.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
}

export async function signOut() {
  return getAuthClient().auth.signOut();
}

export async function getSession() {
  return getAuthClient().auth.getSession();
}

export async function getUser() {
  return getAuthClient().auth.getUser();
}

export async function getUserWorkspaces(userId: string) {
  const client = getServiceClient();
  const { data } = await client.schema('marketing' as any).from('workspace_members').select('workspace_id, role, workspaces:workspace_id(id, name, plan, status)').eq('user_id', userId);
  return data ?? [];
}
