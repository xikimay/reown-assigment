import { supabase } from '../src/core/database/client.js';
import { addCorsHeaders, createCorsResponse } from '../src/shared/cors.js';
import type { Profile, DatabaseProfile } from '../src/types.js';

// Database function
async function getProfiles(
  limit = 10,
  cursor?: string,
  search?: string
): Promise<{ profiles: Profile[]; nextCursor?: string }> {
  // Check if environment variables are properly configured
  if (
    !process.env['SUPABASE_URL'] ||
    !process.env['SUPABASE_SERVICE_ROLE_KEY']
  ) {
    console.warn(
      'Supabase environment variables not configured, returning empty profiles'
    );
    return { profiles: [] };
  }

  try {
    let query = supabase
      .from('profiles')
      .select(
        `
        *,
        accounts (
          address,
          account_networks (
            networks (
              name
            )
          )
        )
      `
      )
      .order('id', { ascending: true })
      .limit(limit);

    // Handle cursor - if cursor is '0' or empty, start from beginning
    if (cursor && cursor !== '0') {
      query = query.gt('id', cursor);
    }

    // TODO: add granular search (should not have to try for all queries)
    if (search) {
      // First, find profile IDs that match the search criteria
      const { data: matchingProfiles } = await supabase
        .from('profiles')
        .select('id')
        .or(`username.ilike.%${search}%,email.ilike.%${search}%`);

      const { data: matchingAccounts } = await supabase
        .from('accounts')
        .select('profile_id')
        .ilike('address', `%${search}%`);

      // Find profiles that have accounts with matching network names
      const { data: matchingNetworks } = await supabase
        .from('networks')
        .select(
          `
          name,
          account_networks!inner (
            accounts!inner (
              profile_id
            )
          )
        `
        )
        .ilike('name', `%${search}%`);

      // Extract profile IDs from network matches
      const networkProfileIds =
        matchingNetworks?.flatMap(
          (network) =>
            network.account_networks
              ?.map((an: any) => an.accounts?.profile_id)
              .filter(Boolean) || []
        ) || [];

      // Combine all the profile IDs
      const profileIds = new Set([
        ...(matchingProfiles?.map((p) => p.id) || []),
        ...(matchingAccounts?.map((a) => a.profile_id) || []),
        ...networkProfileIds,
      ]);

      if (profileIds.size > 0) {
        query = query.in('id', Array.from(profileIds));
      } else {
        return { profiles: [] };
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching profiles:', error);
      return { profiles: [] };
    }

    // Transform database profiles to API profile format
    const profiles: Profile[] = (data as any[]).map((dbProfile) => {
      const profile: Profile = {
        username: dbProfile.username,
        email: dbProfile.email,
        accounts: {},
        labels: [],
      };

      if (dbProfile.accounts && Array.isArray(dbProfile.accounts)) {
        dbProfile.accounts.forEach((account: any) => {
          // Extract network names from the account_networks relationship
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
    });

    // Set next cursor to the ID of the last profile in this batch
    const nextCursor =
      profiles.length === limit && data && data.length > 0
        ? (data as DatabaseProfile[])[data.length - 1]?.id
        : undefined;

    return {
      profiles,
      ...(nextCursor && { nextCursor }),
    };
  } catch (error) {
    console.error('Unexpected error fetching profiles:', error);
    return { profiles: [] };
  }
}

export const runtime = 'edge';

// TODO: add granular search
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const cursor = searchParams.get('cursor') || undefined;
    const search = searchParams.get('search') || undefined;

    const { profiles, nextCursor } = await getProfiles(limit, cursor, search);

    const response = Response.json(
      { profiles, nextCursor },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );

    return addCorsHeaders(response);
  } catch (error) {
    console.error('Error in profiles fluid function:', error);
    const response = Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
    return addCorsHeaders(response);
  }
}

export async function OPTIONS(request: Request) {
  return createCorsResponse(null, 200);
}
