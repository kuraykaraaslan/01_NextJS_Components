'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import { Badge } from '@/modules/ui/Badge';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Pagination } from '@/modules/ui/Pagination';

export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  reference?: string;
};

const statusVariant: Record<Transaction['status'], 'success' | 'warning' | 'error' | 'info'> = {
  completed: 'success',
  pending:   'warning',
  failed:    'error',
  refunded:  'info',
};

const PAGE_SIZE = 10;

export function TransactionLedgerTable({
  transactions,
  className,
}: {
  transactions: Transaction[];
  className?: string;
}) {
  const [search, setSearch]   = useState('');
  const [page, setPage]       = useState(1);

  const filtered = transactions.filter((t) =>
    [t.description, t.category, t.reference ?? ''].join(' ').toLowerCase().includes(search.toLowerCase())
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged     = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { key: 'date' as const,        header: 'Date',        render: (r: Transaction) => <span className="font-mono text-xs">{r.date}</span> },
    { key: 'description' as const, header: 'Description', render: (r: Transaction) => (
      <div>
        <p className="text-sm text-text-primary">{r.description}</p>
        <p className="text-xs text-text-disabled">{r.category}</p>
      </div>
    )},
    { key: 'status' as const, header: 'Status', render: (r: Transaction) => (
      <Badge variant={statusVariant[r.status]} size="sm">{r.status}</Badge>
    )},
    { key: 'amount' as const, header: 'Amount', align: 'right' as const, render: (r: Transaction) => (
      <span className={cn('font-mono font-semibold text-sm', r.amount < 0 ? 'text-error-fg' : 'text-success-fg')}>
        {r.amount < 0 ? '-' : '+'}${Math.abs(r.amount).toFixed(2)}
      </span>
    )},
  ];

  return (
    <div className={cn('space-y-3', className)}>
      <SearchBar
        value={search}
        onChange={(v) => { setSearch(v); setPage(1); }}
        placeholder="Search transactions…"
      />
      <AdvancedDataTable
        columns={columns}
        rows={paged}
        selectable
        stickyHeader
        emptyMessage="No transactions match your search."
      />
      <Pagination page={page} totalPages={pageCount} onPageChange={setPage} showFirstLast />
    </div>
  );
}
