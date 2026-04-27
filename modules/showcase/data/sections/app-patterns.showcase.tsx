'use client';
import { AppShell } from '@/modules/app/AppShell';
import { AppSidebar } from '@/modules/app/AppSidebar';
import { AppTopBar } from '@/modules/app/AppTopBar';
import { AppNav } from '@/modules/app/AppNav';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { UserMenu } from '@/modules/app/UserMenu';
import { GlobalSearch, type SearchResult } from '@/modules/app/GlobalSearch';
import { AppCommandBar, type CommandItem } from '@/modules/app/AppCommandBar';
import { Form } from '@/modules/app/Form';
import { Input } from '@/modules/ui/Input';
import { Select } from '@/modules/ui/Select';
import { MultiSelect } from '@/modules/ui/MultiSelect';
import { Toggle } from '@/modules/ui/Toggle';
import { Textarea } from '@/modules/ui/Textarea';
import { FilterBar, type FilterField, type FilterValues } from '@/modules/app/FilterBar';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import { useState } from 'react';
import type { ShowcaseComponent } from '../showcase.types';

// ── Shared demo data ────────────────────────────────────────────────────────

const DEMO_USER = {
  userId: 'demo-1',
  email: 'jane@acme.com',
  userRole: 'Admin',
  userStatus: 'ACTIVE',
  userPreferences: null,
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

const NAV_ITEMS = [
  { label: 'Home',     href: '#', active: true },
  { label: 'Products', href: '#' },
  { label: 'Pricing',  href: '#' },
  { label: 'Blog',     href: '#' },
];

const SEARCH_RESULTS: SearchResult[] = [
  { id: 'dash', label: 'Dashboard', description: 'Overview page', icon: '🏠', category: 'Pages' },
  { id: 'users', label: 'Users', description: 'Manage team members', icon: '👥', category: 'Pages' },
  { id: 'billing', label: 'Billing', description: 'Invoices and plans', icon: '💳', category: 'Settings' },
  { id: 'audit', label: 'Audit Logs', description: 'Security and activity logs', icon: '🧾', category: 'Settings' },
  { id: 'new-project', label: 'Create Project', description: 'Quick action', icon: '➕', category: 'Actions' },
];

const FILTER_FIELDS: FilterField[] = [
  {
    type: 'select',
    id: 'status',
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'invited', label: 'Invited' },
      { value: 'suspended', label: 'Suspended' },
    ],
    placeholder: 'All statuses',
  },
  {
    type: 'multiselect',
    id: 'role',
    label: 'Role',
    options: [
      { value: 'admin', label: 'Admin' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
    ],
    placeholder: 'Any role',
  },
  { type: 'daterange', id: 'period', label: 'Created at' },
  { type: 'tags', id: 'tags', label: 'Tags', placeholder: 'Add filter tag…' },
];

const INITIAL_FILTER_VALUES: FilterValues = {
  status: '',
  role: [],
  period: { start: null, end: null },
  tags: [],
};

// ── Demo components ─────────────────────────────────────────────────────────

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

function AppNavMarketingDemo() {
  return (
    <div className="rounded-xl overflow-hidden border border-border">
      <AppNav
        logo={<span className="text-base font-bold text-primary">Acme</span>}
        navItems={NAV_ITEMS}
      >
        <Button variant="ghost" size="sm">Log in</Button>
        <Button variant="primary" size="sm">Sign up</Button>
      </AppNav>
      <div className="px-6 py-6 text-sm text-text-secondary bg-surface-base">
        Page content — resize window to see mobile hamburger.
      </div>
    </div>
  );
}

function AppNavAppDemo() {
  return (
    <div className="rounded-xl overflow-hidden border border-border">
      <AppNav
        logo={<span className="font-bold text-text-primary">Dashboard</span>}
        navItems={[
          { label: 'Overview',  active: true },
          { label: 'Analytics' },
          { label: 'Reports'   },
          { label: 'Settings'  },
        ]}
      >
        <UserMenu user={DEMO_USER} />
      </AppNav>
      <div className="px-6 py-6 text-sm text-text-secondary bg-surface-base">Page content</div>
    </div>
  );
}

