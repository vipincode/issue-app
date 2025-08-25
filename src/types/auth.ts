export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type AuthPage =
  | "login"
  | "register"
  | "forgot-password"
  | "reset-password";
