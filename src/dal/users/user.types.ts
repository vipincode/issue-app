import { Issue } from '@/schemas/issue.schema';

// JWT types
export interface JWTPayload {
  userId: string;
  [key: string]: string | number | boolean | null | undefined;
}

// Action response type
export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};
