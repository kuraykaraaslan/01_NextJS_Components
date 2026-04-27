'use client';
import { Badge } from '@/modules/ui/Badge';
import type { PaymentStatus } from '../PaymentTypes';

const statusMeta: Record<PaymentStatus, { label: string; variant: 'warning' | 'info' | 'success' | 'error' | 'neutral' }> = {
  PENDING:    { label: 'Pending',    variant: 'warning' },
  AUTHORIZED: { label: 'Authorized', variant: 'info' },
  PAID:       { label: 'Paid',       variant: 'success' },
  FAILED:     { label: 'Failed',     variant: 'error' },
  CANCELLED:  { label: 'Cancelled',  variant: 'neutral' },
  REFUNDED:   { label: 'Refunded',   variant: 'info' },
};

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
};

export function PaymentStatusBadge({ status, size = 'md', dot = false }: PaymentStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return <Badge variant={meta.variant} size={size} dot={dot}>{meta.label}</Badge>;
}
