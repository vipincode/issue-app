import { prisma } from '@/lib/prisma';
import { Issue } from '@/schemas/issue.schema';

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

export const getAllIssue = async () => {
  try {
    const issues = await prisma.issue.findMany();
    return issues;
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
};
