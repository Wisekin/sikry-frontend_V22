import {
  createServerClient as createSupabaseServerClient,
  type CookieOptions,
} from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    console.error('[Supabase] NEXT_PUBLIC_SUPABASE_URL is not defined.')
    throw new Error('Server configured Supabase URL is required.')
  }
  if (!supabaseKey) {
    console.error('[Supabase] NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined.')
    throw new Error('Server configured Supabase Anon Key is required.')
  }

  return createSupabaseServerClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
    cookies: {
      get(name: string) {
        const cookie = cookieStore.get(name)
        console.log(`[Supabase Server] Getting cookie ${name}:`, cookie?.value ? 'found' : 'not found');
        return cookie?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          // In Server Components, cookies are read-only
          console.log(`[Supabase Server] Cookie ${name} would be set (read-only context)`);
        } catch (error) {
          console.warn(`[Supabase Server] Could not set cookie ${name}:`, error);
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          // In Server Components, cookies are read-only
          console.log(`[Supabase Server] Cookie ${name} would be removed (read-only context)`);
        } catch (error) {
          console.warn(`[Supabase Server] Could not remove cookie ${name}:`, error);
        }
      },
    },
  })
}
