'use client';

import { deleteIssueById } from '@/app/(issues)/issues/action';
import { IssuePageLayout } from '@/components/features/issues/IssuePageLayout';
import { IssueType } from '@/dal/issues/issue.type';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function IssueDetail({ issue }: { issue: IssueType | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const issueId = issue?.id;

  if (!issueId) {
    return <div>Issue not found</div>;
  }

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

  return (
    <IssuePageLayout title={`Issue #ISS-${issueId.slice(0, 6)}`} subtitle="Detailed view of the issue">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <button
                onClick={() => router.push('/issues')}
                className="p-2 border  border-gray-300 dark:border-gray-600 bg-background hover:bg-gray-50 dark:hover:bg-gray-800 text-foreground rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">#ISS-{issueId.slice(0, 6)}</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">{issue.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
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
          <div className="flex space-x-2">
            <button
              onClick={() => router.push(`/issues/${issueId}/edit`)}
              className="px-3 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 bg-background hover:bg-gray-50 dark:hover:bg-gray-800 text-foreground rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
            <button
              onClick={() => handleDelete(issueId)}
              className="px-3 py-2 text-sm font-medium border border-red-300 dark:border-red-600 bg-background hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Description</h2>
          <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
            <p className="whitespace-pre-wrap">{issue.description}</p>
          </div>
        </div>

        {/* Issue Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-md font-semibold text-foreground mb-4">Issue Information</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</dt>
                <dd className="mt-1">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200 rounded-full">
                    {issue.priority}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="mt-1">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 rounded-full">
                    {issue.status}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Assignee</dt>
                <dd className="mt-1 text-sm text-foreground">{issue.assignee ?? ''}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</dt>
                <dd className="mt-1 text-sm text-foreground">{format(issue.dueDate ?? '--', 'MMM dd, yyyy')}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-md font-semibold text-foreground mb-4">Timeline</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
                <dd className="mt-1 text-sm text-foreground">{format(issue.createdAt, 'MMM dd, yyyy')}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</dt>
                <dd className="mt-1 text-sm text-foreground">{issue.user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
                <dd className="mt-1 text-sm text-foreground">{format(issue.updatedAt, 'MMM dd, yyyy')}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Labels Section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-md font-semibold text-foreground mb-3">Labels</h3>
          <div className="flex flex-wrap gap-2">
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

        {/* Navigation Links */}
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-center space-x-4 text-sm">
            <button
              type="button"
              onClick={() => router.push('/issues')}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              All Issues
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button
              type="button"
              onClick={() => router.push('/issues/create')}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Create New
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button
              type="button"
              onClick={() => router.push(`/issues/${issueId}/edit`)}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Edit Issue
            </button>
          </div>
        </div>
      </div>
    </IssuePageLayout>
  );
}
