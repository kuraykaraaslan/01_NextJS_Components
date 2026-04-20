import { cn } from '@/libs/utils/cn';

export type TableColumn<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
};

export function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  caption,
  emptyMessage = 'No results found.',
  className,
}: {
  columns: TableColumn<T>[];
  rows: T[];
  caption?: string;
  emptyMessage?: string;
  className?: string;
}) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border border-border', className)}>
      <table className="w-full text-sm">
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead className="bg-surface-sunken border-b border-border">
          <tr>
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
              <td colSpan={columns.length} className="px-4 py-8 text-center text-text-secondary">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
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
