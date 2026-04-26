'use client';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';

export type DashboardNavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
};

export type DashboardNavGroup = {
  label?: string;
  items: DashboardNavItem[];
};

type DashboardSidebarProps = {
  navGroups?: DashboardNavGroup[];
  navItems?: DashboardNavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  footer?: React.ReactNode;
  className?: string;
};

export function DashboardSidebar({
  navGroups,
  navItems,
  activeId,
  onSelect,
  footer,
  className,
}: DashboardSidebarProps) {
  const groups: DashboardNavGroup[] = navGroups ?? (navItems ? [{ items: navItems }] : []);

  return (
    <div className={cn('flex flex-col flex-1 min-h-0', className)}>
      <div className="flex-1 overflow-y-auto px-2 py-3">
        <div className="flex flex-col gap-4 py-2">
          {groups.map((group, gi) => (
            <div key={group.label ?? gi}>
              {group.label && (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-disabled px-3 mb-1">
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={item.id === activeId ? 'page' : undefined}
                    onClick={() => onSelect?.(item.id)}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                      item.id === activeId
                        ? 'bg-primary-subtle text-primary font-medium'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
                    )}
                  >
                    {item.icon && (
                      <span aria-hidden="true" className="shrink-0 w-4 text-center">{item.icon}</span>
                    )}
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge != null && item.badge > 0 && (
                      <Badge variant="primary" size="sm">{item.badge}</Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {footer && (
        <div className="border-t border-border shrink-0">
          {footer}
        </div>
      )}
    </div>
  );
}
