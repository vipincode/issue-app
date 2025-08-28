'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const issueFeatures = [
  {
    title: 'View All Issues',
    description: 'Browse and filter through all project issues with advanced search.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    href: '/issues',
    color: 'blue',
  },
  {
    title: 'Create Issue',
    description: 'Report new issues with detailed forms and priority settings.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    href: '/issues/create',
    color: 'green',
  },
  {
    title: 'View Issue Details',
    description: 'See comprehensive issue information with timeline and status.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    href: '/issues/ISS-001',
    color: 'indigo',
  },
  {
    title: 'Edit Issue',
    description: 'Update issue details, status, priority, and assignments.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    href: '/issues/ISS-001/edit',
    color: 'yellow',
  },
  {
    title: 'Delete Issue',
    description: 'Safely remove issues with confirmation and audit trail.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
    href: '/issues/ISS-001/delete',
    color: 'red',
  },
];

const getIconColorClasses = (color: string) => {
  const colors = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    purple: 'text-purple-600 dark:text-purple-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    red: 'text-red-600 dark:text-red-400',
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

const getIconBgClasses = (color: string) => {
  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-900/20',
    green: 'bg-green-100 dark:bg-green-900/20',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/20',
    purple: 'bg-purple-100 dark:bg-purple-900/20',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/20',
    red: 'bg-red-100 dark:bg-red-900/20',
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

const IssueFeatureManagement = () => {
  const router = useRouter();

  return (
    <section className="mb-16 space-y-12">
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold tracking-tight">Issue Management</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Complete CRUD operations for issue tracking with advanced filtering, priority management, and team
          collaboration features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issueFeatures.map((feature) => (
          <Card
            key={feature.title}
            className="cursor-pointer transition-all hover:shadow-lg group"
            onClick={() => router.push(feature.href)}
          >
            <CardHeader className="space-y-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconBgClasses(feature.color)}`}
              >
                <div className={getIconColorClasses(feature.color)}>{feature.icon}</div>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
              <div className="flex items-center text-sm text-primary group-hover:text-primary/80 transition-colors">
                <span>Explore</span>
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default IssueFeatureManagement;
