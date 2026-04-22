'use client';
import { cn } from '@/libs/utils/cn';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { Button } from '@/modules/ui/Button';

export type NavbarItem = {
  label: string;
  href?: string;
  active?: boolean;
};

type TopNavbarProps = {
  logo?: React.ReactNode;
  navItems?: NavbarItem[];
  actions?: React.ReactNode;
  sticky?: boolean;
  bordered?: boolean;
  className?: string;
};

export function TopNavbar({
  logo,
  navItems = [],
  actions,
  sticky = false,
  bordered = true,
  className,
}: TopNavbarProps) {
  return (
    <header
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 bg-surface-raised',
        bordered && 'border-b border-border',
        sticky && 'sticky top-0 z-40',
        className
      )}
    >
      {/* Mobile: hamburger via NavDrawer */}
      <div className="md:hidden">
        <NavDrawer
          title="Navigation"
          side="left"
          trigger={
            <Button variant="ghost" size="sm" iconOnly aria-label="Open navigation menu">
              ☰
            </Button>
          }
        >
          <nav className="flex flex-col gap-0.5 pt-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href ?? '#'}
                className={cn(
                  'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  item.active
                    ? 'bg-primary-subtle text-primary'
                    : 'text-text-primary hover:bg-surface-overlay'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </NavDrawer>
      </div>

      {/* Logo */}
      {logo && <div className="shrink-0">{logo}</div>}

      {/* Desktop nav */}
      {navItems.length > 0 && (
        <nav className="hidden md:flex items-center gap-0.5 flex-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href ?? '#'}
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                item.active
                  ? 'bg-primary-subtle text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}

      {/* Actions slot (right side) */}
      {actions && (
        <div className="flex items-center gap-2 ml-auto shrink-0">
          {actions}
        </div>
      )}
    </header>
  );
}
