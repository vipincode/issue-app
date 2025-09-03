import { getSession, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { mockDelay } from '@/lib/utils';
import { User } from '@/schemas/user.schema';
import { cache } from 'react';

export const createUser = async (data: Omit<User, 'confirmPassword'>) => {
  const hashedPassword = await hashPassword(data.password);
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;

  // Skip DB query during prerendering in production build
  // if (typeof window === 'undefined' && process.env.NEXT_PHASE === 'phase-production-build') {
  //   return null;
  // }

  await mockDelay(700);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      omit: {
        password: true,
      },
    });

    return user || null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
});

export const getUserByEmail = cache(async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
});
