Important Usage Notes:
Always use await with createClient():

typescript
// In server components/actions:
const supabase = await createClient()
Cookie Operations are Server-Only:

These utilities only work in:

Server Components

Server Actions

Route Handlers

Middleware

For Client Components:

typescript
// Use js-cookie or similar
import Cookies from 'js-cookie'

// Set cookie
Cookies.set('name', 'value', { 
  secure: true, 
  sameSite: 'lax' 
})
Required Environment Variables:

env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
Why This Works:
Resolves the type mismatch by properly handling async cookie operations

Maintains compatibility with Supabase's authentication flow

Implements security best practices for cookie management

Follows Next.js 15's updated cookie handling patterns 9


After reviewing the latest Next.js 15 documentation and Supabase best practices, the cleanest solution is to eliminate the separate cookie store entirely and handle cookies directly within the Supabase client creation. Here's the optimized implementation:

🚀 Simplified & Correct Implementation (Recommended)
1. Delete utils/cookies.ts entirely
(No longer needed - we'll handle cookies directly in the client)

2. Updated utils/server.ts (Best Practice Implementation)
typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ 
            name, 
            value, 
            ...options,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
          })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({
            name,
            value: '',
            ...options,
            maxAge: 0 // Immediately expire
          })
        }
      }
    }
  )
}
Key Improvements:
No Separate Cookie Store:

Directly uses Next.js 15's cookies() in the client creation

Eliminates the need for a wrapper class

Proper Cookie Deletion:

Uses maxAge: 0 pattern instead of delete() for broader compatibility

Simplified Architecture:

Diagram
Code





Usage Example:

typescript
// In server components or actions:
const supabase = await createClient()
const { data } = await supabase.from('table').select()
Why This is Better:
Fewer Layers: Removes unnecessary abstraction

More Reliable: Uses Next.js native cookie handling directly

Better Maintenance: Less code to maintain

Official Pattern: Matches Supabase's recommended approach