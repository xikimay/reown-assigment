import type { ProfilesResponse } from '@hormesis/api';
import { apiClient } from '../lib/api-client';

export interface Profile {
  username: string;
  email: string;
  accounts: Record<string, { networks: string[] }>;
  labels: string[];
}

// Client-side cache for profiles
const profileCache = new Map<string, { profile: Profile; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchProfiles = async ({
  pageParam = '',
  search = '',
}: {
  pageParam: string;
  search?: string;
}): Promise<ProfilesResponse> => {
  const params = new URLSearchParams();
  if (pageParam && pageParam !== '0') {
    params.append('cursor', pageParam);
  }
  if (search) {
    params.append('search', search);
  }

  const queryString = params.toString();
  const url = `/api/profiles${queryString ? `?${queryString}` : ''}`;

  return apiClient.fetch<ProfilesResponse>(url);
};

export const fetchProfileByAddress = async (address: string) => {
  const url = `/api/profile/${address}`;
  return apiClient.fetch<{ profile: Profile; cacheHit: boolean }>(url);
};

// Client-side cached version for better performance
export const fetchProfileByAddressCached = async (address: string) => {
  const now = Date.now();
  const cached = profileCache.get(address);

  // Return cached data if it's still valid
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return { profile: cached.profile, cacheHit: true };
  }

  // Fetch fresh data
  const result = await fetchProfileByAddress(address);

  // Cache the result
  if (result.profile) {
    profileCache.set(address, { profile: result.profile, timestamp: now });
  }

  return result;
};

// Prefetch a profile for better UX
export const prefetchProfile = async (address: string) => {
  try {
    await fetchProfileByAddressCached(address);
  } catch (error) {
    // Silently fail prefetch attempts
    console.debug('Prefetch failed for address:', address, error);
  }
};
