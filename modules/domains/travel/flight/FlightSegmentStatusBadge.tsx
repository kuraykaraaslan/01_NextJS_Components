'use client';
import { Badge } from '@/modules/ui/Badge';
import type { FlightSegmentStatus } from '../types';

const statusMeta: Record<FlightSegmentStatus, { label: string; variant: 'info' | 'warning' | 'error' | 'primary' | 'success' }> = {
  SCHEDULED: { label: 'Scheduled', variant: 'info'    },
  DELAYED:   { label: 'Delayed',   variant: 'warning' },
  CANCELLED: { label: 'Cancelled', variant: 'error'   },
  DEPARTED:  { label: 'Departed',  variant: 'primary' },
  ARRIVED:   { label: 'Arrived',   variant: 'success' },
};

type FlightSegmentStatusBadgeProps = {
  status: FlightSegmentStatus;
  size?: 'sm' | 'md';
  className?: string;
};

export function FlightSegmentStatusBadge({ status, size = 'md', className }: FlightSegmentStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'info' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
