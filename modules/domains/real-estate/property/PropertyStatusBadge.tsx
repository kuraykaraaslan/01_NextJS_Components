'use client';
import { Badge } from '@/modules/ui/Badge';
import type { PropertyStatus } from '../types';

const statusMeta: Record<PropertyStatus, { label: string; variant: 'neutral' | 'success' | 'error' | 'info' | 'warning' | 'primary' }> = {
  DRAFT:    { label: 'Draft',     variant: 'neutral' },
  ACTIVE:   { label: 'Active',    variant: 'success' },
  PUBLISHED:{ label: 'Published', variant: 'success' },
  SOLD:     { label: 'Sold',      variant: 'error'   },
  RENTED:   { label: 'Rented',    variant: 'info'    },
  ARCHIVED: { label: 'Archived',  variant: 'neutral' },
};

type PropertyStatusBadgeProps = { status: PropertyStatus; size?: 'sm' | 'md'; className?: string };

export function PropertyStatusBadge({ status, size = 'md', className }: PropertyStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return <Badge variant={meta.variant} size={size} dot className={className}>{meta.label}</Badge>;
}
