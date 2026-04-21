'use client';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { Textarea } from '@/modules/ui/Textarea';
import { Card } from '@/modules/ui/Card';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Toast } from '@/modules/ui/Toast';
import { EmptyState } from '@/modules/ui/EmptyState';
import { Pagination } from '@/modules/ui/Pagination';
import { Modal } from '@/modules/ui/Modal';
import { Drawer } from '@/modules/ui/Drawer';
import { Tooltip } from '@/modules/ui/Tooltip';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';
import { Table } from '@/modules/ui/Table';
import { TabGroup } from '@/modules/ui/TabGroup';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { DataTable } from '@/modules/ui/DataTable';
import { ContentScoreBar, type ScoreRule } from '@/modules/ui/ContentScoreBar';
import { PageHeader } from '@/modules/ui/PageHeader';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import { Popover } from '@/modules/ui/Popover';
import { TreeView } from '@/modules/ui/TreeView';
import { Stepper } from '@/modules/ui/Stepper';
import { useState } from 'react';
import type { ShowcaseComponent } from '../showcase.types';

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm action"
        description="Are you sure you want to proceed? This action cannot be undone."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">
          This will permanently delete all selected items and their associated data.
        </p>
      </Modal>
    </div>
  );
}

function DrawerDemo({ side }: { side?: 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>Open {side === 'left' ? 'Left' : 'Right'} Drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Settings"
        side={side}
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">Drawer content goes here.</p>
      </Drawer>
    </div>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
}

function ModalScrollableDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>Scrollable Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Long Content" scrollable
        footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>OK</Button></>}
      >
        <div className="space-y-3">
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i} className="text-sm text-text-secondary">Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          ))}
        </div>
      </Modal>
    </div>
  );
}

function ModalFullscreenDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="ghost" onClick={() => setOpen(true)}>Fullscreen Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Fullscreen Dialog" fullscreen
        footer={<Button onClick={() => setOpen(false)}>Close</Button>}
      >
        <p className="text-sm text-text-secondary">This modal takes the full viewport.</p>
      </Modal>
    </div>
  );
}

function ToastActionDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2">
      <Button variant="outline" size="sm" onClick={() => setShow(true)}>Show Toast with Action</Button>
      {show && (
        <Toast
          variant="info"
          message="Item moved to trash."
          action={{ label: 'Undo', onClick: () => alert('Undone!') }}
          onDismiss={() => setShow(false)}
        />
      )}
    </div>
  );
}

function TreeViewDemo() {
  const [sel, setSel] = useState<string | undefined>();
  return (
    <TreeView
      label="File tree"
      selectedId={sel}
      onSelect={setSel}
      nodes={[
        { id: 'src', label: 'src', children: [
          { id: 'components', label: 'components', children: [
            { id: 'Button', label: 'Button.tsx' },
            { id: 'Input', label: 'Input.tsx' },
          ]},
          { id: 'utils', label: 'utils', children: [
            { id: 'cn', label: 'cn.ts' },
          ]},
        ]},
        { id: 'public', label: 'public', children: [
          { id: 'logo', label: 'logo.svg' },
        ]},
        { id: 'pkg', label: 'package.json' },
      ]}
    />
  );
}

function PopoverDemo() {
  return (
    <Popover
      trigger={<Button variant="outline">Open Popover</Button>}
      placement="bottom"
    >
      <div className="p-4 space-y-2">
        <p className="text-sm font-semibold text-text-primary">Popover title</p>
        <p className="text-xs text-text-secondary">Contextual content appears here.</p>
        <Button size="sm" variant="ghost" className="w-full">Action</Button>
      </div>
    </Popover>
  );
}

function AdvancedTableDemo() {
  const rows = [
    { name: 'Alice', role: 'Admin', status: 'Active', _expanded: <p className="text-sm">Joined 2023-01-15 · Last active 2 days ago</p> },
    { name: 'Bob', role: 'Editor', status: 'Inactive', _expanded: <p className="text-sm">Joined 2022-06-10 · Last active 30 days ago</p> },
    { name: 'Carol', role: 'Viewer', status: 'Active' },
    { name: 'Dave', role: 'Editor', status: 'Active', _expanded: <p className="text-sm">Joined 2024-03-01 · Last active today</p> },
  ];
  const cols = [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status' },
  ] as const;
  return (
    <div className="w-full">
      <AdvancedDataTable
        columns={cols as never}
        rows={rows as never}
        selectable
        caption="Team members"
      />
    </div>
  );
}

