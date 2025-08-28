```js
import { compare, hash } from 'bcrypt'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import { db } from '@/db'
import { users } from '@/db/schema'
import * as jose from 'jose'
import { cache } from 'react'

// JWT types
interface JWTPayload {
  userId: string
  [key: string]: string | number | boolean | null | undefined
}

// Secret key for JWT signing (in a real app, use an environment variable)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-chars-long!!!'
)

// JWT expiration time
const JWT_EXPIRATION = '7d' // 7 days

// Token refresh threshold (refresh if less than this time left)
const REFRESH_THRESHOLD = 24 * 60 * 60 // 24 hours in seconds

// Hash a password
export async function hashPassword(password: string) {
  return hash(password, 10)
}

// Verify a password
export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

// Create a new user
export async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password)
  const id = nanoid()

  try {
    await db.insert(users).values({
      id,
      email,
      password: hashedPassword,
    })

    return { id, email }
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

// Generate a JWT token
export async function generateJWT(payload: JWTPayload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET)
}

// Verify a JWT token
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

// Check if token needs refresh
export async function shouldRefreshToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      clockTolerance: 15, // 15 seconds tolerance for clock skew
    })

    // Get expiration time
    const exp = payload.exp as number
    const now = Math.floor(Date.now() / 1000)

    // If token expires within the threshold, refresh it
    return exp - now < REFRESH_THRESHOLD
  } catch {
    // If verification fails, token is invalid or expired
    return false
  }
}

// Create a session using JWT
export async function createSession(userId: string) {
  try {
    // Create JWT with user data
    const token = await generateJWT({ userId })

    // Store JWT in a cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    })

    return true
  } catch (error) {
    console.error('Error creating session:', error)
    return false
  }
}

// Get current session from JWT
export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) return null
    const payload = await verifyJWT(token)

    return payload ? { userId: payload.userId } : null
  } catch (error) {
    // Handle the specific prerendering error
    if (
      error instanceof Error &&
      error.message.includes('During prerendering, `cookies()` rejects')
    ) {
      console.log(
        'Cookies not available during prerendering, returning null session'
      )
      return null
    }

    console.error('Error getting session:', error)
    return null
  }
})

// Delete session by clearing the JWT cookie
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
}
```

## Explanation

Let’s break down your TypeScript interface carefully:

```ts
interface JWTPayload {
  userId: string;
  [key: string]: string | number | boolean | null | undefined;
}
```

---

## **1️⃣ `userId: string`**

- This declares that **every `JWTPayload` object must have a `userId` property**, and it **must be a string**.

Example:

```ts
const payload: JWTPayload = {
  userId: "12345",
};
```

✅ Valid because `userId` exists and is a string.

---

## **2️⃣ `[key: string]: string | number | boolean | null | undefined`**

This is called an **index signature**.

- It allows the object to have **any other properties**, as long as their **key is a string** and their **value is one of the listed types**:

  - `string`
  - `number`
  - `boolean`
  - `null`
  - `undefined`

Example:

```ts
const payload: JWTPayload = {
  userId: "12345", // required
  role: "admin", // string ✅
  isActive: true, // boolean ✅
  age: 30, // number ✅
  note: null, // null ✅
};
```

- The key takeaway: **you’re free to add more properties**, but their **values must match one of the allowed types**.

---

## **3️⃣ Why use this for JWT?**

JWT payloads often have **dynamic claims** like:

- `userId` → required for identifying the user
- `role`, `email`, `iat`, `exp`, etc. → optional claims

The interface ensures **TypeScript will type-check the payload** but still allows flexibility.

---

### ✅ **Summary**

- `userId: string` → required property
- `[key: string]: string | number | boolean | null | undefined` → allows **any other optional properties** with restricted value types

---
