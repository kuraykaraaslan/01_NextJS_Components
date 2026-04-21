'use client';
import { useState } from 'react';
import { Badge } from '@/modules/ui/Badge';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Avatar } from '@/modules/ui/Avatar';
import { Toggle } from '@/modules/ui/Toggle';
import { Button } from '@/modules/ui/Button';

const NAV_ITEMS = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard', count: 0  },
  { id: 'analytics', icon: '📈', label: 'Analytics',  count: 0  },
  { id: 'projects',  icon: '📁', label: 'Projects',   count: 5  },
  { id: 'tasks',     icon: '✅', label: 'Tasks',      count: 12 },
  { id: 'reports',   icon: '📊', label: 'Reports',    count: 2  },
];

const WORKSPACES = [
  { label: 'Acme Corp' },
  { label: 'Side Project' },
  { label: 'Open Source' },
  { type: 'separator' as const },
  { label: '+ Add workspace' },
];

export function AppSidebar({
  activeItem = 'dashboard',
  workspaceName = 'Acme Corp',
}: {
  activeItem?: string;
  workspaceName?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive]       = useState(activeItem);
  const [query, setQuery]         = useState('');

  const filtered = NAV_ITEMS.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className={`
        flex flex-col border border-border rounded-xl bg-surface-raised overflow-hidden
        transition-all duration-200
        ${collapsed ? 'w-16' : 'w-56'}
      `}
      style={{ minHeight: 380 }}
    >
      {/* Workspace switcher */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-border">
        {!collapsed && (
          <DropdownMenu
            trigger={
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm font-semibold text-text-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
              >
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span className="truncate max-w-[100px]">{workspaceName}</span>
                <span aria-hidden="true" className="text-text-disabled">▾</span>
              </button>
            }
            items={WORKSPACES}
          />
        )}
        {collapsed && (
          <span className="h-2 w-2 rounded-full bg-primary mx-auto" aria-hidden="true" />
        )}
      </div>

      {/* Collapse toggle */}
      <div className={`px-3 py-2 border-b border-border ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <Button
            variant="ghost"
            size="xs"
            iconOnly
            aria-label="Expand sidebar"
            onClick={() => setCollapsed(false)}
          >
            ▶
          </Button>
        ) : (
          <Toggle
            id="sidebar-collapse-toggle"
            label="Collapsed view"
            checked={collapsed}
            onChange={setCollapsed}
            size="sm"
          />
        )}
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-2 border-b border-border">
          <SearchBar
            id="sidebar-search"
            placeholder="Filter nav…"
            value={query}
            onChange={setQuery}
          />
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto" aria-label="Sidebar navigation">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            title={collapsed ? item.label : undefined}
            aria-label={collapsed ? item.label : undefined}
            className={`
              w-full flex items-center gap-2 rounded-md text-sm transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus
              ${collapsed ? 'justify-center px-2 py-2' : 'px-3 py-2'}
              ${active === item.id
                ? 'bg-primary-subtle text-primary font-semibold'
                : 'text-text-primary hover:bg-surface-overlay'
              }
            `}
          >
            <span aria-hidden="true">{item.icon}</span>
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.count > 0 && (
                  <Badge variant="neutral" size="sm">{item.count}</Badge>
                )}
              </>
            )}
          </button>
        ))}

        {filtered.length === 0 && !collapsed && (
          <p className="text-xs text-text-secondary px-3 py-2">No matches</p>
        )}
      </nav>

      {/* User avatar at bottom */}
      <div className={`border-t border-border px-3 py-3 flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
        <Avatar name="Alice Johnson" size="sm" status="online" />
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-xs font-semibold text-text-primary truncate">Alice Johnson</p>
            <Badge variant="primary" size="sm">Admin</Badge>
          </div>
        )}
      </div>
    </div>
  );
}
