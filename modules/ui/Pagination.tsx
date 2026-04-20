'use client';
import { cn } from '@/libs/utils/cn';

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  const withEllipsis: (number | 'ellipsis')[] = [];
  let prev: number | null = null;
  for (const p of visiblePages) {
    if (prev !== null && p - prev > 1) withEllipsis.push('ellipsis');
    withEllipsis.push(p);
    prev = p;
  }

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Go to previous page"
        className={cn(
          'px-3 py-1.5 rounded-md text-sm font-medium border transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
          page <= 1
            ? 'border-border text-text-disabled cursor-not-allowed opacity-50'
            : 'border-border text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
        )}
      >
        ‹
      </button>

      {withEllipsis.map((item, i) =>
        item === 'ellipsis' ? (
          <span key={`e-${i}`} className="px-2 py-1.5 text-sm text-text-disabled">…</span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-label={`Go to page ${item}`}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              'w-9 h-9 rounded-md text-sm font-medium border transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
              item === page
                ? 'bg-primary text-primary-fg border-primary'
                : 'border-border text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
            )}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Go to next page"
        className={cn(
          'px-3 py-1.5 rounded-md text-sm font-medium border transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
          page >= totalPages
            ? 'border-border text-text-disabled cursor-not-allowed opacity-50'
            : 'border-border text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
        )}
      >
        ›
      </button>
    </nav>
  );
}
