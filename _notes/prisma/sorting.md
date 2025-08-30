Perfect 👍 so if no sorting is applied, your function should **just return all issues unsorted** (like your current version).

Here’s the refined version that ensures:

- If no sort option is passed → return all data as-is.
- If sort option is provided → apply sorting.

```ts
import { prisma } from '@/lib/prisma';
import { cache } from 'react';

type SortOptions =
  | { sortBy: 'status'; order?: 'asc' | 'desc' }
  | { sortBy: 'priority'; order?: 'asc' | 'desc' }
  | { sortBy: 'createdAt'; order?: 'asc' | 'desc' } // newest/oldest
  | { sortBy: 'status_priority'; order?: 'asc' | 'desc' };

export const getAllIssue = cache(async (sortOption?: SortOptions) => {
  try {
    let orderBy: any = undefined;

    if (sortOption) {
      switch (sortOption.sortBy) {
        case 'status':
          orderBy = { status: sortOption.order || 'asc' };
          break;
        case 'priority':
          orderBy = { priority: sortOption.order || 'asc' };
          break;
        case 'createdAt':
          orderBy = { createdAt: sortOption.order || 'desc' }; // default newest
          break;
        case 'status_priority':
          orderBy = [{ status: sortOption.order || 'asc' }, { priority: sortOption.order || 'asc' }];
          break;
      }
    }

    const issues = await prisma.issue.findMany({
      orderBy, // if undefined, Prisma just ignores it and returns all
    });

    return issues;
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
});
```

### Example calls:

```ts
// Get all issues (no sorting)
const allIssues = await getAllIssue();

// Get newest first
const newest = await getAllIssue({ sortBy: 'createdAt', order: 'desc' });

// Get by status
const byStatus = await getAllIssue({ sortBy: 'status', order: 'asc' });
```

👉 This way, **if you don’t pass a sortOption**, Prisma simply returns all rows with no ordering.

---

⚡ Quick check: Do you also want me to set up **custom sorting order** (like `HIGH > MEDIUM > LOW` for priority, and `OPEN > IN_PROGRESS > RESOLVED > CLOSED` for status)? By default Prisma sorts alphabetically, which may not match how an issue tracker usually works.

Ah! That comment might be a bit misleading if you don’t know how the DB stores enum values. Let me clarify.

In **Prisma / PostgreSQL / most SQL DBs**, enums are stored in **the order you define them** in the schema. For your enums:

```ts
enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

- `LOW` = 0
- `MEDIUM` = 1
- `HIGH` = 2
- `URGENT` = 3

Similarly, for `Status`:

```ts
enum Status {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}
```

- `OPEN` = 0
- `IN_PROGRESS` = 1
- `RESOLVED` = 2
- `CLOSED` = 3

---

### How `asc` and `desc` works

- `asc` → sorts **from lowest enum value to highest**.

  - For `Priority`: `LOW → MEDIUM → HIGH → URGENT`
  - For `Status`: `OPEN → IN_PROGRESS → RESOLVED → CLOSED`

- `desc` → sorts **from highest enum value to lowest**.

  - For `Priority`: `URGENT → HIGH → MEDIUM → LOW`
  - For `Status`: `CLOSED → RESOLVED → IN_PROGRESS → OPEN`

So, when you write:

```ts
sortBy = 'priority';
order = 'asc';
```

You are telling the DB: "Give me the issues from `LOW` priority to `URGENT` priority."

If you want **highest priority first**, you would use `order = 'desc'`.

---

If you want, I can rewrite your `handleSort` function **so `priority` and `status` default to descending (most urgent / latest status first)** instead of ascending. This is usually what users expect in an issues list.

Do you want me to do that?
