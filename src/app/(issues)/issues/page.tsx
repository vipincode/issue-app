import IssuesList from '@/components/features/issues/issue-list';
import { getIssues } from './action';
import { toast } from 'sonner';

export default async function IssuesListPage() {
  const issues = await getIssues();

  if (!issues.success || !issues.data) {
    toast.error(issues.message || issues.error || 'Failed to load issues');
    return <div>No issues found.</div>;
  }

  return <IssuesList issues={issues.data} />;
}
