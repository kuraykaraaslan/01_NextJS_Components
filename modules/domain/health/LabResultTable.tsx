import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';
import { Pagination } from '@/modules/ui/Pagination';

export type LabResult = {
  id: string;
  test: string;
  category: string;
  value: string;
  unit: string;
  refRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  date: string;
  note?: string;
};

const statusVariant: Record<LabResult['status'], 'success' | 'error' | 'warning' | 'neutral'> = {
  normal:   'success',
  high:     'error',
  low:      'warning',
  critical: 'error',
};

const PAGE_SIZE = 10;

export function LabResultTable({
  results,
  className,
}: {
  results: LabResult[];
  className?: string;
}) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const paged = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { key: 'test' as const, header: 'Test', render: (r: LabResult) => (
      <div>
        <p className="text-sm font-medium text-text-primary">{r.test}</p>
        <p className="text-xs text-text-disabled">{r.category}</p>
      </div>
    )},
    { key: 'value' as const, header: 'Result', render: (r: LabResult) => (
      <span className={cn('font-mono font-semibold text-sm',
        r.status === 'normal' ? 'text-text-primary' : 'text-error-fg'
      )}>
        {r.value} {r.unit}
      </span>
    )},
    { key: 'refRange' as const, header: 'Ref. range', render: (r: LabResult) => (
      <span className="font-mono text-xs text-text-secondary">{r.refRange}</span>
    )},
    { key: 'status' as const, header: 'Status', render: (r: LabResult) => (
      <Tooltip content={r.note ?? r.status}>
        <span>
          <Badge variant={statusVariant[r.status]} size="sm">{r.status}</Badge>
        </span>
      </Tooltip>
    )},
    { key: 'date' as const, header: 'Date', render: (r: LabResult) => (
      <span className="text-xs text-text-secondary">{r.date}</span>
    )},
  ];

  return (
    <div className={cn('space-y-3', className)}>
      <AdvancedDataTable
        columns={columns}
        rows={paged}
        stickyHeader
        emptyMessage="No lab results available."
      />
      <Pagination page={page} totalPages={pageCount} onPageChange={setPage} />
    </div>
  );
}
