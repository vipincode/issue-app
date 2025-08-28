"use client";

import { LoginForm } from "@/components/forms/LoginForm";
import { AuthLayout } from "@/components/features/users/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Welcome back! Please enter your details."
    >
      <LoginForm />
    </AuthLayout>
  );
}
