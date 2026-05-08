'use client';
import { Badge } from '@/modules/ui/Badge';
import type { OrderStatus } from '../types';

type BadgeVariant = 'warning' | 'info' | 'primary' | 'success' | 'error' | 'neutral';

const statusMeta: Record<OrderStatus, { label: string; variant: BadgeVariant }> = {
  PENDING:    { label: 'Pending',     variant: 'warning' },
  ACCEPTED:   { label: 'Accepted',    variant: 'info' },
  PREPARING:  { label: 'Preparing',   variant: 'primary' },
  READY:      { label: 'Ready',       variant: 'success' },
  PICKED_UP:  { label: 'Picked Up',   variant: 'info' },
  ON_THE_WAY: { label: 'On the Way',  variant: 'primary' },
  DELIVERED:  { label: 'Delivered',   variant: 'success' },
  CANCELLED:  { label: 'Cancelled',   variant: 'error' },
  REFUNDED:   { label: 'Refunded',    variant: 'neutral' },
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
