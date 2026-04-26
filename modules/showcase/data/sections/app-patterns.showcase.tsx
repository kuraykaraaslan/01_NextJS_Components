'use client';
import { AppShell } from '@/modules/app/AppShell';
import { AppNav } from '@/modules/app/AppNav';
import { AppSidebar } from '@/modules/app/AppSidebar';
import { AppTopBar } from '@/modules/app/AppTopBar';
import { GlobalNav } from '@/modules/app/GlobalNav';
import { TopNavbar } from '@/modules/app/TopNavbar';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { DashboardShell } from '@/modules/app/DashboardShell';
import { DashboardSidebar } from '@/modules/app/DashboardSidebar';
import { DashboardTopBar } from '@/modules/app/DashboardTopBar';
import { UserMenu } from '@/modules/app/UserMenu';
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

const DEMO_USER = {
  userId: 'demo-1',
  email: 'jane@acme.com',
  userRole: 'Admin',
  userStatus: 'ACTIVE',
  userPreferences: null,
  userProfile: { name: 'Jane Doe', profilePicture: null },
};

const DEMO_USER_2 = {
  userId: 'demo-2',
  email: 'john@acme.com',
  userRole: 'Editor',
  userStatus: 'ACTIVE',
  userPreferences: null,
  userProfile: { name: 'John Smith', profilePicture: null },
};

const SHELL_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'analytics', label: 'Analytics',  icon: '📈' },
  { id: 'projects',  label: 'Projects',   icon: '📁' },
  { id: 'tasks',     label: 'Tasks',      icon: '✅' },
  { id: 'team',      label: 'Team',       icon: '👥' },
  { id: 'settings',  label: 'Settings',   icon: '⚙️' },
];

const GLOBAL_NAV_GROUPS = [
  {
    id: 'main', label: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { id: 'analytics', label: 'Analytics',  icon: '📈', badge: 3 },
      { id: 'projects',  label: 'Projects',   icon: '📁' },
    ],
  },
  {
    id: 'settings', label: 'Settings',
    items: [
      { id: 'profile',  label: 'Profile',  icon: '👤' },
      { id: 'billing',  label: 'Billing',  icon: '💳' },
      { id: 'team',     label: 'Team',     icon: '👥' },
    ],
  },
];

function GlobalNavDemo() {
  const [activeId, setActiveId]   = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const groups = GLOBAL_NAV_GROUPS.map((g) => ({
    ...g,
    items: g.items.map((i) => ({ ...i, onClick: () => setActiveId(i.id) })),
  }));
  return (
    <div className="flex justify-center py-4">
      <GlobalNav
        groups={groups}
        activeId={activeId}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        logo={<span className="font-bold text-primary">Acme</span>}
        footer={
          <div className="flex items-center gap-2 px-1">
            <Avatar name="Jane Doe" size="sm" status="online" />
            {!collapsed && <p className="text-xs font-semibold text-text-primary truncate">Jane Doe</p>}
          </div>
        }
      />
    </div>
  );
}

function GlobalNavCollapsedDemo() {
  const [activeId, setActiveId]   = useState('dashboard');
  const [collapsed, setCollapsed] = useState(true);
  const groups = GLOBAL_NAV_GROUPS.map((g) => ({
    ...g,
    items: g.items.map((i) => ({ ...i, onClick: () => setActiveId(i.id) })),
  }));
  return (
    <div className="flex justify-center py-4">
      <GlobalNav
        groups={groups}
        activeId={activeId}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        logo={<span className="font-bold text-primary">A</span>}
      />
    </div>
  );
}

function AppSidebarDemo() {
  return (
    <div className="flex justify-center py-4">
      <AppSidebar workspaceName="Acme Corp" activeItem="dashboard" />
    </div>
  );
}

function DashboardSidebarDemo() {
  const [activeId, setActiveId] = useState('dashboard');
  return (
    <div className="flex justify-center py-4">
      <div className="border border-border rounded-xl overflow-hidden" style={{ width: 224, height: 400 }}>
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
      </div>
    </div>
  );
}

