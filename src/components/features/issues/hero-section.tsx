'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="text-center mb-16 space-y-6">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Streamline Your Project Management</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A comprehensive platform featuring secure authentication and powerful issue tracking. Manage your projects
          efficiently with our intuitive interface and robust feature set.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg" onClick={() => router.push('/issues/create')} className="text-lg px-8 py-6">
          Create Your First Issue
        </Button>
        <Button variant="outline" size="lg" onClick={() => router.push('/issues')} className="text-lg px-8 py-6">
          Explore Issues
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
