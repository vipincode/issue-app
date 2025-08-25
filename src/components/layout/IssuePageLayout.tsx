interface IssuePageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function IssuePageLayout({
  children,
  title,
  subtitle,
}: IssuePageLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        <div className="bg-background shadow-lg rounded-lg px-8 py-6 border border-gray-200 dark:border-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}
