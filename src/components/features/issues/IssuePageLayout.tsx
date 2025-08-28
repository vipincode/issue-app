interface IssuePageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function IssuePageLayout({ children, title, subtitle }: IssuePageLayoutProps) {
  return (
    <div className="w-full space-y-8 max-w-[960px] mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
      </div>
      <div className="bg-background shadow-lg rounded-lg px-8 py-6 border border-gray-200 dark:border-gray-700">
        {children}
      </div>
    </div>
  );
}
