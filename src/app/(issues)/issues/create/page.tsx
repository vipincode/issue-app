import CreateIssue from '@/components/features/issues/create-issue';
import { getCurrentUser } from '@/dal/users/user.dal';
import { toast } from 'sonner';

const CreateIssuePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return toast.error('You must be logged in to create an issue.');
  }

  return <CreateIssue userId={user.id} />;
};

export default CreateIssuePage;
