import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import type { ApiResponse, SearchResult } from '@/types'
import type { SearchScope } from '@/types/types'
import { CacheManager } from '@/lib/utils/cache/cacheManager'
import { DbRateLimiter } from '@/lib/utils/cache/rateLimiter'

const supabase = createClient()

// Cache TTL per search scope
const CACHE_TTL: Record<SearchScope, number> = {
  companies: 3600,      // 1 hour for company searches
  contacts: 1800,       // 30 minutes for contact searches
  insights: 900,        // 15 minutes for insights
  default: 600         // 10 minutes default
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const query = url.searchParams.get('q') || ''
    const scope = url.searchParams.get('scope') || 'companies'
    const user = url.searchParams.get('user')

    // Get organization context
    const supabase = getSupabaseServerClient()
    const { data: teamMember } = await supabase
      .from('team_members')
      .select('organization_id, organizations(plan)')
      .eq('user_id', user)
      .single()

    if (!teamMember) {
      return NextResponse.json(
        {
          success: false,
          message: 'Organization not found',
          errors: [{ code: 'NOT_FOUND', message: 'Organization not found' }]
        } as ApiResponse,
        { status: 404 }
      )
    }

    // Initialize rate limiter and check limits
    const rateLimiter = new RateLimiter(teamMember.organization_id, teamMember.organizations.plan)
    const canProceed = await rateLimiter.checkRateLimit()

    if (!canProceed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Rate limit exceeded',
          errors: [{ code: 'RATE_LIMIT', message: 'Too many requests. Please try again later.' }]
        } as ApiResponse,
        { status: 429 }
      )
    }

    // Initialize cache manager
    const cacheManager = new CacheManager(teamMember.organization_id, teamMember.organizations.plan)
    const cacheKey = `search:${scope}:${query}`

    // Try to get from cache first
    const cachedResult = await cacheManager.get(cacheKey, scope)
    if (cachedResult) {
      return NextResponse.json(cachedResult)
    }

    // Perform the search if not in cache
    const searchStartTime = Date.now()
    const response = await performSearch(query, scope, teamMember.organization_id)
    const searchTime = Date.now() - searchStartTime

    // Store search metrics
    await supabase.from('search_history').insert({
      organization_id: teamMember.organization_id,
      user_id: user,
      search_query: query,
      search_filters: {}, // Add any filters used
      search_scope: scope,
      search_type: 'standard',
      results_count: response.data?.length || 0,
      execution_time_ms: searchTime
    })

    // Cache the successful response
    await cacheManager.set({
      cacheKey,
      cacheValue: response,
      cacheScope: scope,
      ttlSeconds: CACHE_TTL[scope] || CACHE_TTL.default,
      accessCount: 0,
      metadata: {
        query,
        executionTime: searchTime,
        resultsCount: response.data?.length || 0
      }
    })

    return NextResponse.json(response)

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        errors: [{ code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' }]
      } as ApiResponse,
      { status: 500 }
    )
  }
}

async function performSearch(query: string, scope: string, organizationId: string) {
  const supabase = getSupabaseServerClient()

  // Base query
  let searchQuery = supabase.from(scope === 'companies' ? 'discovered_companies' : scope)
    .select('*')
    .eq('organization_id', organizationId)

  // Add search conditions based on scope
  if (scope === 'companies') {
    searchQuery = searchQuery.or(`name.ilike.%${query}%, description.ilike.%${query}%`)
  } else if (scope === 'contacts') {
    searchQuery = searchQuery.or(`name.ilike.%${query}%, email.ilike.%${query}%`)
  } else {
    searchQuery = searchQuery.textSearch('searchable_tsvector', query)
  }

  const { data, error } = await searchQuery.limit(50)

  if (error) {
    throw error
  }

  return {
    success: true,
    data,
    metadata: {
      query,
      scope,
      timestamp: new Date().toISOString()
    }
  }
}
