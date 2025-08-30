import z from 'zod';

export const issueSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']),
  assignee: z.email({ pattern: z.regexes.email }),
  dueDate: z.date().min(new Date()),
  labels: z.array(z.string().min(2).max(100)),
});

export type Issue = z.infer<typeof issueSchema>;
