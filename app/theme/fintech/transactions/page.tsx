'use client';
import { useState } from 'react';
import { Pagination } from '@/modules/ui/Pagination';
import { TransactionRow } from '@/modules/domains/fintech/transaction/TransactionRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import type { TransactionType, TransactionStatus } from '@/modules/domains/fintech/types';
import { TRANSACTIONS } from '../fintech.data';

const TYPE_OPTIONS: { label: string; value: TransactionType | 'ALL' }[] = [
  { label: 'All Types',  value: 'ALL' },
  { label: 'Deposit',    value: 'DEPOSIT' },
  { label: 'Withdraw',   value: 'WITHDRAW' },
  { label: 'Transfer',   value: 'TRANSFER' },
  { label: 'Payment',    value: 'PAYMENT' },
  { label: 'Refund',     value: 'REFUND' },
  { label: 'FX',         value: 'FX' },
  { label: 'Fee',        value: 'FEE' },
];

const STATUS_OPTIONS: { label: string; value: TransactionStatus | 'ALL' }[] = [
  { label: 'All Statuses', value: 'ALL' },
  { label: 'Pending',      value: 'PENDING' },
  { label: 'Completed',    value: 'COMPLETED' },
  { label: 'Failed',       value: 'FAILED' },
  { label: 'Cancelled',    value: 'CANCELLED' },
];

const PAGE_SIZE = 8;

export default function TransactionsPage() {
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'ALL'>('ALL');
  const [page, setPage] = useState(1);

  const filtered = TRANSACTIONS.filter((tx) => {
    const typeOk = typeFilter === 'ALL' || tx.type === typeFilter;
    const statusOk = statusFilter === 'ALL' || tx.status === statusFilter;
    return typeOk && statusOk;
  });

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTypeFilter(e.target.value as TransactionType | 'ALL');
    setPage(1);
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatusFilter(e.target.value as TransactionStatus | 'ALL');
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Transactions</h1>
        <p className="text-text-secondary mt-1">
          Your complete payment and transfer history.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-border bg-surface-raised">
        <FontAwesomeIcon icon={faFilter} className="w-4 h-4 text-text-secondary" aria-hidden="true" />
        <span className="text-sm font-medium text-text-secondary">Filter by:</span>

        <select
          value={typeFilter}
          onChange={handleTypeChange}
          aria-label="Filter by type"
          className="rounded-lg border border-border bg-surface-base px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={handleStatusChange}
          aria-label="Filter by status"
          className="rounded-lg border border-border bg-surface-base px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <span className="ml-auto text-xs text-text-secondary">
          {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Transaction list */}
      {paginated.length > 0 ? (
        <div className="flex flex-col gap-2">
          {paginated.map((tx) => (
            <TransactionRow key={tx.transactionId} transaction={tx} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-sunken">
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className="w-6 h-6 text-text-secondary" aria-hidden="true" />
          </div>
          <p className="text-base font-semibold text-text-primary">No transactions found</p>
          <p className="text-sm text-text-secondary">Try adjusting your filters.</p>
        </div>
      )}

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex justify-center">
          <Pagination
            page={page}
            totalPages={Math.ceil(filtered.length / PAGE_SIZE)}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
