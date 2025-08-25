"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import type { LoginFormData, AuthPage } from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would validate credentials with your backend
      console.log("Login successful:", data);

      // Store auth state (in real app, use proper auth management)
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.email,
          name: "John Doe", // This would come from your API
        })
      );

      // Redirect to dashboard/issues
      router.push("/");
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  const handleNavigate = (page: AuthPage) => {
    switch (page) {
      case "register":
        router.push("/register");
        break;
      case "forgot-password":
        router.push("/forgot-password");
        break;
      case "reset-password":
        router.push("/reset-password");
        break;
      default:
        router.push("/login");
    }
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Welcome back! Please enter your details."
    >
      <LoginForm onNavigate={handleNavigate} onSubmit={handleLogin} />
    </AuthLayout>
  );
}
