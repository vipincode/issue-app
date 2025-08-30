import UpdateIssue from '@/components/features/issues/edit-issue';
import { getIssueById } from '@/dal/issues/issue.dal';
import { getIssue } from '../../action';

export default async function UpdateIssuePage({ params }: { params: { id: string } }) {
  const issue = await getIssue(params.id);

  if (!issue.success || !issue.data) {
    return <div>Issue not found</div>;
  }

  return <UpdateIssue issue={issue.data} />;
}
