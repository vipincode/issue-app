'use client';

import { useRouter, useParams } from 'next/navigation';
import { IssuePageLayout } from '@/components/features/issues/IssuePageLayout';

export default function GetIssuePage() {
  const router = useRouter();
  const params = useParams();
  const issueId = params.id as string;

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
            <h1 className="text-2xl font-bold text-foreground mb-4">Login page not responsive on mobile devices</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200 rounded-full">
                High Priority
              </span>
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 rounded-full">
                Open
              </span>
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full">
                bug
              </span>
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full">
                mobile
              </span>
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full">
                ui
              </span>
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
              onClick={() => router.push(`/issues/${issueId}/delete`)}
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
            <p className="whitespace-pre-wrap">
              The login form elements are not properly aligned on mobile screens smaller than 768px. The submit button
              is cut off and the input fields overlap with the header. Steps to reproduce: 1. Open the login page on a
              mobile device 2. Try to scroll down to see the submit button 3. Notice the form fields are not properly
              sized Expected behavior: The form should be fully visible and properly aligned on all screen sizes.
            </p>
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
                    High
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="mt-1">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 rounded-full">
                    Open
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Assignee</dt>
                <dd className="mt-1 text-sm text-foreground">jane.smith@example.com</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</dt>
                <dd className="mt-1 text-sm text-foreground">Jan 20, 2024</dd>
              </div>
            </dl>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-md font-semibold text-foreground mb-4">Timeline</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
                <dd className="mt-1 text-sm text-foreground">Jan 15, 2024 at 10:30 AM</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</dt>
                <dd className="mt-1 text-sm text-foreground">john.doe@example.com</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
                <dd className="mt-1 text-sm text-foreground">Jan 15, 2024 at 10:30 AM</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Labels Section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-md font-semibold text-foreground mb-3">Labels</h3>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full">
              bug
            </span>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full">
              mobile
            </span>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full">
              ui
            </span>
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
