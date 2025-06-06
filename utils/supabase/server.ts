import {
  createServerClient as createSupabaseServerClient,
  type CookieOptions,
} from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY

  if (!supabaseUrl) {
    console.error('[Supabase] NEXT_PUBLIC_SUPABASE_URL is not defined.')
    throw new Error('Server configured Supabase URL is required.')
  }
  if (!supabaseKey) {
    console.error('[Supabase] SUPABASE_SERVICE_KEY is not defined.')
    throw new Error('Server configured Supabase Service Key is required.')
  }

  return createSupabaseServerClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // Recommended for server-side
    },
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        // In Server Components, cookies are read-only.
        // This method is a no-op here but required by Supabase client.
        // Actual cookie setting should happen in Middleware or Route Handlers.
        console.warn(
          `[Supabase Server Client] Attempted to set cookie '${name}' in a read-only context (Server Component). This is a no-op. Ensure cookie modifications occur in writable contexts (Middleware, Route Handlers, or client-side).`
        )
      },
      remove(name: string, options: CookieOptions) {
        // Similar to set, this is a no-op in Server Components.
        console.warn(
          `[Supabase Server Client] Attempted to remove cookie '${name}' in a read-only context (Server Component). This is a no-op.`
        )
      },
    },
  })
}
