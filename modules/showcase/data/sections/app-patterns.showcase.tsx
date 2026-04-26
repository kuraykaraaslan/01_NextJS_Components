'use client';
import { TopNavbar } from '@/modules/app/TopNavbar';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { DashboardShell } from '@/modules/app/DashboardShell';
import { DashboardSidebar } from '@/modules/app/DashboardSidebar';
import { DashboardTopBar } from '@/modules/app/DashboardTopBar';
import { Button } from '@/modules/ui/Button';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { Card } from '@/modules/ui/Card';
import { useState } from 'react';
import type { ShowcaseComponent } from '../showcase.types';

const DEMO_NAV_ITEMS = [
  { label: 'Home',     href: '#', active: true  },
  { label: 'Products', href: '#'                },
  { label: 'Pricing',  href: '#'                },
  { label: 'Blog',     href: '#'                },
  { label: 'Contact',  href: '#'                },
];

function TopNavbarDemo() {
  const [active] = useState('Home');
  const items = DEMO_NAV_ITEMS.map((i) => ({ ...i, active: i.label === active }));
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border">
      <TopNavbar
        logo={<span className="text-base font-bold text-primary">Acme</span>}
        navItems={items.map((i) => ({ ...i, href: undefined, label: i.label }))}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Log in</Button>
            <Button variant="primary" size="sm">Sign up</Button>
          </div>
        }
      />
      <div className="px-6 py-8 text-sm text-text-secondary bg-surface-base">
        Page content — resize the window to see the hamburger menu on mobile.
      </div>
    </div>
  );
}

function TopNavbarWithAvatarDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border">
      <TopNavbar
        logo={<span className="text-base font-bold text-text-primary">Dashboard</span>}
        navItems={[
          { label: 'Overview', active: true },
          { label: 'Analytics' },
          { label: 'Reports'   },
          { label: 'Settings'  },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <div className="relative">
              <Button variant="ghost" size="sm" iconOnly aria-label="Notifications">🔔</Button>
              <span className="absolute -top-0.5 -right-0.5 pointer-events-none">
                <Badge variant="error" size="sm">4</Badge>
              </span>
            </div>
            <Avatar name="Jane Doe" size="sm" status="online" />
          </div>
        }
      />
      <div className="px-6 py-8 text-sm text-text-secondary bg-surface-base">
        Page content
      </div>
    </div>
  );
}

function NavDrawerStandaloneDemo() {
  return (
    <NavDrawer
      title="Navigation"
      side="left"
      trigger={
        <Button variant="outline" iconLeft={<span>☰</span>}>Open menu</Button>
      }
      footer={
        <Button variant="ghost" size="sm" fullWidth>Sign out</Button>
      }
    >
      <div className="space-y-1 pt-1">
        {['Home', 'Products', 'Pricing', 'Blog', 'Contact'].map((label, i) => (
          <a
            key={label}
            href="#"
            className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              i === 0
                ? 'bg-primary-subtle text-primary'
                : 'text-text-primary hover:bg-surface-overlay'
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </NavDrawer>
  );
}

function NavDrawerRightDemo() {
  return (
    <NavDrawer
      title="Cart"
      side="right"
      trigger={
        <Button variant="outline">
          🛒 Cart (3)
        </Button>
      }
    >
      <div className="space-y-4 pt-1">
        {['Product A — $29', 'Product B — $49', 'Product C — $19'].map((item) => (
          <div key={item} className="flex items-center justify-between text-sm">
            <span className="text-text-primary">{item.split(' — ')[0]}</span>
            <span className="font-medium text-text-primary">{item.split(' — ')[1]}</span>
          </div>
        ))}
        <div className="pt-3 border-t border-border flex justify-between text-sm font-semibold">
          <span>Total</span><span>$97</span>
        </div>
        <Button variant="primary" fullWidth>Checkout</Button>
      </div>
    </NavDrawer>
  );
}

const SHELL_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'analytics', label: 'Analytics',  icon: '📈' },
  { id: 'projects',  label: 'Projects',   icon: '📁' },
  { id: 'tasks',     label: 'Tasks',      icon: '✅' },
  { id: 'team',      label: 'Team',       icon: '👥' },
  { id: 'settings',  label: 'Settings',   icon: '⚙️' },
];

function DashboardShellDemo() {
  const [activeId, setActiveId] = useState('dashboard');
  const activeLabel = SHELL_NAV_ITEMS.find((i) => i.id === activeId)?.label ?? '';

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border" style={{ height: 480 }}>
      <DashboardShell
        logo={<span className="text-base font-black text-primary tracking-tight">Acme</span>}
        sidebar={
          <DashboardSidebar
            navItems={SHELL_NAV_ITEMS}
            activeId={activeId}
            onSelect={setActiveId}
            footer={
              <div className="p-3 flex items-center gap-2">
                <Avatar name="Jane Doe" size="sm" status="online" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-text-primary truncate">Jane Doe</p>
                  <p className="text-[10px] text-text-secondary truncate">Admin</p>
                </div>
              </div>
            }
          />
        }
        topbar={
          <DashboardTopBar
            actions={
              <>
                <Button variant="ghost" size="sm" iconOnly aria-label="3 notifications">🔔</Button>
                <Avatar name="Jane Doe" size="sm" />
              </>
            }
          />
        }
        className="h-full min-h-0"
      >
        <div className="space-y-4">
          <div>
            <h1 className="text-xl font-bold text-text-primary">{activeLabel}</h1>
            <p className="text-sm text-text-secondary mt-0.5">Welcome back, Jane.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Revenue', value: '$48,295', delta: '+12%' },
              { label: 'Active Users',  value: '3,842',   delta: '+4%'  },
              { label: 'Open Tasks',    value: '24',       delta: '-8%'  },
            ].map((stat) => (
              <Card key={stat.label} variant="raised">
                <p className="text-xs text-text-secondary">{stat.label}</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                <p className="text-xs text-success-fg mt-0.5">{stat.delta} this month</p>
              </Card>
            ))}
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}

