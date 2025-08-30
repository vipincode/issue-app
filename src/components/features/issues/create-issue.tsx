'use client';

import { useRouter } from 'next/navigation';
import { IssuePageLayout } from '@/components/features/issues/IssuePageLayout';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Issue, issueSchema } from '@/schemas/issue.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { routes } from '@/lib/routes';
import { issue } from '@/app/(issues)/issues/action';
import React from 'react';

const CreateIssue = () => {
  const router = useRouter();

  const form = useForm<Issue>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'LOW',
      status: 'OPEN',
      assignee: '',
      dueDate: new Date(),
      labels: [],
    },
  });

  const onSubmit = async (data: Issue) => {
    try {
      const result = await issue(data);
      if (result.success) {
        toast.success('Issue created successfully');
        router.push(routes.issues.home);
      }
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  return (
    <IssuePageLayout title="Create New Issue" subtitle="Fill out the form below to create a new issue">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Title*</FormLabel>
                <FormControl>
                  <Input placeholder="Issue title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Detailed description of the issue, including steps to reproduce if applicable"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Priority and Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority*</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="CRITICAL">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OPEN">Open</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="RESOLVED">Resolved</SelectItem>
                        <SelectItem value="CLOSED">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Assignee and Due Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Labels Field */}
          <FormField
            control={form.control}
            name="labels"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Labels</FormLabel>
                <FormControl>
                  <Input
                    placeholder="bug, feature, urgent"
                    value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                    onChange={(e) => {
                      // let the user type freely
                      field.onChange(e.target.value);
                    }}
                    onBlur={(e) => {
                      // when leaving the field, convert string → array
                      const arr = e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean);
                      field.onChange(arr);
                    }}
                  />
                </FormControl>
                <FormDescription>Comma-separated tags to categorize the issue</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" onClick={() => router.push('/issues')} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Creating...' : 'Create Issue'}
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <Button type="button" onClick={() => router.push('/issues')} variant="link">
                View All Issues
              </Button>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <Button type="button" onClick={() => router.push(routes.home)} variant="link">
                Back to home
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </IssuePageLayout>
  );
};

export default CreateIssue;
