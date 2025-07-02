import { Suspense } from 'react';
import { ProfilesClient } from '@/components/ProfilesClient';

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilesClient />
    </Suspense>
  );
}
