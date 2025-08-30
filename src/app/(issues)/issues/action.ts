'use server';

import { createIssue, deleteIssue, getAllIssue, getIssueById, updateIssue } from '@/dal/issues/issue.dal';
import { GetIssuesOptions, IssueResponse, IssuesResponse } from '@/dal/issues/issue.type';
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
        message: 'Unauthorized access',
        error: 'Unauthorized',
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

export const getIssues = async ({
  page = 1,
  pageSize = 10,
  sort,
  status,
}: GetIssuesOptions): Promise<IssuesResponse> => {
  try {
    const result = await getAllIssue({ page, pageSize, sort, status });

    if (!result || result.data.length === 0) {
      return {
        success: true,
        message: 'No issues found',
        data: [],
        pagination: result?.pagination ?? {
          total: 0,
          page,
          pageSize,
          totalPages: 0,
        },
      };
    }

    return {
      success: true,
      message: 'Issues fetched successfully',
      data: result.data,
      pagination: result.pagination,
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

export const getIssue = async (id: string): Promise<IssueResponse> => {
  try {
    await mockDelay(500);
    const issue = await getIssueById(id);
    if (!issue) {
      return {
        success: false,
        message: 'Issue not found',
      };
    }
    return {
      success: true,
      message: 'Issue fetched successfully',
      data: issue,
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while fetching the issue',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const update = async (id: string, data: Partial<Issue>): Promise<IssuesResponse> => {
  try {
    await mockDelay(700);

    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized access',
        error: 'Unauthorized',
      };
    }

    const validationResult = issueSchema.partial().safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Invalid issue data',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    /**
     * After Zod validation, validatedData is typed as Partial<Issue>.
     * Some fields might be missing (undefined).
     * Prisma’s update() requires you to pass only the fields you actually want to update.
     * So you’re manually building an updateData object that includes only the defined fields.
     */

    const validatedData = validationResult.data;

    // ✅ Build updateData with only defined fields
    const updateData: Partial<Issue> = Object.fromEntries(
      Object.entries(validatedData).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        message: 'No fields provided for update',
      };
    }

    const issue = await updateIssue(id, updateData);
    if (!issue) {
      return {
        success: false,
        message: 'Failed to update issue',
      };
    }

    return {
      success: true,
      message: 'Issue updated successfully',
      data: [issue],
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while updating the issue',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const deleteIssueById = async (id: string): Promise<IssuesResponse> => {
  try {
    await mockDelay(700);

    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized access',
        error: 'Unauthorized',
      };
    }

    const issue = await deleteIssue(id);
    if (!issue) {
      return {
        success: false,
        message: 'Failed to delete issue',
      };
    }

    return {
      success: true,
      message: 'Issue deleted successfully',
      data: [issue],
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while deleting the issue',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
