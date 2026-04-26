'use client';
import { cn } from '@/libs/utils/cn';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { Button } from '@/modules/ui/Button';

export type AppNavItem = {
  label: string;
  href?: string;
  active?: boolean;
};

type AppNavProps = {
  logo?: React.ReactNode;
  navItems?: AppNavItem[];
  actions?: React.ReactNode;
  sticky?: boolean;
  bordered?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export function AppNav({
  logo,
  navItems = [],
  actions,
  sticky = false,
  bordered = true,
  className,
  ...rest
}: AppNavProps) {
  return (
    <header
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 bg-surface-raised',
        bordered && 'border-b border-border',
        sticky && 'sticky top-0 z-40',
        className
      )}
      {...rest}
    >
      <div className="md:hidden">
        <NavDrawer
          title="Navigation"
          side="left"
          trigger={<Button variant="ghost" size="sm" iconOnly aria-label="Open navigation menu">☰</Button>}
        >
          <nav className="flex flex-col gap-0.5 pt-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href ?? '#'}
                aria-current={item.active ? 'page' : undefined}
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

      {logo && <div className="shrink-0">{logo}</div>}

      <nav className="hidden md:flex items-center gap-0.5 flex-1" aria-label="Main navigation">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href ?? '#'}
            aria-current={item.active ? 'page' : undefined}
            className={cn(
              'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              item.active
                ? 'bg-primary-subtle text-primary'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {actions && (
        <div className="flex items-center gap-2 ml-auto shrink-0">
          {actions}
        </div>
      )}
    </header>
  );
}
