"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext({});

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Get base URL from environment or use default
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://iitk-50035778635.development.catalystappsail.in/api/userList";

  // Helper function to get cookie
  const getCookie = (name) => {
    if (typeof document === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // Helper function to set cookie
  const setCookie = (name, value, days = 7) => {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`;
  };

  // Helper function to delete cookie
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  // Decode JWT token
  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Check if token is expired
  const isTokenExpired = (token) => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  };

  // Check authentication status on initial load and route changes
  useEffect(() => {
    checkAuth();
  }, [pathname]);

  // In AuthContext.js, update the checkAuth function:

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);

      // FIX: Look for token1, not token
      const token = getCookie("token"); // Changed from getCookie('token')

      console.log(
        "[AuthContext] Checking auth, token1:",
        token ? "Found" : "Not found"
      );

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Check if token is expired
      if (isTokenExpired(token)) {
        console.log("Token expired, logging out");
        clearAuth();
        return;
      }

      // Decode token to get user info
      const decoded = decodeToken(token);

      if (decoded) {
        console.log("[AuthContext] User authenticated:", decoded.Email);
        setUser({
          email: decoded.Email,
          role: decoded.Role,
          iat: decoded.iat,
          exp: decoded.exp,
        });

        // AUTO-REDIRECT based on role
        setTimeout(() => {
          if (decoded.Role === "superadmin") {
            console.log("[AuthContext] Redirecting superadmin to /superadmin");
            router.push("/superadmin");
          } else {
            console.log("[AuthContext] Redirecting user to /dashboard");
            router.push("/dashboard");
          }
        }, 100);
      } else {
        console.log("[AuthContext] Invalid token, clearing auth");
        clearAuth();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Login function
  // In your AuthContext.js
  // const login = async (email, otp) => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/login2`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, otp }),
  //       credentials: "include",
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       toast.success("Login successful!");

  //       // Check if token was actually set by backend
  //       const token = getCookie("token");
  //       console.log("Token after login:", token ? "Present" : "Missing");

  //       if (token) {
  //         // Decode token to get user info
  //         const decoded = decodeToken(token);

  //         if (decoded) {
  //           const userData = {
  //             email: decoded.Email || email,
  //             role: decoded.Role || "user",
  //             ...decoded,
  //           };

  //           setUser(userData);

  //           // Use setTimeout to allow cookies to propagate
  //           setTimeout(() => {
  //             if (decoded.Role === "superadmin") {
  //               router.push("/superadmin");
  //             } else {
  //               router.push("/dashboard");
  //             }
  //           }, 100);

  //           return { success: true, data: userData };
  //         }
  //       } else {
  //         // If no token, maybe backend returned it in response body
  //         if (data.token) {
  //           // Set cookie manually if backend returns token in response
  //           setCookie("token", data.token);

  //           const decoded = decodeToken(data.token);
  //           const userData = {
  //             email: decoded.Email || email,
  //             role: decoded.Role || "user",
  //             ...decoded,
  //           };

  //           setUser(userData);

  //           setTimeout(() => {
  //             if (decoded.Role === "superadmin") {
  //               router.push("/superadmin");
  //             } else {
  //               router.push("/dashboard");
  //             }
  //           }, 100);

  //           return { success: true, data: userData };
  //         }
  //       }

  //       toast.error("Authentication token not received");
  //       return { success: false, error: "Authentication token not received" };
  //     } else {
  //       toast.error(data.message || "Login failed");
  //       return { success: false, error: data.message };
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     toast.error("Network error. Please try again.");
  //     return { success: false, error: "Network error" };
  //   }
  // };

  // Logout function
  const logout = async () => {
    try {
      // Call backend logout if needed
      await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuth();
      router.push("/login");
      toast.success("Logged out successfully");
    }
  };

  // Clear authentication
  const clearAuth = () => {
    // Clear token from cookies
    deleteCookie("token");

    // Clear user state
    setUser(null);

    // Clear any localStorage/sessionStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Update user profile
  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  // Get user token
  const getToken = () => {
    return getCookie("token");
  };

  // Refresh token function (if needed)
  const refreshToken = async () => {
    try {
      const response = await fetch(`${BASE_URL}/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          setCookie("token", data.token);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        // login,
        logout,
        isAuthenticated,
        hasRole,
        updateUser,
        clearAuth,
        getToken,
        refreshToken,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Higher-order component for protected routes
export const withAuth = (Component, allowedRoles = []) => {
  return function WithAuth(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        // Redirect to login if not authenticated
        router.push("/login");
        return;
      }

      if (!loading && user && allowedRoles.length > 0) {
        // Check if user has required role
        const hasRequiredRole = allowedRoles.includes(user.role);
        if (!hasRequiredRole) {
          // Redirect to unauthorized page or dashboard
          router.push("/unauthorized");
        }
      }
    }, [user, loading, router, allowedRoles]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-t-4 border-b-4 border-primary-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    // Check role permissions
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return null;
    }

    return <Component {...props} />;
  };
};

// Hook for route protection
export const useRequireAuth = (allowedRoles = []) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
      }
    }
  }, [user, loading, router, allowedRoles]);

  return { user, loading };
};
