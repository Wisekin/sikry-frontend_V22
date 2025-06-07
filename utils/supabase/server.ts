import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      async get(name: string) {
        try {
          const cookie = await cookieStore.get(name)
          return cookie?.value
        } catch (error) {
          console.error(`Cookie get error: ${name}`, error)
          return undefined
        }
      },
      async set(name: string, value: string, options: CookieOptions) {
        try {
          // Use the async cookies() API
          await cookies().set(name, value, {
            ...options,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
          })
        } catch (error) {
          console.error(`Cookie set error: ${name}`, error)
        }
      },
      async remove(name: string, options: CookieOptions) {
        try {
          // Use the async cookies() API
          await cookies().set(name, '', {
            ...options,
            maxAge: 0,
            path: '/'
          })
        } catch (error) {
          console.error(`Cookie remove error: ${name}`, error)
        }
      }
    }
  })
}