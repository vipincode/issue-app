Yes 💯 you can add **pagination** along with sorting in the same query. Prisma has built-in support for this using `skip` and `take`.

Here’s how you can extend your `getAllIssue` function:

```ts
import { prisma } from '@/lib/prisma';
import { cache } from 'react';

type SortOptions =
  | { sortBy: 'status'; order?: 'asc' | 'desc' }
  | { sortBy: 'priority'; order?: 'asc' | 'desc' }
  | { sortBy: 'createdAt'; order?: 'asc' | 'desc' } // newest/oldest
  | { sortBy: 'status_priority'; order?: 'asc' | 'desc' };

interface GetIssuesOptions {
  sort?: SortOptions;
  page?: number; // current page number
  pageSize?: number; // number of items per page
}

export const getAllIssue = cache(async ({ sort, page = 1, pageSize = 10 }: GetIssuesOptions = {}) => {
  try {
    let orderBy: any = undefined;

    if (sort) {
      switch (sort.sortBy) {
        case 'status':
          orderBy = { status: sort.order || 'asc' };
          break;
        case 'priority':
          orderBy = { priority: sort.order || 'asc' };
          break;
        case 'createdAt':
          orderBy = { createdAt: sort.order || 'desc' }; // default newest
          break;
        case 'status_priority':
          orderBy = [{ status: sort.order || 'asc' }, { priority: sort.order || 'asc' }];
          break;
      }
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [issues, totalCount] = await Promise.all([
      prisma.issue.findMany({
        orderBy,
        skip,
        take,
      }),
      prisma.issue.count(),
    ]);

    return {
      data: issues,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching issues:', error);
    return {
      data: [],
      pagination: { total: 0, page: 1, pageSize: 10, totalPages: 0 },
    };
  }
});
```

---

### Example usage:

```ts
// Default: page 1, 10 issues
const issues = await getAllIssue();

// Page 2, 5 issues per page
const paginated = await getAllIssue({ page: 2, pageSize: 5 });

// Sorted by newest first, page 1
const newestFirst = await getAllIssue({
  sort: { sortBy: 'createdAt', order: 'desc' },
  page: 1,
  pageSize: 10,
});

// Status + priority sorting, page 3
const sorted = await getAllIssue({
  sort: { sortBy: 'status_priority', order: 'asc' },
  page: 3,
  pageSize: 20,
});
```

---

⚡ This will return both:

- `data` → issues for the current page
- `pagination` → info for frontend pagination controls

---

Do you want me to also make the **`priority` and `status` sorting use a custom order** (e.g., `HIGH > MEDIUM > LOW`, `OPEN > IN_PROGRESS > RESOLVED > CLOSED`) instead of Prisma’s default **alphabetical order**?
