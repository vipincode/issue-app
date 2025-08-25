"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import type { ResetPasswordFormData, AuthPage } from "@/types/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would reset password via your backend using the token
      console.log("Password reset successful with token:", token);

      // The form component handles the success state and navigation internally
    } catch (error) {
      throw new Error("Failed to reset password");
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
      case "forgot-password":
        router.push("/forgot-password");
        break;
      default:
        router.push("/reset-password");
    }
  };

  // Show error if no token is provided
  if (!token) {
    return (
      <AuthLayout
        title="Invalid Reset Link"
        subtitle="The password reset link is invalid or has expired."
      >
        <div className="text-center space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-600 dark:text-red-400">
              This password reset link is invalid or has expired. Please request
              a new one.
            </p>
          </div>
          <button
            onClick={() => router.push("/forgot-password")}
            className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Request new reset link
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Please enter your new password below."
    >
      <ResetPasswordForm
        onNavigate={handleNavigate}
        onSubmit={handleResetPassword}
        token={token}
      />
    </AuthLayout>
  );
}
