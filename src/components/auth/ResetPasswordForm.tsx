"use client";

import { useState } from "react";
import { PasswordInput } from "@/components/ui/passwordInput";
import { Button } from "@/components/ui/button";
import { validateResetPasswordForm } from "@/utils/validation";
import type { ResetPasswordFormData, FormErrors, AuthPage } from "@/types/auth";

interface ResetPasswordFormProps {
  onNavigate: (page: AuthPage) => void;
  onSubmit?: (data: ResetPasswordFormData) => Promise<void>;
  token?: string;
}

export function ResetPasswordForm({
  onNavigate,
  onSubmit,
  token,
}: ResetPasswordFormProps) {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

    const validationErrors = validateResetPasswordForm(formData);
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
        console.log("Reset password attempt:", { ...formData, token });
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        "Failed to reset password. Please try again or request a new reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900/40 rounded-full">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
            Password reset successful
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Your password has been successfully reset. You can now sign in with
            your new password.
          </p>
        </div>

        <Button
          onClick={() => onNavigate("login")}
          className="w-full"
          size="lg"
        >
          Continue to sign in
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your new password below.
        </p>
      </div>

      {submitError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-sm text-red-600 dark:text-red-400">
            {submitError}
          </p>
        </div>
      )}

      <PasswordInput
        id="password"
        name="password"
        label="New password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
        autoComplete="new-password"
        helperText="Must be at least 8 characters with uppercase, lowercase, and number"
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm new password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
        autoComplete="new-password"
      />

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Reset password
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => onNavigate("login")}
          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Back to sign in
        </button>
      </div>
    </form>
  );
}
