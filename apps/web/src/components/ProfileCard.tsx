import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { prefetchProfile } from '@/services/profile';

export interface Profile {
  username: string;
  email: string;
  accounts: Record<string, { networks: string[] }>;
}

interface ProfileCardProps {
  profile: Profile;
  showLink?: boolean;
}

export const ProfileCard = ({ profile, showLink = true }: ProfileCardProps) => {
  // Calculate summary statistics
  const accountCount = Object.keys(profile.accounts).length;
  const allNetworks = Object.values(profile.accounts).flatMap(
    (account) => account.networks
  );
  const uniqueNetworks = new Set(allNetworks);
  const networkCount = uniqueNetworks.size;

  // Prefetch profile data on hover
  const handleMouseEnter = () => {
    if (showLink) {
      const firstAddress = Object.keys(profile.accounts)[0];
      if (firstAddress) {
        prefetchProfile(firstAddress);
      }
    }
  };

  const cardContent = (
    <Card
      className={`h-full transition-all duration-200 border-border/50 ${
        showLink ? 'hover:shadow-md hover:border-border cursor-pointer' : ''
      }`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-foreground">
          {profile.username}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {profile.email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {accountCount} account{accountCount !== 1 ? 's' : ''} across{' '}
          {networkCount} network{networkCount !== 1 ? 's' : ''}
        </p>
      </CardContent>
    </Card>
  );

  if (!showLink) {
    return cardContent;
  }

  // Use the first account address as the link target
  const firstAddress = Object.keys(profile.accounts)[0];
  const linkHref = firstAddress ? `/profile/${firstAddress}` : '#';

  return (
    <Link
      href={linkHref}
      prefetch={true}
      onMouseEnter={handleMouseEnter}
      className="block transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
    >
      {cardContent}
    </Link>
  );
};
