"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import type { RegisterFormData, AuthPage } from "@/types/auth";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (data: RegisterFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would create the account with your backend
      console.log("Registration successful:", data);

      // Store auth state (in real app, use proper auth management)
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.email,
          name: data.name,
        })
      );

      // Redirect to dashboard/issues
      router.push("/");
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const handleNavigate = (page: AuthPage) => {
    switch (page) {
      case "login":
        router.push("/login");
        break;
      case "forgot-password":
        router.push("/forgot-password");
        break;
      case "reset-password":
        router.push("/reset-password");
        break;
      default:
        router.push("/register");
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join us today! Please fill in your information."
    >
      <RegisterForm onNavigate={handleNavigate} onSubmit={handleRegister} />
    </AuthLayout>
  );
}
