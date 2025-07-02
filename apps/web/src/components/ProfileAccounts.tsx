import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Profile } from '@/services/profile';

interface ProfileAccountsProps {
  profile: Profile;
  currentAddress?: string;
}

export function ProfileAccounts({
  profile,
  currentAddress,
}: ProfileAccountsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts</CardTitle>
        <CardDescription>
          All wallet addresses associated with this profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(profile.accounts).map(([address, accountData]) => (
            <div
              key={address}
              className={`p-4 rounded-lg border cursor-pointer transition-colors hover:border-primary/50 ${
                currentAddress === address
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-muted/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-mono text-sm break-all">{address}</p>
                  {accountData.networks.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {accountData.networks.map((network, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                        >
                          {network}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {currentAddress === address && (
                  <span className="px-2 py-1 bg-primary text-primary-foreground rounded-md text-xs ml-2">
                    Current
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
