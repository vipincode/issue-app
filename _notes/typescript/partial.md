Nice catch 🔥

The reason you’re using **`issueSchema.partial()`** here is directly connected to what we just discussed about `Partial<Issue>`.

---

### 1. `issueSchema`

Let’s say your Zod schema looks like this:

```ts
const issueSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']),
  assignee: z.string().nullable(),
  dueDate: z.string(),
  labels: z.array(z.string()),
});
```

By default, **all fields are required** when you validate with `issueSchema.safeParse(data)`.

---

### 2. Why `.partial()`?

When you do:

```ts
const validationResult = issueSchema.partial().safeParse(data);
```

👉 `.partial()` makes **all schema fields optional**, just like `Partial<T>` in TypeScript.

So the schema temporarily becomes:

```ts
{
  title?: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  assignee?: string | null;
  dueDate?: string;
  labels?: string[];
}
```

---

### 3. Why is this important here?

Because you’re writing an **update function**:

```ts
export const update = async (id: string, data: Partial<Issue>) => { ... }
```

- You don’t want to force the client to send **all fields** every time.
- Example: if the user only wants to update `title`, they should be able to send just `{ title: "New title" }`.

✅ Using `.partial()` makes Zod accept this, while still validating the provided fields.

---

### 4. Without `.partial()`

If you kept it strict:

```ts
const validationResult = issueSchema.safeParse(data);
```

Then calling `update(id, { title: "New title" })` would **fail**, because Zod would complain that `description`, `priority`, etc. are missing.

---

### ✅ Summary

You use `.partial()` in Zod schema validation for **update APIs**, because updates typically allow **partial data** instead of requiring all fields like creation does.

- `issueSchema` → full validation (for `createIssue`).
- `issueSchema.partial()` → partial validation (for `updateIssue`).

---

Do you also want me to show you how to do a **deepPartial()** in Zod (in case your issue has nested objects, like `user` inside)?
