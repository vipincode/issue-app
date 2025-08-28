'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const QuickStartGuide = () => {
  const router = useRouter();

  return (
    <section className="mb-16 space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">Get Started in 3 Easy Steps</h3>
        <p className="text-muted-foreground">Follow these simple steps to begin managing your projects effectively.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            1
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Create Account</h4>
            <p className="text-muted-foreground">
              Sign up with your email and create a secure password to get started.
            </p>
          </div>
          <Button variant="link" onClick={() => router.push('/register')} className="p-0 h-auto font-medium">
            Register Now →
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            2
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Create Issues</h4>
            <p className="text-muted-foreground">
              Report bugs, request features, or track tasks with detailed issue forms.
            </p>
          </div>
          <Button variant="link" onClick={() => router.push('/issues/create')} className="p-0 h-auto font-medium">
            Create Issue →
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            3
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Track Progress</h4>
            <p className="text-muted-foreground">
              Monitor issue status, assign team members, and manage priorities effectively.
            </p>
          </div>
          <Button variant="link" onClick={() => router.push('/issues')} className="p-0 h-auto font-medium">
            View Issues →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuickStartGuide;
