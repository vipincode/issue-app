'use client';

import { useRouter } from 'next/navigation';
import { IssuePageLayout } from '@/components/features/issues/IssuePageLayout';
import { Issue, issueSchema } from '@/schemas/issue.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import { IssueType } from '@/dal/issues/issue.type';
import { Textarea } from '@/components/ui/textarea';
import { update } from '@/app/(issues)/issues/action';
import { toast } from 'sonner';

export default function UpdateIssue({ issue }: { issue: IssueType }) {
  const router = useRouter();

  const form = useForm<Issue>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue.title ?? '',
      description: issue.description ?? '',
      priority: issue.priority ?? 'MEDIUM',
      status: issue.status ?? 'OPEN',
      assignee: issue.assignee ?? '',
      dueDate: issue.dueDate ? new Date(issue.dueDate) : undefined,
      labels: issue.labels ?? [],
    },
  });

  const onSubmit = async (data: Issue) => {
    try {
      const response = await update(issue.id, data);
      if (response.success) {
        toast.success('Issue updated successfully');
        router.push(routes.issues.home);
      }
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  return (
    <IssuePageLayout title="Edit Issue" subtitle={`Update issue #${issue.id} details`}>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-600 dark:text-blue-400 uppercase">Editing issue #{issue.id.slice(0, 6)}</p>
          </div>

          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Title *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Brief description of the issue" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Detailed description of the issue" />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="URGENT">Urgent</SelectItem>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={(e) => {
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
              {form.formState.isSubmitting ? 'Updating...' : 'Update Issue'}
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
}

// 'use client';

// import { useRouter, useParams } from 'next/navigation';
// import { IssuePageLayout } from '@/components/features/issues/IssuePageLayout';
// import { Issue, issueSchema } from '@/schemas/issue.schema';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { DatePicker } from '@/components/ui/date-picker';
// import { Button } from '@/components/ui/button';
// import { routes } from '@/lib/routes';
// import { IssueType } from '@/dal/issues/issue.type';
// import { Textarea } from '@/components/ui/textarea';

// export default function UpdateIssue({ issue.id, issue }: { issue.id: string; issue: IssueType }) {
//   const router = useRouter();

//   const form = useForm<Issue>({
//     resolver: zodResolver(issueSchema),
//     defaultValues: {
//       title: '',
//       description: '',
//       priority: 'MEDIUM',
//       status: issue.status,
//       assignee: '',
//       labels: [],
//     },
//   });

//   const onSubmit = async (data: Issue) => {
//     console.log(data);
//   };

//   return (
//     <IssuePageLayout title="Edit Issue" subtitle={`Update issue #${issue.id} details`}>
//       <Form {...form}>
//         <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
//           {/* Info Banner */}
//           <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
//             <p className="text-sm text-blue-600 dark:text-blue-400 uppercase">Editing issue #{issue.id.slice(0, 6)}</p>
//           </div>

//           {/* Title Field */}
//           <FormField
//             control={form.control}
//             name="title"
//             render={() => (
//               <FormItem>
//                 <FormLabel> Issue Title *</FormLabel>
//                 <FormControl>
//                   <Input
//                     id="title"
//                     name="title"
//                     type="text"
//                     defaultValue={issue.title}
//                     placeholder="Brief description of the issue"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Description Field */}
//           <FormField
//             control={form.control}
//             name="description"
//             render={() => (
//               <FormItem>
//                 <FormLabel> Description *</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     defaultValue={issue.description}
//                     placeholder="Brief description of the issue"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Priority and Status Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="priority"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Priority*</FormLabel>
//                   <FormControl>
//                     <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select priority" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="LOW">Low</SelectItem>
//                         <SelectItem value="MEDIUM">Medium</SelectItem>
//                         <SelectItem value="HIGH">High</SelectItem>
//                         <SelectItem value="CRITICAL">Critical</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="status"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Status</FormLabel>
//                   <FormControl>
//                     <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="OPEN">Open</SelectItem>
//                         <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
//                         <SelectItem value="RESOLVED">Resolved</SelectItem>
//                         <SelectItem value="CLOSED">Closed</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Assignee and Due Date Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="assignee"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Assignee</FormLabel>
//                   <FormControl>
//                     <Input placeholder="user@example.com" defaultValue={issue.assignee ?? ''} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="dueDate"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Due Date</FormLabel>
//                   <FormControl>
//                     <DatePicker value={field.value} onChange={field.onChange} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Labels Field */}
//           <FormField
//             control={form.control}
//             name="labels"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Labels</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="bug, feature, urgent"
//                     value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
//                     defaultValue={Array.isArray(issue.labels) ? issue.labels.join(', ') : issue.labels || ''}
//                     onChange={(e) => {
//                       // let the user type freely
//                       field.onChange(e.target.value);
//                     }}
//                     onBlur={(e) => {
//                       // when leaving the field, convert string → array
//                       const arr = e.target.value
//                         .split(',')
//                         .map((s) => s.trim())
//                         .filter(Boolean);
//                       field.onChange(arr);
//                     }}
//                   />
//                 </FormControl>
//                 <FormDescription>Comma-separated tags to categorize the issue</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Action Buttons */}
//           <div className="flex justify-end space-x-3 pt-4">
//             <Button type="button" onClick={() => router.push('/issues')} variant="outline">
//               Cancel
//             </Button>
//             <Button type="submit" disabled={form.formState.isSubmitting}>
//               {form.formState.isSubmitting ? 'Creating...' : 'Create Issue'}
//             </Button>
//           </div>

//           {/* Navigation Links */}
//           <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex items-center justify-center space-x-4 text-sm">
//               <Button type="button" onClick={() => router.push('/issues')} variant="link">
//                 View All Issues
//               </Button>
//               <span className="text-gray-300 dark:text-gray-600">|</span>
//               <Button type="button" onClick={() => router.push(routes.home)} variant="link">
//                 Back to home
//               </Button>
//             </div>
//           </div>
//         </form>
//       </Form>
//     </IssuePageLayout>
//   );
// }
