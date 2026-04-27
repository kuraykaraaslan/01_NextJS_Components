'use client';
import { AppShell } from '@/modules/app/AppShell';
import { AppSidebar } from '@/modules/app/AppSidebar';
import { AppTopBar } from '@/modules/app/AppTopBar';
import { UserMenu } from '@/modules/domains/common/user/UserMenu';
import { GlobalSearch } from '@/modules/app/GlobalSearch';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import { useState, type ComponentProps } from 'react';
import type { ShowcaseComponent } from '../showcase.types';

const DEMO_USER: ComponentProps<typeof UserMenu>['user'] = {
  userId: 'demo-1',
  email: 'jane@acme.com',
  userRole: 'ADMIN',
  userStatus: 'ACTIVE',
  userProfile: { name: 'Jane Doe', profilePicture: null },
};

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { id: 'analytics', label: 'Analytics',  icon: '📈', badge: 3 },
      { id: 'projects',  label: 'Projects',   icon: '📁' },
      { id: 'tasks',     label: 'Tasks',      icon: '✅', badge: 12 },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'team',     label: 'Team',     icon: '👥' },
      { id: 'billing',  label: 'Billing',  icon: '💳' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ],
  },
];

function AppShellFullDemo() {
  const [activeId, setActiveId] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const allItems = NAV_GROUPS.flatMap((g) => g.items);
  const activeLabel = allItems.find((i) => i.id === activeId)?.label ?? '';

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border" style={{ height: 480 }}>
      <AppShell
        logo={<span className="text-base font-black text-primary tracking-tight">Acme</span>}
        compactLogo={<span className="text-sm font-black text-primary">A</span>}
        sidebarCollapsed={sidebarCollapsed}
        sidebar={
          <AppSidebar
            navGroups={NAV_GROUPS}
            activeId={activeId}
            onSelect={setActiveId}
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
            footer={({ collapsed }) => (
              <div className={collapsed ? 'p-3 flex items-center justify-center' : 'p-3 flex items-center gap-2'}>
                <Avatar name="Jane Doe" size="sm" status="online" />
                {!collapsed && (
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-text-primary truncate">Jane Doe</p>
                    <p className="text-[10px] text-text-secondary truncate">Admin</p>
                  </div>
                )}
              </div>
            )}
          />
        }
        topbar={
          <AppTopBar>
            <GlobalSearch onSearch={() => {}} onSelect={() => {}} className="flex-1 max-w-sm hidden sm:block" />
            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="sm" iconOnly aria-label="Notifications">🔔</Button>
              <UserMenu user={DEMO_USER} />
            </div>
          </AppTopBar>
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
              { label: 'Revenue',  value: '$48,295', delta: '+12%' },
              { label: 'Users',    value: '3,842',   delta: '+4%'  },
              { label: 'Tasks',    value: '24',      delta: '-8%'  },
            ].map((stat) => (
              <Card key={stat.label} variant="raised">
                <p className="text-xs text-text-secondary">{stat.label}</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                <p className="text-xs text-success-fg mt-0.5">{stat.delta} this month</p>
              </Card>
            ))}
          </div>
        </div>
      </AppShell>
    </div>
  );
}

function AppShellMinimalDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border" style={{ height: 320 }}>
      <AppShell
        topbar={
          <AppTopBar logo={<span className="font-bold text-primary">Acme</span>}>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="primary" size="sm">New project</Button>
              <UserMenu user={DEMO_USER} />
            </div>
          </AppTopBar>
        }
        className="h-full min-h-0"
      >
        <p className="text-sm text-text-secondary">Sidebar olmadan sadece topbar + main content.</p>
      </AppShell>
    </div>
  );
}