export function buildAppPatternsData(): ShowcaseComponent[] {
  return [
    {
      id: 'top-navbar',
      title: 'TopNavbar',
      category: 'App',
      abbr: 'TN',
      description: 'Responsive üst navigasyon çubuğu. Masaüstünde inline linkler gösterir, mobilde hamburger butonu ile NavDrawer açar. logo, navItems ve actions slotları var.',
      filePath: 'modules/app/TopNavbar.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { Button } from '@/modules/ui/Button';

export type NavbarItem = { label: string; href?: string; active?: boolean };

export function TopNavbar({ logo, navItems = [], actions, sticky = false, bordered = true, className }) {
  return (
    <header className={cn('w-full flex items-center gap-3 px-4 py-3 bg-surface-raised',
      bordered && 'border-b border-border', sticky && 'sticky top-0 z-40', className)}>

      {/* Mobile: hamburger opens NavDrawer */}
      <div className="md:hidden">
        <NavDrawer title="Navigation" side="left"
          trigger={<Button variant="ghost" size="sm" iconOnly aria-label="Open navigation menu">☰</Button>}>
          <nav className="flex flex-col gap-0.5 pt-1">
            {navItems.map((item) => (
              <a key={item.label} href={item.href ?? '#'}
                className={cn('flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  item.active ? 'bg-primary-subtle text-primary' : 'text-text-primary hover:bg-surface-overlay')}>
                {item.label}
              </a>
            ))}
          </nav>
        </NavDrawer>
      </div>

      {logo && <div className="shrink-0">{logo}</div>}

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-0.5 flex-1" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href ?? '#'} aria-current={item.active ? 'page' : undefined}
            className={cn('px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              item.active ? 'bg-primary-subtle text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay')}>
            {item.label}
          </a>
        ))}
      </nav>

      {actions && <div className="flex items-center gap-2 ml-auto shrink-0">{actions}</div>}
    </header>
  );
}`,
      variants: [
        {
          title: 'Marketing bar',
          layout: 'stack' as const,
          preview: <TopNavbarDemo />,
          code: `<TopNavbar
  logo={<span className="text-base font-bold text-primary">Acme</span>}
  navItems={[
    { label: 'Home',     href: '/', active: true },
    { label: 'Products', href: '/products' },
    { label: 'Pricing',  href: '/pricing' },
    { label: 'Blog',     href: '/blog' },
  ]}
  actions={
    <>
      <Button variant="ghost" size="sm">Log in</Button>
      <Button variant="primary" size="sm">Sign up</Button>
    </>
  }
/>`,
        },
        {
          title: 'App bar (avatar + notifications)',
          layout: 'stack' as const,
          preview: <TopNavbarWithAvatarDemo />,
          code: `<TopNavbar
  logo={<span className="font-bold">Dashboard</span>}
  navItems={[
    { label: 'Overview', active: true },
    { label: 'Analytics' },
    { label: 'Reports'   },
    { label: 'Settings'  },
  ]}
  actions={
    <>
      <Button variant="ghost" size="sm" iconOnly aria-label="Notifications">🔔</Button>
      <Avatar name="Jane Doe" size="sm" status="online" />
    </>
  }
/>`,
        },
      ],
    },
    {
      id: 'nav-drawer',
      title: 'NavDrawer',
      category: 'App',
      abbr: 'ND',
      description: 'Herhangi bir trigger + children\'ı drawer içinde saran wrapper. Açık/kapalı state\'i kendi içinde tutar. TopNavbar\'ın mobil menüsü olarak kullanılır, bağımsız da çalışır.',
      filePath: 'modules/app/NavDrawer.tsx',
      sourceCode: `'use client';
import { useState } from 'react';
import { Drawer } from '@/modules/ui/Drawer';
import { cn } from '@/libs/utils/cn';

export function NavDrawer({ trigger, title = 'Menu', side = 'left', footer, children, className }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div role="none" onClick={() => setOpen(true)} className={cn('inline-flex', className)}>
        {trigger}
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} title={title} side={side} footer={footer}>
        {children}
      </Drawer>
    </>
  );
}`,
      variants: [
        {
          title: 'Left nav (standalone)',
          preview: <NavDrawerStandaloneDemo />,
          code: `<NavDrawer
  title="Navigation"
  side="left"
  trigger={<Button variant="outline" iconLeft={<MenuIcon />}>Open menu</Button>}
  footer={<Button variant="ghost" size="sm" fullWidth>Sign out</Button>}
>
  <nav className="space-y-1 pt-1">
    <a href="/" className="block px-3 py-2.5 rounded-lg bg-primary-subtle text-primary text-sm font-medium">Home</a>
    <a href="/products" className="block px-3 py-2.5 rounded-lg text-text-primary hover:bg-surface-overlay text-sm">Products</a>
  </nav>
</NavDrawer>`,
        },
        {
          title: 'Right drawer (cart panel)',
          preview: <NavDrawerRightDemo />,
          code: `<NavDrawer
  title="Cart"
  side="right"
  trigger={<Button variant="outline">🛒 Cart (3)</Button>}
>
  {cartItems.map((item) => (
    <div key={item.id} className="flex justify-between text-sm py-2">
      <span>{item.name}</span>
      <span>{item.price}</span>
    </div>
  ))}
  <Button variant="primary" fullWidth>Checkout</Button>
</NavDrawer>`,
        },
      ],
    },
    {
      id: 'dashboard-shell',
      title: 'DashboardShell',
      category: 'App',
      abbr: 'DS',
      description: 'Sade layout wrapper. logo, sidebar ve topbar slotlarına component geçilir. DashboardSidebar ve DashboardTopBar ile birlikte kullanılır.',
      filePath: 'modules/app/DashboardShell.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function DashboardShell({ logo, sidebar, topbar, children, className, ...rest }) {
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

// ─── DashboardSidebar ───────────────────────────────────────────────────────

export function DashboardSidebar({ navGroups, navItems, activeId, onSelect, footer }) {
  const groups = navGroups ?? (navItems ? [{ items: navItems }] : []);
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto px-2 py-3">
        {groups.map((group, gi) => (
          <div key={group.label ?? gi} className="mb-4">
            {group.label && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-disabled px-3 mb-1">
                {group.label}
              </p>
            )}
            {group.items.map((item) => (
              <button key={item.id} type="button"
                aria-current={item.id === activeId ? 'page' : undefined}
                onClick={() => onSelect?.(item.id)}
                className={cn('w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                  item.id === activeId ? 'bg-primary-subtle text-primary font-medium' : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay')}>
                {item.icon && <span aria-hidden="true" className="shrink-0 w-4 text-center">{item.icon}</span>}
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge > 0 && <Badge variant="primary" size="sm">{item.badge}</Badge>}
              </button>
            ))}
          </div>
        ))}
      </div>
      {footer && <div className="border-t border-border shrink-0">{footer}</div>}
    </div>
  );
}

// ─── DashboardTopBar ────────────────────────────────────────────────────────

export function DashboardTopBar({ searchable, searchPlaceholder = 'Search…', actions }) {
  return (
    <div className="flex items-center gap-3 flex-1">
      {searchable && (
        <div className="hidden sm:block flex-1 max-w-xs">
          <SearchBar placeholder={searchPlaceholder} />
        </div>
      )}
      {actions && (
        <div className={cn('flex items-center gap-1', !searchable && 'ml-auto')}>
          {actions}
        </div>
      )}
    </div>
  );
}`,
      variants: [
        {
          title: 'Full dashboard layout',
          layout: 'stack' as const,
          preview: <DashboardShellDemo />,
          code: `<DashboardShell
  logo={<span className="text-base font-black text-primary">Acme</span>}
  sidebar={
    <DashboardSidebar
      navItems={navItems}
      activeId={activeId}
      onSelect={setActiveId}
      footer={
        <div className="p-3 flex items-center gap-2">
          <Avatar name="Jane Doe" size="sm" status="online" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-text-primary truncate">Jane Doe</p>
            <p className="text-[10px] text-text-secondary truncate">Admin</p>
          </div>
        </div>
      }
    />
  }
  topbar={
    <DashboardTopBar
      searchable
      actions={
        <>
          <Button variant="ghost" size="sm" iconOnly aria-label="Notifications">🔔</Button>
          <Avatar name="Jane Doe" size="sm" />
        </>
      }
    />
  }
>
  {/* page content */}
</DashboardShell>`,
        },
      ],
    },
  ];
}
