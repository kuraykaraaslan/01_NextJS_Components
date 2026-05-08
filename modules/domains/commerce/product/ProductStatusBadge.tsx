'use client';
import { Badge } from '@/modules/ui/Badge';
import type { ProductStatus } from '../types';

const statusMeta: Record<ProductStatus, { label: string; variant: 'neutral' | 'success' | 'error' | 'warning' | 'info' | 'primary' }> = {
  DRAFT:        { label: 'Draft',        variant: 'neutral' },
  PUBLISHED:    { label: 'Published',    variant: 'success' },
  ARCHIVED:     { label: 'Archived',     variant: 'neutral' },
  OUT_OF_STOCK: { label: 'Out of Stock', variant: 'error'   },
};

type ProductStatusBadgeProps = {
  status: ProductStatus;
  size?: 'sm' | 'md';
  className?: string;
};

export function ProductStatusBadge({ status, size = 'md', className }: ProductStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
