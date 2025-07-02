import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Profile } from '@/services/profile';

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const accountCount = Object.keys(profile.accounts).length;
  const allNetworks = Object.values(profile.accounts).flatMap(
    (account) => account.networks
  );
  const uniqueNetworks = new Set(allNetworks);
  const networkCount = uniqueNetworks.size;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{profile.username}</CardTitle>
        <CardDescription className="text-lg">{profile.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
            {accountCount} account{accountCount !== 1 ? 's' : ''}
          </span>
          <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
            {networkCount} network{networkCount !== 1 ? 's' : ''}
          </span>
          {profile.labels.length > 0 && (
            <span className="px-2 py-1 border border-border rounded-md text-sm">
              {profile.labels.length} label
              {profile.labels.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {profile.labels.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">
              Labels:
            </h4>
            <div className="flex flex-wrap gap-1">
              {profile.labels.map((label, index) => (
                <span
                  key={index}
                  className="px-2 py-1 border border-border rounded-md text-xs"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
