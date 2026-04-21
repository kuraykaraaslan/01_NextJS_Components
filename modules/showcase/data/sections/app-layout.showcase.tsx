'use client';
import { AppNav } from '@/modules/app/AppNav';
import { AppDrawer } from '@/modules/app/AppDrawer';
import { AppTopBar } from '@/modules/app/AppTopBar';
import { AppFooter } from '@/modules/app/AppFooter';
import { AppSidebar } from '@/modules/app/AppSidebar';
import { AppCommandBar } from '@/modules/app/AppCommandBar';
import { AppBreadcrumbs } from '@/modules/app/AppBreadcrumbs';
import type { ShowcaseComponent } from '../showcase.types';

export function buildAppLayoutData(): ShowcaseComponent[] {
  return [
    {
      id: 'app-nav',
      title: 'AppNav',
      category: 'App' as const,
      abbr: 'An',
      description: 'Horizontal application navigation bar with primary links as a ButtonGroup, notification badge on the Team item, sub-nav DropdownMenu, and a contextual Breadcrumb below.',
      filePath: 'modules/app/AppNav.tsx',
      sourceCode: `import { AppNav } from '@/modules/app/AppNav';\n\n<AppNav activePath="projects" notificationCount={3} />`,
      variants: [
        {
          title: 'Default – dashboard',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AppNav activePath="dashboard" notificationCount={0} />
            </div>
          ),
          code: `<AppNav activePath="dashboard" />`,
        },
        {
          title: 'With notification badge',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AppNav activePath="team" notificationCount={5} />
            </div>
          ),
          code: `<AppNav activePath="team" notificationCount={5} />`,
        },
      ],
    },

    {
      id: 'app-drawer',
      title: 'AppDrawer',
      category: 'App' as const,
      abbr: 'Ad',
      description: 'Mobile/slide-over navigation Drawer triggered by a hamburger button. Shows user info, a search bar, and grouped nav items with badge counts.',
      filePath: 'modules/app/AppDrawer.tsx',
      sourceCode: `import { AppDrawer } from '@/modules/app/AppDrawer';\n\n<AppDrawer userName="Alice Johnson" userRole="Admin" />`,
      variants: [
        {
          title: 'Default',
          layout: 'side' as const,
          preview: <AppDrawer userName="Alice Johnson" userRole="Admin" />,
          code: `<AppDrawer userName="Alice Johnson" userRole="Admin" />`,
        },
        {
          title: 'Guest role',
          layout: 'side' as const,
          preview: <AppDrawer userName="Bob Smith" userRole="Viewer" />,
          code: `<AppDrawer userName="Bob Smith" userRole="Viewer" />`,
        },
      ],
    },

    {
      id: 'app-topbar',
      title: 'AppTopBar',
      category: 'App' as const,
      abbr: 'At',
      description: 'Application top bar with a collapsible sidebar toggle, page title, toggleable SearchBar, notification badge, and a user avatar dropdown.',
      filePath: 'modules/app/AppTopBar.tsx',
      sourceCode: `import { AppTopBar } from '@/modules/app/AppTopBar';\n\n<AppTopBar pageTitle="Dashboard" userName="Alice Johnson" notificationCount={4} />`,
      variants: [
        {
          title: 'Default',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AppTopBar pageTitle="Dashboard" userName="Alice Johnson" notificationCount={4} />
            </div>
          ),
          code: `<AppTopBar pageTitle="Dashboard" userName="Alice Johnson" notificationCount={4} />`,
        },
        {
          title: 'No notifications',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AppTopBar pageTitle="Settings" userName="Bob Smith" notificationCount={0} />
            </div>
          ),
          code: `<AppTopBar pageTitle="Settings" userName="Bob Smith" notificationCount={0} />`,
        },
      ],
    },

    {
      id: 'app-footer',
      title: 'AppFooter',
      category: 'App' as const,
      abbr: 'Af',
      description: 'Application footer with product/version badges, nav link buttons, an operational status badge with indicator dot, breadcrumb, and social links.',
      filePath: 'modules/app/AppFooter.tsx',
      sourceCode: `import { AppFooter } from '@/modules/app/AppFooter';\n\n<AppFooter version="2.4.1" status="operational" />`,
      variants: [
        {
          title: 'Operational',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AppFooter version="2.4.1" status="operational" />
            </div>
          ),
          code: `<AppFooter version="2.4.1" status="operational" />`,
        },
        {
          title: 'Degraded',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AppFooter version="2.4.1" status="degraded" />
            </div>
          ),
          code: `<AppFooter version="2.4.1" status="degraded" />`,
        },
        {
          title: 'Outage',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AppFooter version="2.4.1" status="outage" />
            </div>
          ),
          code: `<AppFooter version="2.4.1" status="outage" />`,
        },
      ],
    },

    {
      id: 'app-sidebar',
      title: 'AppSidebar',
      category: 'App' as const,
      abbr: 'As',
      description: 'Left navigation sidebar with collapse/expand toggle, workspace switcher dropdown, searchable nav items with badge counts, and a user avatar at the bottom.',
      filePath: 'modules/app/AppSidebar.tsx',
      sourceCode: `import { AppSidebar } from '@/modules/app/AppSidebar';\n\n<AppSidebar activeItem="dashboard" workspaceName="Acme Corp" />`,
      variants: [
        {
          title: 'Expanded',
          layout: 'side' as const,
          preview: <AppSidebar activeItem="dashboard" workspaceName="Acme Corp" />,
          code: `<AppSidebar activeItem="dashboard" workspaceName="Acme Corp" />`,
        },
        {
          title: 'Active: tasks',
          layout: 'side' as const,
          preview: <AppSidebar activeItem="tasks" workspaceName="Side Project" />,
          code: `<AppSidebar activeItem="tasks" workspaceName="Side Project" />`,
        },
      ],
    },

    {
      id: 'app-command-bar',
      title: 'AppCommandBar',
      category: 'App' as const,
      abbr: 'Ac',
      description: 'Global command palette triggered by a ⌘K button. Opens a Modal with a SearchBar, categorised action items with keyboard shortcut badges, and a pro-tip AlertBanner.',
      filePath: 'modules/app/AppCommandBar.tsx',
      sourceCode: `import { AppCommandBar } from '@/modules/app/AppCommandBar';\n\n<AppCommandBar />`,
      variants: [
        {
          title: 'Command palette',
          layout: 'side' as const,
          preview: <AppCommandBar />,
          code: `<AppCommandBar />`,
        },
      ],
    },

    {
      id: 'app-breadcrumbs',
      title: 'AppBreadcrumbs',
      category: 'App' as const,
      abbr: 'Ab',
      description: 'Contextual breadcrumb navigation with a PageHeader, category badge, per-item tooltips showing full path, and a mobile-friendly collapsed view with a DropdownMenu.',
      filePath: 'modules/app/AppBreadcrumbs.tsx',
      sourceCode: `import { AppBreadcrumbs } from '@/modules/app/AppBreadcrumbs';\n\n<AppBreadcrumbs\n  items={[\n    { label: 'Home', href: '#' },\n    { label: 'Projects', href: '#' },\n    { label: 'Security' },\n  ]}\n  currentPage="Security Settings"\n  pageType="Settings"\n/>`,
      variants: [
        {
          title: 'Default path',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AppBreadcrumbs />
            </div>
          ),
          code: `<AppBreadcrumbs currentPage="Security Settings" pageType="Settings" />`,
        },
        {
          title: 'Short path',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AppBreadcrumbs
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Billing' },
                ]}
                currentPage="Billing"
                pageType="Finance"
              />
            </div>
          ),
          code: `<AppBreadcrumbs\n  items={[{ label: 'Home', href: '#' }, { label: 'Billing' }]}\n  currentPage="Billing"\n  pageType="Finance"\n/>`,
        },
      ],
    },
  ];
}
