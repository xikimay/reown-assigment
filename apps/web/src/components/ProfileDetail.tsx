import { ProfileHeader } from './ProfileHeader';
import { ProfileAccounts } from './ProfileAccounts';
import { ProfileNetworks } from './ProfileNetworks';
import type { Profile } from '@/services/profile';

interface ProfileDetailProps {
  profile: Profile;
  currentAddress?: string;
}

export const ProfileDetail = ({
  profile,
  currentAddress,
}: ProfileDetailProps) => {
  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} />

      <ProfileAccounts profile={profile} currentAddress={currentAddress} />
      <ProfileNetworks profile={profile} />
    </div>
  );
};
