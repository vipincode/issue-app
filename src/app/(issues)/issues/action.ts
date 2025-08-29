'use server';

import { createIssue } from '@/dal/issues/issue.dal';
import { ActionResponse } from '@/dal/users/user.types';
import { mockDelay } from '@/lib/utils';
import { Issue, issueSchema } from '@/schemas/issue.schema';

export const issue = async (data: Issue, userId: string): Promise<ActionResponse> => {
  try {
    await mockDelay(700);

    const validationResult = issueSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Invalid issue data',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const result = await createIssue(data, userId);
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
