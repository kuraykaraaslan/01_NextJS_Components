'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { GlobalNav, type NavGroup } from '@/modules/app/GlobalNav';

export function AppShell({
  groups,
  activeId,
  logo,
  topBar,
  footer,
  children,
  defaultCollapsed = false,
  className,
}: {
  groups: NavGroup[];
  activeId?: string;
  logo?: React.ReactNode;
  topBar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  className?: string;
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className={cn('flex h-screen overflow-hidden bg-surface-base', className)}>
      <GlobalNav
        groups={groups}
        activeId={activeId}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        logo={logo}
        footer={footer}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {topBar && (
          <header className="h-14 flex items-center px-4 border-b border-border bg-surface-raised shrink-0">
            {topBar}
          </header>
        )}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
