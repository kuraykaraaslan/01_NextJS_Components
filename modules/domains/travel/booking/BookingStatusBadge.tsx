'use client';
import { Badge } from '@/modules/ui/Badge';
import type { TravelBookingStatus } from '../types';

const statusMeta: Record<TravelBookingStatus, { label: string; variant: 'neutral' | 'warning' | 'info' | 'success' | 'error' }> = {
  DRAFT:     { label: 'Draft',     variant: 'neutral'  },
  PENDING:   { label: 'Pending',   variant: 'warning'  },
  CONFIRMED: { label: 'Confirmed', variant: 'info'     },
  PAID:      { label: 'Paid',      variant: 'success'  },
  CANCELLED: { label: 'Cancelled', variant: 'error'    },
  REFUNDED:  { label: 'Refunded',  variant: 'neutral'  },
  COMPLETED: { label: 'Completed', variant: 'success'  },
};

type BookingStatusBadgeProps = {
  status: TravelBookingStatus;
  size?: 'sm' | 'md';
  className?: string;
};

export function BookingStatusBadge({ status, size = 'md', className }: BookingStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
