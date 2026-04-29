'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faSort } from '@fortawesome/free-solid-svg-icons';

export type TableColumn<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
};

type SortDir = 'asc' | 'desc' | null;

function sortRows<T extends Record<string, unknown>>(
  rows: T[],
  key: string,
  dir: SortDir
): T[] {
  if (!dir) return rows;
  return [...rows].sort((a, b) => {
    const av = a[key as keyof T] ?? '';
    const bv = b[key as keyof T] ?? '';
    const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
    return dir === 'asc' ? cmp : -cmp;
  });
}

export function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  caption,
  emptyMessage = 'No results found.',
  defaultSortKey,
  defaultSortDir,
  className,
}: {
  columns: TableColumn<T>[];
  rows: T[];
  caption?: string;
  emptyMessage?: string;
  defaultSortKey?: string;
  defaultSortDir?: 'asc' | 'desc';
  className?: string;
}) {
  const [sortKey, setSortKey]   = useState<string>(defaultSortKey ?? '');
  const [sortDir, setSortDir]   = useState<SortDir>(defaultSortDir ?? null);

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else {
      setSortDir((d) => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc'));
      if (sortDir === 'desc') setSortKey('');
    }
  }

  const sorted = sortKey && sortDir ? sortRows(rows, sortKey, sortDir) : rows;

  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border border-border', className)}>
      <table className="w-full text-sm">
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead className="bg-surface-sunken border-b border-border">
          <tr>
            {columns.map((col) => {
              const isSorted = sortKey === String(col.key);
              const dir = isSorted ? sortDir : null;
              return (
                <th
                  key={String(col.key)}
                  scope="col"
                  aria-sort={
                    col.sortable
                      ? isSorted && dir === 'asc'
                        ? 'ascending'
                        : isSorted && dir === 'desc'
                        ? 'descending'
                        : 'none'
                      : undefined
                  }
                  className={cn(
                    'px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right',
                    !col.align && 'text-left',
                    col.sortable && 'cursor-pointer select-none hover:text-text-primary transition-colors'
                  )}
                  onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <FontAwesomeIcon
                        icon={dir === 'asc' ? faChevronUp : dir === 'desc' ? faChevronDown : faSort}
                        className="w-2.5 h-2.5"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface-base">
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-text-secondary">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => (
              <tr key={i} className="hover:bg-surface-overlay transition-colors">
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn(
                      'px-4 py-3 text-text-primary',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right'
                    )}
                  >
                    {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
