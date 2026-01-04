// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  console.log(`[Middleware] Checking: ${path}`);

  // Get token from cookies
  const token = request.cookies.get("token1")?.value || "";
  console.log(`[Middleware] Token: ${token ? "Present" : "Missing"}`);

  // Define public routes that don't require auth
  const publicRoutes = ["/signup", "/verifyemail"];
  const isPublicRoute = publicRoutes.includes(path);

  // 1. If user HAS token and tries to access root path, redirect to dashboard
  if (token && path === "/") {
    console.log('[Middleware] Has token, redirecting from / to /dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. If user has NO token and tries to access root path, allow it (show signup form)
  if (!token && path === "/") {
    console.log('[Middleware] No token, allowing access to /');
    return NextResponse.next();
  }

  // 3. If user has NO token and tries to access protected routes, redirect to /
  if (!token && !isPublicRoute) {
    console.log('[Middleware] No token, redirecting from', path, 'to /');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 4. If user has token and tries to access public routes (except /), redirect to dashboard
  if (token && isPublicRoute) {
    console.log('[Middleware] Has token, redirecting from', path, 'to /dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  console.log('[Middleware] Access granted to', path);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/superadmin/:path*',
    '/signup',
    '/verifyemail'
  ]
};