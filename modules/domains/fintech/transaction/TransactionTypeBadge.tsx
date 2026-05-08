'use client';
import { Badge } from '@/modules/ui/Badge';
import type { TransactionType } from '../types';

const typeMeta: Record<TransactionType, { label: string; variant: 'success' | 'error' | 'info' | 'primary' | 'warning' | 'neutral' }> = {
  DEPOSIT:  { label: 'Deposit',  variant: 'success' },
  WITHDRAW: { label: 'Withdraw', variant: 'error' },
  TRANSFER: { label: 'Transfer', variant: 'info' },
  PAYMENT:  { label: 'Payment',  variant: 'primary' },
  REFUND:   { label: 'Refund',   variant: 'warning' },
  FX:       { label: 'FX',       variant: 'neutral' },
  FEE:      { label: 'Fee',      variant: 'neutral' },
};

type TransactionTypeBadgeProps = { type: TransactionType; size?: 'sm' | 'md'; className?: string };

export function TransactionTypeBadge({ type, size = 'md', className }: TransactionTypeBadgeProps) {
  const meta = typeMeta[type] ?? { label: type, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} className={className}>
      {meta.label}
    </Badge>
  );
}
