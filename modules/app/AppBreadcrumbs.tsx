'use client';
import { Breadcrumb, type BreadcrumbItem } from '@/modules/ui/Breadcrumb';
import { PageHeader } from '@/modules/ui/PageHeader';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';
import { Button } from '@/modules/ui/Button';

const DEFAULT_ITEMS: BreadcrumbItem[] = [
  { label: 'Home',     href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'Acme App', href: '#' },
  { label: 'Settings', href: '#' },
  { label: 'Security' },
];

export function AppBreadcrumbs({
  items = DEFAULT_ITEMS,
  currentPage = 'Security Settings',
  pageType = 'Settings',
}: {
  items?: BreadcrumbItem[];
  currentPage?: string;
  pageType?: string;
}) {
  // Build full-path dropdown items for mobile collapsed view
  const dropdownItems = items.map((item, i) => ({
    label: item.label,
    icon: i === 0 ? '🏠' : i === items.length - 1 ? '📄' : '📁',
  }));

  return (
    <div className="w-full space-y-4 p-4 border border-border rounded-xl bg-surface-raised">
      {/* PageHeader */}
      <PageHeader
        title={currentPage}
        subtitle="Manage security preferences and authentication settings."
        badge={<Badge variant="warning" size="md">{pageType}</Badge>}
      />

      {/* Desktop breadcrumb with per-item tooltips */}
      <div className="hidden sm:block">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            const fullPath = items.slice(0, i + 1).map((b) => b.label).join(' › ');

            return (
              <span key={i} className="flex items-center gap-1">
                <Tooltip content={fullPath} placement="bottom" arrow>
                  {isLast ? (
                    <span className="text-text-primary font-medium px-1">{item.label}</span>
                  ) : item.href ? (
                    <a
                      href={item.href}
                      className="text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded px-1"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-text-secondary px-1">{item.label}</span>
                  )}
                </Tooltip>
                {!isLast && (
                  <span className="text-text-disabled" aria-hidden="true">›</span>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      {/* Mobile: collapsed breadcrumb with dropdown */}
      <div className="flex items-center gap-2 sm:hidden">
        <Breadcrumb items={[items[0], { label: '…' }, items[items.length - 1]]} />
        <DropdownMenu
          trigger={
            <Button variant="ghost" size="xs" aria-label="View full path">
              Full path ▾
            </Button>
          }
          items={dropdownItems}
          align="left"
        />
      </div>
    </div>
  );
}
