'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { Button } from '@/modules/ui/Button';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { SearchBar } from '@/modules/ui/SearchBar';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';

export type DashboardNavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
};

export type DashboardNavGroup = {
  label: string;
  items: DashboardNavItem[];
};

type DashboardShellProps = {
  logo?: React.ReactNode;
  navGroups?: DashboardNavGroup[];
  activeNavId?: string;
  onNavSelect?: (id: string) => void;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  onNotificationsClick?: () => void;
  onUserMenuAction?: (action: string) => void;
  children?: React.ReactNode;
  className?: string;
};

export function DashboardShell({
  logo,
  navGroups = [],
  activeNavId,
  onNavSelect,
  userName = 'Jane Doe',
  userRole = 'Admin',
  notificationCount = 0,
  onNotificationsClick,
  onUserMenuAction,
  children,
  className,
}: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function NavContent({ inDrawer = false }: { inDrawer?: boolean }) {
    const collapsed = !inDrawer && sidebarCollapsed;
    return (
      <div className="flex flex-col gap-4 py-2">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-disabled px-3 mb-1">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  title={collapsed ? item.label : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  aria-current={item.id === activeNavId ? 'page' : undefined}
                  onClick={() => onNavSelect?.(item.id)}
                  className={cn(
                    'w-full flex items-center gap-2.5 rounded-lg text-sm transition-colors text-left',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                    collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2',
                    item.id === activeNavId
                      ? 'bg-primary-subtle text-primary font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
                  )}
                >
                  {item.icon && (
                    <span aria-hidden="true" className="shrink-0 w-4 text-center">{item.icon}</span>
                  )}
                  {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                  {!collapsed && item.badge != null && item.badge > 0 && (
                    <Badge variant="primary" size="sm">{item.badge}</Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex h-full min-h-screen bg-surface-base', className)}>

      {/* ── Desktop sidebar ─────────────────────────────────────────── */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r border-border bg-surface-raised transition-all duration-200 shrink-0',
          sidebarCollapsed ? 'w-14' : 'w-56'
        )}
      >
        {/* Logo slot */}
        <div
          className={cn(
            'flex items-center h-14 border-b border-border px-4 shrink-0',
            sidebarCollapsed && 'justify-center px-0'
          )}
        >
          {sidebarCollapsed
            ? <span className="text-lg font-black text-primary select-none">⬡</span>
            : logo
          }
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          <NavContent />
        </div>

        {/* User section */}
        <div
          className={cn(
            'border-t border-border p-3 flex items-center gap-2 shrink-0',
            sidebarCollapsed && 'justify-center'
          )}
        >
          <Avatar name={userName} size="sm" status="online" />
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <p className="text-xs font-semibold text-text-primary truncate">{userName}</p>
              <p className="text-[10px] text-text-secondary truncate">{userRole}</p>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main column ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 h-14 px-4 border-b border-border bg-surface-raised/90 backdrop-blur shrink-0">

          {/* Mobile: hamburger via NavDrawer */}
          <div className="lg:hidden">
            <NavDrawer
              title="Navigation"
              side="left"
              trigger={
                <Button variant="ghost" size="sm" iconOnly aria-label="Open navigation">
                  ☰
                </Button>
              }
            >
              <NavContent inDrawer />
            </NavDrawer>
          </div>

          {/* Desktop: sidebar collapse toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setSidebarCollapsed((v) => !v)}
            className="hidden lg:inline-flex"
          >
            <span
              className={cn('inline-block text-base transition-transform duration-200', sidebarCollapsed && 'rotate-180')}
              aria-hidden="true"
            >
              ‹
            </span>
          </Button>

          {/* Search */}
          <div className="hidden sm:block flex-1 max-w-xs">
            <SearchBar id="dashboard-shell-search" placeholder="Search…" />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label={`${notificationCount} notifications`}
                onClick={onNotificationsClick}
              >
                🔔
              </Button>
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 pointer-events-none">
                  <Badge variant="error" size="sm">{notificationCount}</Badge>
                </span>
              )}
            </div>

            {/* User dropdown */}
            <DropdownMenu
              align="right"
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <Avatar name={userName} size="sm" />
                  <span className="text-sm font-medium text-text-primary hidden sm:block">{userName}</span>
                  <span className="text-text-disabled text-xs" aria-hidden="true">▾</span>
                </button>
              }
              items={[
                { label: 'Profile',   icon: '👤', onClick: () => onUserMenuAction?.('profile')   },
                { label: 'Settings',  icon: '⚙️', onClick: () => onUserMenuAction?.('settings')  },
                { type: 'separator' },
                { label: 'Sign out',  icon: '↩',  onClick: () => onUserMenuAction?.('signout'), danger: true },
              ]}
            />
          </div>
        </header>

        {/* Content */}
        <main id="main-content" className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
