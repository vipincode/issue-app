"use client";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join us today! Please fill in your information."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
