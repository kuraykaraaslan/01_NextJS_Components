'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import type { TableColumn } from './Table';

export type { TableColumn };

export type AdvancedDataTableRow<T> = T & {
  _expanded?: React.ReactNode;
};

export function AdvancedDataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  caption,
  selectable = false,
  stickyHeader = false,
  emptyMessage = 'No results found.',
  onSelectionChange,
  className,
}: {
  columns: TableColumn<T>[];
  rows: AdvancedDataTableRow<T>[];
  caption?: string;
  selectable?: boolean;
  stickyHeader?: boolean;
  emptyMessage?: string;
  onSelectionChange?: (selected: number[]) => void;
  className?: string;
}) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  function toggleRow(i: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      onSelectionChange?.([...next]);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === rows.length) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      const all = new Set(rows.map((_, i) => i));
      setSelected(all);
      onSelectionChange?.([...all]);
    }
  }

  function toggleExpand(i: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  const allSelected = rows.length > 0 && selected.size === rows.length;
  const someSelected = selected.size > 0 && selected.size < rows.length;
  const totalCols = columns.length + (selectable ? 1 : 0) + (rows.some((r) => r._expanded !== undefined) ? 1 : 0);

  return (
    <div className={cn('space-y-2', className)}>
      {selectable && selected.size > 0 && (
        <p className="text-xs text-text-secondary">
          {selected.size} of {rows.length} row{rows.length !== 1 ? 's' : ''} selected
        </p>
      )}
      <div className={cn('w-full rounded-lg border border-border', stickyHeader && 'overflow-auto max-h-80')}>
        <table className="w-full text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className={cn('bg-surface-sunken border-b border-border', stickyHeader && 'sticky top-0 z-10')}>
            <tr>
              {selectable && (
                <th scope="col" className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label="Select all rows"
                    checked={allSelected}
                    ref={(el) => { if (el) el.indeterminate = someSelected; }}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-border-focus"
                  />
                </th>
              )}
              {rows.some((r) => r._expanded !== undefined) && (
                <th scope="col" className="w-10 px-4 py-3" aria-label="Expand" />
              )}
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  className={cn(
                    'px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right',
                    !col.align && 'text-left'
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface-base">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={totalCols} className="px-4 py-10 text-center text-sm text-text-secondary">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => {
                const isSelected = selected.has(i);
                const isExpanded = expanded.has(i);
                const hasExpand = row._expanded !== undefined;

                return (
                  <>
                    <tr
                      key={i}
                      className={cn(
                        'hover:bg-surface-overlay transition-colors',
                        isSelected && 'bg-primary-subtle'
                      )}
                    >
                      {selectable && (
                        <td className="w-10 px-4 py-3">
                          <input
                            type="checkbox"
                            aria-label={`Select row ${i + 1}`}
                            checked={isSelected}
                            onChange={() => toggleRow(i)}
                            className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-border-focus"
                          />
                        </td>
                      )}
                      {hasExpand && (
                        <td className="w-10 px-4 py-3">
                          <button
                            type="button"
                            aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                            aria-expanded={isExpanded}
                            onClick={() => toggleExpand(i)}
                            className="text-text-disabled hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded text-xs"
                          >
                            {isExpanded ? '▾' : '▸'}
                          </button>
                        </td>
                      )}
                      {!hasExpand && rows.some((r) => r._expanded !== undefined) && (
                        <td className="w-10 px-4 py-3" />
                      )}
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
                    {hasExpand && isExpanded && (
                      <tr key={`${i}-expanded`} className="bg-surface-sunken">
                        <td
                          colSpan={totalCols}
                          className="px-6 py-3 text-sm text-text-secondary"
                        >
                          {row._expanded}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
