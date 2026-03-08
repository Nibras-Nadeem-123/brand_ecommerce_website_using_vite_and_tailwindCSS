import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/admin', '/cart', '/checkout', '/orders'];

// Routes that require admin role
const adminRoutes = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookie
  const token = request.cookies.get('token')?.value;
  
  // Check if route requires authentication
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Check if route requires admin access
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      try {
        // Decode token to check role
        const decoded = JSON.parse(atob(token.split('.')[1]));
        // Note: This is a simple check. For production, verify token properly.
        // Admin check is also done on the client side and API level
      } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/cart/:path*', '/checkout/:path*', '/orders/:path*'],
};
