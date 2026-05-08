'use client';
import { Badge } from '@/modules/ui/Badge';
import type { PropertyType } from '../types';

const typeMeta: Record<PropertyType, { label: string; variant: 'primary' | 'success' | 'warning' | 'neutral' | 'info' | 'error' }> = {
  APARTMENT:  { label: 'Apartment',  variant: 'primary'  },
  HOUSE:      { label: 'House',      variant: 'success'  },
  VILLA:      { label: 'Villa',      variant: 'warning'  },
  LAND:       { label: 'Land',       variant: 'neutral'  },
  COMMERCIAL: { label: 'Commercial', variant: 'info'     },
  OFFICE:     { label: 'Office',     variant: 'error'    },
};

type PropertyTypeBadgeProps = { type: PropertyType; size?: 'sm' | 'md'; className?: string };

export function PropertyTypeBadge({ type, size = 'md', className }: PropertyTypeBadgeProps) {
  const meta = typeMeta[type] ?? { label: type, variant: 'neutral' as const };
  return <Badge variant={meta.variant} size={size} className={className}>{meta.label}</Badge>;
}
