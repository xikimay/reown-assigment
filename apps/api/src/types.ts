export interface NetworkData {
  networks: string[];
}

export interface Account {
  [address: string]: NetworkData;
}

export interface Profile {
  username: string;
  email: string;
  accounts: Account;
  labels: string[];
}

export interface DatabaseProfile {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

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

export interface ProfilesResponse {
  profiles: Profile[];
  nextCursor?: string;
}
