'use client';
import { Badge } from '@/modules/ui/Badge';
import type { StockStatus } from '../types';

const stockMeta: Record<StockStatus, { label: string; variant: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary' }> = {
  IN_STOCK:     { label: 'In Stock',     variant: 'success' },
  LOW_STOCK:    { label: 'Low Stock',    variant: 'warning' },
  OUT_OF_STOCK: { label: 'Out of Stock', variant: 'error'   },
  BACKORDER:    { label: 'Backorder',    variant: 'info'    },
};

type StockStatusBadgeProps = {
  status: StockStatus;
  size?: 'sm' | 'md';
  className?: string;
};

export function StockStatusBadge({ status, size = 'md', className }: StockStatusBadgeProps) {
  const meta = stockMeta[status] ?? { label: status, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
