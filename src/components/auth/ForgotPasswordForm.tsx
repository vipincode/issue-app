"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { validateForgotPasswordForm } from "@/utils/validation";
import type {
  ForgotPasswordFormData,
  FormErrors,
  AuthPage,
} from "@/types/auth";

interface ForgotPasswordFormProps {
  onNavigate: (page: AuthPage) => void;
  onSubmit?: (data: ForgotPasswordFormData) => Promise<void>;
}

export function ForgotPasswordForm({
  onNavigate,
  onSubmit,
}: ForgotPasswordFormProps) {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
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

    const validationErrors = validateForgotPasswordForm(formData);
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
        console.log("Forgot password request:", formData);
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError("Failed to send reset email. Please try again.");
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
            Check your email
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            We've sent a password reset link to{" "}
            <strong>{formData.email}</strong>
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="w-full"
          >
            Send another email
          </Button>

          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="block w-full text-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

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

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Send reset link
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