function NavDrawerLeftDemo() {
  return (
    <NavDrawer
      title="Navigation"
      side="left"
      trigger={<Button variant="outline" iconLeft={<span>☰</span>}>Open menu</Button>}
      footer={<Button variant="ghost" size="sm" fullWidth>Sign out</Button>}
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
      trigger={<Button variant="outline">🛒 Cart (3)</Button>}
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
        user={{
          userId: 'demo-2',
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
      />
    </div>
  );
}

function GlobalSearchStandaloneDemo() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState('Nothing selected');

  function handleSearch(query: string) {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }
    setResults(
      SEARCH_RESULTS.filter((item) => (
        item.label.toLowerCase().includes(q)
        || item.description?.toLowerCase().includes(q)
        || item.category?.toLowerCase().includes(q)
      ))
    );
  }

  return (
    <div className="w-full max-w-xl space-y-2">
      <GlobalSearch
        placeholder="Search pages and actions…"
        results={results}
        onSearch={handleSearch}
        onSelect={(item) => setSelected(item.label)}
      />
      <p className="text-xs text-text-secondary">Selected: {selected}</p>
    </div>
  );
}

function GlobalSearchLoadingDemo() {
  return (
    <div className="w-full max-w-xl">
      <GlobalSearch
        placeholder="Type to search (loading demo)…"
        loading
        results={SEARCH_RESULTS}
        onSearch={() => {}}
        onSelect={() => {}}
      />
    </div>
  );
}

function AppCommandBarDemo({ custom }: { custom?: boolean }) {
  const customItems: CommandItem[] = [
    { icon: '🛍️', label: 'View Orders',     shortcut: 'G O', category: 'Navigation' },
    { icon: '📦', label: 'Inventory',       shortcut: 'G I', category: 'Navigation' },
    { icon: '💰', label: 'New Sale',        shortcut: '⌘N',  category: 'Actions', onClick: () => {} },
    { icon: '📊', label: 'Export Report',   shortcut: '⌘E',  category: 'Actions', onClick: () => {} },
    { icon: '🕐', label: 'Order #1042',     category: 'Recent' },
    { icon: '🕑', label: 'Customer: Acme',  category: 'Recent' },
  ];

  return (
    <AppCommandBar
      items={custom ? customItems : undefined}
      onSelect={() => {}}
    />
  );
}

function FormDemo({ columns }: { columns: 1 | 2 }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [stack, setStack] = useState<string[]>(['next', 'ts']);
  const [description, setDescription] = useState('');
  const [notify, setNotify] = useState(true);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nameErr = !name.trim() ? 'Project name is required.' : '';
    const emailErr = !email.includes('@') ? 'Valid email is required.' : '';
    setNameError(nameErr);
    setEmailError(emailErr);
    if (nameErr || emailErr) {
      setFormError('Please fix the errors above before saving.');
      return;
    }
    setFormError('');
  }

  function handleCancel() {
    setName(''); setEmail(''); setVisibility('private');
    setStack(['next', 'ts']); setDescription(''); setNotify(true);
    setNameError(''); setEmailError(''); setFormError('');
  }

  return (
    <Form
      title="Create project"
      description="Fill in the details to create a new project."
      error={formError}
      columns={columns}
      onSubmit={handleSubmit}
      actions={
        <>
          <Button variant="outline" type="button" onClick={handleCancel}>Cancel</Button>
          <Button variant="primary" type="submit">Save project</Button>
        </>
      }
    >
      <Input id="name" label="Project name" placeholder="Acme Redesign" required value={name} onChange={(e) => setName(e.target.value)} error={nameError} />
      <Input id="email" label="Owner email" type="email" placeholder="owner@acme.com" required value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} />
      <Select id="visibility" label="Visibility" value={visibility} onChange={(e) => setVisibility(e.target.value)} options={[{ value: 'private', label: 'Private' }, { value: 'internal', label: 'Internal' }, { value: 'public', label: 'Public' }]} />
      <MultiSelect id="stack" label="Tech stack" value={stack} onChange={setStack} options={[{ value: 'next', label: 'Next.js' }, { value: 'react', label: 'React' }, { value: 'ts', label: 'TypeScript' }, { value: 'tailwind', label: 'Tailwind' }]} />
      <div className={columns === 2 ? 'sm:col-span-2' : ''}>
        <Textarea id="description" label="Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className={columns === 2 ? 'sm:col-span-2' : ''}>
        <Toggle id="notify" label="Send team notifications" description="Notify members after creation." checked={notify} onChange={setNotify} />
      </div>
    </Form>
  );
}

