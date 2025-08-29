'use server';

import { createIssue } from '@/dal/issues/issue.dal';
import { getCurrentUser } from '@/dal/users/user.dal';
import { ActionResponse } from '@/dal/users/user.types';
import { mockDelay } from '@/lib/utils';
import { Issue, issueSchema } from '@/schemas/issue.schema';

export const issue = async (data: Issue): Promise<ActionResponse> => {
  try {
    await mockDelay(700);

    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'You must be logged in to create an issue.',
      };
    }

    const validationResult = issueSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Invalid issue data',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const result = await createIssue(data, user.id);
    if (!result) {
      return { success: false, message: 'Failed to create issue' };
    }

    return { success: true, message: 'Issue created successfully' };
  } catch (error) {
    console.error('Error creating issue:', error);
    return {
      success: false,
      message: 'An error occurred while creating the issue',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
