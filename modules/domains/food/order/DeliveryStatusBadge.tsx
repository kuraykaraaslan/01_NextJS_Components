'use client';
import { Badge } from '@/modules/ui/Badge';
import type { DeliveryStatus } from '../types';

type BadgeVariant = 'warning' | 'info' | 'primary' | 'success' | 'error';

const statusMeta: Record<DeliveryStatus, { label: string; variant: BadgeVariant }> = {
  PENDING:    { label: 'Pending',     variant: 'warning' },
  ASSIGNED:   { label: 'Assigned',    variant: 'info' },
  PICKED_UP:  { label: 'Picked Up',   variant: 'primary' },
  ON_THE_WAY: { label: 'On the Way',  variant: 'primary' },
  DELIVERED:  { label: 'Delivered',   variant: 'success' },
  FAILED:     { label: 'Failed',      variant: 'error' },
};

type DeliveryStatusBadgeProps = {
  status: DeliveryStatus;
  size?: 'sm' | 'md';
  className?: string;
};

export function DeliveryStatusBadge({ status, size = 'md', className }: DeliveryStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'warning' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
