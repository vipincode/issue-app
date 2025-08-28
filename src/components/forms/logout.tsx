'use client';

import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/(auth)/login/action';
import { LogOutIcon } from 'lucide-react';

const Logout = () => {
  const [isPending, startTransition] = useTransition();
  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };
  return (
    <Button disabled={isPending} onClick={handleLogout}>
      <LogOutIcon size={20} className="mr-2" />
      <span>{isPending ? 'Signing out...' : 'Sign Out'}</span>
    </Button>
  );
};

export default Logout;
