"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const router = useRouter();

  const authFeatures = [
    {
      title: "Login",
      description:
        "Sign in to your existing account with email and password validation.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
      ),
      href: "/login",
      color: "blue",
    },
    {
      title: "Register",
      description: "Create a new account with comprehensive form validation.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      ),
      href: "/register",
      color: "green",
    },
    {
      title: "Forgot Password",
      description: "Request a password reset link via email verification.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      href: "/forgot-password",
      color: "yellow",
    },
    {
      title: "Reset Password",
      description: "Set a new password with secure validation requirements.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      ),
      href: "/reset-password?token=demo-token",
      color: "purple",
    },
  ];

  const issueFeatures = [
    {
      title: "View All Issues",
      description:
        "Browse and filter through all project issues with advanced search.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      href: "/issues",
      color: "blue",
    },
    {
      title: "Create Issue",
      description:
        "Report new issues with detailed forms and priority settings.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      href: "/issues/create",
      color: "green",
    },
    {
      title: "View Issue Details",
      description:
        "See comprehensive issue information with timeline and status.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      href: "/issues/ISS-001",
      color: "indigo",
    },
    {
      title: "Edit Issue",
      description: "Update issue details, status, priority, and assignments.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      href: "/issues/ISS-001/edit",
      color: "yellow",
    },
    {
      title: "Delete Issue",
      description: "Safely remove issues with confirmation and audit trail.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
      href: "/issues/ISS-001/delete",
      color: "red",
    },
  ];

  const getIconColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 dark:text-blue-400",
      green: "text-green-600 dark:text-green-400",
      yellow: "text-yellow-600 dark:text-yellow-400",
      purple: "text-purple-600 dark:text-purple-400",
      indigo: "text-indigo-600 dark:text-indigo-400",
      red: "text-red-600 dark:text-red-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconBgClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/20",
      green: "bg-green-100 dark:bg-green-900/20",
      yellow: "bg-yellow-100 dark:bg-yellow-900/20",
      purple: "bg-purple-100 dark:bg-purple-900/20",
      indigo: "bg-indigo-100 dark:bg-indigo-900/20",
      red: "bg-red-100 dark:bg-red-900/20",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">
                Issue Management System
              </h1>
              <p className="text-sm text-muted-foreground">
                Complete authentication and issue tracking solution
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => router.push("/login")}>
                Sign In
              </Button>
              <Button onClick={() => router.push("/register")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Streamline Your Project Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive platform featuring secure authentication and
              powerful issue tracking. Manage your projects efficiently with our
              intuitive interface and robust feature set.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              onClick={() => router.push("/issues/create")}
              className="text-lg px-8 py-6"
            >
              Create Your First Issue
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/issues")}
              className="text-lg px-8 py-6"
            >
              Explore Issues
            </Button>
          </div>
        </div>

        {/* Authentication Features Section */}
        <section className="mb-16 space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">
              Authentication System
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Secure user authentication with comprehensive validation, password
              management, and user-friendly error handling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authFeatures.map((feature) => (
              <Card
                key={feature.title}
                className="cursor-pointer transition-all hover:shadow-lg group"
                onClick={() => router.push(feature.href)}
              >
                <CardHeader className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconBgClasses(
                      feature.color
                    )}`}
                  >
                    <div className={getIconColorClasses(feature.color)}>
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="flex items-center text-sm text-primary group-hover:text-primary/80 transition-colors">
                    <span>Try it out</span>
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Issue Management Features Section */}
        <section className="mb-16 space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">
              Issue Management
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete CRUD operations for issue tracking with advanced
              filtering, priority management, and team collaboration features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issueFeatures.map((feature) => (
              <Card
                key={feature.title}
                className="cursor-pointer transition-all hover:shadow-lg group"
                onClick={() => router.push(feature.href)}
              >
                <CardHeader className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconBgClasses(
                      feature.color
                    )}`}
                  >
                    <div className={getIconColorClasses(feature.color)}>
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="flex items-center text-sm text-primary group-hover:text-primary/80 transition-colors">
                    <span>Explore</span>
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Features Highlight */}
        <section className="mb-16">
          <Card className="p-8">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold tracking-tight mb-2">
                  Why Choose Our Platform?
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      className="w-8 h-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5-6v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Secure & Reliable</h4>
                    <p className="text-muted-foreground">
                      Built with security best practices, comprehensive
                      validation, and error handling.
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      className="w-8 h-8 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Fast & Responsive</h4>
                    <p className="text-muted-foreground">
                      Optimized for performance with responsive design that
                      works on all devices.
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      className="w-8 h-8 text-purple-600 dark:text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">
                      Team Collaboration
                    </h4>
                    <p className="text-muted-foreground">
                      Designed for teams with assignment features, status
                      tracking, and clear workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Quick Start Guide */}
        <section className="mb-16 space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">
              Get Started in 3 Easy Steps
            </h3>
            <p className="text-muted-foreground">
              Follow these simple steps to begin managing your projects
              effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                1
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Create Account</h4>
                <p className="text-muted-foreground">
                  Sign up with your email and create a secure password to get
                  started.
                </p>
              </div>
              <Button
                variant="link"
                onClick={() => router.push("/register")}
                className="p-0 h-auto font-medium"
              >
                Register Now →
              </Button>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                2
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Create Issues</h4>
                <p className="text-muted-foreground">
                  Report bugs, request features, or track tasks with detailed
                  issue forms.
                </p>
              </div>
              <Button
                variant="link"
                onClick={() => router.push("/issues/create")}
                className="p-0 h-auto font-medium"
              >
                Create Issue →
              </Button>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                3
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Track Progress</h4>
                <p className="text-muted-foreground">
                  Monitor issue status, assign team members, and manage
                  priorities effectively.
                </p>
              </div>
              <Button
                variant="link"
                onClick={() => router.push("/issues")}
                className="p-0 h-auto font-medium"
              >
                View Issues →
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Authentication</h4>
              <div className="space-y-2">
                <Button
                  variant="link"
                  onClick={() => router.push("/login")}
                  className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                >
                  Login
                </Button>
                <Button
                  variant="link"
                  onClick={() => router.push("/register")}
                  className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                >
                  Register
                </Button>
                <Button
                  variant="link"
                  onClick={() => router.push("/forgot-password")}
                  className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                >
                  Forgot Password
                </Button>
                <Button
                  variant="link"
                  onClick={() =>
                    router.push("/reset-password?token=demo-token")
                  }
                  className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                >
                  Reset Password
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Issue Management</h4>
              <div className="space-y-2">
                <Button
                  variant="link"
                  onClick={() => router.push("/issues")}
                  className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                >
                  All Issues
                </Button>
                <Button
                  variant="link"
                  onClick={() => router.push("/issues/create")}
                  className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                >
                  Create Issue
                </Button>
                <Button
                  variant="link"
                  onClick={() => router.push("/issues/ISS-001")}
                  className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                >
                  View Sample Issue
                </Button>
                <Button
                  variant="link"
                  onClick={() => router.push("/issues/ISS-001/edit")}
                  className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                >
                  Edit Issue
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Platform</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Built with Next.js & TypeScript</p>
                <p>Responsive Design</p>
                <p>Dark Mode Support</p>
                <p>Accessibility Focused</p>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Issue Management System. A comprehensive platform for
              project management and team collaboration.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
