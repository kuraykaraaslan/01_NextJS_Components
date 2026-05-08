'use client';
import { Badge } from '@/modules/ui/Badge';
import type { ListingType } from '../types';

const listingMeta: Record<ListingType, { label: string; variant: 'primary' | 'info' | 'warning' }> = {
  SALE:       { label: 'For Sale',    variant: 'primary' },
  RENT:       { label: 'For Rent',    variant: 'info'    },
  SHORT_TERM: { label: 'Short-term',  variant: 'warning' },
};

type ListingTypeBadgeProps = { type: ListingType; size?: 'sm' | 'md'; className?: string };

export function ListingTypeBadge({ type, size = 'md', className }: ListingTypeBadgeProps) {
  const meta = listingMeta[type] ?? { label: type, variant: 'primary' as const };
  return <Badge variant={meta.variant} size={size} className={className}>{meta.label}</Badge>;
}
