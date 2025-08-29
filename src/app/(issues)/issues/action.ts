'use server';

import { createIssue, getAllIssue } from '@/dal/issues/issue.dal';
import { IssuesResponse } from '@/dal/issues/issue.type';
import { getCurrentUser } from '@/dal/users/user.dal';
import { mockDelay } from '@/lib/utils';
import { Issue, issueSchema } from '@/schemas/issue.schema';

export const issue = async (data: Issue): Promise<IssuesResponse> => {
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

    return { success: true, message: 'Issue created successfully', data: [result] };
  } catch (error) {
    console.error('Error creating issue:', error);
    return {
      success: false,
      message: 'An error occurred while creating the issue',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const getIssues = async (): Promise<IssuesResponse> => {
  try {
    const result = await getAllIssue();

    if (!result || result.length === 0) {
      return {
        success: true,
        message: 'No issues found',
        data: [],
      };
    }
    return {
      success: true,
      message: 'Issues fetched successfully',
      data: result,
    };
  } catch (error) {
    console.error('Error fetching issues:', error);
    return {
      success: false,
      message: 'An error occurred while fetching issues',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
