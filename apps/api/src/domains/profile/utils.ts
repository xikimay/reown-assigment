import { Profile } from '../../types.js';
import { DatabaseProfileWithAccounts } from '../../core/database/index.js';

export function transformDatabaseProfileToApiProfile(
  dbProfile: DatabaseProfileWithAccounts
): Profile {
  const profile: Profile = {
    username: dbProfile.username,
    email: dbProfile.email,
    accounts: {},
    labels: [],
  };

  if (dbProfile.accounts && Array.isArray(dbProfile.accounts)) {
    dbProfile.accounts.forEach((account) => {
      const networks =
        account.account_networks
          ?.map((an) => an.networks?.name)
          .filter((name): name is string => Boolean(name)) || [];

      profile.accounts[account.address] = {
        networks: networks,
      };
    });
  }

  return profile;
}

export function extractAddressFromRequest(request: Request): string | null {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split('/').filter(Boolean);
  return pathSegments[pathSegments.length - 1] || null;
}

export const isAddress = (address: string): boolean =>
  address.match(/^0x[a-fA-F0-9]{40}$/) !== null;
