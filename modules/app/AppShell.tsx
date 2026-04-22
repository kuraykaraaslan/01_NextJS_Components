'use client';
import { useMemo, useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { GlobalNav, type NavGroup } from '@/modules/app/GlobalNav';
import { Button } from '@/modules/ui/Button';
import { Drawer } from '@/modules/ui/Drawer';

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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeItem = useMemo(() => {
    for (const group of groups) {
      const item = group.items.find((entry) => entry.id === activeId);
      if (item) {
        return { groupLabel: group.label, title: item.label };
      }
    }
    return null;
  }, [activeId, groups]);

  return (
    <div className={cn('min-h-screen bg-surface-base text-text-primary', className)}>
      <div className="flex min-h-screen overflow-hidden">
        <aside className="hidden lg:flex shrink-0">
          <GlobalNav
            groups={groups}
            activeId={activeId}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            logo={logo}
            footer={footer}
          />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-30 border-b border-border bg-surface-base/90 backdrop-blur supports-[backdrop-filter]:bg-surface-base/75">
            <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label="Open navigation"
                onClick={() => setMobileNavOpen(true)}
                className="lg:hidden"
              >
                ☰
              </Button>

              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="hidden sm:block min-w-0">
                  {logo}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">
                    {activeItem?.title ?? 'App shell'}
                  </p>
                  <p className="truncate text-xs text-text-secondary">
                    {activeItem?.groupLabel ?? 'Responsive navigation shell'}
                  </p>
                </div>
              </div>

              {topBar && (
                <div className="flex shrink-0 items-center gap-2">
                  {topBar}
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onClick={() => setCollapsed((value) => !value)}
                className="hidden lg:inline-flex"
              >
                <span aria-hidden="true" className={cn('text-lg transition-transform', collapsed ? 'rotate-180' : '')}>
                  ‹
                </span>
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-surface-base to-surface-raised/40 p-4 sm:p-6">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
              {children}
            </div>
          </main>
        </div>
      </div>

      <Drawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        title="Navigation"
        side="left"
        className="w-[22rem] max-w-[90vw]"
      >
        <div className="space-y-4">
          {logo && <div className="px-1">{logo}</div>}
          <GlobalNav
            groups={groups}
            activeId={activeId}
            collapsed={false}
            logo={logo}
            footer={footer}
            className="h-auto w-full border border-border rounded-xl overflow-hidden"
          />
        </div>
      </Drawer>
    </div>
  );
}
