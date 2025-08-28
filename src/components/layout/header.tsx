'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import Logout from '../forms/logout';
import { Bug } from 'lucide-react';
import Link from 'next/link';
import { User } from '@/generated/prisma';

const Header = ({ user }: { user: User | null }) => {
  const router = useRouter();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link href={routes.home}>
            <div className="flex items-center gap-3 flex-row">
              <Bug size={48} />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Issue Management System</h1>
                <p className="text-sm text-muted-foreground">Complete authentication and issue tracking solution</p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {!user?.id && (
              <Button variant="outline" onClick={() => router.push(routes.login)}>
                Sign In
              </Button>
            )}
            <Button onClick={() => router.push(routes.register)}>Get Started</Button>
            {user?.id && <Logout />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
