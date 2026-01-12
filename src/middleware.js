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

  // Extract role from token
  const userRole = token ? getRoleFromToken(token) : null;
  console.log(`[Middleware] User role: ${userRole}`);

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

  // 1. If user has token and tries to access root path, redirect to their role route
  if (token && path === "/") {
    console.log(`[Middleware] Has token, redirecting from / to role route`);
    if (userAllowedRoute) {
      return NextResponse.redirect(new URL(userAllowedRoute, request.url));
    }
    return NextResponse.redirect(new URL("/signup", request.url));
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
    console.log(`[Middleware] Has token, redirecting from ${path} to role route`);
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
      console.log(`[Middleware] User (${userRole}) trying to access wrong route, redirecting to ${userAllowedRoute}`);
      return NextResponse.redirect(new URL(userAllowedRoute, request.url));
    }
  }

  // 6. Special case: non-superadmin trying to access superadmin
  if (path.startsWith("/superadmin") && userRole !== "superadmin") {
    console.log(`[Middleware] Non-superadmin (${userRole}) trying to access superadmin`);
    if (userAllowedRoute) {
      return NextResponse.redirect(new URL(userAllowedRoute, request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 7. If token exists but role is not recognized (invalid token)
  if (token && !userAllowedRoute && !isPublicRoute) {
    console.log("[Middleware] Token present but role not recognized");
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("token1");
    return response;
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