'use client';

import { useState, useEffect } from 'react';
import { ProfileCard, type Profile } from '@/components/ProfileCard';
import { ProfileSearch } from '@/components/ProfileSearch';
import { fetchProfiles } from '@/services/profile';

import {
  InfiniteData,
  useInfiniteQuery,
  DehydratedState,
} from '@tanstack/react-query';
import { ProfilesResponse } from '@hormesis/api';

interface ProfilesClientProps {
  dehydratedState?: DehydratedState;
}

export function ProfilesClient({}: ProfilesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    ProfilesResponse,
    Error,
    InfiniteData<ProfilesResponse>,
    string[],
    string
  >({
    queryKey: ['profiles', debouncedSearchTerm],
    queryFn: ({ pageParam = '' }) =>
      fetchProfiles({
        pageParam: pageParam as string,
        search: debouncedSearchTerm,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: '',
    // Optimize for better performance
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  // Flatten all profiles from all pages
  const allProfiles = data?.pages.flatMap((page) => page.profiles) || [];

  // Filter profiles based on search term (client-side filtering for better UX)
  const filteredProfiles = allProfiles.filter((profile: Profile) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();

    // Search in username and email
    if (
      profile.username.toLowerCase().includes(searchLower) ||
      profile.email.toLowerCase().includes(searchLower)
    ) {
      return true;
    }

    // Search in account addresses
    const accountAddresses = Object.keys(profile.accounts);
    if (
      accountAddresses.some((address) =>
        address.toLowerCase().includes(searchLower)
      )
    ) {
      return true;
    }

    // Search in network names
    const allNetworks = Object.values(profile.accounts).flatMap(
      (account) => account.networks
    );
    return allNetworks.some((network) =>
      network.toLowerCase().includes(searchLower)
    );
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-destructive mb-2">
            Error Loading Profiles
          </h1>
          <p className="text-muted-foreground">
            Unable to fetch profile data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const content = (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">
              Search any Web3 Account
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Search by username, email, wallet address, or network name to find
              profiles.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center">
            <ProfileSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-8">
        {isLoading ? (
          // Loading state with skeleton cards
          <div className="space-y-6">
            <div className="h-4 bg-muted/50 rounded-md w-32 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-muted/50 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : filteredProfiles.length > 0 ? (
          // Profile grid
          <>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {filteredProfiles.length} profile
                {filteredProfiles.length !== 1 ? 's' : ''} found
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((profile: Profile) => (
                <ProfileCard key={profile.username} profile={profile} />
              ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        ) : (
          // No profiles found
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-foreground mb-2">
                No profiles found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? `No profiles match your search for "${searchTerm}".`
                  : 'No profiles are available at the moment.'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return content;
}
