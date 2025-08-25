"use client";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Please enter your new password below."
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
