'use client';
import { Badge } from '@/modules/ui/Badge';
import type { TransactionStatus } from '../types';

const statusMeta: Record<TransactionStatus, { label: string; variant: 'warning' | 'success' | 'error' | 'neutral' }> = {
  PENDING:   { label: 'Pending',   variant: 'warning' },
  COMPLETED: { label: 'Completed', variant: 'success' },
  FAILED:    { label: 'Failed',    variant: 'error' },
  CANCELLED: { label: 'Cancelled', variant: 'neutral' },
};

type TransactionStatusBadgeProps = { status: TransactionStatus; size?: 'sm' | 'md'; className?: string };

export function TransactionStatusBadge({ status, size = 'md', className }: TransactionStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