export function buildOrganismsData(): ShowcaseComponent[] {
  return [
    {
      id: 'card',
      title: 'Card',
      category: 'Organism',
      abbr: 'Ca',
      description: 'Raised / flat / outline varyantlı içerik konteyneri. title + subtitle + headerRight + footer slotları desteklenir.',
      filePath: 'modules/ui/Card.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

export function Card({ title, subtitle, headerRight, footer, children, variant = 'raised', className }) {
  return (
    <div className={cn('rounded-xl border border-border overflow-hidden', variant === 'raised' && 'bg-surface-raised shadow-sm', variant === 'flat' && 'bg-surface-base', variant === 'outline' && 'bg-transparent', className)}>
      {(title || headerRight) && (
        <div className="flex items-start justify-between gap-3 px-6 py-4 border-b border-border">
          <div>
            {title && <h3 className="text-sm font-semibold text-text-primary">{title}</h3>}
            {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
          </div>
          {headerRight && <div className="shrink-0">{headerRight}</div>}
        </div>
      )}
      {children && <div className="px-6 py-4">{children}</div>}
      {footer && <div className="px-6 py-3 border-t border-border bg-surface-base">{footer}</div>}
    </div>
  );
}`,
      variants: [
        {
          title: 'Raised',
          preview: (
            <div className="w-full max-w-sm">
              <Card title="User profile" subtitle="Manage your account details" headerRight={<Badge variant="success">Active</Badge>}>
                <p className="text-sm text-text-secondary">Card body content goes here.</p>
              </Card>
            </div>
          ),
          code: `<Card title="User profile" subtitle="Manage your account" headerRight={<Badge variant="success">Active</Badge>}>\n  <p>Card body content goes here.</p>\n</Card>`,
        },
        {
          title: 'With footer',
          preview: (
            <div className="w-full max-w-sm">
              <Card title="Confirm deletion" footer={<div className="flex gap-2"><Button variant="outline" size="sm">Cancel</Button><Button variant="danger" size="sm">Delete</Button></div>}>
                <p className="text-sm text-text-secondary">This action is irreversible.</p>
              </Card>
            </div>
          ),
          code: `<Card title="Confirm deletion" footer={<><Button variant="outline" size="sm">Cancel</Button><Button variant="danger" size="sm">Delete</Button></>}>\n  <p>This action is irreversible.</p>\n</Card>`,
        },
        {
          title: 'Outline',
          preview: (
            <div className="w-full max-w-sm">
              <Card variant="outline" title="Outline card">
                <p className="text-sm text-text-secondary">Transparent background, border only.</p>
              </Card>
            </div>
          ),
          code: `<Card variant="outline" title="Outline card">\n  <p>Transparent background, border only.</p>\n</Card>`,
        },
        {
          title: 'Clickable / hoverable',
          preview: (
            <div className="w-full max-w-sm space-y-3">
              <Card title="Clickable card" subtitle="Tap to navigate" onClick={() => alert('Card clicked!')} >
                <p className="text-sm text-text-secondary">This card is a button element with hover + focus ring.</p>
              </Card>
              <Card title="Hoverable only" subtitle="Hover for shadow" hoverable>
                <p className="text-sm text-text-secondary">Not clickable, just visually responsive.</p>
              </Card>
            </div>
          ),
          code: `<Card title="Clickable" onClick={() => navigate('/detail')}>...</Card>\n<Card title="Hoverable" hoverable>...</Card>`,
          layout: 'stack' as const,
        },
        {
          title: 'Loading skeleton',
          preview: (
            <div className="w-full max-w-sm">
              <Card loading />
            </div>
          ),
          code: `<Card loading />`,
        },
      ],
    },
    {
      id: 'alert-banner',
      title: 'AlertBanner',
      category: 'Organism',
      abbr: 'Ab',
      description: 'Sayfa düzeyinde bilgi, uyarı veya hata mesajı. role="alert" ile ekran okuyucular için duyurulur. dismissible özelliği eklenebilir.',
      filePath: 'modules/ui/AlertBanner.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';

const variantMap = {
  success: { container: 'bg-success-subtle border-success text-success-fg', icon: '✓' },
  warning: { container: 'bg-warning-subtle border-warning text-warning-fg', icon: '⚠' },
  error:   { container: 'bg-error-subtle border-error text-error-fg',       icon: '✕' },
  info:    { container: 'bg-info-subtle border-info text-info-fg',          icon: 'ℹ' },
};

export function AlertBanner({ variant = 'info', title, message, dismissible = false, className }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const { container, icon } = variantMap[variant];
  return (
    <div role="alert" className={cn('flex items-start gap-3 rounded-lg border p-4', container, className)}>
      <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold">{icon}</span>
      <div className="flex-1 text-sm">
        {title && <p className="font-semibold">{title}</p>}
        <p className={cn(title && 'mt-0.5')}>{message}</p>
      </div>
      {dismissible && (
        <button type="button" aria-label="Dismiss" onClick={() => setDismissed(true)} className="shrink-0 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded">✕</button>
      )}
    </div>
  );
}`,
      variants: [
        { title: 'Info', preview: <AlertBanner variant="info" title="System update" message="A new version is available. Please refresh the page." dismissible />, code: `<AlertBanner variant="info" title="System update" message="A new version is available." dismissible />` },
        { title: 'Success', preview: <AlertBanner variant="success" message="Profile updated successfully." dismissible />, code: `<AlertBanner variant="success" message="Profile updated successfully." dismissible />` },
        { title: 'Warning', preview: <AlertBanner variant="warning" title="Maintenance window" message="The service will be unavailable from 2–4 AM UTC." />, code: `<AlertBanner variant="warning" title="Maintenance window" message="The service will be unavailable from 2–4 AM UTC." />` },
        { title: 'Error', preview: <AlertBanner variant="error" title="Something went wrong" message="Unable to load the resource. Please try again." />, code: `<AlertBanner variant="error" title="Something went wrong" message="Unable to load the resource. Please try again." />` },
        {
          title: 'With CTA action',
          preview: (
            <AlertBanner variant="warning" title="Your plan is expiring" message="Upgrade before your trial ends to keep access."
              action={{ label: 'Upgrade now', onClick: () => alert('Upgrade clicked!') }} dismissible />
          ),
          code: `<AlertBanner variant="warning" title="Your plan is expiring" message="Upgrade before your trial ends."\n  action={{ label: 'Upgrade now', onClick: handleUpgrade }} dismissible />`,
          layout: 'stack' as const,
        },
        {
          title: 'Custom icon',
          preview: (
            <AlertBanner variant="info" message="Custom icon override example." icon={<span>🚀</span>} />
          ),
          code: `<AlertBanner variant="info" message="Custom icon override." icon={<RocketIcon />} />`,
          layout: 'stack' as const,
        },
      ],
    },
    {
      id: 'toast',
      title: 'Toast',
      category: 'Organism',
      abbr: 'To',
      description: 'Auto-dismiss bildirimi (error hariç). 4–6s sonra kaybolur. ToastRegion konteyneri ile fixed konumda render edilir.',
      filePath: 'modules/ui/Toast.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useState } from 'react';

const variantMap = {
  success: { container: 'bg-success-subtle border-success text-success-fg', icon: '✓' },
  warning: { container: 'bg-warning-subtle border-warning text-warning-fg', icon: '⚠' },
  error:   { container: 'bg-error-subtle border-error text-error-fg',       icon: '✕' },
  info:    { container: 'bg-info-subtle border-info text-info-fg',          icon: 'ℹ' },
};

export function Toast({ variant = 'info', message, duration, onDismiss, className }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (variant === 'error') return;
    const t = setTimeout(() => { setVisible(false); onDismiss?.(); }, duration ?? 5000);
    return () => clearTimeout(t);
  }, [variant, duration, onDismiss]);
  if (!visible) return null;
  const { container, icon } = variantMap[variant];
  return (
    <div role={variant === 'error' ? 'alert' : undefined} aria-live={variant === 'error' ? undefined : 'polite'}
      className={cn('max-w-sm w-full rounded-lg border p-4 shadow-lg flex items-start gap-3 pointer-events-auto', container, className)}>
      <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold">{icon}</span>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button type="button" aria-label="Dismiss" onClick={() => { setVisible(false); onDismiss?.(); }} className="shrink-0 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded">✕</button>
    </div>
  );
}`,
      variants: [
        { title: 'Success', preview: <Toast variant="success" message="Profile saved successfully." />, code: `<Toast variant="success" message="Profile saved successfully." />` },
        { title: 'Warning', preview: <Toast variant="warning" message="Your session will expire in 5 minutes." />, code: `<Toast variant="warning" message="Your session will expire in 5 minutes." />` },
        { title: 'Error (no auto-dismiss)', preview: <Toast variant="error" message="Failed to save. Please try again." />, code: `<Toast variant="error" message="Failed to save. Please try again." />` },
        { title: 'Info', preview: <Toast variant="info" message="New comment added to your post." />, code: `<Toast variant="info" message="New comment added to your post." />` },
        {
          title: 'With action (Undo)',
          preview: <ToastActionDemo />,
          code: `<Toast variant="info" message="Item moved to trash."\n  action={{ label: 'Undo', onClick: handleUndo }} />`,
        },
      ],
    },
    {
      id: 'empty-state',
      title: 'EmptyState',
      category: 'Organism',
      abbr: 'Es',
      description: 'Veri yokken gösterilen boş durum mesajı. icon + title + description + action slotları desteklenir.',
      filePath: 'modules/ui/EmptyState.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      {icon && <div className="h-12 w-12 rounded-full bg-surface-sunken flex items-center justify-center text-text-disabled text-2xl mb-4" aria-hidden="true">{icon}</div>}
      <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      {description && <p className="mt-1 text-sm text-text-secondary max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}`,
      variants: [
        {
          title: 'With action',
          preview: (
            <EmptyState icon="📁" title="No projects yet" description="Create your first project to get started." action={<Button variant="primary" size="sm">New project</Button>} />
          ),
          code: `<EmptyState icon="📁" title="No projects yet" description="Create your first project to get started." action={<Button variant="primary" size="sm">New project</Button>} />`,
        },
        {
          title: 'Minimal',
          preview: <EmptyState title="No results found" description="Try adjusting your search or filters." />,
          code: `<EmptyState title="No results found" description="Try adjusting your search or filters." />`,
        },
      ],
    },
    {
      id: 'pagination',
      title: 'Pagination',
      category: 'Organism',
      abbr: 'Pg',
      description: 'Sayfa navigasyonu. Ellipsis ile büyük sayfa sayılarını kısaltır. aria-label ve aria-current="page" ile erişilebilir.',
      filePath: 'modules/ui/Pagination.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function Pagination({ page, totalPages, onPageChange, className }) {
  // builds visible pages with ellipsis ...
  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Go to previous page" className="...">‹</button>
      {/* page buttons */}
      <button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} aria-label="Go to next page" className="...">›</button>
    </nav>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: <PaginationDemo />,
          code: `const [page, setPage] = useState(1);\n<Pagination page={page} totalPages={10} onPageChange={setPage} />`,
        },
        {
          title: 'Sizes',
          preview: (() => {
            function SizesDemo() {
              const [p, setP] = useState(3);
              return (
                <div className="space-y-3">
                  {(['sm', 'md', 'lg'] as const).map((s) => (
                    <Pagination key={s} page={p} totalPages={10} onPageChange={setP} size={s} />
                  ))}
                </div>
              );
            }
            return <SizesDemo />;
          })(),
          code: `<Pagination page={page} totalPages={10} onPageChange={setPage} size="sm" />\n<Pagination page={page} totalPages={10} onPageChange={setPage} size="lg" />`,
          layout: 'stack' as const,
        },
        {
          title: 'First / Last + Jump to page',
          preview: (() => {
            function FullDemo() {
              const [p, setP] = useState(5);
              return <Pagination page={p} totalPages={20} onPageChange={setP} showFirstLast showJumpTo />;
            }
            return <FullDemo />;
          })(),
          code: `<Pagination page={page} totalPages={20} onPageChange={setPage} showFirstLast showJumpTo />`,
          layout: 'stack' as const,
        },
      ],
    },
    {
      id: 'modal',
      title: 'Modal',
      category: 'Organism',
      abbr: 'Md',
      description: 'Odak yönetimi, Escape kapatma, backdrop tıklama ile kapatma. role="dialog" + aria-modal + aria-labelledby zorunludur.',
      filePath: 'modules/ui/Modal.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef } from 'react';

export function Modal({ open, onClose, title, description, children, footer, size = 'md', className }) {
  const panelRef = useRef(null);
  useEffect(() => { if (!open) return; const prev = document.activeElement; panelRef.current?.focus(); return () => prev?.focus(); }, [open]);
  useEffect(() => { if (!open) return; const onKey = (e) => { if (e.key === 'Escape') onClose(); }; document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey); }, [open, onClose]);
  if (!open) return null;
  const sizeClass = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' }[size];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} tabIndex={-1} className={cn('relative z-10 w-full rounded-xl border border-border bg-surface-raised shadow-xl flex flex-col focus-visible:outline-none', sizeClass, className)}>
        <div className="flex items-start justify-between gap-3 px-6 py-4 border-b border-border">
          <h2 id="modal-title" className="text-base font-semibold text-text-primary">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="text-text-disabled hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded">✕</button>
        </div>
        {children && <div className="px-6 py-4 flex-1">{children}</div>}
        {footer && <div className="px-6 py-4 border-t border-border flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}`,
      variants: [
        {
          title: 'Confirmation dialog',
          preview: <ModalDemo />,
          code: `const [open, setOpen] = useState(false);\n<Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>\n<Modal open={open} onClose={() => setOpen(false)} title="Confirm action"\n  description="Are you sure you want to proceed?"\n  footer={<><Button variant="outline">Cancel</Button><Button variant="danger">Delete</Button></>}>\n  <p>This will permanently delete all selected items.</p>\n</Modal>`,
        },
        {
          title: 'Scrollable body',
          preview: <ModalScrollableDemo />,
          code: `<Modal open={open} onClose={onClose} title="Long Content" scrollable\n  footer={<Button>OK</Button>}>\n  {/* long content scrolls inside */}\n</Modal>`,
        },
        {
          title: 'Fullscreen',
          preview: <ModalFullscreenDemo />,
          code: `<Modal open={open} onClose={onClose} title="Fullscreen Dialog" fullscreen>...</Modal>`,
        },
      ],
    },
    {
      id: 'drawer',
      title: 'Drawer',
      category: 'Organism',
      abbr: 'Dr',
      description: 'Ekranın kenarından süzülen panel. Sol / sağ taraf seçeneği, odak yönetimi ve Escape kapatma dahildir.',
      filePath: 'modules/ui/Drawer.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef } from 'react';

export function Drawer({ open, onClose, title, side = 'right', children, footer, className }) {
  // focus trap + Escape key handler
  return (
    <div className={cn('fixed inset-0 z-50 flex', !open && 'pointer-events-none')} aria-modal="true" role="dialog" aria-label={title}>
      <div className={cn('absolute inset-0 bg-black/50 transition-opacity duration-200', open ? 'opacity-100' : 'opacity-0')} onClick={onClose} aria-hidden="true" />
      <div className={cn('relative flex flex-col w-80 max-w-full h-full bg-surface-raised shadow-xl transition-transform duration-200 focus-visible:outline-none', side === 'right' ? 'ml-auto border-l border-border' : 'mr-auto border-r border-border', open ? 'translate-x-0' : side === 'right' ? 'translate-x-full' : '-translate-x-full', className)}>
        <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-border shrink-0">
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close drawer" className="text-text-disabled hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
        {footer && <div className="px-4 py-4 border-t border-border shrink-0 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}`,
      variants: [
        {
          title: 'Right drawer',
          preview: <DrawerDemo side="right" />,
          code: `const [open, setOpen] = useState(false);\n<Button variant="outline" onClick={() => setOpen(true)}>Open Drawer</Button>\n<Drawer open={open} onClose={() => setOpen(false)} title="Settings" side="right"\n  footer={<><Button variant="outline">Cancel</Button><Button variant="primary">Save</Button></>}>\n  <p>Drawer content goes here.</p>\n</Drawer>`,
        },
        {
          title: 'Left drawer',
          preview: <DrawerDemo side="left" />,
          code: `<Drawer open={open} onClose={() => setOpen(false)} title="Navigation" side="left">...</Drawer>`,
        },
      ],
    },
    {
      id: 'tooltip',
      title: 'Tooltip',
      category: 'Organism',
      abbr: 'Tt',
      description: 'Hover ve focus ile görünür yardım metni. role="tooltip" + aria-describedby bağlantısı ile erişilebilir. 4 yön desteklenir.',
      filePath: 'modules/ui/Tooltip.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useRef, useState } from 'react';

export function Tooltip({ content, placement = 'top', children, className }) {
  const [visible, setVisible] = useState(false);
  const id = useRef(\`tooltip-\${Math.random().toString(36).slice(2)}\`).current;
  const placementClass = { top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5', bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5', left: 'right-full top-1/2 -translate-y-1/2 mr-1.5', right: 'left-full top-1/2 -translate-y-1/2 ml-1.5' }[placement];
  return (
    <span className={cn('relative inline-flex items-center', className)} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onFocus={() => setVisible(true)} onBlur={() => setVisible(false)}>
      <span aria-describedby={id}>{children}</span>
      <span id={id} role="tooltip" className={cn('absolute z-50 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium shadow-md bg-surface-overlay text-text-primary border border-border transition-opacity duration-150 pointer-events-none', placementClass, visible ? 'opacity-100' : 'opacity-0')}>{content}</span>
    </span>
  );
}`,
      variants: [
        {
          title: 'Placements',
          preview: (
            <div className="flex flex-wrap items-center justify-center gap-6 py-4">
              {(['top','bottom','left','right'] as const).map((p) => (
                <Tooltip key={p} content={`Tooltip ${p}`} placement={p}>
                  <Button variant="outline" size="sm">{p.charAt(0).toUpperCase() + p.slice(1)}</Button>
                </Tooltip>
              ))}
            </div>
          ),
          code: `<Tooltip content="Help text" placement="top">\n  <Button variant="outline" size="sm">Hover me</Button>\n</Tooltip>`,
        },
        {
          title: 'Themes',
          preview: (
            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
              <Tooltip content="Default theme" theme="default">
                <Button variant="outline" size="sm">Default</Button>
              </Tooltip>
              <Tooltip content="Dark theme" theme="dark">
                <Button variant="outline" size="sm">Dark</Button>
              </Tooltip>
              <Tooltip content="Light theme" theme="light">
                <Button variant="outline" size="sm">Light</Button>
              </Tooltip>
            </div>
          ),
          code: `<Tooltip content="Dark theme" theme="dark"><Button>Dark</Button></Tooltip>`,
        },
        {
          title: 'Arrow + Delay',
          preview: (
            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
              <Tooltip content="With arrow" arrow placement="top">
                <Button variant="outline" size="sm">Arrow</Button>
              </Tooltip>
              <Tooltip content="500ms delay" delay={500} placement="bottom">
                <Button variant="outline" size="sm">Delayed</Button>
              </Tooltip>
              <Tooltip content="Arrow + dark + delay" arrow theme="dark" delay={300} placement="right">
                <Button variant="outline" size="sm">Combined</Button>
              </Tooltip>
            </div>
          ),
          code: `<Tooltip content="With arrow" arrow placement="top">\n  <Button>Arrow</Button>\n</Tooltip>\n<Tooltip content="500ms delay" delay={500}>\n  <Button>Delayed</Button>\n</Tooltip>`,
        },
      ],
    },
    {
      id: 'dropdown-menu',
      title: 'DropdownMenu',
      category: 'Organism',
      abbr: 'Dm',
      description: 'role="menu" + role="menuitem" ile erişilebilir dropdown. Escape ile kapanır, dışarı tıklamada kapanır. Danger ve disabled item desteği var.',
      filePath: 'modules/ui/DropdownMenu.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef, useState } from 'react';

export function DropdownMenu({ trigger, items, align = 'left', className }) {
  const [open, setOpen] = useState(false);
  // outside click + Escape handlers
  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      <div onClick={() => setOpen((p) => !p)} aria-haspopup="menu" aria-expanded={open}>{trigger}</div>
      {open && (
        <div role="menu" className={cn('absolute z-50 mt-1 min-w-[10rem] rounded-lg border border-border bg-surface-raised shadow-lg py-1', align === 'right' ? 'right-0' : 'left-0')}>
          {items.map((item, i) => item.type === 'separator' ? <div key={i} role="separator" className="my-1 border-t border-border" /> : (
            <button key={i} role="menuitem" type="button" disabled={item.disabled} onClick={() => { item.onClick?.(); setOpen(false); }}
              className={cn('flex w-full items-center gap-2 px-3 py-2 text-sm text-left transition-colors focus-visible:outline-none focus-visible:bg-surface-overlay', item.danger ? 'text-error hover:bg-error-subtle' : 'text-text-primary hover:bg-surface-overlay', item.disabled && 'opacity-50 cursor-not-allowed')}>
              {item.icon && <span aria-hidden="true">{item.icon}</span>}{item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: (
            <DropdownMenu
              trigger={<Button variant="outline" size="sm">Actions ▾</Button>}
              items={[
                { label: 'Edit', icon: '✏' },
                { label: 'Duplicate', icon: '⧉' },
                { type: 'separator' },
                { label: 'Delete', icon: '🗑', danger: true },
              ]}
            />
          ),
          code: `<DropdownMenu\n  trigger={<Button variant="outline" size="sm">Actions ▾</Button>}\n  items={[\n    { label: 'Edit', icon: '✏' },\n    { label: 'Duplicate', icon: '⧉' },\n    { type: 'separator' },\n    { label: 'Delete', icon: '🗑', danger: true },\n  ]}\n/>`,
        },
        {
          title: 'Right-aligned',
          preview: (
            <div className="flex justify-end w-full max-w-xs">
              <DropdownMenu
                align="right"
                trigger={<Button variant="ghost" size="sm">⋮</Button>}
                items={[
                  { label: 'View details' },
                  { label: 'Export', icon: '↗' },
                  { label: 'Archive', disabled: true },
                  { type: 'separator' },
                  { label: 'Remove', danger: true },
                ]}
              />
            </div>
          ),
          code: `<DropdownMenu align="right"\n  trigger={<Button variant="ghost" size="sm">⋮</Button>}\n  items={[{ label: 'View details' }, { label: 'Remove', danger: true }]}\n/>`,
        },
      ],
    },
    {
      id: 'table',
      title: 'Table',
      category: 'Organism',
      abbr: 'Tb',
      description: 'Responsive tablo. scope="col" başlıklar, hover satır vurgusu, boş durum mesajı ve özel cell render desteği.',
      filePath: 'modules/ui/Table.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

export function Table({ columns, rows, caption, emptyMessage = 'No results found.', className }) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border border-border', className)}>
      <table className="w-full text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-surface-sunken border-b border-border">
          <tr>{columns.map((col) => <th key={col.key} scope="col" className="px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-left">{col.header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface-base">
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-text-secondary">{emptyMessage}</td></tr>
          ) : rows.map((row, i) => (
            <tr key={i} className="hover:bg-surface-overlay transition-colors">
              {columns.map((col) => <td key={col.key} className="px-4 py-3 text-text-primary">{col.render ? col.render(row) : String(row[col.key] ?? '')}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
      variants: [
        {
          title: 'With data',
          layout: 'stack' as const,
          preview: (
            <Table
              caption="Users table"
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
                { key: 'status', header: 'Status', render: (row) => <Badge variant={row.status === 'Active' ? 'success' : 'neutral'}>{String(row.status)}</Badge> },
              ]}
              rows={[
                { name: 'Jane Doe', email: 'jane@example.com', role: 'Admin', status: 'Active' },
                { name: 'John Smith', email: 'john@example.com', role: 'Member', status: 'Inactive' },
              ]}
            />
          ),
          code: `<Table\n  columns={[\n    { key: 'name', header: 'Name' },\n    { key: 'email', header: 'Email' },\n    { key: 'status', header: 'Status', render: (row) => <Badge variant={row.status === 'Active' ? 'success' : 'neutral'}>{row.status}</Badge> },\n  ]}\n  rows={[{ name: 'Jane Doe', email: 'jane@example.com', status: 'Active' }]}\n/>`,
        },
        {
          title: 'Empty state',
          preview: (
            <Table
              caption="Empty table"
              columns={[{ key: 'name', header: 'Name' }, { key: 'email', header: 'Email' }]}
              rows={[]}
              emptyMessage="No users found. Invite your team to get started."
            />
          ),
          code: `<Table columns={[...]} rows={[]} emptyMessage="No users found." />`,
        },
        {
          title: 'Sortable columns',
          layout: 'stack' as const,
          preview: (
            <Table
              caption="Sortable users table"
              columns={[
                { key: 'name',  header: 'Name',  sortable: true },
                { key: 'email', header: 'Email', sortable: true },
                { key: 'role',  header: 'Role',  sortable: true },
              ]}
              rows={[
                { name: 'Zara Kim',    email: 'zara@example.com',  role: 'Admin' },
                { name: 'Alice Brown', email: 'alice@example.com', role: 'Member' },
                { name: 'Bob Lee',     email: 'bob@example.com',   role: 'Viewer' },
              ]}
            />
          ),
          code: `<Table\n  columns={[\n    { key: 'name', header: 'Name', sortable: true },\n    { key: 'role', header: 'Role', sortable: true },\n  ]}\n  rows={rows}\n/>`,
        },
      ],
    },
    {
      id: 'tab-group',
      title: 'TabGroup',
      category: 'Organism',
      abbr: 'Tg',
      description: 'role="tablist" / role="tab" / role="tabpanel" ARIA pattern. Ok tuşları ile navigasyon, tabIndex=-1 aktif olmayan tablar için.',
      filePath: 'modules/ui/TabGroup.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';

export function TabGroup({ tabs, defaultTab, label = 'Tabs', className }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? '');
  function handleKeyDown(e, index) {
    if (e.key === 'ArrowRight') setActive(tabs[(index + 1) % tabs.length].id);
    else if (e.key === 'ArrowLeft') setActive(tabs[(index - 1 + tabs.length) % tabs.length].id);
  }
  return (
    <div className={cn('w-full', className)}>
      <div role="tablist" aria-label={label} className="flex border-b border-border">
        {tabs.map((tab, i) => (
          <button key={tab.id} role="tab" id={\`tab-btn-\${tab.id}\`} aria-selected={tab.id === active} aria-controls={\`tabpanel-\${tab.id}\`} tabIndex={tab.id === active ? 0 : -1}
            onClick={() => setActive(tab.id)} onKeyDown={(e) => handleKeyDown(e, i)}
            className={cn('px-4 py-2.5 text-sm font-medium border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus', tab.id === active ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border')}>
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id} id={\`tabpanel-\${tab.id}\`} role="tabpanel" aria-labelledby={\`tab-btn-\${tab.id}\`} tabIndex={0} hidden={tab.id !== active} className="py-4 focus-visible:outline-none">
          {tab.content}
        </div>
      ))}
    </div>
  );
}`,
      variants: [
        {
          title: 'Default',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <TabGroup
                label="Account settings"
                tabs={[
                  { id: 'profile', label: 'Profile', content: <p className="text-sm text-text-secondary">Profile settings content.</p> },
                  { id: 'security', label: 'Security', content: <p className="text-sm text-text-secondary">Security settings content.</p> },
                  { id: 'billing', label: 'Billing', content: <p className="text-sm text-text-secondary">Billing settings content.</p> },
                ]}
              />
            </div>
          ),
          code: `<TabGroup\n  label="Account settings"\n  tabs={[\n    { id: 'profile', label: 'Profile', content: <ProfileSettings /> },\n    { id: 'security', label: 'Security', content: <SecuritySettings /> },\n    { id: 'billing', label: 'Billing', content: <BillingSettings /> },\n  ]}\n/>`,
        },
        {
          title: 'Icons + badge + disabled',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <TabGroup
                label="Dashboard sections"
                tabs={[
                  { id: 'overview', label: 'Overview', icon: '📊', content: <p className="text-sm text-text-secondary">Overview content.</p> },
                  { id: 'analytics', label: 'Analytics', icon: '📈', badge: <Badge variant="primary" size="sm">New</Badge>, content: <p className="text-sm text-text-secondary">Analytics content.</p> },
                  { id: 'reports', label: 'Reports', icon: '📄', content: <p className="text-sm text-text-secondary">Reports content.</p> },
                  { id: 'settings', label: 'Settings', icon: '⚙', disabled: true, content: <p>Settings disabled.</p> },
                ]}
              />
            </div>
          ),
          code: `<TabGroup tabs={[\n  { id: 'overview', label: 'Overview', icon: <BarChart2 />, content: ... },\n  { id: 'analytics', label: 'Analytics', icon: <TrendingUp />, badge: <Badge>New</Badge>, content: ... },\n  { id: 'settings', label: 'Settings', disabled: true, content: ... },\n]} />`,
        },
        {
          title: 'Lazy panels',
          layout: 'stack' as const,
          preview: (() => {
            function LazyDemo() {
              const [log, setLog] = useState<string[]>(['Tab 1 mounted']);
              return (
                <div className="w-full space-y-2">
                  <TabGroup
                    label="Lazy tabs"
                    lazy
                    tabs={[
                      { id: 't1', label: 'Tab 1', content: <p className="text-sm text-text-secondary">Always mounted (initial).</p> },
                      { id: 't2', label: 'Tab 2', content: (() => { setLog((l) => l.includes('Tab 2 mounted') ? l : [...l, 'Tab 2 mounted']); return <p className="text-sm text-text-secondary">Mounted on first activation.</p>; })() },
                      { id: 't3', label: 'Tab 3', content: (() => { setLog((l) => l.includes('Tab 3 mounted') ? l : [...l, 'Tab 3 mounted']); return <p className="text-sm text-text-secondary">Mounted on first activation.</p>; })() },
                    ]}
                  />
                  <p className="text-xs text-text-disabled">Mount log: {log.join(' → ')}</p>
                </div>
              );
            }
            return <LazyDemo />;
          })(),
          code: `// With lazy=true, panel content is only rendered when first activated:\n<TabGroup lazy tabs={[\n  { id: 'heavy', label: 'Heavy', content: <HeavyComponent /> },\n]} />`,
        },
      ],
    },
    {
      id: 'breadcrumb',
      title: 'Breadcrumb',
      category: 'Organism',
      abbr: 'Bc',
      description: 'nav aria-label="Breadcrumb" sarıcı ile erişilebilir. Son öge aria-current="page" ile işaretlenir, ayrılıcı aria-hidden.',
      filePath: 'modules/ui/Breadcrumb.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

export function Breadcrumb({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {!isLast && item.href ? (
                <><a href={item.href} className="text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded">{item.label}</a><span aria-hidden="true" className="text-text-disabled">›</span></>
              ) : (
                <span className={isLast ? 'text-text-primary font-medium' : 'text-text-secondary'} aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: (
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }, { label: 'Breadcrumb' }]} />
          ),
          code: `<Breadcrumb items={[\n  { label: 'Home', href: '/' },\n  { label: 'Components', href: '/components' },\n  { label: 'Breadcrumb' },\n]} />`,
        },
        {
          title: 'Long path',
          preview: (
            <Breadcrumb items={[{ label: 'Dashboard', href: '/' }, { label: 'Users', href: '/users' }, { label: 'Settings', href: '/users/settings' }, { label: 'Permissions' }]} />
          ),
          code: `<Breadcrumb items={[\n  { label: 'Dashboard', href: '/' },\n  { label: 'Users', href: '/users' },\n  { label: 'Settings', href: '/users/settings' },\n  { label: 'Permissions' },\n]} />`,
        },
        {
          title: 'Custom separator',
          preview: (
            <Breadcrumb
              items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Post title' }]}
              separator={<span aria-hidden="true" className="text-text-disabled">/</span>}
            />
          ),
          code: `<Breadcrumb items={[...]} separator={<span>/</span>} />`,
        },
        {
          title: 'Overflow / ellipsis',
          preview: (
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'Electronics', href: '/products/electronics' },
                { label: 'Computers', href: '/products/electronics/computers' },
                { label: 'Laptops', href: '/products/electronics/computers/laptops' },
                { label: 'MacBook Pro 16"' },
              ]}
              maxItems={3}
            />
          ),
          code: `<Breadcrumb items={[/* 6 items */]} maxItems={3} />`,
        },
      ],
    },
    {
      id: 'data-table',
      title: 'DataTable',
      category: 'Organism',
      abbr: 'Dt',
      description: 'Table + SearchBar + Pagination tek bileşende. Client-side arama ve sayfalama. Filtrelenmiş sonuç sayacı, satır/sayfa seçici.',
      filePath: 'modules/ui/DataTable.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useMemo, useState } from 'react';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination';

export function DataTable({ columns, rows, caption, searchable = true, searchPlaceholder = 'Search…', pageSize: defaultPageSize = 10, pageSizeOptions = [5,10,25,50], emptyMessage = 'No results found.', className }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((row) => columns.some((col) => !col.render && String(row[col.key] ?? '').toLowerCase().includes(q)));
  }, [rows, search, columns]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={cn('space-y-3', className)}>
      {searchable && (
        <div className="flex items-center gap-2 flex-wrap">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder={searchPlaceholder} className="flex-1 min-w-40" />
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded-md border border-border bg-surface-base px-2 py-1.5 text-sm">
            {pageSizeOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}
      {/* table body ... */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-text-secondary">Showing {(page-1)*pageSize+1}–{Math.min(page*pageSize, filtered.length)} of {filtered.length}</p>
        {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}
      </div>
    </div>
  );
}`,
      variants: [
        {
          title: 'Full example',
          layout: 'stack' as const,
          preview: (() => {
            type User = { name: string; email: string; role: string; status: string; joined: string };
            const USERS: User[] = [
              { name: 'Alice Martin',   email: 'alice@example.com',   role: 'Admin',   status: 'Active',   joined: '2024-01-15' },
              { name: 'Bob Johnson',    email: 'bob@example.com',     role: 'Member',  status: 'Active',   joined: '2024-02-20' },
              { name: 'Carol Williams', email: 'carol@example.com',   role: 'Editor',  status: 'Inactive', joined: '2024-03-10' },
              { name: 'David Brown',    email: 'david@example.com',   role: 'Member',  status: 'Active',   joined: '2024-04-05' },
              { name: 'Eve Davis',      email: 'eve@example.com',     role: 'Admin',   status: 'Active',   joined: '2024-05-18' },
              { name: 'Frank Wilson',   email: 'frank@example.com',   role: 'Member',  status: 'Pending',  joined: '2024-06-22' },
              { name: 'Grace Moore',    email: 'grace@example.com',   role: 'Editor',  status: 'Active',   joined: '2024-07-01' },
              { name: 'Hank Taylor',    email: 'hank@example.com',    role: 'Member',  status: 'Inactive', joined: '2024-08-14' },
            ];
            return (
              <div className="w-full">
                <DataTable<User>
                  caption="Users"
                  searchPlaceholder="Search users…"
                  pageSize={5}
                  rows={USERS}
                  columns={[
                    { key: 'name',   header: 'Name'   },
                    { key: 'email',  header: 'Email'  },
                    { key: 'role',   header: 'Role'   },
                    { key: 'status', header: 'Status', render: (r) => <Badge variant={r.status === 'Active' ? 'success' : r.status === 'Pending' ? 'warning' : 'neutral'}>{r.status}</Badge> },
                    { key: 'joined', header: 'Joined' },
                  ]}
                />
              </div>
            );
          })(),
          code: `<DataTable\n  caption="Users"\n  searchPlaceholder="Search users…"\n  pageSize={5}\n  rows={users}\n  columns={[\n    { key: 'name',   header: 'Name' },\n    { key: 'email',  header: 'Email' },\n    { key: 'role',   header: 'Role' },\n    { key: 'status', header: 'Status', render: (r) => <Badge variant={...}>{r.status}</Badge> },\n    { key: 'joined', header: 'Joined' },\n  ]}\n/>`,
        },
        {
          title: 'Sortable columns',
          layout: 'stack' as const,
          preview: (() => {
            type Product = { name: string; category: string; price: string; stock: string };
            const PRODUCTS: Product[] = [
              { name: 'Widget A', category: 'Tools',       price: '29.99',  stock: '150' },
              { name: 'Gadget B', category: 'Electronics', price: '99.00',  stock: '42'  },
              { name: 'Part C',   category: 'Tools',       price: '9.50',   stock: '500' },
              { name: 'Device D', category: 'Electronics', price: '249.00', stock: '18'  },
              { name: 'Item E',   category: 'Misc',        price: '14.75',  stock: '200' },
            ];
            return (
              <div className="w-full">
                <DataTable<Product>
                  caption="Products"
                  pageSize={5}
                  rows={PRODUCTS}
                  columns={[
                    { key: 'name',     header: 'Product',  sortable: true },
                    { key: 'category', header: 'Category', sortable: true },
                    { key: 'price',    header: 'Price',    sortable: true, align: 'right' },
                    { key: 'stock',    header: 'Stock',    sortable: true, align: 'right' },
                  ]}
                />
              </div>
            );
          })(),
          code: `<DataTable\n  rows={products}\n  columns={[\n    { key: 'name',  header: 'Product',  sortable: true },\n    { key: 'price', header: 'Price',    sortable: true, align: 'right' },\n  ]}\n/>`,
        },
      ],
    },
    {
      id: 'content-score-bar',
      title: 'ContentScoreBar',
      category: 'Organism',
      abbr: 'Cs',
      description: 'Kural tabanlı içerik kalite skoru. Good ≥70 / Fair ≥40 / Poor <40 tier sistemi. Her kural chip olarak gösterilir, geçen/kalan sayım altında.',
      filePath: 'modules/ui/ContentScoreBar.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useMemo } from 'react';

const tierMap = {
  great: { bar: 'bg-success', text: 'text-success-fg', bg: 'bg-success-subtle', border: 'border-success', label: 'Good' },
  ok:    { bar: 'bg-warning', text: 'text-warning-fg', bg: 'bg-warning-subtle', border: 'border-warning', label: 'Fair' },
  poor:  { bar: 'bg-error',   text: 'text-error-fg',   bg: 'bg-error-subtle',   border: 'border-error',   label: 'Poor' },
};

export function ContentScoreBar({ value, rules, label, className }) {
  const { score, results } = useMemo(() => {
    let earned = 0, total = 0;
    const results = rules.map((rule) => { const pass = rule.check(value); if (pass) earned += rule.points; total += rule.points; return { label: rule.label, pass, hint: rule.hint }; });
    return { score: total > 0 ? Math.round((earned / total) * 100) : 0, results };
  }, [value, rules]);
  const tier = score >= 70 ? 'great' : score >= 40 ? 'ok' : 'poor';
  const t = tierMap[tier];
  return (
    <div className={cn('rounded-lg border p-3 space-y-2', t.bg, t.border, className)}>
      <div className="flex items-center gap-2">
        {label && <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{label}</span>}
        <div className="ml-auto flex items-center gap-1.5">
          <span className={cn('text-xs font-medium', t.text)}>{t.label}</span>
          <span className={cn('text-sm font-bold tabular-nums', t.text)}>{score}%</span>
        </div>
      </div>
      <div className="h-1.5 w-full rounded-full bg-surface-sunken overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-500', t.bar)} style={{ width: \`\${score}%\` }} />
      </div>
      <div className="flex flex-wrap gap-1">
        {results.map((r, i) => <span key={i} title={r.hint} className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', r.pass ? cn(t.bg, t.text, 'border', t.border) : 'bg-surface-sunken text-text-disabled border border-border')}>{r.pass && <span aria-hidden="true">✓</span>}{r.label}</span>)}
      </div>
      <p className="text-xs text-text-secondary">{results.filter(r => r.pass).length} / {results.length} rules passed</p>
    </div>
  );
}`,
      variants: [
        {
          title: 'Live evaluation',
          layout: 'stack' as const,
          preview: (() => {
            const RULES: ScoreRule[] = [
              { label: 'Min 20 chars',   check: (v) => v.length >= 20,                            points: 20 },
              { label: 'Has number',     check: (v) => /\d/.test(v),                               points: 20 },
              { label: 'Has uppercase',  check: (v) => /[A-Z]/.test(v),                            points: 20 },
              { label: 'Has keyword',    check: (v) => /next|react|typescript/i.test(v),            points: 20, hint: 'Include "Next", "React", or "TypeScript"' },
              { label: 'Min 5 words',    check: (v) => v.trim().split(/\s+/).filter(Boolean).length >= 5, points: 20 },
            ];
            function Demo() {
              const [text, setText] = useState('Build with Next.js and TypeScript');
              return (
                <div className="w-full max-w-sm space-y-2">
                  <Textarea id="sc-csb-input" label="Content" rows={2} value={text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)} placeholder="Type your content…" />
                  <ContentScoreBar value={text} rules={RULES} label="Quality score" />
                </div>
              );
            }
            return <Demo />;
          })(),
          code: `const rules = [\n  { label: 'Min 20 chars', check: (v) => v.length >= 20, points: 20 },\n  { label: 'Has keyword',  check: (v) => /react/i.test(v), points: 20, hint: 'Include "React"' },\n  // ...\n];\n<ContentScoreBar value={content} rules={rules} label="Quality score" />`,
        },
      ],
    },
    {
      id: 'page-header',
      title: 'PageHeader',
      category: 'Organism',
      abbr: 'Ph',
      description: 'Sayfa başlığı + subtitle + badge + action butonları. Tüm varyantlar (primary/outline/danger/ghost) desteklenir. href veya onClick tabanlı aksiyonlar.',
      filePath: 'modules/ui/PageHeader.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

const variantMap = {
  primary:   'bg-primary text-primary-fg hover:bg-primary-hover',
  secondary: 'bg-secondary text-secondary-fg hover:bg-secondary-hover',
  outline:   'border border-border text-text-primary hover:bg-surface-overlay',
  danger:    'bg-error text-text-inverse hover:opacity-90',
  ghost:     'bg-transparent text-text-primary hover:bg-surface-overlay',
};

export function PageHeader({ title, subtitle, badge, actions, className }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 pb-5 border-b border-border', className)}>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-2xl font-bold text-text-primary leading-tight">{title}</h1>
          {badge}
        </div>
        {subtitle && <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>}
      </div>
      {actions?.length > 0 && (
        <div className="flex items-center gap-2 shrink-0">
          {actions.map((action, i) => (
            <button key={i} type="button" onClick={action.onClick} disabled={action.disabled} className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50', variantMap[action.variant ?? 'primary'])}>
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}`,
      variants: [
        {
          title: 'With actions',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <PageHeader
                title="Users"
                subtitle="Manage your team members and their permissions."
                badge={<Badge variant="info">48 members</Badge>}
                actions={[
                  { label: 'Export', variant: 'outline' },
                  { label: '+ Invite user', variant: 'primary' },
                ]}
              />
            </div>
          ),
          code: `<PageHeader\n  title="Users"\n  subtitle="Manage your team members."\n  badge={<Badge variant="info">48 members</Badge>}\n  actions={[\n    { label: 'Export', variant: 'outline' },\n    { label: '+ Invite user', variant: 'primary' },\n  ]}\n/>`,
        },
        {
          title: 'Danger action',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <PageHeader
                title="Danger Zone"
                subtitle="Irreversible actions. Proceed with caution."
                actions={[
                  { label: 'Archive', variant: 'outline' },
                  { label: 'Delete project', variant: 'danger' },
                ]}
              />
            </div>
          ),
          code: `<PageHeader\n  title="Danger Zone"\n  subtitle="Irreversible actions."\n  actions={[\n    { label: 'Archive', variant: 'outline' },\n    { label: 'Delete project', variant: 'danger' },\n  ]}\n/>`,
        },
        {
          title: 'Minimal',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <PageHeader title="Settings" subtitle="Configure your workspace preferences." />
            </div>
          ),
          code: `<PageHeader title="Settings" subtitle="Configure your workspace preferences." />`,
        },
      ],
    },
    {
      id: 'stepper',
      title: 'Stepper',
      category: 'Organism',
      abbr: 'St',
      description: 'Multi-step progress indicator with complete, active, error, and pending states. Supports horizontal and vertical orientations.',
      filePath: 'modules/ui/Stepper.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';\n\nexport function Stepper({ steps, orientation = 'horizontal' }) {\n  // renders step circles with connectors, supports complete/active/error/pending states\n}`,
      variants: [
        {
          title: 'Horizontal',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <Stepper steps={[
                { label: 'Account', description: 'Personal info', state: 'complete' },
                { label: 'Billing', description: 'Payment method', state: 'active' },
                { label: 'Review', state: 'pending' },
                { label: 'Confirm', state: 'pending' },
              ]} />
            </div>
          ),
          code: `<Stepper steps={[\n  { label: 'Account', state: 'complete' },\n  { label: 'Billing', state: 'active' },\n  { label: 'Review', state: 'pending' },\n  { label: 'Confirm', state: 'pending' },\n]} />`,
        },
        {
          title: 'Vertical',
          layout: 'stack' as const,
          preview: (
            <Stepper orientation="vertical" steps={[
              { label: 'Create account', description: 'Enter your email and password', state: 'complete' },
              { label: 'Verify email', description: 'Check your inbox', state: 'error' },
              { label: 'Set up profile', state: 'pending' },
            ]} />
          ),
          code: `<Stepper orientation="vertical" steps={[\n  { label: 'Create account', state: 'complete' },\n  { label: 'Verify email', state: 'error' },\n  { label: 'Set up profile', state: 'pending' },\n]} />`,
        },
      ],
    },
    {
      id: 'advanced-data-table',
      title: 'AdvancedDataTable',
      category: 'Organism',
      abbr: 'At',
      description: 'Enhanced table with row selection (with indeterminate header), expandable rows, and optional sticky header.',
      filePath: 'modules/ui/AdvancedDataTable.tsx',
      sourceCode: `'use client';\nimport { cn } from '@/libs/utils/cn';\nimport { useState } from 'react';\n\nexport function AdvancedDataTable({ columns, rows, selectable, stickyHeader, onSelectionChange }) {\n  // row selection with indeterminate header, expandable rows, sticky header\n}`,
      variants: [
        {
          title: 'Selectable + Expandable',
          layout: 'stack' as const,
          preview: <AdvancedTableDemo />,
          code: `<AdvancedDataTable\n  columns={[{ key: 'name', header: 'Name' }, ...]}\n  rows={rows}\n  selectable\n/>`,
        },
        {
          title: 'Sticky Header',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AdvancedDataTable
                columns={[{ key: 'n', header: 'Name' }, { key: 'v', header: 'Value' }] as never}
                rows={Array.from({ length: 10 }, (_, i) => ({ n: `Row ${i + 1}`, v: i * 10 }))}
                stickyHeader
                caption="Sticky header table"
              />
            </div>
          ),
          code: `<AdvancedDataTable columns={columns} rows={rows} stickyHeader />`,
        },
      ],
    },
    {
      id: 'popover',
      title: 'Popover',
      category: 'Organism',
      abbr: 'Po',
      description: 'Anchor-based contextual panel. Closes on outside click and Escape key. Supports top/bottom/left/right placement.',
      filePath: 'modules/ui/Popover.tsx',
      sourceCode: `'use client';\nimport { cn } from '@/libs/utils/cn';\nimport { useEffect, useRef, useState } from 'react';\n\nexport function Popover({ trigger, children, placement = 'bottom' }) {\n  // manages open state, outside-click + Escape close, focus management\n}`,
      variants: [
        {
          title: 'Bottom (default)',
          preview: <PopoverDemo />,
          code: `<Popover trigger={<Button variant="outline">Open</Button>} placement="bottom">\n  <div className="p-4">\n    <p className="text-sm font-semibold">Title</p>\n    <p className="text-xs text-text-secondary">Content goes here.</p>\n  </div>\n</Popover>`,
        },
        {
          title: 'Placements',
          layout: 'stack' as const,
          preview: (
            <div className="flex flex-wrap gap-3 items-center justify-center py-8">
              {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
                <Popover key={p} placement={p} trigger={<Button variant="outline" size="sm">{p}</Button>}>
                  <div className="p-3 text-xs text-text-secondary">Popover on {p}</div>
                </Popover>
              ))}
            </div>
          ),
          code: `<Popover placement="top" trigger={<Button>Top</Button>}><div>...</div></Popover>\n<Popover placement="right" trigger={<Button>Right</Button>}><div>...</div></Popover>`,
        },
      ],
    },
    {
      id: 'tree-view',
      title: 'TreeView',
      category: 'Organism',
      abbr: 'Tv',
      description: 'Collapsible tree with keyboard navigation, selection, and aria-tree roles.',
      filePath: 'modules/ui/TreeView.tsx',
      sourceCode: `'use client';\nimport { cn } from '@/libs/utils/cn';\nimport { useState } from 'react';\n\nexport function TreeView({ nodes, selectedId, onSelect, label }) {\n  // recursive treeitem rendering, arrow-key expand/collapse\n}`,
      variants: [
        {
          title: 'File tree',
          preview: <TreeViewDemo />,
          code: `function Demo() {\n  const [sel, setSel] = useState();\n  return (\n    <TreeView selectedId={sel} onSelect={setSel} label="Files"\n      nodes={[\n        { id: 'src', label: 'src', children: [\n          { id: 'Button', label: 'Button.tsx' },\n        ]},\n      ]}\n    />\n  );\n}`,
        },
      ],
    },
  ];
}
