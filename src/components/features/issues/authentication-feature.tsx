'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const authFeatures = [
  {
    title: 'Login',
    description: 'Sign in to your existing account with email and password validation.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
    ),
    href: '/login',
    color: 'blue',
  },
  {
    title: 'Register',
    description: 'Create a new account with comprehensive form validation.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        />
      </svg>
    ),
    href: '/register',
    color: 'green',
  },
  {
    title: 'Forgot Password',
    description: 'Request a password reset link via email verification.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    href: '/forgot-password',
    color: 'yellow',
  },
  {
    title: 'Reset Password',
    description: 'Set a new password with secure validation requirements.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
        />
      </svg>
    ),
    href: '/reset-password?token=demo-token',
    color: 'purple',
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

const AuthenticationFeature = () => {
  const router = useRouter();

  return (
    <section className="mb-16 space-y-12">
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold tracking-tight">Authentication System</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Secure user authentication with comprehensive validation, password management, and user-friendly error
          handling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {authFeatures.map((feature) => (
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
                <span>Try it out</span>
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

export default AuthenticationFeature;
