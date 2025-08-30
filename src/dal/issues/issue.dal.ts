import { prisma } from '@/lib/prisma';
import { Issue } from '@/schemas/issue.schema';
import { cache } from 'react';
import { GetIssuesOptions } from './issue.type';
import { Prisma } from '@/generated/prisma';

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

export const getAllIssue = cache(async ({ page = 1, pageSize = 10, sort, status }: GetIssuesOptions) => {
  try {
    let orderBy: Prisma.IssueOrderByWithRelationInput | Prisma.IssueOrderByWithRelationInput[] | undefined;

    if (sort && sort.sortBy) {
      switch (sort.sortBy) {
        case 'status':
          orderBy = { status: sort.order || 'asc' };
          break;
        case 'priority':
          orderBy = { priority: sort.order || 'asc' };
          break;
        case 'createdAt':
          orderBy = { createdAt: sort.order || 'desc' }; // default newest
          break;
      }
    } else {
      orderBy = { createdAt: 'desc' };
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [issues, totalCount] = await Promise.all([
      prisma.issue.findMany({
        where: status ? { status } : {},
        orderBy,
        skip,
        take,
      }),
      prisma.issue.count({ where: status ? { status } : {} }),
    ]);

    return {
      data: issues,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching issues:', error);
    return {
      data: [],
      pagination: { total: 0, page: 1, pageSize: 10, totalPages: 0 },
    };
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
