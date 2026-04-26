'use client';
import { cn } from '@/libs/utils/cn';

type DashboardShellProps = {
  logo?: React.ReactNode;
  sidebar?: React.ReactNode;
  topbar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function DashboardShell({
  logo,
  sidebar,
  topbar,
  children,
  className,
  ...rest
}: DashboardShellProps) {
  return (
    <div className={cn('flex h-full min-h-screen bg-surface-base', className)} {...rest}>
      {(logo || sidebar) && (
        <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-border bg-surface-raised">
          {logo && (
            <div className="flex items-center h-14 border-b border-border px-4 shrink-0">
              {logo}
            </div>
          )}
          {sidebar}
        </aside>
      )}
      <div className="flex flex-1 flex-col min-w-0">
        {topbar && (
          <header className="sticky top-0 z-30 flex items-center h-14 px-4 border-b border-border bg-surface-raised/90 backdrop-blur shrink-0">
            {topbar}
          </header>
        )}
        <main id="main-content" className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
