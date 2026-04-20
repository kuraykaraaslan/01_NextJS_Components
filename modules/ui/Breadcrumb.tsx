import { cn } from '@/libs/utils/cn';

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {!isLast && item.href ? (
                <>
                  <a
                    href={item.href}
                    className={cn(
                      'text-text-secondary hover:text-text-primary transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded'
                    )}
                  >
                    {item.label}
                  </a>
                  <span aria-hidden="true" className="text-text-disabled">›</span>
                </>
              ) : (
                <span
                  className={cn(isLast ? 'text-text-primary font-medium' : 'text-text-secondary')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