function DashboardSidebarGroupsDemo() {
  const [activeId, setActiveId] = useState('dashboard');
  return (
    <div className="flex justify-center py-4">
      <div className="border border-border rounded-xl overflow-hidden" style={{ width: 224, height: 400 }}>
        <DashboardSidebar
          navGroups={[
            { label: 'Main',     items: SHELL_NAV_ITEMS.slice(0, 3) },
            { label: 'Settings', items: SHELL_NAV_ITEMS.slice(4) },
          ]}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>
    </div>
  );
}

function DashboardTopBarDemo() {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex items-center h-14 px-4 bg-surface-raised">
        <DashboardTopBar
          searchable
          actions={<Button variant="ghost" size="sm" iconOnly aria-label="Notifications">🔔</Button>}
          user={DEMO_USER}
        />
      </div>
    </div>
  );
}

function DashboardTopBarMinimalDemo() {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex items-center h-14 px-4 bg-surface-raised">
        <DashboardTopBar
          actions={<Button variant="primary" size="sm">New project</Button>}
          user={DEMO_USER}
        />
      </div>
    </div>
  );
}

function AppTopBarDemo() {
  return (
    <div className="py-4">
      <AppTopBar pageTitle="Dashboard" userName="Alice Johnson" notificationCount={4} />
    </div>
  );
}

function AppNavDemo() {
  return (
    <div className="py-4">
      <AppNav activePath="dashboard" notificationCount={2} />
    </div>
  );
}

function AppShellDemo() {
  const [activeId, setActiveId] = useState('dashboard');
  const groups = GLOBAL_NAV_GROUPS.map((g) => ({
    ...g,
    items: g.items.map((i) => ({ ...i, onClick: () => setActiveId(i.id) })),
  }));
  const activeLabel = groups.flatMap((g) => g.items).find((i) => i.id === activeId)?.label ?? '';
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border" style={{ height: 480 }}>
      <AppShell
        groups={groups}
        activeId={activeId}
        logo={<span className="text-base font-black text-primary">Acme</span>}
        topBar={<UserMenu user={DEMO_USER} />}
        className="min-h-0 h-full"
      >
        <div>
          <h1 className="text-xl font-bold text-text-primary">{activeLabel}</h1>
          <p className="text-sm text-text-secondary mt-1">Collapsible sidebar + mobile drawer + sticky header.</p>
        </div>
      </AppShell>
    </div>
  );
}

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
              <Button variant="ghost" size="sm" iconOnly aria-label="3 notifications">🔔</Button>
            }
            user={DEMO_USER}
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

function UserMenuDefaultDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <UserMenu user={DEMO_USER} />
    </div>
  );
}

function UserMenuCustomDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <UserMenu
        user={DEMO_USER_2}
        items={[
          { label: 'View Profile',    icon: '👤', onClick: () => {} },
          { label: 'Billing',         icon: '💳', onClick: () => {} },
          { label: 'Team Settings',   icon: '👥', onClick: () => {} },
          { type: 'separator' },
          { label: 'Sign out',        icon: '↩️', danger: true, onClick: () => {} },
        ]}
      />
    </div>
  );
}

