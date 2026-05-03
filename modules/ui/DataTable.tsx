'use client';
import { cn } from '@/libs/utils/cn';
import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faSort } from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination';
import type { TableColumn } from './Table';

export type { TableColumn };

type SortDir = 'asc' | 'desc' | null;

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  caption,
  searchable = true,
  searchPlaceholder = 'Search…',
  pageSize: defaultPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  emptyMessage = 'No results found.',
  className,
}: {
  columns: TableColumn<T>[];
  rows: T[];
  caption?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  pageSizeOptions?: number[];
  emptyMessage?: string;
  className?: string;
}) {
  const [search, setSearch]     = useState('');
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortKey, setSortKey]   = useState('');
  const [sortDir, setSortDir]   = useState<SortDir>(null);

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortDir(null);
      setSortKey('');
    }
    setPage(1);
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) => {
        if (col.render) return false;
        return String(row[col.key as keyof T] ?? '').toLowerCase().includes(q);
      })
    );
  }, [rows, search, columns]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey as keyof T] ?? '');
      const bv = String(b[sortKey as keyof T] ?? '');
      const cmp = av.localeCompare(bv, undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage   = Math.min(page, totalPages);
  const paginated  = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  function handleSearch(v: string) { setSearch(v); setPage(1); }
  function handlePageSize(e: React.ChangeEvent<HTMLSelectElement>) {
    setPageSize(Number(e.target.value));
    setPage(1);
  }

  const start = sorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end   = Math.min(safePage * pageSize, sorted.length);

  return (
    <div className={cn('space-y-3', className)}>
      {searchable && (
        <div className="flex items-center gap-2 flex-wrap">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder={searchPlaceholder}
            className="flex-1 min-w-40"
          />
          <div className="flex items-center gap-2 shrink-0">
            <label
              htmlFor="dt-pagesize"
              className="text-xs text-text-secondary whitespace-nowrap"
            >
              Rows per page:
            </label>
            <select
              id="dt-pagesize"
              value={pageSize}
              onChange={handlePageSize}
              className={cn(
                'rounded-md border border-border bg-surface-base px-2 py-1.5 text-sm text-text-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus'
              )}
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="w-full overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
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
                      col.align === 'right'  && 'text-right',
                      !col.align             && 'text-left',
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
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-text-secondary"
                >
                  {sorted.length === 0 && search
                    ? `No results for "${search}"`
                    : emptyMessage}
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr key={i} className="hover:bg-surface-overlay transition-colors">
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={cn(
                        'px-4 py-3 text-text-primary',
                        col.align === 'center' && 'text-center',
                        col.align === 'right'  && 'text-right'
                      )}
                    >
                      {col.render
                        ? col.render(row)
                        : String(row[col.key as keyof T] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-text-secondary">
          {sorted.length === 0
            ? 'No results'
            : `Showing ${start}–${end} of ${sorted.length}${search ? ` (filtered from ${rows.length})` : ''}`}
        </p>
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
