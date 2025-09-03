import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { getCurrentUser } from '@/dal/users/user.dal';
import React from 'react';

const IssuesLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <div className='className="min-h-screen bg-background"'>
      <Header user={user && user} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">{children}</main>
      <Footer />
    </div>
  );
};

export default IssuesLayout;
