'use client';
import { cn } from '@/libs/utils/cn';
import type { EventStatus } from './types';

type Props = {
  status: EventStatus;
  size?: 'sm' | 'md';
  className?: string;
};

const config: Record<EventStatus, { label: string; classes: string }> = {
  DRAFT:     { label: 'Taslak',    classes: 'bg-surface-overlay text-text-secondary border-border' },
  PUBLISHED: { label: 'Aktif',     classes: 'bg-success-subtle text-success-fg border-success/30' },
  SCHEDULED: { label: 'Planlı',    classes: 'bg-info-subtle text-info border-info/30' },
  CANCELLED: { label: 'İptal',     classes: 'bg-error-subtle text-error border-error/30' },
  POSTPONED: { label: 'Ertelendi', classes: 'bg-warning-subtle text-warning border-warning/30' },
  SOLD_OUT:  { label: 'Tükendi',   classes: 'bg-error-subtle text-error border-error/30' },
  ARCHIVED:  { label: 'Arşiv',     classes: 'bg-surface-overlay text-text-disabled border-border' },
};

export function EventStatusBadge({ status, size = 'sm', className }: Props) {
  const { label, classes } = config[status];
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold border rounded-full',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1',
        classes,
        className,
      )}
    >
      {label}
    </span>
  );
}
