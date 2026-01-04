// // middleware.js
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const path = request.nextUrl.pathname;
//   console.log(`[Middleware] Checking: ${path}`);

//   // Get token from cookies
//   const token = request.cookies.get("token1")?.value || "";
//   console.log(`[Middleware] Token: ${token ? "Present" : "Missing"}`);

//   // Define public routes that don't require auth
//   const publicRoutes = ["/signup", "/verifyemail"];
//   const isPublicRoute = publicRoutes.includes(path);

//   // 1. If user HAS token and tries to access root path, redirect to superadmin
//   if (token && path === "/") {
//     console.log('[Middleware] Has token, redirecting from / to /superadmin');
//     return NextResponse.redirect(new URL('/superadmin', request.url));
//   }

//   // 2. If user has NO token and tries to access root path, allow it (show signup form)
//   if (!token && path === "/") {
//     console.log('[Middleware] No token, allowing access to /');
//     return NextResponse.next();
//   }

//   // 3. If user has NO token and tries to access protected routes, redirect to /
//   if (!token && !isPublicRoute) {
//     console.log('[Middleware] No token, redirecting from', path, 'to /');
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // 4. If user has token and tries to access public routes (except /), redirect to superadmin
//   if (token && isPublicRoute) {
//     console.log('[Middleware] Has token, redirecting from', path, 'to /superadmin');
//     return NextResponse.redirect(new URL('/superadmin', request.url));
//   }

//   console.log('[Middleware] Access granted to', path);
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/',
//     '/superadmin/:path*',
//     '/superadmin/:path*',
//     '/signup',
//     '/verifyemail'
//   ]
// };

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

  // Extract role from token if present
  let userRole = null;
  if (token) {
    try {
      const decoded = decodeJWT(token);
      userRole = decoded?.Role || decoded?.role || null;
      console.log(`[Middleware] User role: ${userRole}`);
    } catch (error) {
      console.log('[Middleware] Failed to decode token:', error);
    }
  }

  // 1. If user HAS token and tries to access root path, redirect based on role
  if (token && path === "/") {
    console.log(`[Middleware] Has token, redirecting from / to appropriate superadmin`);
    
    if (userRole === 'superadmin') {
      return NextResponse.redirect(new URL('/superadmin', request.url));
    } else {
      return NextResponse.redirect(new URL('/superadmin', request.url));
    }
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

  // 4. If user has token and tries to access public routes, redirect based on role
  if (token && isPublicRoute) {
    console.log(`[Middleware] Has token, redirecting from ${path} to appropriate superadmin`);
    
    if (userRole === 'superadmin') {
      return NextResponse.redirect(new URL('/superadmin', request.url));
    } else {
      return NextResponse.redirect(new URL('/superadmin', request.url));
    }
  }

  // 5. Role-based access control
  if (path.startsWith('/superadmin') && userRole !== 'superadmin') {
    console.log('[Middleware] Not superadmin, redirecting to superadmin');
    return NextResponse.redirect(new URL('/superadmin', request.url));
  }

  console.log('[Middleware] Access granted to', path);
  return NextResponse.next();
}

// Helper function to decode JWT
function decodeJWT(token) {
  try {
    if (!token || token.split('.').length !== 3) {
      return null;
    }
    
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.log('[Middleware] Token decode error:', error);
    return null;
  }
}

export const config = {
  matcher: [
    '/',
    '/superadmin/:path*',
    '/superadmin/:path*',
    '/signup',
    '/verifyemail'
  ]
};


// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const path = request.nextUrl.pathname;
//   console.log(`[Middleware] Checking: ${path}`);

//   // Get token from cookies
//   const token = request.cookies.get("token1")?.value || "";
//   console.log(`[Middleware] Token: ${token ? "Present" : "Missing"}`);

//   // Define public routes that don't require auth
//   const publicRoutes = ["/signup", "/verifyemail"];
//   const isPublicRoute = publicRoutes.includes(path);

