'use client';
import { cn } from '@/libs/utils/cn';

export type NavItem = {
  id: string;
  title: string;
  category: string;
  abbr: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

const categoryStyles: Record<string, string> = {
  Atom:     'bg-info-subtle text-info-fg',
  Molecule: 'bg-primary-subtle text-primary',
  Organism: 'bg-success-subtle text-success-fg',
};

type NavContentProps = {
  groups: NavGroup[];
  selectedId: string;
  onSelect: (id: string) => void;
  collapsed: boolean;
};

function NavContent({ groups, selectedId, onSelect, collapsed }: NavContentProps) {
  return (
    <>
      <div
        className={cn(
          'flex items-center border-b border-border shrink-0 h-14',
          collapsed ? 'justify-center px-3' : 'px-5'
        )}
      >
        {collapsed ? (
          <span className="text-sm font-bold text-text-primary select-none">UI</span>
        ) : (
          <div>
            <p className="text-sm font-semibold text-text-primary">UI Showcase</p>
            <p className="text-xs text-text-secondary">Component library</p>
          </div>
        )}
      </div>

      <nav aria-label="Component navigation" className="flex-1 overflow-y-auto px-2 py-3 space-y-5">
        {groups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="px-3 mb-1 text-xs font-medium text-text-secondary uppercase tracking-wider">
                {group.label}
              </p>
            )}
            {collapsed && (
              <div className="px-2 mb-1">
                <div className="h-px bg-border" />
              </div>
            )}
            <ul className="space-y-0.5" role="list">
              {group.items.map((item) => {
                const isActive = selectedId === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      title={collapsed ? `${item.title} (${item.category})` : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => onSelect(item.id)}
                      className={cn(
                        'w-full flex items-center gap-3 rounded-lg text-sm transition-colors text-left',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                        collapsed ? 'justify-center p-2.5' : 'px-3 py-2',
                        isActive
                          ? 'bg-primary-subtle text-primary font-medium'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
                      )}
                    >
                      <span
                        className={cn(
                          'flex items-center justify-center rounded-md text-xs font-bold shrink-0',
                          collapsed ? 'w-8 h-8' : 'w-6 h-6',
                          isActive
                            ? 'bg-primary text-primary-fg'
                            : 'bg-surface-sunken text-text-secondary'
                        )}
                      >
                        {item.abbr}
                      </span>
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.title}</span>
                          <span
                            className={cn(
                              'text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0',
                              categoryStyles[item.category] ?? 'bg-surface-sunken text-text-secondary'
                            )}
                          >
                            {item.category}
                          </span>
                        </>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}

type SidebarProps = NavContentProps & {
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export function Sidebar({
  groups,
  selectedId,
  onSelect,
  collapsed,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col h-screen sticky top-0 border-r border-border bg-surface-raised transition-all duration-200 shrink-0',
          collapsed ? 'w-14' : 'w-56'
        )}
      >
        <NavContent
          groups={groups}
          selectedId={selectedId}
          onSelect={onSelect}
          collapsed={collapsed}
        />
      </aside>

      {/* Mobile overlay drawer */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-50 transition-opacity duration-200',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={onMobileClose}
          aria-hidden="true"
        />
        <aside
          className={cn(
            'absolute left-0 top-0 h-full w-56 bg-surface-raised flex flex-col shadow-xl transition-transform duration-200',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <NavContent
            groups={groups}
            selectedId={selectedId}
            onSelect={(id) => {
              onSelect(id);
              onMobileClose();
            }}
            collapsed={false}
          />
        </aside>
      </div>
    </>
  );
}
