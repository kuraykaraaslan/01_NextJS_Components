'use client';
import { useState } from 'react';
import { Drawer } from '@/modules/ui/Drawer';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Button } from '@/modules/ui/Button';

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { icon: '🏠', label: 'Dashboard', count: 0 },
      { icon: '📁', label: 'Projects',  count: 5 },
      { icon: '📊', label: 'Reports',   count: 2 },
    ],
  },
  {
    label: 'Settings',
    items: [
      { icon: '👤', label: 'Profile',  count: 0 },
      { icon: '💳', label: 'Billing',  count: 1 },
      { icon: '👥', label: 'Team',     count: 3 },
    ],
  },
];

export function AppDrawer({
  userName = 'Alice Johnson',
  userRole = 'Admin',
}: {
  userName?: string;
  userRole?: string;
}) {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState('');
  const [active, setActive] = useState('Dashboard');

  const filtered = NAV_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((i) =>
      i.label.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        variant="outline"
        size="sm"
        iconLeft={<span>☰</span>}
        onClick={() => setOpen(true)}
      >
        Open Navigation
      </Button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Navigation"
        side="left"
      >
        {/* User info */}
        <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-surface-base border border-border">
          <Avatar name={userName} size="md" status="online" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">{userName}</p>
            <Badge variant="primary" size="sm">{userRole}</Badge>
          </div>
        </div>

        {/* Search */}
        <SearchBar
          id="drawer-nav-search"
          placeholder="Search navigation…"
          value={query}
          onChange={setQuery}
          className="mb-4"
        />

        {/* Nav groups */}
        <div className="space-y-4">
          {filtered.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold text-text-disabled uppercase tracking-wider mb-1 px-1">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => { setActive(item.label); setOpen(false); }}
                    className={`
                      w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm
                      transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus
                      ${active === item.label
                        ? 'bg-primary-subtle text-primary font-semibold'
                        : 'text-text-primary hover:bg-surface-overlay'
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true">{item.icon}</span>
                      {item.label}
                    </span>
                    {item.count > 0 && (
                      <Badge variant="neutral" size="sm">{item.count}</Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-sm text-text-secondary text-center py-4">No results for &quot;{query}&quot;</p>
          )}
        </div>
      </Drawer>
    </div>
  );
}
