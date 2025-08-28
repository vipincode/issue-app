'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Authentication</h4>
            <div className="space-y-2">
              <Button
                variant="link"
                onClick={() => router.push('/login')}
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                Login
              </Button>
              <Button
                variant="link"
                onClick={() => router.push('/register')}
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                Register
              </Button>
              <Button
                variant="link"
                onClick={() => router.push('/forgot-password')}
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                Forgot Password
              </Button>
              <Button
                variant="link"
                onClick={() => router.push('/reset-password?token=demo-token')}
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                Reset Password
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Issue Management</h4>
            <div className="space-y-2">
              <Button
                variant="link"
                onClick={() => router.push('/issues')}
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                All Issues
              </Button>
              <Button
                variant="link"
                onClick={() => router.push('/issues/create')}
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                Create Issue
              </Button>
              <Button
                variant="link"
                onClick={() => router.push('/issues/ISS-001')}
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                View Sample Issue
              </Button>
              <Button
                variant="link"
                onClick={() => router.push('/issues/ISS-001/edit')}
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                Edit Issue
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Platform</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>Built with Next.js & TypeScript</p>
              <p>Responsive Design</p>
              <p>Dark Mode Support</p>
              <p>Accessibility Focused</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Issue Management System. A comprehensive platform for project management and team collaboration.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
