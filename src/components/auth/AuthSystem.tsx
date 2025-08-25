"use client";

import { useState } from "react";
import { AuthLayout } from "./AuthLayout";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { ResetPasswordForm } from "./ResetPasswordForm";
import type {
  AuthPage,
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from "@/types/auth";

interface AuthSystemProps {
  initialPage?: AuthPage;
  resetToken?: string;
  onLogin?: (data: LoginFormData) => Promise<void>;
  onRegister?: (data: RegisterFormData) => Promise<void>;
  onForgotPassword?: (data: ForgotPasswordFormData) => Promise<void>;
  onResetPassword?: (data: ResetPasswordFormData) => Promise<void>;
}

export function AuthSystem({
  initialPage = "login",
  resetToken,
  onLogin,
  onRegister,
  onForgotPassword,
  onResetPassword,
}: AuthSystemProps) {
  const [currentPage, setCurrentPage] = useState<AuthPage>(
    resetToken ? "reset-password" : initialPage
  );

  const getPageConfig = () => {
    switch (currentPage) {
      case "login":
        return {
          title: "Sign in to your account",
          subtitle: "Welcome back! Please enter your details.",
          component: (
            <LoginForm onNavigate={setCurrentPage} onSubmit={onLogin} />
          ),
        };
      case "register":
        return {
          title: "Create your account",
          subtitle: "Join us today! Please fill in your information.",
          component: (
            <RegisterForm onNavigate={setCurrentPage} onSubmit={onRegister} />
          ),
        };
      case "forgot-password":
        return {
          title: "Forgot your password?",
          subtitle: "No worries, we'll send you reset instructions.",
          component: (
            <ForgotPasswordForm
              onNavigate={setCurrentPage}
              onSubmit={onForgotPassword}
            />
          ),
        };
      case "reset-password":
        return {
          title: "Reset your password",
          subtitle: "Please enter your new password below.",
          component: (
            <ResetPasswordForm
              onNavigate={setCurrentPage}
              onSubmit={onResetPassword}
              token={resetToken}
            />
          ),
        };
      default:
        return {
          title: "Sign in to your account",
          subtitle: "Welcome back! Please enter your details.",
          component: (
            <LoginForm onNavigate={setCurrentPage} onSubmit={onLogin} />
          ),
        };
    }
  };

  const { title, subtitle, component } = getPageConfig();

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      {component}
    </AuthLayout>
  );
}
