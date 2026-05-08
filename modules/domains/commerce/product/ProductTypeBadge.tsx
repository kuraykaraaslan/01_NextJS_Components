'use client';
import { Badge } from '@/modules/ui/Badge';
import type { ProductType } from '@/modules/domains/commerce/types';

const typeMeta: Record<ProductType, { label: string; variant: 'info' | 'primary' | 'warning' }> = {
  PHYSICAL: { label: 'Physical', variant: 'info' },
  DIGITAL:  { label: 'Digital',  variant: 'primary' },
  SERVICE:  { label: 'Service',  variant: 'warning' },
};

type ProductTypeBadgeProps = {
  type: ProductType;
  size?: 'sm' | 'md' | 'lg';
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
