"use client";

import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import type { ForgotPasswordFormData, AuthPage } from "@/types/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would send reset email via your backend
      console.log("Password reset email sent to:", data.email);

      // The form component handles the success state internally
    } catch (error) {
      throw new Error("Failed to send reset email");
    }
  };

  const handleNavigate = (page: AuthPage) => {
    switch (page) {
      case "login":
        router.push("/login");
        break;
      case "register":
        router.push("/register");
        break;
      case "reset-password":
        router.push("/reset-password");
        break;
      default:
        router.push("/forgot-password");
    }
  };

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="No worries, we'll send you reset instructions."
    >
      <ForgotPasswordForm
        onNavigate={handleNavigate}
        onSubmit={handleForgotPassword}
      />
    </AuthLayout>
  );
}
