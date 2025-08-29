Got it 👍 — the problem is that in your **schema** `labels` is defined as an **array of strings**:

```ts
labels: z.array(z.string().min(2).max(100)),
```

…but in your form you’re binding it to a single `<Input>` field, which will only give you **one string** like:

```
"bug, feature, urgent"
```

This won’t validate, because Zod expects an array like:

```ts
['bug', 'feature', 'urgent'];
```

---

### ✅ How to handle this

You need to **transform** the input string into an array before validation.

---

### Option 1: Use `z.preprocess` in your schema

```ts
export const issueSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['open', 'in-progress', 'resolved', 'closed']),
  assignee: z.string().email(),
  dueDate: z.date().min(new Date()),
  labels: z.preprocess(
    (val) =>
      typeof val === 'string'
        ? val
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : val,
    z.array(z.string().min(2).max(100))
  ),
});
```

Now if the user types `"bug, feature, urgent"` in the input,
it becomes `["bug", "feature", "urgent"]` automatically before validation.

---

### Option 2: Handle it in the form field

Instead of preprocessing in Zod, you can convert in the field’s `onChange`:

```tsx
<FormField
  control={form.control}
  name="labels"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Labels</FormLabel>
      <FormControl>
        <Input
          placeholder="bug, feature, urgent"
          onChange={(e) => {
            // let the user type freely
            field.onChange(e.target.value);
          }}
          onBlur={(e) => {
            // when leaving the field, convert string → array
            const arr = e.target.value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean);
            field.onChange(arr);
          }}
        />
      </FormControl>
      <FormDescription>Comma-separated tags to categorize the issue</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

This way:

- The form stores `labels` as an array (`["bug","feature","urgent"]`)
- The input shows a string (`"bug, feature, urgent"`)

---

### ✅ Recommendation

If you want to reuse the same `issueSchema` on both frontend + backend →
go with **Option 1 (preprocess in Zod)**, because it makes your schema smart enough to handle both input types.

If it’s **only frontend** → Option 2 (transform in form) is simpler.

---

Great question 👌 — let’s break down exactly **how `onChange` and `onBlur` work in your form** with `react-hook-form` (`field` comes from the `Controller` or `useController`).

---

### 🔹 `onChange`

```tsx
onChange={(e) => {
  // let the user type freely
  field.onChange(e.target.value);
}}
```

- Normally, `field.onChange` expects the _final value type_ defined in your Zod schema (`string[]` in your case).
- But while the user is typing, you don’t want to immediately split it into an array — otherwise, typing `"b,u,g"` would immediately break things.
- That’s why here you temporarily pass the raw string (`"bug, feature"`) into `field.onChange`.
- This keeps the input **controlled** and allows free typing.

---

### 🔹 `onBlur`

```tsx
onBlur={(e) => {
  const arr = e.target.value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  field.onChange(arr);
}}
```

- `onBlur` fires when the user **leaves the field** (clicks outside or tabs away).
- At this moment, you take the typed string and **transform it into the schema’s expected type (`string[]`)**.
- Example:

  - User typed: `"bug, feature, urgent"`
  - On blur → `["bug", "feature", "urgent"]` gets saved to the form state.

---

### 🔹 Why both are needed

- **`onChange`** = keep the input usable (user sees and edits text as normal).
- **`onBlur`** = normalize to the schema’s required type so Zod validation works.

Without this dual approach:

- If you always store an array → the input becomes uneditable.
- If you always store a string → validation fails since Zod expects an array.

---

👉 So in short:

- While typing: form state = string.
- On leaving: form state = string\[], validated by Zod.

---
