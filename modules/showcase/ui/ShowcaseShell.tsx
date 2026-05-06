'use client';
import { useMemo, useState } from 'react';
import { AppShell } from '@/modules/app/AppShell';
import { AppSidebar } from '@/modules/app/AppSidebar';
import { AppTopBar } from '@/modules/app/AppTopBar';
import { Widget } from './Widget';
import { CopyButton } from './CopyButton';
import { PropsEditor } from './PropsEditor';
import { cn } from '@/libs/utils/cn';
import { buildShowcaseData, type ShowcaseVariant } from '@/modules/showcase/data/showcase.data';
import SHOWCASE_NAV_GROUPS from '@/modules/showcase/data/showcase.menu';
import { ThemeSwitcher } from '@/modules/app/ThemeSwitcher';
import { UserMenu } from '@/modules/domains/common/user/UserMenu';
import { GithubButton } from './GithubButton';
import { HomePanel } from './HomePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const categoryStyles: Record<string, string> = {
  Atom:     'bg-info-subtle text-info-fg',
  Molecule: 'bg-primary-subtle text-primary',
  Organism: 'bg-success-subtle text-success-fg',
  App:      'bg-warning-subtle text-warning-fg',
  Domain:   'bg-error-subtle text-error-fg',
  Theme:    'bg-secondary text-primary-fg',
};

function SourceBlock({ filePath, sourceCode }: { filePath: string; sourceCode: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-surface-raised border border-border rounded-xl overflow-hidden">
      <div className="widget-drag-handle flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-surface-overlay">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-text-disabled text-xs shrink-0 select-none" aria-hidden="true">⠿</span>
          <span className="text-sm font-semibold text-text-primary">Source</span>
          <span className="font-mono text-xs text-text-secondary bg-surface-sunken px-2 py-0.5 rounded truncate">
            {filePath}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <CopyButton code={sourceCode} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Collapse source' : 'Expand source'}
            className={cn(
              'px-2.5 py-1 text-xs rounded-md font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
              'bg-surface-overlay text-text-secondary hover:text-text-primary hover:bg-surface-sunken'
            )}
          >
            {open ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
      {open && (
        <div className="bg-surface-sunken overflow-x-auto">
          <pre className="px-5 py-5 text-sm font-mono text-text-primary leading-relaxed">
            <code>{sourceCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

function VariantBlock({ variant }: { variant: ShowcaseVariant }) {
  const stack = variant.layout === 'stack';

  return (
    <div className="bg-surface-raised border border-border rounded-xl overflow-hidden">
      <Widget
        title={variant.title}
        headerRight={<CopyButton code={variant.code} />}
      >
        <div className={cn(
          'flex divide-border',
          stack
            ? 'flex-col divide-y'
            : 'flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x'
        )}>
          <div className={cn('flex flex-col', !stack && 'sm:w-2/5')}>
            <div className="px-3 py-1.5 border-b border-border bg-surface-overlay">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Preview</span>
            </div>
            <div
              className={cn(
                'flex items-start justify-center px-6 py-8',
                stack ? 'min-h-40' : 'flex-1 min-h-28'
              )}
              style={{
                backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            >
              <div className={cn('w-full', !stack && 'flex flex-wrap gap-2 items-center justify-center')}>
                {variant.preview}
              </div>
            </div>
          </div>
          <div className={cn('flex flex-col bg-surface-sunken overflow-x-auto', !stack && 'flex-1')}>
            <div className="px-3 py-1.5 border-b border-border bg-surface-overlay">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Code</span>
            </div>
            <pre className="flex-1 px-4 py-5 text-sm font-mono text-text-primary leading-relaxed whitespace-pre-wrap">
              <code>{variant.code}</code>
            </pre>
          </div>
        </div>
      </Widget>
    </div>
  );
}

export function ShowcaseShell({ selectedId }: { selectedId?: string | null }) {
  const data = buildShowcaseData();
  const dataMap = Object.fromEntries(data.map((c) => [c.id, c]));

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isHome = !selectedId;
  const selected = selectedId ? dataMap[selectedId] : null;

  const navGroups = useMemo(() => [
    {
      label: undefined,
      collapsible: false,
      defaultExpanded: true,
      items: [{
        id: 'home',
        label: 'Home',
        href: '/',
        icon: <FontAwesomeIcon icon={faHouse} className="w-3.5 h-3.5" aria-hidden="true" />,
      }],
    },
    ...SHOWCASE_NAV_GROUPS.map((group) => ({
      label: group.label,
      collapsible: group.collapsible,
      defaultExpanded: true,
      items: group.items.map((item) => ({
        id: item.id,
        label: item.title,
        href: item.href ?? `/${item.id}`,
        icon: (
          <span className="flex items-center justify-center w-6 h-6 rounded text-[11px] font-bold bg-surface-sunken text-text-secondary">
            {item.abbr}
          </span>
        ),
      })),
    })),
  ], []);

  return (
    <AppShell
      logo={
        <div>
          <p className="text-sm font-semibold text-text-primary">UI Showcase</p>
          <p className="text-xs text-text-secondary">Component library</p>
        </div>
      }
      compactLogo={<span className="text-sm font-black text-primary">UI</span>}
      sidebarCollapsed={sidebarCollapsed}
      sidebar={
        <AppSidebar
          navGroups={navGroups}
          activeId={isHome ? 'home' : (selectedId ?? undefined)}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
          footer={({ collapsed }) => (
            <div className={cn('p-3 flex items-center', collapsed ? 'justify-center' : 'gap-2')}>
              <span className="w-7 h-7 rounded-full bg-primary-subtle flex items-center justify-center text-xs font-bold text-primary shrink-0" aria-hidden="true">D</span>
              {!collapsed && (
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-text-primary truncate">Developer</p>
                  <p className="text-[10px] text-text-secondary truncate">Component Library</p>
                </div>
              )}
            </div>
          )}
        />
      }
      topbar={
        <AppTopBar>
          <div className="ml-auto flex items-center gap-1">
            <GithubButton />
            <ThemeSwitcher />
            <UserMenu onlyAvatar
            user={{ userId: 'admin-1', email: 'admin@acme.com', userRole: 'ADMIN', userStatus: 'ACTIVE', userProfile: { name: 'Jane Doe', profilePicture: null } }} />
          </div>
        </AppTopBar>
      }
    >
      {isHome ? (
        <HomePanel />
      ) : !selected ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FontAwesomeIcon icon={faHouse} className="text-4xl text-text-disabled mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-text-primary mb-1">Showcase coming soon</h2>
          <p className="text-sm text-text-secondary">No preview has been added for this component yet.</p>
        </div>
      ) : (
        <>
          <div className="mb-2">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-text-primary leading-tight">
                {selected.title}
              </h2>
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                  categoryStyles[selected.category]
                )}
              >
                {selected.category}
              </span>
            </div>
            <p className="text-sm text-text-secondary max-w-2xl">{selected.description}</p>
          </div>

          {selected.playground && (
            <PropsEditor {...selected.playground} />
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {selected.variants.map((variant: any) => (
              <div key={variant.title} className={variant.layout === 'stack' ? 'xl:col-span-2' : ''}>
                <VariantBlock variant={variant} />
              </div>
            ))}
          </div>

          <SourceBlock filePath={selected.filePath} sourceCode={selected.sourceCode} />
        </>
      )}
    </AppShell>
  );
}
