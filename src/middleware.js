import { NextResponse } from "next/server";
import { getRoleFromToken } from "@/src/utils/jwt";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  console.log(`[Middleware] Checking: ${path}`);

  // Get token from cookies
  const token = request.cookies.get("token1")?.value || "";
  console.log(`[Middleware] Token: ${token ? "Present" : "Missing"}`);

  // Define public routes that don't require auth
  const publicRoutes = ["/signup", "/verifyemail"];
  const isPublicRoute = publicRoutes.includes(path);

  // Extract role from token (with error handling)
  let userRole = null;
  if (token) {
    try {
      userRole = getRoleFromToken(token);
      console.log(`[Middleware] User role: ${userRole}`);
    } catch (error) {
      console.error("[Middleware] Invalid token:", error.message);
      // Invalid token - clear it and redirect to login
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("token1");
      return response;
    }
  }

  // Define all valid role routes
  const roleRoutes = {
    superadmin: "/superadmin",
    alumni: "/alumni",
    donor: "/donor",
    donoralumni: "/donor-alumni",
    evaluation: "/evaluation",
    faculty: "/faculty",
    moderator: "/moderator",
    usdms: "/usdms",
  };

  // Get user's allowed route based on their role
  const userAllowedRoute = userRole ? roleRoutes[userRole] : null;

  // If token exists but role is not recognized (invalid/unknown role)
  if (token && !userAllowedRoute && !isPublicRoute) {
    console.log("[Middleware] Token present but role not recognized:", userRole);
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("token1");
    return response;
  }

  // 1. If user has token and tries to access root path, redirect to their role route
  if (token && path === "/") {
    console.log(`[Middleware] Has token, redirecting from / to ${userAllowedRoute}`);
    if (userAllowedRoute) {
      return NextResponse.redirect(new URL(userAllowedRoute, request.url));
    }
    // Should not reach here if token validation works, but just in case
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("token1");
    return response;
  }

  // 2. If no token and trying to access root path, allow it (show signup form)
  if (!token && path === "/") {
    console.log("[Middleware] No token, allowing access to /");
    return NextResponse.next();
  }

  // 3. If no token and trying to access protected route, redirect to /
  if (!token && !isPublicRoute) {
    console.log("[Middleware] No token, redirecting from", path, "to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 4. If has token and trying to access public route, redirect to their role route
  if (token && isPublicRoute) {
    console.log(
      `[Middleware] Has token, redirecting from ${path} to ${userAllowedRoute}`
    );
    if (userAllowedRoute) {
      return NextResponse.redirect(new URL(userAllowedRoute, request.url));
    }
    return NextResponse.next();
  }

  // 5. Check if user is accessing correct role route
  if (token && userAllowedRoute) {
    const isAccessingAllowedRoute = path.startsWith(userAllowedRoute);
    const isAccessingOtherRoleRoute = Object.values(roleRoutes).some(
      (route) => path.startsWith(route) && route !== userAllowedRoute
    );

    // If accessing wrong role route, redirect to correct one
    if (!isAccessingAllowedRoute && isAccessingOtherRoleRoute) {
      console.log(
        `[Middleware] User (${userRole}) trying to access wrong route, redirecting to ${userAllowedRoute}`
      );
      return NextResponse.redirect(new URL(userAllowedRoute, request.url));
    }
  }

  console.log("[Middleware] Access granted to", path);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/superadmin/:path*",
    "/alumni/:path*",
    "/donor/:path*",
    "/donor-alumni/:path*",
    "/evaluation/:path*",
    "/faculty/:path*",
    "/moderator/:path*",
    "/usdms/:path*",
    "/signup",
    "/verifyemail",
  ],
};