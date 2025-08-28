```src/
 ├─ app/
 │   ├─ (auth)/
 │   │   ├─ login/
 │   │   │   ├─ page.tsx
 │   │   │   └─ actions.ts        // server actions for login
 │   │   └─ register/
 │   │       ├─ page.tsx
 │   │       └─ actions.ts
 │   ├─ dashboard/
 │   │   ├─ page.tsx
 │   │   └─ actions.ts            // server actions for dashboard features
 │   └─ layout.tsx
 │
 ├─ lib/
 │   ├─ db.ts                     // Prisma/Drizzle client or DB connection
 │   ├─ utils/
 │   │   ├─ auth.ts               // JWT/session helpers
 │   │   └─ hash.ts               // password hashing
 │
 ├─ dal/                          // DATA ACCESS LAYER
 │   ├─ users/
 │   │   ├─ user.dal.ts           // CRUD for users
 │   │   └─ user.types.ts
 │   ├─ posts/
 │   │   ├─ post.dal.ts
 │   │   └─ post.types.ts
 │   └─ index.ts                  // re-exports for DAL
 │
 ├─ services/                     // Business logic, orchestrates DAL if needed
 │   ├─ auth.service.ts
 │   ├─ user.service.ts
 │   └─ ...
 │
 ├─ schemas/                      // Zod schemas for validation
 │   ├─ user.schema.ts
 │   └─ post.schema.ts
 │
 └─ types/                        // Shared types/interfaces
     └─ index.ts
```
