import { Suspense } from 'react';
import { fetchProfileByAddress } from '@/services/profile';
import { notFound } from 'next/navigation';
import { ProfileDetail } from '@/components/ProfileDetail';
import { ProfileSkeleton } from '@/components/ProfileSkeleton';
import Link from 'next/link';

interface ProfilePageProps {
  params: Promise<{
    address: string;
  }>;
}

// Separate async component for the profile data
async function ProfileData({ address }: { address: string }) {
  const { profile } = await fetchProfileByAddress(address);

  if (!profile) {
    notFound();
  }

  return <ProfileDetail profile={profile} currentAddress={address} />;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { address } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Show header immediately - no loading state needed */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
          >
            ← Back to Profiles
          </Link>
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        {/* Stream the profile data with skeleton loading */}
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileData address={address} />
        </Suspense>
      </div>
    </div>
  );
}