function AppSidebarExpandedDemo() {
  const [activeId, setActiveId] = useState('dashboard');
  return (
    <div className="flex justify-center py-4">
      <div className="border border-border rounded-xl overflow-hidden bg-surface-raised flex" style={{ height: 420 }}>
        <AppSidebar
          navGroups={NAV_GROUPS}
          activeId={activeId}
          onSelect={setActiveId}
          footer={({ collapsed }) => (
            <div className={collapsed ? 'p-3 flex items-center justify-center' : 'p-3 flex items-center gap-2'}>
              <Avatar name="Jane Doe" size="sm" status="online" />
              {!collapsed && (
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-text-primary truncate">Jane Doe</p>
                  <Badge variant="primary" size="sm">Admin</Badge>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}

function AppSidebarCollapsedDemo() {
  const [activeId, setActiveId] = useState('dashboard');
  return (
    <div className="flex justify-center py-4">
      <div className="border border-border rounded-xl overflow-hidden bg-surface-raised flex" style={{ height: 420 }}>
        <AppSidebar
          navGroups={NAV_GROUPS}
          activeId={activeId}
          onSelect={setActiveId}
          defaultCollapsed
        />
      </div>
    </div>
  );
}

function AppTopBarSearchDemo() {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex items-center h-14 px-4 bg-surface-raised">
        <AppTopBar>
          <GlobalSearch onSearch={() => {}} onSelect={() => {}} className="flex-1 max-w-sm hidden sm:block" />
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="sm" iconOnly aria-label="Notifications">🔔</Button>
            <Button variant="ghost" size="sm" iconOnly aria-label="Settings">⚙️</Button>
            <UserMenu user={DEMO_USER} />
          </div>
        </AppTopBar>
      </div>
    </div>
  );
}

function AppTopBarLogoDemo() {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex items-center h-14 px-4 bg-surface-raised">
        <AppTopBar logo={<span className="font-black text-primary text-lg">Acme</span>}>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="primary" size="sm">Upgrade</Button>
            <UserMenu user={DEMO_USER} />
          </div>
        </AppTopBar>
      </div>
    </div>
  );
}

export function buildAppShellData(): ShowcaseComponent[] {
  return [
    {
      id: 'app-shell',
      title: 'AppShell',
      category: 'App',
      abbr: 'AS',
      description: 'Saf layout wrapper. logo, sidebar ve topbar slotlarına component geçilir. Masaüstünde sidebar aside olarak gösterilir, mobilde NavDrawer ile açılır.',
      filePath: 'modules/app/AppShell.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function AppShell({ logo, compactLogo, sidebarCollapsed = false, sidebar, topbar, children, className, ...rest }) {
  const logoContent = sidebarCollapsed && compactLogo ? compactLogo : (logo ?? compactLogo);

  return (
    <div className={cn('flex h-screen overflow-hidden bg-surface-base', className)} {...rest}>
      {sidebar && (
        <aside className="relative hidden lg:flex flex-col h-full min-h-0 shrink-0 border-r border-border bg-surface-raised">
          {logoContent && (
            <div className={cn(
              'absolute inset-x-0 top-0 z-10 flex items-center h-14 border-b border-border bg-surface-raised overflow-hidden',
              sidebarCollapsed && compactLogo ? 'justify-center px-2' : 'px-4'
            )}>{logoContent}</div>
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
}`,
      variants: [
        {
          title: 'Sidebar + topbar + content',
          layout: 'stack' as const,
          preview: <AppShellFullDemo />,
          code: `const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

<AppShell
  logo={<span className="font-black text-primary">Acme</span>}
  compactLogo={<span className="font-black text-primary">A</span>}
  sidebarCollapsed={sidebarCollapsed}
  sidebar={
    <AppSidebar
      navGroups={navGroups}
      activeId={activeId}
      onSelect={setActiveId}
      collapsed={sidebarCollapsed}
      onCollapsedChange={setSidebarCollapsed}
      footer={<Avatar name="Jane Doe" size="sm" status="online" />}
    />
  }
  topbar={
    <AppTopBar>
      <GlobalSearch onSearch={handleSearch} onSelect={handleSelect} className="flex-1 max-w-sm hidden sm:block" />
      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="sm" iconOnly>🔔</Button>
        <UserMenu user={currentUser} />
      </div>
    </AppTopBar>
  }
>
  {/* page content */}
</AppShell>`,
        },
        {
          title: 'Sadece topbar (sidebar yok)',
          layout: 'stack' as const,
          preview: <AppShellMinimalDemo />,
          code: `<AppShell
  topbar={
    <AppTopBar logo={<span className="font-bold text-primary">Acme</span>}>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="primary" size="sm">New project</Button>
        <UserMenu user={currentUser} />
      </div>
    </AppTopBar>
  }
>
  {/* page content */}
</AppShell>`,
        },
      ],
    },
    {
      id: 'app-sidebar',
      title: 'AppSidebar',
      category: 'App',
      abbr: 'Ab',
      description: 'Daraltılabilir kenar çubuğu. navGroups veya navItems alır; collapsed toggle dahili. footer slotu ile kullanıcı bilgisi veya herhangi bir içerik gösterilebilir.',
      filePath: 'modules/app/AppSidebar.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { Badge } from '@/modules/ui/Badge';

export function AppSidebar({ navGroups, navItems, activeId, onSelect, collapsed, defaultCollapsed = false, onCollapsedChange, footer, className, ...rest }) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = collapsed ?? internalCollapsed;
  const groups = navGroups ?? (navItems ? [{ items: navItems }] : []);
  const footerContent = typeof footer === 'function' ? footer({ collapsed: isCollapsed }) : footer;

  const setCollapsed = (next) => {
    if (collapsed === undefined) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  return (
    <div data-collapsed={isCollapsed ? 'true' : 'false'} className={cn('flex flex-col flex-1 min-h-0 transition-all duration-200', isCollapsed ? 'w-14' : 'w-56', className)} {...rest}>
      <div className={cn('flex items-center px-2 py-2 border-b border-border', isCollapsed ? 'justify-center' : 'justify-end')}>
        <button type="button" onClick={() => setCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1.5 rounded text-text-secondary hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
          <span aria-hidden="true" className={cn('block text-lg transition-transform', isCollapsed ? 'rotate-180' : '')}>‹</span>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4 sidebar-scrollbar-hover" aria-label="Sidebar navigation">
        {groups.map((group, gi) => (
          <div key={group.label ?? gi}>
            {group.label && !isCollapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-disabled px-3 mb-1">{group.label}</p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <button key={item.id} type="button"
                  aria-current={item.id === activeId ? 'page' : undefined}
                  title={isCollapsed ? item.label : undefined}
                  onClick={() => onSelect?.(item.id)}
                  className={cn('w-full flex items-center gap-2.5 rounded-lg text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                    isCollapsed ? 'justify-center px-2 py-2' : 'px-3 py-2 text-left',
                    item.id === activeId ? 'bg-primary-subtle text-primary font-medium' : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay')}>
                  {item.icon && <span aria-hidden="true" className="shrink-0 w-5 text-center text-[15px] leading-none">{item.icon}</span>}
                  {!isCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                  {!isCollapsed && item.badge > 0 && <Badge variant="primary" size="sm">{item.badge}</Badge>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
      {footerContent != null && (
        <div className={cn('border-t border-border shrink-0', isCollapsed ? 'flex justify-center px-2 py-3' : '')}>{footerContent}</div>
      )}
    </div>
  );
}`,
      variants: [
        {
          title: 'Açık (grouped nav + footer)',
          layout: 'stack' as const,
          preview: <AppSidebarExpandedDemo />,
          code: `<AppSidebar
  navGroups={[
    { label: 'Main',     items: mainItems },
    { label: 'Settings', items: settingsItems },
  ]}
  activeId={activeId}
  onSelect={setActiveId}
  footer={({ collapsed }) => (
    <div className={collapsed ? 'p-3 flex items-center justify-center' : 'p-3 flex items-center gap-2'}>
      <Avatar name="Jane Doe" size="sm" status="online" />
      {!collapsed && <p className="text-xs font-semibold">Jane Doe</p>}
    </div>
  )}
/>`,
        },
        {
          title: 'Daraltılmış (icon-only)',
          layout: 'stack' as const,
          preview: <AppSidebarCollapsedDemo />,
          code: `<AppSidebar
  navGroups={navGroups}
  activeId={activeId}
  onSelect={setActiveId}
  defaultCollapsed
/>`,
        },
      ],
    },
    {
      id: 'app-top-bar',
      title: 'AppTopBar',
      category: 'App',
      abbr: 'AT',
      description: 'AppShell\'in header slotuna geçilen üst çubuk wrapper\'ı. logo slotu sol tarafa; children (GlobalSearch, UserMenu, Button vb.) flex satırda sıralanır.',
      filePath: 'modules/app/AppTopBar.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function AppTopBar({ logo, children, className, ...rest }) {
  return (
    <div className={cn('flex items-center gap-3 flex-1', className)} {...rest}>
      {logo && <div className="shrink-0">{logo}</div>}
      {children}
    </div>
  );
}`,
      variants: [
        {
          title: 'Arama + actions + kullanıcı',
          layout: 'stack' as const,
          preview: <AppTopBarSearchDemo />,
          code: `<AppTopBar>
  <GlobalSearch
    onSearch={handleSearch}
    onSelect={handleSelect}
    className="flex-1 max-w-sm hidden sm:block"
  />
  <div className="ml-auto flex items-center gap-1">
    <Button variant="ghost" size="sm" iconOnly aria-label="Notifications">🔔</Button>
    <Button variant="ghost" size="sm" iconOnly aria-label="Settings">⚙️</Button>
    <UserMenu user={currentUser} />
  </div>
</AppTopBar>`,
        },
        {
          title: 'Logo + action + kullanıcı',
          layout: 'stack' as const,
          preview: <AppTopBarLogoDemo />,
          code: `<AppTopBar logo={<span className="font-black text-primary text-lg">Acme</span>}>
  <div className="ml-auto flex items-center gap-2">
    <Button variant="primary" size="sm">Upgrade</Button>
    <UserMenu user={currentUser} />
  </div>
</AppTopBar>`,
        },
      ],
    },
  ];
}
