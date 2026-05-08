'use client';
import { Badge } from '@/modules/ui/Badge';
import type { FlightCabinClass } from '../types';

const cabinMeta: Record<FlightCabinClass, { label: string; variant: 'neutral' | 'info' | 'primary' | 'warning' }> = {
  ECONOMY:         { label: 'Economy',         variant: 'neutral'  },
  PREMIUM_ECONOMY: { label: 'Premium Economy', variant: 'info'     },
  BUSINESS:        { label: 'Business',        variant: 'primary'  },
  FIRST:           { label: 'First Class',     variant: 'warning'  },
};

type FlightCabinBadgeProps = {
  cabin: FlightCabinClass;
  size?: 'sm' | 'md';
  className?: string;
};

export function FlightCabinBadge({ cabin, size = 'md', className }: FlightCabinBadgeProps) {
  const meta = cabinMeta[cabin] ?? { label: cabin, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} className={className}>
      {meta.label}
    </Badge>
  );
}
