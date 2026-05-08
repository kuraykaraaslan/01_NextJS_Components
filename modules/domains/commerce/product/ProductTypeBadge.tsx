'use client';
import { Badge } from '@/modules/ui/Badge';
import type { ProductType } from '../types';

const typeMeta: Record<ProductType, { label: string; variant: 'info' | 'primary' | 'neutral' | 'success' | 'error' | 'warning' }> = {
  PHYSICAL: { label: 'Physical', variant: 'info'    },
  DIGITAL:  { label: 'Digital',  variant: 'primary' },
  SERVICE:  { label: 'Service',  variant: 'neutral' },
};

type ProductTypeBadgeProps = {
  type: ProductType;
  size?: 'sm' | 'md';
  className?: string;
};

export function ProductTypeBadge({ type, size = 'md', className }: ProductTypeBadgeProps) {
  const meta = typeMeta[type] ?? { label: type, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} className={className}>
      {meta.label}
    </Badge>
  );
}
