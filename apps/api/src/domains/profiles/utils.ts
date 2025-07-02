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
