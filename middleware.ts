import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/features',
  '/pricing',
  '/login',
  '/signup',
  '/forgot-password',
  '/_next',
  '/favicon.ico',
  '/placeholder.svg',
  '/api/notifications',
  '/.well-known'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('Middleware: Processing request for:', pathname);
  
  // Skip middleware for public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    console.log('Middleware: Allowing access to public route:', pathname);
    return NextResponse.next();
  }
  
  // Skip middleware for static files
  if (pathname.includes('.')) {
    console.log('Middleware: Allowing static file:', pathname);
    return NextResponse.next();
  }
  
  const response = NextResponse.next();
  
  try {
    // Only check auth for protected routes
    if (pathname.startsWith('/dashboard')) {
      console.log('Middleware: Checking auth for protected route:', pathname);
      
      const supabase = createMiddlewareClient({ req: request, res: response });
      console.log('Middleware: Supabase client created');

      const { data: { user }, error } = await supabase.auth.getUser();
      console.log('Middleware: User session check', { 
        hasUser: !!user, 
        userId: user?.id,
        error: error?.message 
      });

      if (!user) {
        console.log('Middleware: No user session, redirecting to login');
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirectedFrom', pathname);
        return NextResponse.redirect(loginUrl);
      }
      
      console.log('Middleware: User authenticated, allowing access:', user.id);
    }

    // Default: allow access
    console.log('Middleware: Default access allowed for:', pathname);
    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, allow the request to continue but log the error
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes (handled separately)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
}
