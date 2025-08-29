import { NextResponse, NextRequest } from 'next/server';
import { AUTH_TOKEN } from './types/auth';

// Public routes
const authRoutes = ['/login', '/register'];
const protectedRoutes = ['/issues'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(AUTH_TOKEN.ACCESS)?.value;

  // If logged in and trying to access auth route -> send to home
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Otherwise allow (public pages always allowed)
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/issues/:path*'],
};