//   // Extract role from token if present
//   let userRole = null;
//   if (token) {
//     try {
//       const decoded = decodeJWT(token);
//       userRole = decoded?.Role || decoded?.role || null;
//       console.log(`[Middleware] User role: ${userRole}`);
//     } catch (error) {
//       console.log('[Middleware] Failed to decode token:', error);
//     }
//   }

//   // Define all valid role routes
//   const roleRoutes = {
//     superadmin: '/superadmin',
//     alumni: '/alumni',
//     donor: '/donor',
//     donoralumni: '/donoralumni',
//     evaluation: '/evaluation',
//     faculty: '/faculty',
//     moderator: '/moderator',
//     usdms: '/us-dms',
//   };

//   // Get user's allowed route based on their role
//   const userAllowedRoute = userRole ? roleRoutes[userRole] : null;

//   // 1. If user has token and tries to access root path, redirect to their role route
//   if (token && path === "/") {
//     console.log(`[Middleware] Has token, redirecting from / to role route`);
    
//     if (userAllowedRoute) {
//       return NextResponse.redirect(new URL(userAllowedRoute, request.url));
//     }
//     // If role not recognized, redirect to signup
//     return NextResponse.redirect(new URL('/signup', request.url));
//   }

//   // 2. If no token and trying to access root path, allow it (show signup form)
//   if (!token && path === "/") {
//     console.log('[Middleware] No token, allowing access to /');
//     return NextResponse.next();
//   }

//   // 3. If no token and trying to access protected route, redirect to /
//   if (!token && !isPublicRoute) {
//     console.log('[Middleware] No token, redirecting from', path, 'to /');
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // 4. If has token and trying to access public route, redirect to their role route
//   if (token && isPublicRoute) {
//     console.log(`[Middleware] Has token, redirecting from ${path} to role route`);
    
//     if (userAllowedRoute) {
//       return NextResponse.redirect(new URL(userAllowedRoute, request.url));
//     }
//     return NextResponse.next();
//   }

//   // 5. Check if user is accessing correct role route
//   if (token && userAllowedRoute) {
//     const isAccessingAllowedRoute = path.startsWith(userAllowedRoute);
//     const isAccessingOtherRoleRoute = Object.values(roleRoutes)
//       .some(route => path.startsWith(route) && route !== userAllowedRoute);

//     // If accessing wrong role route, redirect to correct one
//     if (!isAccessingAllowedRoute && isAccessingOtherRoleRoute) {
//       console.log(`[Middleware] User (${userRole}) trying to access wrong route, redirecting to ${userAllowedRoute}`);
//       return NextResponse.redirect(new URL(userAllowedRoute, request.url));
//     }
//   }

//   // 6. Special case: non-superadmin trying to access superadmin
//   if (path.startsWith('/superadmin') && userRole !== 'superadmin') {
//     console.log(`[Middleware] Non-superadmin (${userRole}) trying to access superadmin`);
    
//     if (userAllowedRoute) {
//       return NextResponse.redirect(new URL(userAllowedRoute, request.url));
//     }
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // 7. If token exists but role is not recognized (invalid token)
//   if (token && !userAllowedRoute && !isPublicRoute) {
//     console.log('[Middleware] Token present but role not recognized');
//     const response = NextResponse.redirect(new URL('/', request.url));
//     response.cookies.delete('token1');
//     return response;
//   }

//   console.log('[Middleware] Access granted to', path);
//   return NextResponse.next();
// }

// // Helper function to decode JWT
// function decodeJWT(token) {
//   try {
//     if (!token || token.split('.').length !== 3) {
//       return null;
//     }
    
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
//     );
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.log('[Middleware] Token decode error:', error);
//     return null;
//   }
// }

// export const config = {
//   matcher: [
//     '/',
//     // All role-specific routes
//     '/superadmin/:path*',
//     '/alumni/:path*',
//     '/donor/:path*',
//     '/donoralumni/:path*',
//     '/evaluation/:path*',
//     '/faculty/:path*',
//     '/moderator/:path*',
//     '/us-dms/:path*',
//     // Public routes
//     '/signup',
//     '/verifyemail'
//   ]
// };