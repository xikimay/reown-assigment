import { get } from '@vercel/edge-config';

import { supabase } from '../../src/core/database/client.js';
import type { Profile } from '../../src/types.js';
import { addCorsHeaders } from '../../src/shared/cors.js';

// Database function
async function getProfileByAddress(address: string): Promise<Profile | null> {
  try {
    // Efficient query: start from accounts table (which has an index on address)
    // and join to get profile and networks data
    const { data, error } = await supabase
      .from('accounts')
      .select(
        `
        address,
        profiles!inner (
          id,
          username,
          email
        ),
        account_networks (
          networks (
            name
          )
        )
      `
      )
      .eq('address', address)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile by address:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Get all accounts for this profile to build the complete profile object
    const { data: allAccounts, error: accountsError } = await supabase
      .from('accounts')
      .select(
        `
        address,
        account_networks (
          networks (
            name
          )
        )
      `
      )
      .eq('profile_id', (data.profiles as any).id);

    if (accountsError) {
      console.error('Error fetching all accounts for profile:', accountsError);
      return null;
    }

    // Transform to API profile format
    const profile: Profile = {
      username: (data.profiles as any).username,
      email: (data.profiles as any).email,
      accounts: {},
      labels: [],
    };

    // Build accounts object
    if (allAccounts && Array.isArray(allAccounts)) {
      allAccounts.forEach((account: any) => {
        const networks =
          account.account_networks
            ?.map((an: any) => an.networks?.name)
            .filter(Boolean) || [];

        profile.accounts[account.address] = {
          networks: networks,
        };
      });
    }

    return profile;
  } catch (error) {
    console.error('Unexpected error fetching profile:', error);
    return null;
  }
}

// TODO: Cache functions
async function getProfileFromCache(address: string): Promise<Profile | null> {
  return null;
  // try {
  //   const cacheKey = `profile:${address.toLowerCase()}`;
  //   const profile = await get<Profile>(cacheKey);
  //   return profile || null;
  // } catch (error) {
  //   console.error('Error fetching profile from edge config:', error);
  //   return null;
  // }
}

export const runtime = 'edge';

// Helper function for the business logic
export async function getProfile(
  address: string
): Promise<{ profile: Profile | null; cacheHit: boolean }> {
  // Try to get from Edge Config cache first
  const cachedProfile = await getProfileFromCache(address);

  if (cachedProfile) {
    return { profile: cachedProfile, cacheHit: true };
  }

  // Cache miss, fetch from Supabase
  const profile = await getProfileByAddress(address);

  return { profile, cacheHit: false };
}

const isAddress = (address: string) => address.match(/^0x[a-fA-F0-9]{40}$/);

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function GET(request: Request) {
  try {
    // More robust address extraction
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const address = pathSegments[pathSegments.length - 1];

    // address should be a valid address
    if (!address || !isAddress(address)) {
      const response = Response.json(
        {
          error: 'Invalid address',
          extractedAddress: address,
          addressLength: address?.length,
          pathSegments: pathSegments,
        },
        { status: 400 }
      );
      return addCorsHeaders(response);
    }

    const { profile, cacheHit } = await getProfile(address);

    if (!profile) {
      const response = Response.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
      return addCorsHeaders(response);
    }

    const response = Response.json(
      { profile, cacheHit },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
    return addCorsHeaders(response);
  } catch (error) {
    console.error('Error in profile fluid function:', error);
    const response = Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
    return addCorsHeaders(response);
  }
}
