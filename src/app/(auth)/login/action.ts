'use server';

import { getUserByEmail } from '@/dal/users/user.dal';
import { ActionResponse } from '@/dal/users/user.types';
import { mockDelay } from '@/lib/utils';
import { Login, LoginSchema } from '@/schemas/user.schema';
import { createSession, verifyPassword } from '@/lib/auth';
import { deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { routes } from '@/lib/routes';

export const login = async (data: Login): Promise<ActionResponse> => {
  try {
    // Add a small delay to simulate network latency
    await mockDelay(700);

    // Validate data with zod
    const validationResult = LoginSchema.safeParse(data);

    if (validationResult.success === false) {
      return {
        success: false,
        message: 'Invalid login data',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Find user by email
    const user = await getUserByEmail(data.email);

    if (!user) {
      return {
        success: false,
        message: 'User not found',
        errors: {
          email: ['Invalid email or password'],
        },
      };
    }

    // Verify password
    const isPasswordValid = await verifyPassword(data.password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password',
        errors: {
          email: ['Invalid email or password'],
          password: ['Invalid email or password'],
        },
      };
    }

    // Create session
    await createSession(user.id);

    return { success: true, message: 'Login successful' };
  } catch (error) {
    return { success: false, message: 'An error occurred while signing in', error: 'Login failed' };
  }
};

// Logout

export const logout = async () => {
  try {
    await mockDelay(300);
    await deleteSession();
  } catch (error) {
    console.error('Logout failed:', error);
    throw new Error('Logout failed');
  } finally {
    redirect(routes.login);
  }
};
