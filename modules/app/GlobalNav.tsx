'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';

export type NavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  children?: NavItem[];
};

export type NavGroup = {
  id: string;
  label?: string;
  items: NavItem[];
};

function NavLink({
  item,
  active,
  collapsed,
  depth = 0,
}: {
  item: NavItem;
  active?: string;
  collapsed?: boolean;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = active === item.id;

  const base = cn(
    'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors w-full text-left',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
    depth > 0 ? 'pl-8' : '',
    isActive
      ? 'bg-primary-subtle text-primary font-medium'
      : 'text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
  );

  function handleClick() {
    if (hasChildren) { setExpanded((v) => !v); return; }
    item.onClick?.();
  }

  const inner = (
    <>
      {item.icon && <span aria-hidden="true" className="shrink-0 w-4 h-4 flex items-center justify-center">{item.icon}</span>}
      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
      {!collapsed && item.badge != null && (
        <span className="ml-auto text-[10px] font-semibold bg-primary text-primary-fg rounded-full px-1.5 py-0.5 leading-none">
          {item.badge}
        </span>
      )}
      {!collapsed && hasChildren && (
        <span aria-hidden="true" className={cn('ml-auto text-xs transition-transform', expanded ? 'rotate-90' : '')}>›</span>
      )}
    </>
  );

  if (item.href && !hasChildren) {
    return <a href={item.href} className={base}>{inner}</a>;
  }

  return (
    <>
      <button type="button" className={base} onClick={handleClick} aria-expanded={hasChildren ? expanded : undefined}>
        {inner}
      </button>
      {hasChildren && expanded && !collapsed && (
        <div className="mt-0.5 space-y-0.5">
          {item.children!.map((child) => (
            <NavLink key={child.id} item={child} active={active} collapsed={collapsed} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  );
}

export function GlobalNav({
  groups,
  activeId,
  collapsed = false,
  onCollapse,
  logo,
  footer,
  className,
}: {
  groups: NavGroup[];
  activeId?: string;
  collapsed?: boolean;
  onCollapse?: (v: boolean) => void;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <nav
      aria-label="Global navigation"
      className={cn(
        'flex flex-col h-full bg-surface-raised border-r border-border transition-all duration-200',
        collapsed ? 'w-14' : 'w-56',
        className
      )}
    >
      <div className={cn('flex items-center gap-2 px-3 py-4 border-b border-border', collapsed ? 'justify-center' : 'justify-between')}>
        {!collapsed && logo && <div className="min-w-0 flex-1">{logo}</div>}
        {collapsed && logo && <div>{logo}</div>}
        {onCollapse && (
          <button
            type="button"
            onClick={() => onCollapse(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1 rounded text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors"
          >
            <span aria-hidden="true" className={cn('block text-lg transition-transform', collapsed ? 'rotate-180' : '')}>‹</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-4">
        {groups.map((group) => (
          <div key={group.id}>
            {group.label && !collapsed && (
              <p className="px-3 mb-1 text-[10px] font-semibold text-text-disabled uppercase tracking-wider">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink key={item.id} item={item} active={activeId} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {footer && (
        <div className={cn('border-t border-border px-2 py-3', collapsed ? 'flex justify-center' : '')}>
          {footer}
        </div>
      )}
    </nav>
  );
}
