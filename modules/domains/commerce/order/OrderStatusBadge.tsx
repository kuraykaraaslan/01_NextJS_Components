'use client';
import { Badge } from '@/modules/ui/Badge';
import type { OrderStatus } from '@/modules/domains/commerce/types';

const statusMeta: Record<OrderStatus, { label: string; variant: 'warning' | 'info' | 'primary' | 'success' | 'error' | 'neutral' }> = {
  PENDING:             { label: 'Pending',            variant: 'warning' },
  CONFIRMED:           { label: 'Confirmed',          variant: 'info' },
  PAID:                { label: 'Paid',               variant: 'info' },
  PROCESSING:          { label: 'Processing',         variant: 'info' },
  SHIPPED:             { label: 'Shipped',            variant: 'primary' },
  DELIVERED:           { label: 'Delivered',          variant: 'success' },
  CANCELLED:           { label: 'Cancelled',          variant: 'error' },
  REFUNDED:            { label: 'Refunded',           variant: 'neutral' },
  PARTIALLY_REFUNDED:  { label: 'Partial Refund',     variant: 'neutral' },
};

type OrderStatusBadgeProps = {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
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
