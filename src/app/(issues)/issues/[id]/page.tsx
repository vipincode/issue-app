import IssueDetail from '@/components/features/issues/issue-detail';
import { getIssue } from '../action';

export default async function GetIssuePage({ params }: { params: { id: string } }) {
  const issue = await getIssue(params.id);

  if (!issue.success || !issue.data) {
    return <div>Issue not found</div>;
  }

  console.log(issue.data);

  return <IssueDetail issue={issue.data} />;
}
