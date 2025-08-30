import { Issue } from '@/generated/prisma';
import { UserType } from '@/types/auth';

export type IssuesResponse = {
  success: boolean;
  message: string;
  data?: Issue[];
  errors?: Record<string, string[]>;
  error?: string;
};

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type Status = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export interface IssueType {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: string | null;
  dueDate: Date | null;
  labels: string[];
  createdAt: Date;
  updatedAt: Date;
  user: UserType;
}

export type IssueResponse = {
  success: boolean;
  message: string;
  data?: IssueType;
  errors?: Record<string, string[]>;
  error?: string;
};
