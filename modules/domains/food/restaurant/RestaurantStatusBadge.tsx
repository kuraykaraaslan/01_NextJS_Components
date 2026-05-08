'use client';
import { Badge } from '@/modules/ui/Badge';
import type { RestaurantStatus } from '../types';

type RestaurantStatusBadgeVariant = 'success' | 'neutral' | 'error';

const statusMeta: Record<RestaurantStatus, { label: string; variant: RestaurantStatusBadgeVariant }> = {
  ACTIVE:   { label: 'Active',   variant: 'success' },
  INACTIVE: { label: 'Inactive', variant: 'neutral' },
  CLOSED:   { label: 'Closed',   variant: 'error' },
};

type RestaurantStatusBadgeProps = {
  status: RestaurantStatus;
  size?: 'sm' | 'md';
  className?: string;
};

export function RestaurantStatusBadge({ status, size = 'md', className }: RestaurantStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
