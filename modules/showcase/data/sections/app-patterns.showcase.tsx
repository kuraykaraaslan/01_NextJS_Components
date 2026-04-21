'use client';
import { UserMenu } from '@/modules/app/UserMenu';
import { NotificationProvider, useNotifications } from '@/modules/app/NotificationSystem';
import { ConfirmDialog } from '@/modules/app/ConfirmDialog';
import { GlobalSearch, type SearchResult } from '@/modules/app/GlobalSearch';
import { GlobalNav, type NavGroup as AppNavGroup } from '@/modules/app/GlobalNav';
import { AppShell } from '@/modules/app/AppShell';
import { DetailHeader } from '@/modules/app/DetailHeader';
import { FilterBar, type FilterValues } from '@/modules/app/FilterBar';
import { DataListingPage } from '@/modules/app/DataListingPage';
import { CreateEditForm, type FormField } from '@/modules/app/CreateEditForm';
import { FileUploadSection } from '@/modules/app/FileUploadSection';
import { ErrorState, NotFoundState, NoAccessState } from '@/modules/app/EmptyErrorState';
import { LoadingState } from '@/modules/app/LoadingState';
import { StepFlow, type StepFlowStep } from '@/modules/app/StepFlow';
import { SkipLink, LiveRegion } from '@/modules/ui/SkipLink';
import { Tooltip } from '@/modules/ui/Tooltip';
import { Button } from '@/modules/ui/Button';
import { Input } from '@/modules/ui/Input';
import { Select } from '@/modules/ui/Select';
import { useState } from 'react';
import type { ShowcaseComponent } from '../showcase.types';

