Absolutely! Let’s break down **JSON Web Tokens (JWTs)** in a clear, simple way.

---

## **1. What is a JWT?**

A **JSON Web Token (JWT)** is a **secure way to transmit information between two parties** (usually a server and a client) as a JSON object.

It’s **signed** so the receiver can verify that the data hasn’t been tampered with.

Think of it as a **digital passport**: it proves identity and can carry some claims (like user ID, role, or permissions).

---

## **2. JWT Structure**

A JWT has **three parts**, separated by dots (`.`):

```
header.payload.signature
```

### **1️⃣ Header**

- Contains metadata about the token.
- Typically includes:

  - `alg` → the algorithm used to sign the token (e.g., `HS256`)
  - `typ` → token type (`JWT`)

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

This is Base64Url-encoded.

---

### **2️⃣ Payload**

- Contains the **claims**, i.e., information about the user or session.
- Example claims:

```json
{
  "sub": "1234567890", // user ID
  "name": "John Doe", // user name
  "role": "admin",
  "iat": 1670000000 // issued at timestamp
}
```

- You can also add **custom claims** like `email` or `permissions`.

> ⚠️ Payload is **not encrypted**. Anyone with the token can read it.
> Only the signature prevents tampering.

---

### **3️⃣ Signature**

- Ensures the token **was not modified**.
- Created by combining the **header and payload**, then signing with a **secret key**.

Example using HMAC SHA256:

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secretKey
)
```

When the server receives a token, it can recompute the signature and verify it matches. If it matches, the token is valid.

---

## **3. How JWT Works in Authentication**

1. **User logs in** with email/password.
2. Server verifies credentials and generates a **JWT**, e.g.:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

3. Server sends the JWT to the client (usually in cookies or localStorage).
4. Client includes the JWT in **subsequent requests** (e.g., `Authorization: Bearer <token>`).
5. Server verifies the token **on every request** without querying the database.
6. If valid, user is authorized to access protected routes.

---

## **4. Advantages of JWT**

- **Stateless** → server doesn’t need session storage.
- **Secure** → signed to prevent tampering.
- **Portable** → can be used across domains or APIs.
- **Flexible** → you can store custom data (claims).

---

## **5. Example JWT**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2NzAwMDAwMDB9.m6g7...signature...
```

- First part → header
- Second part → payload
- Third part → signature

---
