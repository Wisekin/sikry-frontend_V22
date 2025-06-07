# Natural Language Search Feature Implementation Progress

## 🤖 Agent Rules
IMPORTANT: These rules must never be deleted and must be referenced before any action:
1. Always verify file existence before creation using appropriate tools
2. Update this progress file after EVERY significant change:
   - Move completed items to "Completed ✅" section
   - Add new tasks to "Next Steps 📝" section
   - Update "In Progress 🚧" with current tasks
3. Each update must maintain clear tracking of:
   - What was just completed
   - What is currently being worked on
   - What should be done next
4. Never remove completed items - they serve as implementation history

---

### Date: 2025-06-07: Resolving Next.js 15 & Supabase SSR Cookie Issues & New RLS Challenge

**Objective:** Stabilize Supabase integration in Next.js 15.x, primarily fixing cookie handling errors, and then address subsequent issues.

**Previous State:**
- Persistent `cookies() should be awaited` error in Next.js 15.2.4 (later updated to 15.3.3) when using Supabase SSR, affecting various parts of the application.
- Suspected issues with deprecated Supabase helper libraries and incorrect asynchronous handling of Next.js `cookies()` API.

**Work Performed & Key Changes:**
1.  **Dependency Audit & Cleanup:**
    *   Identified that Next.js 15 made the `cookies()` API from `next/headers` asynchronous, requiring `await`.
    *   Removed the deprecated `@supabase/auth-helpers-nextjs` package from `package.json` and updated dependencies (`npm install`).
2.  **Server-Side Supabase Client (`utils/supabase/server.ts`):**
    *   Modified the `createClient` function to use `createServerClient` from `@supabase/ssr`.
    *   Ensured the `get`, `set`, and `remove` methods within the `cookies` configuration are `async` and correctly `await cookies()`.
3.  **Next.js Middleware (`middleware.ts`):**
    *   Replaced `createMiddlewareClient` (from the deprecated package) with `createServerClient` from `@supabase/ssr`.
    *   Updated cookie handlers (`get`, `set`, `remove`) to be `async` and correctly interact with `request.cookies` and `response.cookies` as per `@supabase/ssr` guidelines for middleware.
4.  **Client-Side Supabase Client (`utils/supabase/client.ts`):**
    *   Replaced `createClientComponentClient` (from deprecated package) with `createBrowserClient` from `@supabase/ssr`.
5.  **Code Cleanup:**
    *   Identified and removed an unused/outdated `utils/supabase/middleware.ts` file that contained incorrect synchronous cookie handling.

**Current Status & Outcomes:**
-   **SUCCESS:** The primary `cookies() should be awaited` error has been **resolved**. The application now starts, and initial navigation and API calls (e.g., search suggestions) seem to function without this specific cookie error.
-   **New Issues Uncovered:**
    1.  **RLS Infinite Recursion (Critical - Intermittent):**
        *   Error: `infinite recursion detected in policy for relation "team_members"`
        *   Previously occurred when fetching data for the dashboard. This error has **intermittently disappeared** during recent testing (2025-06-07).
        *   The root cause (exact RLS policy definition on `team_members` and the function `get_teams_for_user` it calls) remains unverified. If the error returns, this is the **top priority blocker**.
    2.  **Organization Membership Error:**
        *   Error: `User not part of any organization` (e.g., in `lib/actions/communications.ts`).
        *   Likely a cascading failure due to the `team_members` RLS issue preventing organization lookup.
    3.  **API Unauthorized Error:**
        *   `POST /api/search/natural` now returns a `401 Unauthorized` error (previously was 403, then RLS recursion).
        *   The API route's authentication logic (`supabase.auth.getUser()`) appears correct. The `401` suggests an issue with the user's session or cookies not being sent/validated correctly with the API request.
    4.  **React Hydration Mismatch (Browser):**
        *   Persistent hydration warnings in the browser console. Potentially due to browser extensions (e.g., "monica-id" attributes seen in HTML) or client/server rendering discrepancies.
    5.  **Webpack Warning (Terminal):**
        *   `@supabase/realtime-js` shows a "Critical dependency: the request of a dependency is an expression" warning. Considered minor for now.

**Next Steps:**
1.  **Investigate `401 Unauthorized` on `/api/search/natural` (Current Top Priority):**
    *   Verify user login status when the error occurs.
    *   Inspect browser request headers/cookies for the `/api/search/natural` call to ensure session cookies are present and valid.
    *   If necessary, add temporary debugging in `utils/supabase/server.ts` to trace cookie handling for API routes.
2.  **Monitor & Prepare for `team_members` RLS Issue:**
    *   If the "infinite recursion" error on `team_members` returns, this becomes the top priority.
    *   **Crucial:** Obtain the exact current SQL definition of the RLS policy on `public.team_members` (especially the one named "Policy with security definer functions") directly from the Supabase Dashboard. Also, confirm the exact name and definition of the function it calls (e.g., `get_teams_for_user`).
    *   Analyze the policy and function for recursive logic or incorrect column references (e.g., `team_id` vs. `organization_id`).