function FilterBarDemo({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<FilterValues>(INITIAL_FILTER_VALUES);
  const fields = compact ? FILTER_FIELDS.slice(0, 2) : FILTER_FIELDS;

  function handleReset() {
    setValues({
      status: '',
      role: [],
      period: { start: null, end: null },
      tags: [],
    });
  }

  return (
    <FilterBar
      fields={fields}
      values={values}
      onChange={(id, value) => setValues((prev) => ({ ...prev, [id]: value }))}
      onApply={() => {}}
      onReset={handleReset}
    />
  );
}

// ── Showcase data ────────────────────────────────────────────────────────────

export function buildAppPatternsData(): ShowcaseComponent[] {
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
    {
      id: 'app-nav',
      title: 'AppNav',
      category: 'App',
      abbr: 'AN',
      description: 'Yatay navigasyon çubuğu. Masaüstünde inline linkler, mobilde NavDrawer açan hamburger gösterir. logo, navItems, actions slotları var.',
      filePath: 'modules/app/AppNav.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { Button } from '@/modules/ui/Button';

export function AppNav({ logo, navItems = [], children, sticky = false, bordered = true, className, ...rest }) {
  return (
    <header className={cn('w-full flex items-center gap-3 px-4 py-3 bg-surface-raised',
      bordered && 'border-b border-border', sticky && 'sticky top-0 z-40', className)} {...rest}>
      <div className="md:hidden">
        <NavDrawer title="Navigation" side="left"
          trigger={<Button variant="ghost" size="sm" iconOnly aria-label="Open navigation menu">☰</Button>}>
          <nav className="flex flex-col gap-0.5 pt-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.label} href={item.href ?? '#'} aria-current={item.active ? 'page' : undefined}
                className={cn('flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  item.active ? 'bg-primary-subtle text-primary' : 'text-text-primary hover:bg-surface-overlay')}>
                {item.label}
              </a>
            ))}
          </nav>
        </NavDrawer>
      </div>
      {logo && <div className="shrink-0">{logo}</div>}
      <nav className="hidden md:flex items-center gap-0.5 flex-1" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href ?? '#'} aria-current={item.active ? 'page' : undefined}
            className={cn('px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              item.active ? 'bg-primary-subtle text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay')}>
            {item.label}
          </a>
        ))}
      </nav>
      {children && <div className="flex items-center gap-2 ml-auto shrink-0">{children}</div>}
    </header>
  );
}`,
      variants: [
        {
          title: 'Marketing bar (logo + links + CTA)',
          layout: 'stack' as const,
          preview: <AppNavMarketingDemo />,
          code: `<AppNav
  logo={<span className="font-bold text-primary">Acme</span>}
  navItems={[
    { label: 'Home',     href: '/', active: true },
    { label: 'Products', href: '/products' },
    { label: 'Pricing',  href: '/pricing' },
  ]}
>
  <Button variant="ghost" size="sm">Log in</Button>
  <Button variant="primary" size="sm">Sign up</Button>
</AppNav>`,
        },
        {
          title: 'App bar (links + UserMenu)',
          layout: 'stack' as const,
          preview: <AppNavAppDemo />,
          code: `<AppNav
  logo={<span className="font-bold">Dashboard</span>}
  navItems={[
    { label: 'Overview', active: true },
    { label: 'Analytics' },
    { label: 'Reports' },
  ]}
>
  <UserMenu user={currentUser} />
</AppNav>`,
        },
      ],
    },
    {
      id: 'nav-drawer',
      title: 'NavDrawer',
      category: 'App',
      abbr: 'ND',
      description: 'Herhangi bir trigger + children\'ı drawer içinde saran wrapper. Açık/kapalı state\'i kendi içinde tutar. AppNav\'ın mobil menüsü olarak kullanılır, bağımsız da çalışır.',
      filePath: 'modules/app/NavDrawer.tsx',
      sourceCode: `'use client';
