import { prisma } from '@/lib/prisma';
import { mockDelay } from '@/lib/utils';
import { Issue } from '@/schemas/issue.schema';
import { cache } from 'react';

export const createIssue = async (data: Issue, userId: string) => {
  try {
    const issue = await prisma.issue.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        assignee: data.assignee || null,
        dueDate: data.dueDate,
        labels: data.labels,
        userId: userId,
      },
    });
    return issue;
  } catch (error) {
    console.error('Error creating issue:', error);
    return null;
  }
};

export const getAllIssue = cache(async () => {
  try {
    const issues = await prisma.issue.findMany();
    return issues;
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
});

export const getIssueById = cache(async (id: string) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: id },
      include: {
        user: true,
      },
    });
    return issue;
  } catch (error) {
    console.error('Error fetching issue:', error);
    return null;
  }
});

export const updateIssue = async (id: string, data: Partial<Issue>) => {
  try {
    const issue = await prisma.issue.update({
      where: { id: id },
      data: data,
    });
    return issue;
  } catch (error) {
    console.error('Error updating issue:', error);
    return null;
  }
};

export const deleteIssue = async (id: string) => {
  try {
    const issue = await prisma.issue.delete({
      where: { id: id },
    });
    return issue;
  } catch (error) {
    console.error('Error deleting issue:', error);
    return null;
  }
};
