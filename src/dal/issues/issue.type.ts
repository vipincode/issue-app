import { Issue } from '@/generated/prisma';

export type IssuesResponse = {
  success: boolean;
  message: string;
  data?: Issue[];
  errors?: Record<string, string[]>;
  error?: string;
};
