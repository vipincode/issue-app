'use client';

import { useRouter } from 'next/navigation';
import { IssuePageLayout } from '@/components/features/issues/IssuePageLayout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getPriorityColor, getStatusColor } from '@/app/(issues)/issues/utils';
import { Issue } from '@/generated/prisma';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useTransition } from 'react';
import { deleteIssueById } from '@/app/(issues)/issues/action';
import { toast } from 'sonner';
import { Pagination, Status } from '@/dal/issues/issue.type';

interface IssuesListProps {
  issues: Issue[];
  pagination?: Pagination;
}

export default function IssuesList({ issues, pagination }: IssuesListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        const result = await deleteIssueById(id);

        if (!result.success) {
          throw new Error(result.error || 'Failed to delete issue');
        }

        toast.success('Issue deleted successfully');
        router.push(`/issues/${id}/delete`);
        router.refresh();
      } catch (error) {
        toast.error('Failed to delete issue');
        console.error('Error deleting issue:', error);
      }
    });
  };

  // ✅ Sorting function
  const handleSort = (value: string) => {
    let sortBy = 'createdAt';
    let order = 'desc';

    switch (value) {
      case 'newest':
        sortBy = 'createdAt';
        order = 'desc';
        break;
      case 'oldest':
        sortBy = 'createdAt';
        order = 'asc';
        break;
      case 'priority':
        sortBy = 'priority';
        order = 'asc';
        break;
      case 'status':
        sortBy = 'status';
        order = 'asc';
        break;
    }

    router.push(`/issues?page=1&sortBy=${sortBy}&order=${order}`);
    router.refresh();
  };

  // Filter function
  const handleFilter = (value: string) => {
    const statusValue = value.toUpperCase() as Status;

    // Default sorting depending on filter
    let sortBy: 'createdAt' | 'priority' | 'status' = 'createdAt';
    let order: 'asc' | 'desc' = 'desc';

    switch (statusValue) {
      case 'OPEN':
        sortBy = 'createdAt';
        order = 'desc';
        break;
      case 'IN_PROGRESS':
        sortBy = 'createdAt';
        order = 'asc';
        break;
      case 'RESOLVED':
        sortBy = 'createdAt';
        order = 'asc';
        break;
      case 'CLOSED':
        sortBy = 'priority';
        order = 'asc';
        break;
    }

    router.push(`/issues?page=1&status=${statusValue}&sortBy=${sortBy}&order=${order}`);
    router.refresh();
  };

  return (
    <IssuePageLayout title="Issues" subtitle="Manage and track all project issues">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Filter:</span>
              <Select onValueChange={handleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Issues" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort:</span>
              <Select onValueChange={handleSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Newest First" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={() => router.push('/issues/create')}>
            <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Issue
          </Button>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors cursor-pointer"
              onClick={() => router.push(`/issues/${issue.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm  uppercase font-medium text-gray-500 dark:text-gray-400">
                      #ISS-{issue.id.slice(0, 6)}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                        issue.priority
                      )}`}
                    >
                      {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        issue.status
                      )}`}
                    >
                      {issue.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-foreground mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                    {issue.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>{issue.assignee || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{format(issue.createdAt, 'PPP p')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {issue.labels.map((label) => (
                        <span
                          key={label}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/issues/${issue.id}/edit`);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(issue.id)}
                    disabled={isPending}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (when no issues) */}
        {issues.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-foreground mb-2">No issues found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Get started by creating your first issue.</p>
            <Button onClick={() => router.push('/issues/create')}>
              <Plus /> Create Issue
            </Button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {pagination?.page} - {pagination?.totalPages} of {pagination?.total} issues
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              disabled={!pagination || pagination.page === 1}
              onClick={() => router.push(`/issues?page=${pagination!.page - 1}`)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={!pagination || pagination.page === pagination.totalPages}
              onClick={() => router.push(`/issues?page=${pagination!.page + 1}`)}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <Button variant="link" type="button" onClick={() => router.push('/issues/create')}>
              Create New Issue
            </Button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Button variant="link" type="button" onClick={() => router.push('/home')}>
              Back to home
            </Button>
          </div>
        </div>
      </div>
    </IssuePageLayout>
  );
}
