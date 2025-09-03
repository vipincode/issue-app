import z from 'zod';

export const issueSchema = z.object({
  title: z
    .string()
    .min(2, { error: 'Title must have at least 2 characters' })
    .max(100, { error: 'Title can have at most 100 characters' }),
  description: z
    .string()
    .min(10, { error: 'Description must be at least 10 characters' })
    .max(1000, { error: 'Description can be at most 1000 characters' }),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'], {
    error: () => ({ message: 'Invalid status selected' }),
  }),
  assignee: z.email({ pattern: z.regexes.email, error: 'Invalid email address' }),
  dueDate: z.date().refine((date) => date >= new Date(), {
    error: 'Due date cannot be in the past',
  }),
  labels: z
    .array(z.string().min(2, 'Each label must have at least 2 characters').max(100))
    .min(1, 'At least one label is required'),
});

export type Issue = z.infer<typeof issueSchema>;
