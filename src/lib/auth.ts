import { JWTPayload } from '@/dal/users/user.types';
import { compare, hash, genSalt } from 'bcrypt';
import * as jose from 'jose';
import { cookies } from 'next/headers';
import { cache } from 'react';

// JWT expiration time
export const JWT_EXPIRATION = '7d'; // 7 days

// Token refresh threshold (refresh if less than this time left)
export const REFRESH_THRESHOLD = 24 * 60 * 60; // 24 hours in seconds

// JWT algorithm
export const alg = 'HS256';

// JWT secret
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Hash a password
export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

// Verify a JWT token
export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

// Generate a JWT token
export const generateJWT = async (payload: JWTPayload) => {
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);
  return token;
};

// Verify a JWT token
export const verifyJWT = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      algorithms: [alg],
    });
    return payload as JWTPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
};

// Create a session using JWT
export async function createSession(userId: string) {
  try {
    // Create JWT with user data
    const token = await generateJWT({ userId });

    // Store JWT in a cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    });

    return true;
  } catch (error) {
    console.error('Error creating session:', error);
    return false;
  }
}

// Get current session from JWT
export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) return null;
    const payload = await verifyJWT(token);

    return payload ? { userId: payload.userId } : null;
  } catch (error) {
    // Handle the specific prerendering error
    if (error instanceof Error && error.message.includes('During prerendering, `cookies()` rejects')) {
      console.log('Cookies not available during prerendering, returning null session');
      return null;
    }

    console.error('Error getting session:', error);
    return null;
  }
});

// Delete session by clearing the JWT cookie
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}
