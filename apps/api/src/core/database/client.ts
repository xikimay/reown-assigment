import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env['SUPABASE_URL'] || 'https://your-project.supabase.co';
const supabaseAnonKey =
  process.env['SUPABASE_SERVICE_ROLE_KEY'] || 'your-service-role-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function validateSupabaseConfig(): boolean {
  return !!(
    process.env['SUPABASE_URL'] && process.env['SUPABASE_SERVICE_ROLE_KEY']
  );
}
