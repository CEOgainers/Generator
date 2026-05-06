import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If we are already on the login page, let it through
  if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // Check if the user is authenticated via cookie
  const authCookie = request.cookies.get('auth_token');
  const envPassword = process.env.SYSTEM_PASSWORD || 'iamgainer123';
  const envEmail = process.env.SYSTEM_EMAIL || 'gaiersfuture@gmail.com';

  // We hash the email and password together simply for the cookie value
  const expectedToken = Buffer.from(`${envEmail}:${envPassword}`).toString('base64');

  if (!authCookie || authCookie.value !== expectedToken) {
    // If no valid token, redirect to login page
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (the login page itself)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};
