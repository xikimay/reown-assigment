import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Profile } from '@/services/profile';

interface ProfileNetworksProps {
  profile: Profile;
}

export function ProfileNetworks({ profile }: ProfileNetworksProps) {
  const allNetworks = Object.values(profile.accounts).flatMap(
    (account) => account.networks
  );
  const uniqueNetworks = new Set(allNetworks);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Networks</CardTitle>
        <CardDescription>
          All networks this profile is active on
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {Array.from(uniqueNetworks).map((network) => (
            <span
              key={network}
              className="px-2 py-1 border border-border rounded-md text-sm"
            >
              {network}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
