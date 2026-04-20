'use client';
import { useState } from 'react';
import { Sidebar, type NavGroup } from './Sidebar';
import { TopBar } from './TopBar';
import { Widget } from './Widget';
import { CopyButton } from './CopyButton';
import { cn } from '@/libs/utils/cn';
import { buildShowcaseData, type ShowcaseVariant } from '@/modules/showcase/data/showcase.data';

// ─── Nav groups ────────────────────────────────────────────────────────────────

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Atoms',
    items: [
      { id: 'button',   title: 'Button',   category: 'Atom', abbr: 'Bt' },
      { id: 'badge',    title: 'Badge',    category: 'Atom', abbr: 'Bg' },
      { id: 'avatar',   title: 'Avatar',   category: 'Atom', abbr: 'Av' },
      { id: 'spinner',  title: 'Spinner',  category: 'Atom', abbr: 'Sp' },
      { id: 'skeleton', title: 'Skeleton', category: 'Atom', abbr: 'Sk' },
    ],
  },
  {
    label: 'Molecules',
    items: [
      { id: 'input',       title: 'Input',       category: 'Molecule', abbr: 'In' },
      { id: 'checkbox',    title: 'Checkbox',    category: 'Molecule', abbr: 'Cb' },
      { id: 'radio-group', title: 'RadioGroup',  category: 'Molecule', abbr: 'Rg' },
      { id: 'select',      title: 'Select',      category: 'Molecule', abbr: 'Sl' },
      { id: 'textarea',    title: 'Textarea',    category: 'Molecule', abbr: 'Ta' },
      { id: 'search-bar',  title: 'SearchBar',   category: 'Molecule', abbr: 'Sb' },
    ],
  },
  {
    label: 'Organisms',
    items: [
      { id: 'card',          title: 'Card',         category: 'Organism', abbr: 'Ca' },
      { id: 'alert-banner',  title: 'AlertBanner',  category: 'Organism', abbr: 'Ab' },
      { id: 'toast',         title: 'Toast',        category: 'Organism', abbr: 'To' },
      { id: 'empty-state',   title: 'EmptyState',   category: 'Organism', abbr: 'Es' },
      { id: 'pagination',    title: 'Pagination',   category: 'Organism', abbr: 'Pg' },
      { id: 'modal',         title: 'Modal',        category: 'Organism', abbr: 'Md' },
      { id: 'drawer',        title: 'Drawer',       category: 'Organism', abbr: 'Dr' },
      { id: 'tooltip',       title: 'Tooltip',      category: 'Organism', abbr: 'Tt' },
      { id: 'dropdown-menu', title: 'DropdownMenu', category: 'Organism', abbr: 'Dm' },
      { id: 'table',         title: 'Table',        category: 'Organism', abbr: 'Tb' },
      { id: 'tab-group',     title: 'TabGroup',     category: 'Organism', abbr: 'Tg' },
      { id: 'breadcrumb',    title: 'Breadcrumb',   category: 'Organism', abbr: 'Bc' },
    ],
  },
];

const categoryStyles: Record<string, string> = {
  Atom:     'bg-info-subtle text-info-fg',
  Molecule: 'bg-primary-subtle text-primary',
  Organism: 'bg-success-subtle text-success-fg',
};

// ─── SourceBlock ───────────────────────────────────────────────────────────────

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

// ─── VariantBlock ──────────────────────────────────────────────────────────────

function VariantBlock({ variant }: { variant: ShowcaseVariant }) {
  return (
    <div className="bg-surface-raised border border-border rounded-xl overflow-hidden">
      <Widget
        title={variant.title}
        headerRight={<CopyButton code={variant.code} />}
      >
        <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="sm:w-2/5 flex flex-col">
            <div className="px-3 py-1.5 border-b border-border bg-surface-overlay">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Preview</span>
            </div>
            <div
              className="flex-1 flex items-center justify-center px-6 py-8 min-h-28"
              style={{
                backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            >
              <div className="flex flex-wrap gap-2 items-center justify-center w-full">
                {variant.preview}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col bg-surface-sunken overflow-x-auto">
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

// ─── Shell ────────────────────────────────────────────────────────────────────

export function ShowcaseShell() {
  const data = buildShowcaseData();
  const dataMap = Object.fromEntries(data.map((c) => [c.id, c]));

  const [selectedId, setSelectedId]             = useState('button');
  const [sidebarCollapsed, setSidebarCollapsed]   = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const selected = dataMap[selectedId];

  return (
    <div className="flex min-h-screen bg-surface-base font-sans antialiased">
      <Sidebar
        groups={NAV_GROUPS}
        selectedId={selectedId}
        onSelect={setSelectedId}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          title={selected.title}
          subtitle={`UI Showcase › ${selected.category}`}
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={() => setSidebarCollapsed((c) => !c)}
          onMobileMenuOpen={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
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

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {selected.variants.map((variant) => (
              <VariantBlock key={variant.title} variant={variant} />
            ))}
          </div>

          <div className="mt-4">
            <SourceBlock filePath={selected.filePath} sourceCode={selected.sourceCode} />
          </div>
        </main>
      </div>
    </div>
  );
}
