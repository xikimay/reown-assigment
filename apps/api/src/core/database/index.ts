export interface DatabaseProfileWithAccounts {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  accounts?: Array<{
    address: string;
    account_networks?: Array<{
      networks?: {
        name: string;
      };
    }>;
  }>;
}

export { supabase, validateSupabaseConfig } from './client.js';
