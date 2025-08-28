'use client';

import { useRouter } from 'next/navigation';
import { IssuePageLayout } from '@/components/features/issues/IssuePageLayout';

export default function CreateIssuePage() {
  const router = useRouter();

  return (
    <IssuePageLayout title="Create New Issue" subtitle="Fill out the form below to create a new issue">
      <form className="space-y-6">
        {/* Title Field */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-foreground">
            Issue Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of the issue"
          />
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-foreground">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-vertical bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Detailed description of the issue, including steps to reproduce if applicable"
          />
        </div>

        {/* Priority and Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="priority" className="block text-sm font-medium text-foreground">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium" selected>
                Medium
              </option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium text-foreground">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="open" selected>
                Open
              </option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Assignee and Due Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="assignee" className="block text-sm font-medium text-foreground">
              Assignee
            </label>
            <input
              id="assignee"
              name="assignee"
              type="email"
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="user@example.com"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">Optional - leave empty for unassigned</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="dueDate" className="block text-sm font-medium text-foreground">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">Optional - set a target completion date</p>
          </div>
        </div>

        {/* Labels Field */}
        <div className="space-y-2">
          <label htmlFor="labels" className="block text-sm font-medium text-foreground">
            Labels
          </label>
          <input
            id="labels"
            name="labels"
            type="text"
            className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="bug, feature, urgent"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">Comma-separated tags to categorize the issue</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/issues')}
            className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 bg-background hover:bg-gray-50 dark:hover:bg-gray-800 text-foreground rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Issue
          </button>
        </div>

        {/* Navigation Links */}
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-center space-x-4 text-sm">
            <button
              type="button"
              onClick={() => router.push('/issues')}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View All Issues
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button
              type="button"
              onClick={() => router.push('/issues/ISS-001')}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View Sample Issue
            </button>
          </div>
        </div>
      </form>
    </IssuePageLayout>
  );
}
