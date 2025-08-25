"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/passwordInput";
import { Button } from "@/components/ui/button";
import { validateLoginForm } from "@/utils/validation";
import type { LoginFormData, FormErrors, AuthPage } from "@/types/auth";

interface LoginFormProps {
  onNavigate: (page: AuthPage) => void;
  onSubmit?: (data: LoginFormData) => Promise<void>;
}

export function LoginForm({ onNavigate, onSubmit }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Login attempt:", formData);
      }
    } catch (error) {
      setSubmitError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-sm text-red-600 dark:text-red-400">
            {submitError}
          </p>
        </div>
      )}

      <Input
        id="email"
        name="email"
        type="email"
        label="Email address"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        autoComplete="email"
      />

      <PasswordInput
        id="password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
        autoComplete="current-password"
      />

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate("forgot-password")}
          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Forgot your password?
        </button>
      </div>

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Sign in
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {"Don't have an account? "}
        </span>
        <button
          type="button"
          onClick={() => onNavigate("register")}
          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
