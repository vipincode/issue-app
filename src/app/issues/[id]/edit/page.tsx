"use client";

import { useRouter, useParams } from "next/navigation";
import { IssuePageLayout } from "@/components/issues/IssuePageLayout";

export default function UpdateIssuePage() {
  const router = useRouter();
  const params = useParams();
  const issueId = params.id as string;

  return (
    <IssuePageLayout
      title="Edit Issue"
      subtitle={`Update issue #${issueId} details`}
    >
      <form className="space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Editing issue #{issueId}
          </p>
        </div>

        {/* Title Field */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-foreground"
          >
            Issue Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue="Login page not responsive on mobile devices"
            className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of the issue"
          />
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-foreground"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            defaultValue="The login form elements are not properly aligned on mobile screens smaller than 768px. The submit button is cut off and the input fields overlap with the header.

Steps to reproduce:
1. Open the login page on a mobile device
2. Try to scroll down to see the submit button
3. Notice the form fields are not properly sized

Expected behavior: The form should be fully visible and properly aligned on all screen sizes."
            className="w-full px-3 py-2 border rounded-lg text-sm resize-vertical bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Detailed description of the issue"
          />
        </div>

        {/* Priority and Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-foreground"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue="high"
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-foreground"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue="open"
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Assignee and Due Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="assignee"
              className="block text-sm font-medium text-foreground"
            >
              Assignee
            </label>
            <input
              id="assignee"
              name="assignee"
              type="email"
              defaultValue="jane.smith@example.com"
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="user@example.com"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Optional - leave empty for unassigned
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-foreground"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              defaultValue="2024-01-20"
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Optional - set a target completion date
            </p>
          </div>
        </div>

        {/* Labels Field */}
        <div className="space-y-2">
          <label
            htmlFor="labels"
            className="block text-sm font-medium text-foreground"
          >
            Labels
          </label>
          <input
            id="labels"
            name="labels"
            type="text"
            defaultValue="bug, mobile, ui"
            className="w-full px-3 py-2 border rounded-lg text-sm bg-background text-foreground border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="bug, feature, urgent"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Comma-separated tags to categorize the issue
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push(`/issues/${issueId}`)}
            className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 bg-background hover:bg-gray-50 dark:hover:bg-gray-800 text-foreground rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Issue
          </button>
        </div>

        {/* Navigation Links */}
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-center space-x-4 text-sm">
            <button
              type="button"
              onClick={() => router.push(`/issues/${issueId}`)}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View Issue
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button
              type="button"
              onClick={() => router.push("/issues")}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              All Issues
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button
              type="button"
              onClick={() => router.push(`/issues/${issueId}/delete`)}
              className="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
            >
              Delete Issue
            </button>
          </div>
        </div>
      </form>
    </IssuePageLayout>
  );
}