export function buildAppPatternsData(): ShowcaseComponent[] {
  return [
    // ── Shells ─────────────────────────────────────────────────────────────────
    {
      id: 'app-shell',
      title: 'AppShell',
      category: 'App',
      abbr: 'AS',
      description: 'Tam sayfa uygulama kabuğu. GlobalNav (daraltılabilir) + sticky header + mobil drawer birlikte gelir. Tüm gruplar ve aktif id dışarıdan prop olarak alınır.',
      filePath: 'modules/app/AppShell.tsx',
      sourceCode: `'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { GlobalNav } from '@/modules/app/GlobalNav';
import { Drawer } from '@/modules/ui/Drawer';
import { Button } from '@/modules/ui/Button';

export function AppShell({ groups, activeId, logo, topBar, footer, children, defaultCollapsed = false, className }) {
  const [collapsed, setCollapsed]       = useState(defaultCollapsed);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className={cn('min-h-screen bg-surface-base', className)}>
      <div className="flex min-h-screen overflow-hidden">
        <aside className="hidden lg:flex shrink-0">
          <GlobalNav groups={groups} activeId={activeId} collapsed={collapsed}
            onCollapse={setCollapsed} logo={logo} footer={footer} />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-30 border-b border-border bg-surface-base/90 backdrop-blur">
            <div className="flex items-center gap-3 px-4 py-3">
              <Button variant="ghost" size="sm" iconOnly aria-label="Open navigation"
                onClick={() => setMobileNavOpen(true)} className="lg:hidden">☰</Button>
              {topBar && <div className="flex flex-1 items-center justify-end gap-2">{topBar}</div>}
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
        </div>
      </div>
      <Drawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} title="Navigation" side="left">
        <GlobalNav groups={groups} activeId={activeId} collapsed={false} logo={logo} footer={footer}
          className="h-auto w-full border border-border rounded-xl overflow-hidden" />
      </Drawer>
    </div>
  );
}`,
      variants: [
        {
          title: 'Tam sayfa shell',
          layout: 'stack' as const,
          preview: <AppShellDemo />,
          code: `<AppShell
  groups={groups}
  activeId={activeId}
  logo={<span className="font-black text-primary">Acme</span>}
  topBar={<UserMenu user={currentUser} />}
>
  <h1 className="text-xl font-bold">Dashboard</h1>
</AppShell>`,
        },
      ],
    },
    // ── DashboardShell entry yerine gelecek ─────────────────────────────────
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

export function DashboardTopBar({ searchable, searchPlaceholder = 'Search…', actions, user, userMenuItems }) {
  return (
    <div className="flex items-center gap-3 flex-1">
      {searchable && (
        <div className="hidden sm:block flex-1 max-w-xs">
          <SearchBar placeholder={searchPlaceholder} />
        </div>
      )}
      <div className={cn('flex items-center gap-1', !searchable && 'ml-auto')}>
        {actions}
        {user && <UserMenu user={user} items={userMenuItems} align="right" />}
      </div>
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
      actions={<Button variant="ghost" size="sm" iconOnly aria-label="Notifications">🔔</Button>}
      user={{
        userId: 'u1',
        email: 'jane@acme.com',
        userRole: 'Admin',
        userStatus: 'ACTIVE',
        userPreferences: null,
        userProfile: { name: 'Jane Doe', profilePicture: null },
      }}
    />
  }
>
  {/* page content */}
</DashboardShell>`,
        },
      ],
    },
    {
      id: 'user-menu',
      title: 'UserMenu',
      category: 'App',
      abbr: 'UM',
      description: 'Avatar + isim + rol gösteren trigger\'a tıklayınca açılan kullanıcı dropdown\'ı. Dropdown başlığında kullanıcının adı ve e-postası yer alır. items prop\'u ile özelleştirilebilir.',
      filePath: 'modules/app/UserMenu.tsx',
      sourceCode: `'use client';
import { Avatar } from '@/modules/ui/Avatar';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';

export function UserMenu({ user, items, align = 'right' }) {
  const displayName = user.userProfile?.name ?? user.name ?? user.email;
  const avatar      = user.userProfile?.profilePicture ?? null;

  const defaultItems = items ?? [
    { type: 'item', label: 'Profile',  icon: '👤' },
    { type: 'item', label: 'Settings', icon: '⚙️' },
    { type: 'separator' },
    { type: 'item', label: 'Sign out', icon: '↩️', danger: true },
  ];

  const header = (
    <div className="px-3 py-2.5">
      <p className="text-sm font-semibold text-text-primary truncate">{displayName}</p>
      <p className="text-xs text-text-secondary truncate">{user.email}</p>
    </div>
  );

  const trigger = (
    <button type="button" className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
      <Avatar src={avatar} name={displayName} size="sm" />
      <div className="hidden sm:block text-left min-w-0">
        <p className="text-sm font-medium text-text-primary truncate max-w-[8rem]">{displayName}</p>
        <p className="text-xs text-text-secondary truncate">{user.userRole}</p>
      </div>
      <span aria-hidden="true" className="text-text-disabled text-xs hidden sm:block">▾</span>
    </button>
  );

  return <DropdownMenu trigger={trigger} items={defaultItems} header={header} align={align} />;
}`,
      variants: [
        {
          title: 'Varsayılan (isim + e-posta + rol)',
          preview: <UserMenuDefaultDemo />,
          code: `<UserMenu
  user={{
    userId: 'u1',
    email: 'jane@acme.com',
    userRole: 'Admin',
    userStatus: 'ACTIVE',
    userPreferences: null,
    userProfile: { name: 'Jane Doe', profilePicture: null },
  }}
/>`,
        },
        {
          title: 'Özel items + badge',
          preview: <UserMenuCustomDemo />,
          code: `<UserMenu
  user={{
    userId: 'u2',
    email: 'john@acme.com',
    userRole: 'Editor',
    userStatus: 'ACTIVE',
    userPreferences: null,
    userProfile: { name: 'John Smith', profilePicture: null },
  }}
  items={[
    { label: 'View Profile',  icon: '👤', onClick: () => {} },
    { label: 'Billing',       icon: '💳', onClick: () => {} },
    { label: 'Team Settings', icon: '👥', onClick: () => {} },
    { type: 'separator' },
    { label: 'Sign out',      icon: '↩️', danger: true, onClick: () => {} },
  ]}
/>`,
        },
      ],
    },
    // ── Navigation sidebars ────────────────────────────────────────────────────
    {
      id: 'global-nav',
      title: 'GlobalNav',
      category: 'App',
      abbr: 'GN',
      description: 'Daraltılabilir sidebar navigasyon. logo, groups, footer slotları; collapsed prop ile ikonlu moda geçer. AppShell\'in masaüstü kenar çubuğu olarak kullanılır.',
      filePath: 'modules/app/GlobalNav.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function GlobalNav({ groups, activeId, collapsed = false, onCollapse, logo, footer, className }) {
  return (
    <nav className={cn('flex flex-col h-full bg-surface-raised border-r border-border transition-all duration-200',
      collapsed ? 'w-14' : 'w-56', className)}>
      <div className={cn('flex items-center gap-2 px-3 py-4 border-b border-border', collapsed ? 'justify-center' : 'justify-between')}>
        {!collapsed && logo && <div className="flex-1">{logo}</div>}
        {onCollapse && (
          <button onClick={() => onCollapse(!collapsed)}
            className="p-1 rounded hover:bg-surface-overlay text-text-secondary">
            <span className={cn('block text-lg transition-transform', collapsed ? 'rotate-180' : '')}>‹</span>
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-4">
        {groups.map((group) => (
          <div key={group.id}>
            {group.label && !collapsed && (
              <p className="px-3 mb-1 text-[10px] font-semibold text-text-disabled uppercase tracking-wider">{group.label}</p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <button key={item.id} type="button" onClick={item.onClick}
                  className={cn('flex items-center gap-2.5 rounded-md px-3 py-2 text-sm w-full text-left',
                    activeId === item.id ? 'bg-primary-subtle text-primary font-medium' : 'text-text-secondary hover:bg-surface-overlay')}>
                  {item.icon && <span aria-hidden="true" className="shrink-0 w-4 h-4 flex items-center justify-center">{item.icon}</span>}
                  {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                  {!collapsed && item.badge != null && (
                    <span className="ml-auto text-[10px] font-semibold bg-primary text-primary-fg rounded-full px-1.5 py-0.5">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {footer && <div className={cn('border-t border-border px-2 py-3', collapsed ? 'flex justify-center' : '')}>{footer}</div>}
    </nav>
  );
}`,
      variants: [
        {
          title: 'Açık sidebar',
          layout: 'stack' as const,
          preview: <GlobalNavDemo />,
          code: `<GlobalNav
  groups={groups}
  activeId={activeId}
  collapsed={false}
  onCollapse={setCollapsed}
  logo={<span className="font-bold text-primary">Acme</span>}
  footer={<Avatar name="Jane Doe" size="sm" status="online" />}
/>`,
        },
        {
          title: 'Daraltılmış (icon-only)',
          layout: 'stack' as const,
          preview: <GlobalNavCollapsedDemo />,
          code: `<GlobalNav
  groups={groups}
  activeId={activeId}
  collapsed={true}
  onCollapse={setCollapsed}
/>`,
        },
      ],
    },
    {
      id: 'app-sidebar',
      title: 'AppSidebar',
      category: 'App',
      abbr: 'Ab',
      description: 'Workspace switcher + arama + daralt/genişlet + badge\'li nav item\'lar + alt kısımda kullanıcı bilgisi içeren tam donanımlı kenar çubuğu.',
      filePath: 'modules/app/AppSidebar.tsx',
      sourceCode: `'use client';
import { useState } from 'react';
import { Badge } from '@/modules/ui/Badge';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Avatar } from '@/modules/ui/Avatar';
import { Toggle } from '@/modules/ui/Toggle';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';

const NAV_ITEMS = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard', count: 0 },
  { id: 'projects',  icon: '📁', label: 'Projects',   count: 5 },
  { id: 'tasks',     icon: '✅', label: 'Tasks',      count: 12 },
];

export function AppSidebar({ activeItem = 'dashboard', workspaceName = 'Acme Corp' }) {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive]       = useState(activeItem);
  const [query, setQuery]         = useState('');
  const filtered = NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={\`flex flex-col border border-border rounded-xl bg-surface-raised overflow-hidden transition-all \${collapsed ? 'w-16' : 'w-56'}\`}>
      {/* Workspace switcher */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-border">
        {!collapsed && (
          <DropdownMenu trigger={<button className="text-sm font-semibold text-text-primary">{workspaceName} ▾</button>}
            items={[{ label: 'Acme Corp' }, { label: 'Side Project' }, { type: 'separator' }, { label: '+ Add workspace' }]} />
        )}
      </div>
      <div className="px-3 py-2 border-b border-border">
        <Toggle id="collapse" label="Collapsed view" checked={collapsed} onChange={setCollapsed} size="sm" />
      </div>
      {!collapsed && (
        <div className="px-3 py-2 border-b border-border">
          <SearchBar id="sidebar-search" placeholder="Filter nav…" value={query} onChange={setQuery} />
        </div>
      )}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {filtered.map((item) => (
          <button key={item.id} type="button" onClick={() => setActive(item.id)}
            className={\`w-full flex items-center gap-2 rounded-md text-sm transition-colors \${collapsed ? 'justify-center px-2 py-2' : 'px-3 py-2'}
              \${active === item.id ? 'bg-primary-subtle text-primary font-semibold' : 'text-text-primary hover:bg-surface-overlay'}\`}>
            <span>{item.icon}</span>
            {!collapsed && <><span className="flex-1 text-left">{item.label}</span>{item.count > 0 && <Badge variant="neutral" size="sm">{item.count}</Badge>}</>}
          </button>
        ))}
      </nav>
      <div className={\`border-t border-border px-3 py-3 flex items-center gap-2 \${collapsed ? 'justify-center' : ''}\`}>
        <Avatar name="Alice Johnson" size="sm" status="online" />
        {!collapsed && <p className="text-xs font-semibold text-text-primary truncate">Alice Johnson</p>}
      </div>
    </div>
  );
}`,
      variants: [
        {
          title: 'Tam sidebar (workspace + arama + badge)',
          layout: 'stack' as const,
          preview: <AppSidebarDemo />,
          code: `<AppSidebar workspaceName="Acme Corp" activeItem="dashboard" />`,
        },
      ],
    },
    {
      id: 'dashboard-sidebar',
      title: 'DashboardSidebar',
      category: 'App',
      abbr: 'Ds',
      description: 'DashboardShell ile birlikte kullanılan minimal kenar çubuğu. navItems veya navGroups alır, footer slotu ile kullanıcı bilgisi gösterilebilir.',
      filePath: 'modules/app/DashboardSidebar.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';

export function DashboardSidebar({ navGroups, navItems, activeId, onSelect, footer, className }) {
  const groups = navGroups ?? (navItems ? [{ items: navItems }] : []);
  return (
    <div className={cn('flex flex-col flex-1 min-h-0', className)}>
      <div className="flex-1 overflow-y-auto px-2 py-3">
        {groups.map((group, gi) => (
          <div key={group.label ?? gi} className="mb-4">
            {group.label && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-disabled px-3 mb-1">{group.label}</p>
            )}
            {group.items.map((item) => (
              <button key={item.id} type="button"
                aria-current={item.id === activeId ? 'page' : undefined}
                onClick={() => onSelect?.(item.id)}
                className={cn('w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                  item.id === activeId ? 'bg-primary-subtle text-primary font-medium' : 'text-text-secondary hover:bg-surface-overlay')}>
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
}`,
      variants: [
        {
          title: 'navItems (düz liste)',
          layout: 'stack' as const,
          preview: <DashboardSidebarDemo />,
          code: `<DashboardSidebar
  navItems={navItems}
  activeId={activeId}
  onSelect={setActiveId}
  footer={
    <div className="p-3 flex items-center gap-2">
      <Avatar name="Jane Doe" size="sm" status="online" />
      <p className="text-xs font-semibold">Jane Doe</p>
    </div>
  }
/>`,
        },
        {
          title: 'navGroups (bölümlü)',
          layout: 'stack' as const,
          preview: <DashboardSidebarGroupsDemo />,
          code: `<DashboardSidebar
  navGroups={[
    { label: 'Main',     items: mainItems },
    { label: 'Settings', items: settingsItems },
  ]}
  activeId={activeId}
  onSelect={setActiveId}
/>`,
        },
      ],
    },
    // ── Top bars ───────────────────────────────────────────────────────────────
    {
      id: 'app-top-bar',
      title: 'AppTopBar',
      category: 'App',
      abbr: 'AT',
      description: 'Arama + bildirim badge\'i + kullanıcı dropdown\'ı + mobil nav drawer\'ı tek bileşende toplayan zengin üst çubuk.',
      filePath: 'modules/app/AppTopBar.tsx',
      sourceCode: `'use client';
import { useState } from 'react';
import { Button } from '@/modules/ui/Button';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';
import { Drawer } from '@/modules/ui/Drawer';

export function AppTopBar({ pageTitle = 'Dashboard', userName = 'Alice Johnson', notificationCount = 4 }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="relative w-full">
      <div className="flex items-center gap-3 px-4 py-3 border border-border rounded-xl bg-surface-raised">
        <Button variant="ghost" size="sm" iconOnly aria-label="Open navigation"
          onClick={() => setDrawerOpen(true)}>☰</Button>
        <span className="text-base font-semibold text-text-primary hidden sm:block">{pageTitle}</span>
        <div className="flex-1 flex justify-center">
          <SearchBar id="topbar-search" placeholder="Search anything…" className="max-w-xs w-full" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Button variant="ghost" size="sm" iconOnly aria-label="Notifications">🔔</Button>
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5">
                <Badge variant="error" size="sm">{notificationCount}</Badge>
              </span>
            )}
          </div>
          <DropdownMenu align="right"
            trigger={<button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-surface-overlay">
              <Avatar name={userName} size="sm" /><span className="text-sm font-medium hidden sm:block">{userName}</span><span>▾</span>
            </button>}
            items={[{ label: 'Profile', icon: '👤' }, { label: 'Settings', icon: '⚙️' },
              { type: 'separator' }, { label: 'Sign out', icon: '↩️', danger: true }]}
          />
        </div>
      </div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Navigation">
        {/* nav items */}
      </Drawer>
    </div>
  );
}`,
      variants: [
        {
          title: 'Tam top bar (arama + bildirim + kullanıcı)',
          layout: 'stack' as const,
          preview: <AppTopBarDemo />,
          code: `<AppTopBar
  pageTitle="Dashboard"
  userName="Alice Johnson"
  notificationCount={4}
/>`,
        },
      ],
    },
    {
      id: 'dashboard-top-bar',
      title: 'DashboardTopBar',
      category: 'App',
      abbr: 'DT',
      description: 'DashboardShell\'in header slotuna geçilen minimal üst çubuk. İsteğe bağlı arama, actions slotu ve SafeUser alarak UserMenu render eden user prop\'u içerir.',
      filePath: 'modules/app/DashboardTopBar.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { SearchBar } from '@/modules/ui/SearchBar';
import { UserMenu, type SafeUser } from '@/modules/app/UserMenu';
import { type DropdownItem } from '@/modules/ui/DropdownMenu';

export function DashboardTopBar({ searchable, searchPlaceholder = 'Search…', actions, user, userMenuItems, className }) {
  return (
    <div className={cn('flex items-center gap-3 flex-1', className)}>
      {searchable && (
        <div className="hidden sm:block flex-1 max-w-xs">
          <SearchBar placeholder={searchPlaceholder} />
        </div>
      )}
      <div className={cn('flex items-center gap-1', !searchable && 'ml-auto')}>
        {actions}
        {user && <UserMenu user={user} items={userMenuItems} align="right" />}
      </div>
    </div>
  );
}`,
      variants: [
        {
          title: 'Arama + bildirim + kullanıcı menüsü',
          layout: 'stack' as const,
          preview: <DashboardTopBarDemo />,
          code: `<DashboardTopBar
  searchable
  actions={<Button variant="ghost" size="sm" iconOnly aria-label="Notifications">🔔</Button>}
  user={currentUser}
/>`,
        },
        {
          title: 'Minimal (action + kullanıcı)',
          layout: 'stack' as const,
          preview: <DashboardTopBarMinimalDemo />,
          code: `<DashboardTopBar
  actions={<Button variant="primary" size="sm">New project</Button>}
  user={currentUser}
/>`,
        },
      ],
    },
    // ── Secondary navbars ──────────────────────────────────────────────────────
    {
      id: 'app-nav',
      title: 'AppNav',
      category: 'App',
      abbr: 'AN',
      description: 'Ana nav (ButtonGroup) + section dropdown + breadcrumb\'ı tek bileşende birleştiren yatay navigasyon çubuğu.',
      filePath: 'modules/app/AppNav.tsx',
      sourceCode: `'use client';
import { useState } from 'react';
import { ButtonGroup } from '@/modules/ui/ButtonGroup';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';
import { Button } from '@/modules/ui/Button';

const NAV_ITEMS   = [{ value: 'dashboard', label: 'Dashboard' }, { value: 'projects', label: 'Projects' }];
const SUBNAV_MAP  = { dashboard: [{ label: 'Overview' }, { label: 'Analytics' }] };
const BREADCRUMBS = { dashboard: [{ label: 'Home', href: '#' }, { label: 'Dashboard' }] };

export function AppNav({ activePath = 'dashboard', notificationCount = 0 }) {
  const [active, setActive] = useState(activePath);
  return (
    <div className="w-full border border-border rounded-xl overflow-hidden bg-surface-raised">
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border bg-surface-overlay">
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-base font-bold text-text-primary">Acme</span>
        </div>
        <div className="flex-1 flex justify-center">
          <ButtonGroup items={NAV_ITEMS} value={active} onChange={setActive} variant="ghost" size="sm" />
        </div>
        <DropdownMenu align="right"
          trigger={<Button variant="outline" size="sm" iconRight={<span>▾</span>}>Section</Button>}
          items={SUBNAV_MAP[active] ?? []}
        />
      </div>
      <div className="px-4 py-2 bg-surface-base">
        <Breadcrumb items={BREADCRUMBS[active] ?? []} />
      </div>
    </div>
  );
}`,
      variants: [
        {
          title: 'Ana nav + subnav dropdown + breadcrumb',
          layout: 'stack' as const,
          preview: <AppNavDemo />,
          code: `<AppNav activePath="dashboard" notificationCount={2} />`,
        },
      ],
    },
  ];
}
