'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/libs/utils/cn';
import { SkipLink } from '@/modules/ui/SkipLink';
import { Avatar } from '@/modules/ui/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faCompass,
  faBell,
  faEnvelope,
  faUser,
  faGear,
  faStore,
  faPlus,
  faBars,
  faXmark,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { ME, NOTIFICATIONS } from './social.data';

const NAV_ITEMS = [
  { label: 'Home',          href: '/theme/social',               icon: faHouse,   exact: true  },
  { label: 'Explore',       href: '/theme/social',               icon: faCompass, exact: false },
  { label: 'Notifications', href: '/theme/social/notifications', icon: faBell,    exact: false },
  { label: 'Messages',      href: '/theme/social/messages',      icon: faEnvelope,exact: false },
  { label: 'Friends',       href: '/theme/social/friends',       icon: faUsers,   exact: false },
  { label: 'Marketplace',   href: '/theme/social/marketplace',   icon: faStore,   exact: false },
  { label: 'Profile',       href: `/theme/social/profile/${ME.userId}`, icon: faUser, exact: false },
  { label: 'Settings',      href: '/theme/social/settings',      icon: faGear,    exact: false },
];

const unreadNotifCount = NOTIFICATIONS.filter((n) => !n.isRead).length;

export default function SocialThemeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && href !== '/theme/social';
  }

  return (
    <>
      <SkipLink href="#main-content" />

      {/* ── Mobile top bar (fixed) ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-surface-base border-b border-border flex items-center justify-between px-4">
        <a
          href="/theme/social"
          className="text-lg font-extrabold text-primary tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
        >
          Nexus
        </a>
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 rounded-full text-text-secondary hover:bg-surface-overlay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus transition-colors"
        >
          <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} className="w-5 h-5" aria-hidden="true" />
        </button>
      </header>

      {/* ── Mobile drawer overlay ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/40"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex bg-surface-sunken text-text-primary min-h-screen">

        {/* ── Left sidebar — fixed on mobile, sticky on desktop ── */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-64 bg-surface-base border-r border-border flex flex-col transition-transform duration-200',
            'lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:z-10 lg:shrink-0',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Brand */}
          <div className="px-5 py-5 border-b border-border">
            <a
              href="/theme/social"
              className="text-2xl font-extrabold text-primary tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
              onClick={() => setMobileOpen(false)}
            >
              Nexus
            </a>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href, item.exact);
              const badge = item.label === 'Notifications' && unreadNotifCount > 0 ? unreadNotifCount : null;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                    active
                      ? 'bg-primary text-primary-fg'
                      : 'text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
                  )}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4.5 h-4.5 shrink-0" aria-hidden="true" />
                  <span className="flex-1">{item.label}</span>
                  {badge && (
                    <span className="ml-auto bg-error text-primary-fg text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5">
                      {badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* New post button */}
          <div className="px-4 pb-4">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-fg px-4 py-2.5 text-sm font-semibold hover:bg-primary-hover active:bg-primary-active transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" aria-hidden="true" />
              New Post
            </button>
          </div>

          {/* User quick-access */}
          <div className="border-t border-border px-4 py-3">
            <a
              href={`/theme/social/profile/${ME.userId}`}
              className="flex items-center gap-3 rounded-xl hover:bg-surface-overlay transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              onClick={() => setMobileOpen(false)}
            >
              <Avatar src={ME.avatar ?? undefined} name={ME.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-text-primary truncate">{ME.name}</p>
                <p className="text-xs text-text-secondary truncate">@{ME.username}</p>
              </div>
            </a>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main id="main-content" className="flex-1 min-w-0 pt-14 lg:pt-0 pb-16 lg:pb-0">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-base border-t border-border flex items-center"
        aria-label="Bottom navigation"
      >
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const active = isActive(item.href, item.exact);
          const badge = item.label === 'Notifications' && unreadNotifCount > 0 ? unreadNotifCount : null;
          return (
            <a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-xs relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                active ? 'text-primary' : 'text-text-secondary'
              )}
            >
              <span className="relative">
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" aria-hidden="true" />
                {badge && (
                  <span className="absolute -top-1 -right-1 bg-error text-primary-fg text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </span>
              <span className="hidden xs:block">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
