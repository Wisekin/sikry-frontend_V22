import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// Debug function to log request details
function logRequestDetails(request: NextRequest) {
  console.log('Middleware: Request URL:', request.url);
  console.log('Middleware: Request method:', request.method);
  console.log('Middleware: Request headers:', Object.fromEntries(request.headers.entries()));
  console.log('Middleware: Request cookies:', request.cookies.getAll().map(c => c.name));
}

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
  console.log('\n--- New Request ---');
  console.log('Middleware: Processing request for:', pathname);
  logRequestDetails(request);
  
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

      // Get session first to check if it exists
      const sessionResponse = await supabase.auth.getSession();
      const session = sessionResponse.data?.session;
      console.log('Middleware: Session check:', { 
        hasSession: !!session,
        userId: session?.user?.id,
        expiresAt: session?.expires_at
      });

      // Then get user
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log('Middleware: User session check', { 
        hasUser: !!user, 
        userId: user?.id,
        email: user?.email,
        error: error?.message,
        hasSession: !!session
      });

      if (!user || error) {
        console.log('Middleware: No valid user session, redirecting to login');
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirectedFrom', pathname);
        
        // Clear any invalid auth cookies
        response.cookies.delete('sb-access-token');
        response.cookies.delete('sb-refresh-token');
        
        return NextResponse.redirect(loginUrl);
      }
      
      console.log('Middleware: User authenticated, allowing access:', user.id);
    }

    // Default: allow access
    console.log('Middleware: Default access allowed for:', pathname);
    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    
    // If there's an auth error, clear any invalid auth cookies
    if (error instanceof Error && error.message.includes('Auth')) {
      response.cookies.delete('sb-access-token');
      response.cookies.delete('sb-refresh-token');
      
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('error', 'session_expired');
      return NextResponse.redirect(loginUrl);
    }
    
    // In case of other errors, allow the request to continue but log the error
    console.error('Middleware non-auth error, allowing request to continue:', error);
    return response;
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
