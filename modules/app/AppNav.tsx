'use client';
import { useState } from 'react';
import { ButtonGroup } from '@/modules/ui/ButtonGroup';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { Badge } from '@/modules/ui/Badge';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';
import { Button } from '@/modules/ui/Button';

const NAV_ITEMS = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'projects',  label: 'Projects' },
  { value: 'team',      label: 'Team' },
  { value: 'settings',  label: 'Settings' },
];

const SUBNAV_MAP: Record<string, { label: string; onClick?: () => void }[]> = {
  dashboard: [
    { label: 'Overview' },
    { label: 'Analytics' },
    { label: 'Reports' },
  ],
  projects: [
    { label: 'All Projects' },
    { label: 'Active' },
    { label: 'Archived' },
  ],
  team: [
    { label: 'Members' },
    { label: 'Invites' },
    { label: 'Roles' },
  ],
  settings: [
    { label: 'General' },
    { label: 'Security' },
    { label: 'Integrations' },
  ],
};

const BREADCRUMB_MAP: Record<string, { label: string; href?: string }[]> = {
  dashboard: [{ label: 'Home', href: '#' }, { label: 'Dashboard' }],
  projects:  [{ label: 'Home', href: '#' }, { label: 'Projects' }],
  team:      [{ label: 'Home', href: '#' }, { label: 'Team' }],
  settings:  [{ label: 'Home', href: '#' }, { label: 'Settings' }],
};

export function AppNav({
  activePath = 'dashboard',
  notificationCount = 0,
}: {
  activePath?: string;
  notificationCount?: number;
}) {
  const [active, setActive] = useState(activePath);

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    label: (
      <span className="flex items-center gap-1.5">
        {item.label}
        {item.value === 'team' && notificationCount > 0 && (
          <Badge variant="error" size="sm">{notificationCount}</Badge>
        )}
      </span>
    ),
  }));

  const subnavItems = (SUBNAV_MAP[active] ?? []).map((item) => ({
    label: item.label,
    onClick: item.onClick,
  }));

  const breadcrumbs = BREADCRUMB_MAP[active] ?? [{ label: active }];

  return (
    <div className="w-full border border-border rounded-xl overflow-hidden bg-surface-raised">
      {/* Main nav row */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border bg-surface-overlay">
        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
          <span className="text-base font-bold text-text-primary">Acme</span>
        </div>

        {/* Primary nav */}
        <div className="flex-1 flex justify-center">
          <ButtonGroup
            items={navItems}
            value={active}
            onChange={setActive}
            variant="ghost"
            size="sm"
          />
        </div>

        {/* Sub-nav dropdown */}
        <DropdownMenu
          align="right"
          trigger={
            <Button variant="outline" size="sm" iconRight={<span>▾</span>}>
              {NAV_ITEMS.find((i) => i.value === active)?.label ?? 'Section'}
            </Button>
          }
          items={subnavItems}
        />
      </div>

      {/* Breadcrumb row */}
      <div className="px-4 py-2 bg-surface-base">
        <Breadcrumb items={breadcrumbs} />
      </div>
    </div>
  );
}
