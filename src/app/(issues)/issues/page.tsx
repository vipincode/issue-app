import IssuesList from '@/components/features/issues/issue-list';
import { getIssues } from './action';
import { toast } from 'sonner';
import { Order, SortBy, Status } from '@/dal/issues/issue.type';

export default async function IssuesListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: Status; sortBy: SortBy; order: Order }>;
}) {
  const page = Number((await searchParams).page) || 1;
  const { sortBy, order, status } = await searchParams;

  const issues = await getIssues({ page, status, sort: { sortBy, order } });

  if (!issues.success || !issues.data) {
    toast.error(issues.message || issues.error || 'Failed to load issues');
    return <div>No issues found.</div>;
  }
  return <IssuesList issues={issues.data} pagination={issues.pagination} />;
}
