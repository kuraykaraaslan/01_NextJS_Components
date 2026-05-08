'use client';
import { Badge } from '@/modules/ui/Badge';
import type { OrderStatus } from '../types';

const statusMeta: Record<OrderStatus, { label: string; variant: 'warning' | 'info' | 'success' | 'primary' | 'error' | 'neutral' }> = {
  PENDING:           { label: 'Pending',            variant: 'warning' },
  CONFIRMED:         { label: 'Confirmed',          variant: 'info'    },
  PAID:              { label: 'Paid',               variant: 'success' },
  PROCESSING:        { label: 'Processing',         variant: 'info'    },
  SHIPPED:           { label: 'Shipped',            variant: 'primary' },
  DELIVERED:         { label: 'Delivered',          variant: 'success' },
  CANCELLED:         { label: 'Cancelled',          variant: 'error'   },
  REFUNDED:          { label: 'Refunded',           variant: 'neutral' },
  PARTIALLY_REFUNDED:{ label: 'Partial Refund',     variant: 'warning' },
};

type OrderStatusBadgeProps = {
  status: OrderStatus;
  size?: 'sm' | 'md';
  className?: string;
};

export function OrderStatusBadge({ status, size = 'md', className }: OrderStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
