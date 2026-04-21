'use client';
import { useState } from 'react';
import { Button } from '@/modules/ui/Button';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';
import { Toast, ToastRegion } from '@/modules/ui/Toast';
import { Drawer } from '@/modules/ui/Drawer';
import { cn } from '@/libs/utils/cn';

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { icon: '🏠', label: 'Dashboard',  badge: 0 },
      { icon: '📁', label: 'Projects',   badge: 3 },
      { icon: '📊', label: 'Analytics',  badge: 0 },
      { icon: '📋', label: 'Tasks',      badge: 7 },
    ],
  },
  {
    label: 'Settings',
    items: [
      { icon: '👤', label: 'Profile',    badge: 0 },
      { icon: '💳', label: 'Billing',    badge: 0 },
      { icon: '👥', label: 'Team',       badge: 2 },
    ],
  },
];

export function AppTopBar({
  pageTitle = 'Dashboard',
  userName = 'Alice Johnson',
  notificationCount = 4,
}: {
  pageTitle?: string;
  userName?: string;
  notificationCount?: number;
}) {
  const [drawerOpen, setDrawerOpen]           = useState(false);
  const [showToast, setShowToast]             = useState(false);
  const [activeItem, setActiveItem]           = useState('Dashboard');

  function handleNotificationsClick() {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  }

  return (
    <div className="relative w-full">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 border border-border rounded-xl bg-surface-raised">
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label="Open navigation"
            onClick={() => setDrawerOpen(true)}
          >
            ☰
          </Button>
          <span className="text-base font-semibold text-text-primary hidden sm:block">
            {pageTitle}
          </span>
        </div>

        {/* Center: search */}
        <div className="flex-1 flex items-center justify-center">
          <SearchBar
            id="topbar-search"
            placeholder="Search anything…"
            className="max-w-xs w-full"
          />
        </div>

        {/* Right: notifications + user menu */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              aria-label={`${notificationCount} notifications`}
              onClick={handleNotificationsClick}
            >
              🔔
            </Button>
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 pointer-events-none">
                <Badge variant="error" size="sm">{notificationCount}</Badge>
              </span>
            )}
          </div>

          <DropdownMenu
            align="right"
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                <Avatar name={userName} size="sm" />
                <span className="text-sm font-medium text-text-primary hidden sm:block">{userName}</span>
                <span className="text-text-disabled" aria-hidden="true">▾</span>
              </button>
            }
            items={[
              { label: 'Profile',  icon: '👤' },
              { label: 'Settings', icon: '⚙️' },
              { type: 'separator' },
              { label: 'Sign out', icon: '↩', danger: true },
            ]}
          />
        </div>
      </div>

      {/* Navigation Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Navigation">
        <div className="flex flex-col gap-1 p-4">
          <div className="flex items-center gap-3 pb-4 mb-2 border-b border-border">
            <Avatar name={userName} size="md" />
            <div>
              <p className="text-sm font-semibold text-text-primary">{userName}</p>
              <p className="text-xs text-text-secondary">Administrator</p>
            </div>
          </div>

          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-disabled px-2 mb-1">
                {section.label}
              </p>
              {section.items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => { setActiveItem(item.label); setDrawerOpen(false); }}
                  className={cn(
                    'w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                    activeItem === item.label
                      ? 'bg-primary-subtle text-primary font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true">{item.icon}</span>
                    {item.label}
                  </span>
                  {item.badge > 0 && <Badge variant="primary" size="sm">{item.badge}</Badge>}
                </button>
              ))}
            </div>
          ))}
        </div>
      </Drawer>

      {/* Toast notification */}
      <ToastRegion position="top-right">
        {showToast && (
          <Toast
            variant="info"
            message={`You have ${notificationCount} unread notification${notificationCount !== 1 ? 's' : ''}.`}
            onDismiss={() => setShowToast(false)}
          />
        )}
      </ToastRegion>
    </div>
  );
}
