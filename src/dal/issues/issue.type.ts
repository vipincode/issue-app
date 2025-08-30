import { Issue } from '@/generated/prisma';
import { UserType } from '@/types/auth';

export interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type IssuesResponse = {
  success: boolean;
  message: string;
  data?: Issue[];
  pagination?: Pagination;
  errors?: Record<string, string[]>;
  error?: string;
};

export type SortBy = 'status' | 'priority' | 'createdAt';
export type Order = 'asc' | 'desc';

export type SortOptions =
  | { sortBy: 'status'; order?: 'asc' | 'desc' }
  | { sortBy: 'priority'; order?: 'asc' | 'desc' }
  | { sortBy: 'createdAt'; order?: 'asc' | 'desc' }; // newest/oldest

export interface GetIssuesOptions {
  sort?: SortOptions;
  page?: number; // current page number
  pageSize?: number; // number of items per page
  status?: Status;
}

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
