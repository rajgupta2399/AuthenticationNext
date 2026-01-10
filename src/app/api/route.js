import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    // Get ALL cookies from the request (including HttpOnly)
    const cookieStore = cookies();
    
    // List ALL cookies for debugging
    console.log('📦 All cookies received:', Array.from(cookieStore.getAll()));
    
    // Get the specific token1 cookie
    const token = cookieStore.get('token1')?.value;
    
    console.log('🔐 Auth API - Token present:', !!token);
    
    if (!token) {
      console.log('❌ No token1 cookie found');
      return NextResponse.json(
        { 
          authenticated: false, 
          user: null,
          debug: { 
            hasToken: false,
            allCookies: Array.from(cookieStore.getAll()).map(c => c.name)
          }
        },
        { status: 200 }
      );
    }
    
    console.log('✅ Token found, length:', token.length);
    
    // Decode the JWT token
    let decoded;
    try {
      // The token from your backend looks like:
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InJha...4Y"
      
      const parts = token.split('.');
      console.log('🔍 Token parts:', parts.length);
      
      if (parts.length === 3) {
        // Decode the middle part (payload)
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        
        decoded = JSON.parse(jsonPayload);
        console.log('🎯 Decoded token:', decoded);
      } else {
        console.log('⚠️ Token has unexpected format');
      }
    } catch (error) {
      console.error('❌ Token decode error:', error.message);
    }
    
    if (decoded) {
      return NextResponse.json({
        authenticated: true,
        user: {
          email: decoded.Email,
          role: decoded.Role || decoded.role,
        },
        debug: {
          hasToken: true,
          tokenLength: token.length,
          decodedRole: decoded.Role
        }
      });
    }
    
    return NextResponse.json({
      authenticated: false,
      user: null,
      debug: {
        hasToken: true,
        tokenLength: token.length,
        decodeFailed: true
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('🔥 Auth API error:', error);
    return NextResponse.json(
      { 
        authenticated: false, 
        user: null,
        error: error.message 
      },
      { status: 500 }
    );
  }
}