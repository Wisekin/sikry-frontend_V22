import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { searchRateLimitMiddleware } from "./middleware/searchRateLimit";

// Define auth-related routes
const authRoutes = [
  '/login',
  '/signup',
  '/forgot-password'
]

// Define marketing/public pages
const publicRoutes = [
  '/',
  '/features',
  '/pricing',
  '/about',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
  '/security'
]

// Define static and system routes that should always be accessible
const systemRoutes = [
  '/_next',
  '/favicon.ico',
  '/placeholder.svg',
  '/api/notifications',
  '/.well-known',
  '/fonts',
  '/images',
  '/static'
]

// Define protected routes that require authentication
const protectedRoutes = [
  '/search',
  '/dashboard',
  '/admin',
  '/settings',
  '/profile',
  '/my-account'
]

export async function middleware(request: NextRequest) {
  // Check rate limits for search API
  const rateLimitResponse = await searchRateLimitMiddleware(request)
  if (rateLimitResponse.status === 429) {
    return rateLimitResponse
  }

  const { pathname } = request.nextUrl
  
  // Check route types
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  const isSystemRoute = systemRoutes.some(route => pathname.startsWith(route))
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // Allow access to public routes
  if ((isAuthRoute || isPublicRoute || isSystemRoute || pathname.includes('.')) && !isProtectedRoute) {
    console.log('Middleware: Allowing access to public route:', pathname)
    return NextResponse.next()
  }

  try {
    // All other routes require authentication
    if (isProtectedRoute || pathname.startsWith('/(dashboard)')) {
      console.log('Middleware: Checking auth for protected route:', pathname)
      
      // Create a response and a supabase client
      const res = NextResponse.next()
      const supabase = createMiddlewareClient({ req: request, res })
      
      // Get session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        console.log('Middleware: No session found, redirecting to login')
        
        // Create the login URL with a return path
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('returnTo', pathname)
        
        // Create a redirect response
        const redirectResponse = NextResponse.redirect(loginUrl)
        
        // Clear any existing auth cookies
        redirectResponse.cookies.delete('sb-access-token')
        redirectResponse.cookies.delete('sb-refresh-token')
        
        return redirectResponse
      }

      console.log('Middleware: Valid session found for user:', session.user.id)
      return res
    }

    // Non-protected routes
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    
    // If there's an error, redirect to login
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
}
