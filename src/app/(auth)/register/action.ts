'use server';

import { createUser, getUserByEmail } from '@/dal/users/user.dal';
import { ActionResponse } from '@/dal/users/user.types';
import { createSession } from '@/lib/auth';
import { mockDelay } from '@/lib/utils';
import { User, UserSchema } from '@/schemas/user.schema';

export const register = async (data: User): Promise<ActionResponse> => {
  try {
    // Add a small delay to simulate network latency
    await mockDelay(700);

    // Validate with Zod
    const validateResult = UserSchema.safeParse(data);
    if (!validateResult.success) {
      return {
        success: false,
        message: 'User registration failed',
        errors: validateResult.error.flatten().fieldErrors,
      };
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return {
        success: false,
        message: 'Email is already registered',
        errors: {
          email: ['Email is already registered'],
        },
      };
    }

    // Create new user
    const user = await createUser(data);
    if (!user) {
      return {
        success: false,
        message: 'User registration failed',
        error: 'Failed to create user',
      };
    }

    // Create session for the newly registered user
    await createSession(user.id);

    return {
      success: true,
      message: 'User registered successfully',
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      message: 'User registration failed',
      success: false,
    };
  }
};