export function buildAppPatternsData(): ShowcaseComponent[] {
  return [
    {
      id: 'app-user-menu',
      title: 'UserMenu',
      category: 'App' as const,
      abbr: 'Um',
      description: 'Avatar + dropdown combining user info with quick action items.',
      filePath: 'modules/app/UserMenu.tsx',
      sourceCode: `export function UserMenu({ user, items, align }) { ... }`,
      variants: [
        {
          title: 'Default',
          layout: 'side' as const,
          preview: (
            <UserMenu
              user={{ name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', badge: 'Pro' }}
            />
          ),
          code: `<UserMenu\n  user={{ name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', badge: 'Pro' }}\n/>`,
        },
        {
          title: 'Custom items',
          layout: 'side' as const,
          preview: (
            <UserMenu
              user={{ name: 'Bob Smith', email: 'bob@example.com' }}
              items={[
                { label: 'Dashboard', icon: '📊' },
                { label: 'Billing', icon: '💳' },
                { type: 'separator' },
                { label: 'Log out', icon: '↩', danger: true },
              ]}
            />
          ),
          code: `<UserMenu\n  user={{ name: 'Bob Smith', email: 'bob@example.com' }}\n  items={[\n    { label: 'Dashboard', icon: '📊' },\n    { label: 'Billing', icon: '💳' },\n    { type: 'separator' },\n    { label: 'Log out', icon: '↩', danger: true },\n  ]}\n/>`,
        },
      ],
    },

    {
      id: 'app-notifications',
      title: 'Notifications',
      category: 'App' as const,
      abbr: 'Ns',
      description: 'Context-based toast notification system with success/error/warning/info helpers.',
      filePath: 'modules/app/NotificationSystem.tsx',
      sourceCode: `export function NotificationProvider({ children, position, maxStack }) { ... }\nexport function useNotifications() { return { success, error, warning, info, dismiss }; }`,
      variants: [
        {
          title: 'useNotifications hook',
          layout: 'stack' as const,
          preview: (() => {
            function NotifDemo() {
              const { success, error, warning, info } = useNotifications();
              return (
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="primary" onClick={() => success('Changes saved successfully!')}>Success</Button>
                  <Button size="sm" variant="danger" onClick={() => error('Something went wrong.')}>Error</Button>
                  <Button size="sm" variant="outline" onClick={() => warning('Check your input.')}>Warning</Button>
                  <Button size="sm" variant="ghost" onClick={() => info('New update available.')}>Info</Button>
                </div>
              );
            }
            return (
              <NotificationProvider>
                <NotifDemo />
              </NotificationProvider>
            );
          })(),
          code: `function App() {\n  return (\n    <NotificationProvider>\n      <MyPage />\n    </NotificationProvider>\n  );\n}\n\nfunction MyPage() {\n  const { success, error } = useNotifications();\n  return <button onClick={() => success('Done!')}>Save</button>;\n}`,
        },
      ],
    },

    {
      id: 'app-confirm-dialog',
      title: 'ConfirmDialog',
      category: 'App' as const,
      abbr: 'Cd',
      description: 'Modal confirmation dialog with danger/warning/info variants and loading state.',
      filePath: 'modules/app/ConfirmDialog.tsx',
      sourceCode: `export function ConfirmDialog({ open, onConfirm, onCancel, title, message, variant, loading }) { ... }`,
      variants: [
        {
          title: 'Danger confirm',
          layout: 'side' as const,
          preview: (() => {
            function ConfirmDemo() {
              const [open, setOpen] = useState(false);
              return (
                <>
                  <Button variant="danger" size="sm" onClick={() => setOpen(true)}>Delete account</Button>
                  <ConfirmDialog
                    open={open}
                    title="Delete account?"
                    message="This will permanently delete your account and all data. This cannot be undone."
                    confirmLabel="Delete"
                    variant="danger"
                    onConfirm={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                  />
                </>
              );
            }
            return <ConfirmDemo />;
          })(),
          code: `const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Delete account</Button>\n<ConfirmDialog\n  open={open}\n  title="Delete account?"\n  message="This will permanently delete your account."\n  variant="danger"\n  confirmLabel="Delete"\n  onConfirm={handleDelete}\n  onCancel={() => setOpen(false)}\n/>`,
        },
        {
          title: 'Info confirm',
          layout: 'side' as const,
          preview: (() => {
            function ConfirmInfoDemo() {
              const [open, setOpen] = useState(false);
              return (
                <>
                  <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Publish</Button>
                  <ConfirmDialog
                    open={open}
                    title="Publish article?"
                    message="Once published, the article will be visible to all users."
                    confirmLabel="Publish"
                    variant="info"
                    onConfirm={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                  />
                </>
              );
            }
            return <ConfirmInfoDemo />;
          })(),
          code: `<ConfirmDialog\n  open={open}\n  title="Publish article?"\n  message="Once published, the article will be visible."\n  variant="info"\n  confirmLabel="Publish"\n  onConfirm={handlePublish}\n  onCancel={() => setOpen(false)}\n/>`,
        },
      ],
    },

    {
      id: 'app-global-search',
      title: 'GlobalSearch',
      category: 'App' as const,
      abbr: 'Gs',
      description: 'Combobox search with categorized results, keyboard navigation, and loading state.',
      filePath: 'modules/app/GlobalSearch.tsx',
      sourceCode: `export function GlobalSearch({ placeholder, results, onSearch, onSelect, loading }) { ... }`,
      variants: [
        {
          title: 'With results',
          layout: 'stack' as const,
          preview: (() => {
            const DEMO_RESULTS: SearchResult[] = [
              { id: '1', label: 'Dashboard', description: 'Main overview', icon: '📊', category: 'Pages' },
              { id: '2', label: 'Users', description: 'Manage team', icon: '👥', category: 'Pages' },
              { id: '3', label: 'Alice Johnson', description: 'alice@example.com', icon: '👤', category: 'People' },
            ];
            function SearchDemo() {
              const [results, setResults] = useState<SearchResult[]>([]);
              return (
                <GlobalSearch
                  results={results}
                  onSearch={(q) => setResults(q ? DEMO_RESULTS.filter(r => r.label.toLowerCase().includes(q.toLowerCase())) : [])}
                  onSelect={(r) => alert(`Selected: ${r.label}`)}
                  placeholder="Search pages, people…"
                />
              );
            }
            return <SearchDemo />;
          })(),
          code: `<GlobalSearch\n  results={results}\n  onSearch={(q) => setResults(filter(allItems, q))}\n  onSelect={(r) => router.push(r.href)}\n  placeholder="Search pages, people…"\n/>`,
        },
      ],
    },

    {
      id: 'app-global-nav',
      title: 'GlobalNav',
      category: 'App' as const,
      abbr: 'Gn',
      description: 'Collapsible sidebar navigation with grouped items, badges, nested children.',
      filePath: 'modules/app/GlobalNav.tsx',
      sourceCode: `export function GlobalNav({ groups, activeId, collapsed, onCollapse, logo, footer }) { ... }`,
      variants: [
        {
          title: 'Default',
          layout: 'stack' as const,
          preview: (() => {
            const demoGroups: AppNavGroup[] = [
              {
                id: 'main',
                label: 'Main',
                items: [
                  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                  { id: 'users', label: 'Users', icon: '👥', badge: 3 },
                  { id: 'settings', label: 'Settings', icon: '⚙' },
                ],
              },
            ];
            function NavDemo() {
              const [active, setActive] = useState('dashboard');
              return (
                <div className="h-56 border border-border rounded-lg overflow-hidden">
                  <GlobalNav
                    groups={demoGroups}
                    activeId={active}
                    logo={<span className="font-bold text-text-primary text-sm">MyApp</span>}
                  />
                </div>
              );
            }
            return <NavDemo />;
          })(),
          code: `<GlobalNav\n  groups={[\n    {\n      id: 'main',\n      label: 'Main',\n      items: [\n        { id: 'dashboard', label: 'Dashboard', icon: '📊' },\n        { id: 'users', label: 'Users', icon: '👥', badge: 3 },\n      ],\n    },\n  ]}\n  activeId={activeId}\n  logo={<Logo />}\n/>`,
        },
        {
          title: 'Collapsed',
          layout: 'stack' as const,
          preview: (() => {
            const demoGroups: AppNavGroup[] = [
              {
                id: 'main',
                items: [
                  { id: 'home', label: 'Home', icon: '🏠' },
                  { id: 'docs', label: 'Docs', icon: '📄' },
                  { id: 'profile', label: 'Profile', icon: '👤' },
                ],
              },
            ];
            return (
              <div className="h-56 border border-border rounded-lg overflow-hidden">
                <GlobalNav groups={demoGroups} activeId="home" collapsed />
              </div>
            );
          })(),
          code: `<GlobalNav groups={groups} activeId={activeId} collapsed />`,
        },
      ],
    },

    {
      id: 'app-shell',
      title: 'AppShell',
      category: 'App' as const,
      abbr: 'As',
      description: 'Full-page layout with collapsible GlobalNav sidebar and optional top bar.',
      filePath: 'modules/app/AppShell.tsx',
      sourceCode: `export function AppShell({ groups, activeId, logo, topBar, footer, children, defaultCollapsed }) { ... }`,
      variants: [
        {
          title: 'Full layout',
          layout: 'stack' as const,
          preview: (() => {
            const shellGroups: AppNavGroup[] = [
              {
                id: 'main',
                items: [
                  { id: 'home', label: 'Home', icon: '🏠' },
                  { id: 'docs', label: 'Docs', icon: '📄' },
                ],
              },
            ];
            return (
              <div className="h-64 border border-border rounded-lg overflow-hidden">
                <AppShell
                  groups={shellGroups}
                  activeId="home"
                  logo={<span className="font-bold text-sm text-text-primary">MyApp</span>}
                  topBar={<span className="text-sm font-medium text-text-primary">Dashboard</span>}
                >
                  <p className="text-sm text-text-secondary">Page content goes here</p>
                </AppShell>
              </div>
            );
          })(),
          code: `<AppShell\n  groups={navGroups}\n  activeId={activeId}\n  logo={<Logo />}\n  topBar={<TopBar />}\n>\n  <PageContent />\n</AppShell>`,
        },
      ],
    },

    {
      id: 'app-detail-header',
      title: 'DetailHeader',
      category: 'App' as const,
      abbr: 'Dh',
      description: 'PageHeader with status badge and tab navigation for entity detail pages.',
      filePath: 'modules/app/DetailHeader.tsx',
      sourceCode: `export function DetailHeader({ title, subtitle, status, statusVariant, tabs, actions }) { ... }`,
      variants: [
        {
          title: 'With status & tabs',
          layout: 'stack' as const,
          preview: (
            <DetailHeader
              title="Invoice #1042"
              subtitle="Created Jan 12, 2025"
              status="Paid"
              statusVariant="success"
              tabs={[
                { value: 'overview', label: 'Overview' },
                { value: 'items', label: 'Line Items' },
                { value: 'history', label: 'History' },
              ]}
              actions={[{ label: 'Download PDF', variant: 'outline' }]}
            />
          ),
          code: `<DetailHeader\n  title="Invoice #1042"\n  status="Paid"\n  statusVariant="success"\n  tabs={[\n    { value: 'overview', label: 'Overview' },\n    { value: 'items', label: 'Line Items' },\n  ]}\n  actions={[{ label: 'Download PDF', variant: 'outline' }]}\n/>`,
        },
      ],
    },

    {
      id: 'app-filter-bar',
      title: 'FilterBar',
      category: 'App' as const,
      abbr: 'Fb',
      description: 'Configurable filter panel with select, multiselect, date-range, and tag fields.',
      filePath: 'modules/app/FilterBar.tsx',
      sourceCode: `export function FilterBar({ fields, values, onChange, onApply, onReset }) { ... }`,
      variants: [
        {
          title: 'Mixed filters',
          layout: 'stack' as const,
          preview: (() => {
            function FilterDemo() {
              const [values, setValues] = useState<FilterValues>({});
              return (
                <FilterBar
                  fields={[
                    { type: 'select', id: 'status', label: 'Status', options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] },
                    { type: 'multiselect', id: 'tags', label: 'Tags', options: [{ value: 'bug', label: 'Bug' }, { value: 'feature', label: 'Feature' }, { value: 'docs', label: 'Docs' }] },
                  ]}
                  values={values}
                  onChange={(id, v) => setValues(p => ({ ...p, [id]: v }))}
                  onApply={() => {}}
                  onReset={() => setValues({})}
                />
              );
            }
            return <FilterDemo />;
          })(),
          code: `<FilterBar\n  fields={[\n    { type: 'select', id: 'status', label: 'Status', options: [...] },\n    { type: 'multiselect', id: 'tags', label: 'Tags', options: [...] },\n  ]}\n  values={values}\n  onChange={(id, v) => setValues(p => ({ ...p, [id]: v }))}\n  onApply={handleApply}\n  onReset={handleReset}\n/>`,
        },
      ],
    },

    {
      id: 'app-data-listing',
      title: 'DataListingPage',
      category: 'App' as const,
      abbr: 'Dl',
      description: 'Full-page data listing with header, loading/error/empty/data states and DataTable.',
      filePath: 'modules/app/DataListingPage.tsx',
      sourceCode: `export function DataListingPage({ title, columns, rows, loading, error, onRetry, ... }) { ... }`,
      variants: [
        {
          title: 'With data',
          layout: 'stack' as const,
          preview: (
            <DataListingPage
              title="Users"
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'role', header: 'Role' },
                { key: 'status', header: 'Status' },
              ]}
              rows={[
                { name: 'Alice Johnson', role: 'Admin', status: 'Active' },
                { name: 'Bob Smith', role: 'Editor', status: 'Inactive' },
              ]}
              actions={[{ label: '+ Add user', variant: 'primary' }]}
            />
          ),
          code: `<DataListingPage\n  title="Users"\n  columns={[\n    { key: 'name', header: 'Name' },\n    { key: 'role', header: 'Role' },\n  ]}\n  rows={rows}\n  actions={[{ label: '+ Add user', variant: 'primary' }]}\n/>`,
        },
        {
          title: 'Loading state',
          layout: 'stack' as const,
          preview: (
            <DataListingPage
              title="Users"
              columns={[{ key: 'name', header: 'Name' }]}
              rows={[]}
              loading
            />
          ),
          code: `<DataListingPage title="Users" columns={columns} rows={[]} loading />`,
        },
      ],
    },

    {
      id: 'app-create-edit-form',
      title: 'CreateEditForm',
      category: 'App' as const,
      abbr: 'Ce',
      description: 'Config-driven form with all field types, validation errors, and submit state.',
      filePath: 'modules/app/CreateEditForm.tsx',
      sourceCode: `export function CreateEditForm({ title, fields, values, errors, onChange, onSubmit, columns }) { ... }`,
      variants: [
        {
          title: 'Two-column form',
          layout: 'stack' as const,
          preview: (() => {
            const fields: FormField[] = [
              { type: 'text', id: 'name', label: 'Full name', placeholder: 'John Doe', required: true },
              { type: 'email', id: 'email', label: 'Email', placeholder: 'john@example.com', required: true },
              { type: 'select', id: 'role', label: 'Role', options: [{ value: 'admin', label: 'Admin' }, { value: 'editor', label: 'Editor' }] },
              { type: 'toggle', id: 'active', label: 'Active', description: 'Allow login' },
            ];
            function FormDemo() {
              const [values, setValues] = useState<Record<string, unknown>>({});
              return (
                <CreateEditForm
                  title="Create user"
                  fields={fields}
                  values={values}
                  onChange={(id, v) => setValues(p => ({ ...p, [id]: v }))}
                  onSubmit={() => {}}
                  columns={2}
                />
              );
            }
            return <FormDemo />;
          })(),
          code: `<CreateEditForm\n  title="Create user"\n  fields={[\n    { type: 'text', id: 'name', label: 'Full name', required: true },\n    { type: 'email', id: 'email', label: 'Email', required: true },\n    { type: 'select', id: 'role', label: 'Role', options: [...] },\n  ]}\n  values={values}\n  onChange={(id, v) => setValues(p => ({ ...p, [id]: v }))}\n  onSubmit={handleSubmit}\n  columns={2}\n/>`,
        },
      ],
    },

    {
      id: 'app-file-upload',
      title: 'FileUploadSection',
      category: 'App' as const,
      abbr: 'Fu',
      description: 'Drag-and-drop file upload with progress state, error banner, and success toast.',
      filePath: 'modules/app/FileUploadSection.tsx',
      sourceCode: `export function FileUploadSection({ label, multiple, accept, maxSizeBytes, onUpload }) { ... }`,
      variants: [
        {
          title: 'Default',
          layout: 'stack' as const,
          preview: (
            <FileUploadSection
              label="Upload documents"
              hint="PDF, DOCX up to 10 MB"
              accept=".pdf,.docx"
              maxSizeBytes={10 * 1024 * 1024}
              multiple
              onUpload={async () => { await new Promise(r => setTimeout(r, 1000)); }}
            />
          ),
          code: `<FileUploadSection\n  label="Upload documents"\n  hint="PDF, DOCX up to 10 MB"\n  accept=".pdf,.docx"\n  maxSizeBytes={10 * 1024 * 1024}\n  multiple\n  onUpload={handleUpload}\n/>`,
        },
      ],
    },

    {
      id: 'app-empty-error',
      title: 'EmptyErrorState',
      category: 'App' as const,
      abbr: 'Ee',
      description: 'ErrorState, NotFoundState, and NoAccessState composites for common failure pages.',
      filePath: 'modules/app/EmptyErrorState.tsx',
      sourceCode: `export function ErrorState({ title, message, onRetry }) { ... }\nexport function NotFoundState({ title, description, onGoBack }) { ... }\nexport function NoAccessState({ title, description, onRequestAccess }) { ... }`,
      variants: [
        {
          title: 'ErrorState',
          layout: 'stack' as const,
          preview: <ErrorState message="Failed to load user data. The server returned a 503 error." onRetry={() => {}} />,
          code: `<ErrorState\n  message="Failed to load user data."\n  onRetry={handleRetry}\n/>`,
        },
        {
          title: 'NotFoundState',
          layout: 'stack' as const,
          preview: <NotFoundState onGoBack={() => {}} />,
          code: `<NotFoundState onGoBack={() => router.back()} />`,
        },
        {
          title: 'NoAccessState',
          layout: 'stack' as const,
          preview: <NoAccessState description="You need Admin role to view billing settings." onRequestAccess={() => {}} />,
          code: `<NoAccessState\n  description="You need Admin role to view billing."\n  onRequestAccess={handleRequest}\n/>`,
        },
      ],
    },

    {
      id: 'app-loading-state',
      title: 'LoadingState',
      category: 'App' as const,
      abbr: 'Ls',
      description: 'Skeleton loading placeholders for spinner, table, cards, list, detail, and form layouts.',
      filePath: 'modules/app/LoadingState.tsx',
      sourceCode: `export function LoadingState({ variant, rows, cols, cards }) { ... }`,
      variants: [
        {
          title: 'Spinner',
          layout: 'side' as const,
          preview: <LoadingState variant="spinner" />,
          code: `<LoadingState variant="spinner" />`,
        },
        {
          title: 'Table skeleton',
          layout: 'stack' as const,
          preview: <LoadingState variant="table" rows={3} cols={4} />,
          code: `<LoadingState variant="table" rows={3} cols={4} />`,
        },
        {
          title: 'Cards skeleton',
          layout: 'stack' as const,
          preview: <LoadingState variant="cards" cards={3} />,
          code: `<LoadingState variant="cards" cards={3} />`,
        },
        {
          title: 'Form skeleton',
          layout: 'stack' as const,
          preview: <LoadingState variant="form" rows={4} />,
          code: `<LoadingState variant="form" rows={4} />`,
        },
      ],
    },

    {
      id: 'app-step-flow',
      title: 'StepFlow',
      category: 'App' as const,
      abbr: 'Sf',
      description: 'Multi-step wizard with per-step content, validation, and prev/next navigation.',
      filePath: 'modules/app/StepFlow.tsx',
      sourceCode: `export function StepFlow({ steps, onComplete, onCancel, initialValues }) { ... }`,
      variants: [
        {
          title: 'Three-step wizard',
          layout: 'stack' as const,
          preview: (() => {
            const steps: StepFlowStep[] = [
              {
                id: 'basics',
                label: 'Basics',
                description: 'Project info',
                content: ({ values, onChange, error }) => (
                  <div className="space-y-4">
                    <Input
                      id="project-name"
                      label="Project name"
                      placeholder="My project"
                      value={(values.name as string) ?? ''}
                      onChange={e => onChange('name', e.target.value)}
                      error={error}
                    />
                  </div>
                ),
                validate: (v) => v.name ? undefined : 'Project name is required',
              },
              {
                id: 'settings',
                label: 'Settings',
                description: 'Configure',
                content: ({ values, onChange }) => (
                  <div className="space-y-4">
                    <Select
                      id="visibility"
                      label="Visibility"
                      options={[{ value: 'public', label: 'Public' }, { value: 'private', label: 'Private' }]}
                      value={(values.visibility as string) ?? ''}
                      onChange={e => onChange('visibility', e.target.value)}
                    />
                  </div>
                ),
              },
              {
                id: 'review',
                label: 'Review',
                description: 'Confirm',
                content: ({ values }) => (
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {(values.name as string) || '—'}</p>
                    <p><strong>Visibility:</strong> {(values.visibility as string) || '—'}</p>
                  </div>
                ),
              },
            ];
            return (
              <StepFlow
                steps={steps}
                onComplete={() => {}}
                onCancel={() => {}}
              />
            );
          })(),
          code: `<StepFlow\n  steps={[\n    {\n      id: 'basics',\n      label: 'Basics',\n      content: ({ values, onChange, error }) => (\n        <Input\n          label="Project name"\n          value={values.name}\n          onChange={e => onChange('name', e.target.value)}\n          error={error}\n        />\n      ),\n      validate: (v) => v.name ? undefined : 'Name is required',\n    },\n    // ...\n  ]}\n  onComplete={handleComplete}\n/>`,
        },
      ],
    },

    {
      id: 'app-accessibility',
      title: 'AccessibilityKit',
      category: 'App' as const,
      abbr: 'Ak',
      description: 'Re-exports SkipLink, LiveRegion, Announcer, and Tooltip for accessibility patterns.',
      filePath: 'modules/app/AccessibilityKit.tsx',
      sourceCode: `export { SkipLink, LiveRegion, Announcer } from '@/modules/ui/SkipLink';\nexport { Tooltip } from '@/modules/ui/Tooltip';`,
      variants: [
        {
          title: 'AccessibilityKit exports',
          layout: 'stack' as const,
          preview: (
            <div className="space-y-2 text-sm text-text-secondary">
              <p>Re-exports: <code>SkipLink</code>, <code>LiveRegion</code>, <code>Announcer</code>, <code>Tooltip</code></p>
              <p>Import all a11y helpers from a single entry point.</p>
            </div>
          ),
          code: `import { SkipLink, LiveRegion, Announcer, Tooltip } from '@/modules/app/AccessibilityKit';\n\n// Use anywhere:\n<SkipLink href="#main" />\n<LiveRegion message={statusMessage} />\n<Tooltip content="More info"><button>?</button></Tooltip>`,
        },
      ],
    },
  ];
}
