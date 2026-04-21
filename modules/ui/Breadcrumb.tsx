import { cn } from '@/libs/utils/cn';

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({
  items,
  separator,
  maxItems,
  className,
}: {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
}) {
  const sep = separator ?? <span aria-hidden="true" className="text-text-disabled">›</span>;

  let displayed = items;
  let truncated = false;

  if (maxItems && items.length > maxItems) {
    truncated = true;
    displayed = [items[0], { label: '…', href: undefined }, ...items.slice(-(maxItems - 1))];
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {displayed.map((item, i) => {
          const isLast = i === displayed.length - 1;
          const isEllipsis = item.label === '…' && truncated;

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
                  {sep}
                </>
              ) : (
                <>
                  <span
                    className={cn(
                      isLast ? 'text-text-primary font-medium' : 'text-text-secondary',
                      isEllipsis && 'select-none'
                    )}
                    aria-current={isLast ? 'page' : undefined}
                    aria-hidden={isEllipsis ? 'true' : undefined}
                  >
                    {item.label}
                  </span>
                  {!isLast && sep}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
