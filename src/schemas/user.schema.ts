import { z } from 'zod';

// Register User
export const UserSchema = z
  .object({
    email: z.email({ pattern: z.regexes.email }),
    name: z.string().min(2).max(100),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Register Login
export const LoginSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z.string().min(8).max(100),
});

// Forgot Password
export const ForgotPasswordSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
});

// Reset Password
export const ResetPasswordSchema = z.object({
  password: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100).optional(),
});

// Schema type
export type User = z.infer<typeof UserSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
