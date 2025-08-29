import CreateIssue from '@/components/features/issues/create-issue';
import { getCurrentUser } from '@/dal/users/user.dal';
import { toast } from 'sonner';

const CreateIssuePage = async () => {
  return <CreateIssue />;
};

export default CreateIssuePage;
