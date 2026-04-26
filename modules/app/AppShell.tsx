'use client';
import { cn } from '@/libs/utils/cn';

type AppShellProps = {
  logo?: React.ReactNode;
  compactLogo?: React.ReactNode;
  sidebarCollapsed?: boolean;
  sidebar?: React.ReactNode;
  topbar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function AppShell({
  logo,
  compactLogo,
  sidebarCollapsed = false,
  sidebar,
  topbar,
  children,
  className,
  ...rest
}: AppShellProps) {
  const logoContent = sidebarCollapsed && compactLogo ? compactLogo : (logo ?? compactLogo);

  return (
    <div className={cn('flex h-screen overflow-hidden bg-surface-base', className)} {...rest}>
      {sidebar && (
        <aside className="relative hidden lg:flex flex-col h-full min-h-0 shrink-0 border-r border-border bg-surface-raised">
          {logoContent && (
            <div className={cn(
              'absolute inset-x-0 top-0 z-10 flex items-center h-14 border-b border-border bg-surface-raised overflow-hidden',
              sidebarCollapsed && compactLogo ? 'justify-center px-2' : 'px-4'
            )}>
              {logoContent}
            </div>
          )}
          <div className={cn('flex min-h-0 flex-1', logoContent && 'pt-14')}>
            {sidebar}
          </div>
        </aside>
      )}
      <div className="flex flex-1 flex-col min-w-0 min-h-0">
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