3.  **Verify Dashboard Data Loading:** Once API authentication and any RLS issues are stable, confirm that dashboard data loads correctly and related errors (e.g., "User not part of any organization") are resolved.
4.  **Address React Hydration Mismatch:** Attempt to isolate the cause (e.g., by disabling browser extensions, reviewing components that might render differently on server/client).
5.  **Security Hardening (Later):** Review instances of `supabase.auth.getSession()` and consider replacing with `supabase.auth.getUser()` where appropriate for enhanced security, as per Supabase recommendations (e.g., in `lib/actions/companies.ts`).
6.  **Monitor Webpack Warning:** Keep an eye on the `@supabase/realtime-js` warning, but do not prioritize fixing unless it causes functional issues with real-time features (if used).
7.  **Revisit `npm audit`:** After core functionality is stable, address the vulnerabilities reported by `npm audit`.

---
## Overview
Implementing a natural language search system with:
- OpenAI query parsing
- Supabase caching
- Free public data sources
- Rate limiting

## Completed ✅
- Initial project planning and architecture design.
- Documentation review.
- Database setup:
  - Created migration script (`013-search-rate-limit.sql`) for API cache table, rate limiting table, enhanced search history table, and helper functions.
  - Created migration script (`014-add-metadata-to-api-cache.sql`) to add `metadata` column to `api_cache` table.
  - Verified missing tables from main schema.
  - Added proper database indexes and RLS policies.
  - Initial cache table structure and validation.
  - Cleanup functions for maintenance.
- Core utilities:
  - OpenAI configuration (`lib/config/openai.ts`).
  - Query parser implementation (`lib/utils/query-parser.ts`).
  - Cache utility functions (`lib/utils/cache.ts` and `lib/utils/cache/searchCache.ts`).
- Search API implementation (`app/api/search/natural/route.ts`):
  - Initial natural language parsing, cache integration, Supabase querying, error handling, and response formatting.
  - Corrected `searchExternalSources` function call to use only the `query` argument.
  - Fixed `highlights` array generation to conform to `Array<{ field: string; text: string; }>` type and restored overall function structure.
- Rate Limiter (`lib/utils/cache/rateLimiter.ts`):
  - Corrected `createClient` import to use server-side Supabase client.
  - Fixed `organizations.plan` access to correctly retrieve plan information.
- Search Suggestions API (`app/api/search/suggestions/route.ts` & `utils/supabase/server.ts`):
  - Made `createClient` in `utils/supabase/server.ts` synchronous to resolve `supabase.from is not a function` error.
- Integrated external data sources: Business registries, Wikidata, OpenCorporates API.
- Implemented (initial) rate limiting middleware.
- Updated frontend search component with data source selection.
- Added (initial) API response caching system.
- Enhanced error handling and loading states in UI.

## In Progress 🚧
- **Testing & Validation**:
  - Devising and executing a comprehensive test plan for the caching system:
    - Verifying search results are correctly cached (including `metadata`).
    - Ensuring cache entries are invalidated based on TTL.
    - Confirming cache hits and misses are logged/handled as expected by `searchCache.ts`.
  - Testing rate limiting functionality under different scenarios (e.g., different organization plans).
- **Refinement & Enhancement**:
  - Fine-tuning cache performance (e.g., TTL values, cache eviction strategies) based on testing.
  - Improving search metrics logging in the `search_history` table (e.g., filters, more metadata, accurate execution time and result counts).
  - Finalizing the integration and interaction of `searchCache.ts` utilities and `DbRateLimiter` within the search API and potentially other relevant endpoints.

## Next Steps 📝
1.  **CRITICAL: Run database migration scripts `013-search-rate-limit.sql` (for initial tables) AND `014-add-metadata-to-api-cache.sql` (for `metadata` column)** to set up `api_cache`, `rate_limits`, and `search_history` tables correctly.
2.  Execute the test plan for the caching system (see "In Progress").
3.  Execute tests for the rate limiting system.
4.  Write unit and integration tests for:
    - `performSearch` function (if applicable, or core search logic within API route).
    - Caching utilities (`searchCache.ts`).
    - Rate limiting utilities (`rateLimiter.ts`).
    - Key API endpoints.
    - Cover edge cases and error scenarios.
5.  Update project documentation:
    - Add details about the refined caching and rate limiting systems.
    - Provide examples of API usage and expected responses.
    - Document environment variables needed for external APIs and other configurations.

## Current Focus
1. Ensuring the database schema is up-to-date for caching (`metadata` column).
2. Systematically testing the end-to-end caching and rate limiting functionality.
3. Monitoring and optimizing cache hit rates and search performance metrics post-fixes.

## Technical Debt/Improvements (Future Considerations)
- Implement more sophisticated query result scoring/ranking.
- Add backup data sources for reliability.
- Implement a more granular rate limiting quota system (e.g., per feature within a plan).
- Add automated testing for external data source integrations.
- Add analytics for search patterns and user behavior.
- Consider implementing query suggestions based on popular/past searches.

## Technical Stack
- Next.js
- Supabase
- OpenAI API
- Various Public APIs (Wikidata, OpenCorporates, Business Registries)

