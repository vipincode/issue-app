import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { User } from '@/generated/prisma';

interface MainLayoutWrapperProps {
  user: User | null;
  children: React.ReactNode;
}

const MainLayoutWrapper = ({ children, user }: MainLayoutWrapperProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayoutWrapper;