import { useState } from 'react';
import { Drawer } from '@/modules/ui/Drawer';

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
          title: 'Sol nav (standalone)',
          preview: <NavDrawerLeftDemo />,
          code: `<NavDrawer
  title="Navigation"
  side="left"
  trigger={<Button variant="outline" iconLeft={<MenuIcon />}>Open menu</Button>}
  footer={<Button variant="ghost" size="sm" fullWidth>Sign out</Button>}
>
  <nav className="space-y-1 pt-1">
    <a href="/" className="block px-3 py-2.5 rounded-lg bg-primary-subtle text-primary text-sm">Home</a>
    <a href="/products" className="block px-3 py-2.5 rounded-lg text-text-primary hover:bg-surface-overlay text-sm">Products</a>
  </nav>
</NavDrawer>`,
        },
        {
          title: 'Sağ drawer (cart panel)',
          preview: <NavDrawerRightDemo />,
          code: `<NavDrawer
  title="Cart"
  side="right"
  trigger={<Button variant="outline">🛒 Cart (3)</Button>}
>
  {cartItems.map((item) => (
    <div key={item.id} className="flex justify-between text-sm py-2">
      <span>{item.name}</span><span>{item.price}</span>
    </div>
  ))}
  <Button variant="primary" fullWidth>Checkout</Button>
</NavDrawer>`,
        },
      ],
    },
    {
      id: 'user-menu',
      title: 'UserMenu',
      category: 'App',
      abbr: 'UM',
      description: 'Avatar + isim + rol gösteren trigger\'a tıklayınca açılan kullanıcı dropdown\'ı. SafeUser prop\'u alır; dropdown başlığında isim ve e-posta görünür.',
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
    <button type="button"
      className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
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
          title: 'Özel items',
          preview: <UserMenuCustomDemo />,
          code: `<UserMenu
  user={currentUser}
  items={[
    { label: 'View Profile',  icon: '👤', onClick: () => {} },
    { label: 'Billing',       icon: '💳', onClick: () => {} },
    { type: 'separator' },
    { label: 'Sign out',      icon: '↩️', danger: true, onClick: () => {} },
  ]}
/>`,
        },
      ],
    },
    {
      id: 'global-search',
      title: 'GlobalSearch',
      category: 'App',
      abbr: 'GS',
      description: 'Komut paleti benzeri global arama alanı. Kategori bazlı sonuç listesi, klavye navigasyonu ve sonuç seçimi destekler.',
      filePath: 'modules/app/GlobalSearch.tsx',
      sourceCode: `'use client';
import { GlobalSearch } from '@/modules/app/GlobalSearch';

export function Demo() {
  return (
    <GlobalSearch
      placeholder="Search…"
      results={results}
      onSearch={handleSearch}
      onSelect={handleSelect}
    />
  );
}`,
      variants: [
        {
          title: 'Interactive results',
          layout: 'stack' as const,
          preview: <GlobalSearchStandaloneDemo />,
          code: `<GlobalSearch
  placeholder="Search pages and actions…"
  results={results}
  onSearch={handleSearch}
  onSelect={(result) => setSelected(result.label)}
/>`,
        },
        {
          title: 'Loading state',
          layout: 'stack' as const,
          preview: <GlobalSearchLoadingDemo />,
          code: `<GlobalSearch loading results={results} onSearch={handleSearch} onSelect={handleSelect} />`,
        },
      ],
    },
    {
      id: 'app-command-bar',
      title: 'AppCommandBar',
      category: 'App',
      abbr: 'CB',
      description: 'Keyboard-first komut paleti. ⌘K trigger\'ı ile açılır; items prop\'u ile özel komutlar geçilebilir, varsayılan navigation/actions/recent seti dahilidir.',
      filePath: 'modules/app/AppCommandBar.tsx',
      sourceCode: `'use client';
import { AppCommandBar } from '@/modules/app/AppCommandBar';

// Varsayılan komutlarla:
<AppCommandBar onSelect={(item) => router.push(item.href)} />

// Özel komutlarla:
<AppCommandBar
  items={[
    { icon: '🏠', label: 'Dashboard', shortcut: 'G D', category: 'Navigation' },
    { icon: '➕', label: 'New Project', shortcut: '⌘N', category: 'Actions', onClick: handleNew },
    { icon: '🕐', label: 'Recent Item', category: 'Recent' },
  ]}
  trigger={<Button variant="outline" size="sm">⌘K</Button>}
  onSelect={handleSelect}
/>`,
      variants: [
        {
          title: 'Varsayılan komutlar',
          preview: <AppCommandBarDemo />,
          code: `<AppCommandBar onSelect={(item) => console.log(item.label)} />`,
        },
        {
          title: 'Özel items + trigger',
          preview: <AppCommandBarDemo custom />,
          code: `<AppCommandBar
  items={customItems}
  trigger={<Button variant="ghost" size="sm" iconRight={<Badge variant="neutral" size="sm">⌘K</Badge>}>Search…</Button>}
  onSelect={handleSelect}
/>`,
        },
      ],
    },
    {
      id: 'form',
      title: 'Form',
      category: 'App',
      abbr: 'Fm',
      description: 'Form layout wrapper\'ı. title, description, error ve actions named slot\'ları alır; children ui/ field bileşenleri için grid\'de sıralanır.',
      filePath: 'modules/app/Form.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { AlertBanner } from '@/modules/ui/AlertBanner';

export function Form({ title, description, error, columns = 1, actions, children, onSubmit, className }) {
  return (
    <form onSubmit={onSubmit} noValidate className={cn('space-y-6', className)}>
      {(title || description) && (
        <div>
          {title && <h2 className="text-lg font-semibold text-text-primary">{title}</h2>}
          {description && <p className="text-sm text-text-secondary mt-0.5">{description}</p>}
        </div>
      )}
      {error && <AlertBanner variant="error" message={error} />}
      <div className={cn('grid gap-4', columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1')}>
        {children}
      </div>
      {actions && (
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
          {actions}
        </div>
      )}
    </form>
  );
}`,
      variants: [
        {
          title: 'Single column',
          layout: 'stack' as const,
          preview: <FormDemo columns={1} />,
          code: `<Form
  title="Create project"
  description="Fill in the details to create a new project."
  onSubmit={handleSubmit}
  actions={
    <>
      <Button variant="outline" type="button" onClick={handleCancel}>Cancel</Button>
      <Button variant="primary" type="submit">Save project</Button>
    </>
  }
>
  <Input id="name" label="Project name" required value={name} onChange={...} error={nameError} />
  <Input id="email" label="Owner email" type="email" required value={email} onChange={...} />
  <Select id="visibility" label="Visibility" value={visibility} onChange={...} options={options} />
  <Toggle id="notify" label="Send notifications" checked={notify} onChange={setNotify} />
</Form>`,
        },
        {
          title: 'Two column',
          layout: 'stack' as const,
          preview: <FormDemo columns={2} />,
          code: `<Form title="Create project" columns={2} onSubmit={handleSubmit} actions={<Button type="submit">Save</Button>}>
  <Input id="name" label="Project name" required value={name} onChange={...} />
  <Input id="email" label="Owner email" type="email" value={email} onChange={...} />
  <Select id="visibility" label="Visibility" value={visibility} onChange={...} options={options} />
  <MultiSelect id="stack" label="Tech stack" value={stack} onChange={setStack} options={options} />
  <div className="sm:col-span-2">
    <Textarea id="description" label="Description" value={description} onChange={...} />
  </div>
</Form>`,
        },
      ],
    },
    {
      id: 'filter-bar',
      title: 'FilterBar',
      category: 'App',
      abbr: 'FB',
      description: 'Liste ve dashboard ekranları için select, multiselect, daterange ve tag tabanlı filtre paneli.',
      filePath: 'modules/app/FilterBar.tsx',
      sourceCode: `'use client';
import { FilterBar } from '@/modules/app/FilterBar';

export function Demo() {
  return (
    <FilterBar
      fields={fields}
      values={values}
      onChange={handleChange}
      onApply={handleApply}
      onReset={handleReset}
    />
  );
}`,
      variants: [
        {
          title: 'Full filter set',
          layout: 'stack' as const,
          preview: <FilterBarDemo />,
          code: `<FilterBar fields={fields} values={values} onChange={handleChange} onApply={handleApply} onReset={handleReset} />`,
        },
        {
          title: 'Compact filters',
          layout: 'stack' as const,
          preview: <FilterBarDemo compact />,
          code: `<FilterBar fields={fields.slice(0, 2)} values={values} onChange={handleChange} />`,
        },
      ],
    },
  ];
}
