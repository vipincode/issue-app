'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DeleteIssuePage = () => {
  const router = useRouter();

  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    if (countdown <= 0) {
      router.push('/issues');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <Card>
      <CardHeader className="flex-1">
        <CardTitle className="text-center text-green-600 dark:text-green-400">✓ Deletion Successful</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="space-y-2">
          <p className="text-muted-foreground">The issue has been permanently removed from your project.</p>
          <p className="text-sm text-muted-foreground">You will be automatically redirected to the issues list in:</p>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
            {countdown}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Redirecting to issues list...</p>
          <button onClick={() => router.push('/issues')} className="text-primary hover:underline text-sm font-medium">
            Go to issues list now
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeleteIssuePage;
