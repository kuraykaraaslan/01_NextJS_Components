'use client';
import { cn } from '@/libs/utils/cn';

const STATUS_STYLES: Record<string, string> = {
  PAID:      'bg-success-subtle text-success border-success/30',
  REFUNDED:  'bg-warning-subtle text-warning border-warning/30',
  CANCELLED: 'bg-error-subtle text-error border-error/30',
};

const STATUS_LABELS: Record<string, string> = {
  PAID: 'Ödendi', REFUNDED: 'İade Edildi', CANCELLED: 'İptal',
};

type EventOrderStatusBadgeProps = {
  status: string;
  size?: 'sm' | 'md';
  className?: string;
};

export function EventOrderStatusBadge({ status, size = 'sm', className }: EventOrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        'font-bold rounded-full border',
        size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-3 py-1',
        STATUS_STYLES[status] ?? STATUS_STYLES['PAID'],
        className,
      )}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
