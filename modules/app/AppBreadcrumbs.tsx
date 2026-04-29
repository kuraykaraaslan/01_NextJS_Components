'use client';
import { cn } from '@/libs/utils/cn';
import { Breadcrumb, type BreadcrumbItem } from '@/modules/ui/Breadcrumb';
import { Tooltip } from '@/modules/ui/Tooltip';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';
import { Button } from '@/modules/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFile, faFolder, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type AppBreadcrumbsProps = {
  items?: BreadcrumbItem[];
  title?: string;
  description?: string;
  badge?: React.ReactNode;
  className?: string;
};

export function AppBreadcrumbs({
  items = [],
  title,
  description,
  badge,
  className,
}: AppBreadcrumbsProps) {
  const dropdownItems = items.map((item, i) => ({
    label: item.label,
    icon: i === 0
      ? <FontAwesomeIcon icon={faHouse} className="w-3 h-3" />
      : i === items.length - 1
        ? <FontAwesomeIcon icon={faFile} className="w-3 h-3" />
        : <FontAwesomeIcon icon={faFolder} className="w-3 h-3" />,
  }));

  return (
    <div className={cn('w-full space-y-4 p-4 border border-border rounded-xl bg-surface-raised', className)}>
      {(title || badge || description) && (
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            {title && <h1 className="text-2xl font-bold text-text-primary leading-tight">{title}</h1>}
            {badge}
          </div>
          {description && (
            <p className="text-sm text-text-secondary mt-0.5">{description}</p>
          )}
        </div>
      )}

      {items.length > 0 && (
        <>
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
                      <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-text-disabled" aria-hidden="true" />
                    )}
                  </span>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <Breadcrumb items={[items[0], { label: '…' }, items[items.length - 1]]} />
            {dropdownItems.length > 2 && (
              <DropdownMenu
                trigger={
                  <Button variant="ghost" size="xs" aria-label="View full path">
                    Full path <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 ml-0.5" />
                  </Button>
                }
                items={dropdownItems}
                align="left"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
