'use client';
import { cn } from '@/libs/utils/cn';
import type { EventFormat } from './types';

type Props = {
  format: EventFormat;
  size?: 'sm' | 'md';
  className?: string;
};

const config: Record<EventFormat, { label: string; icon: string; classes: string }> = {
  PHYSICAL: { label: 'Fiziksel', icon: '📍', classes: 'bg-primary-subtle text-primary border-primary/20' },
  ONLINE:   { label: 'Online',   icon: '🌐', classes: 'bg-info-subtle text-info border-info/20' },
  HYBRID:   { label: 'Hibrit',   icon: '⚡', classes: 'bg-warning-subtle text-warning border-warning/20' },
};

export function EventFormatBadge({ format, size = 'sm', className }: Props) {
  const { label, icon, classes } = config[format];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium border rounded-full',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1',
        classes,
        className,
      )}
    >
      <span>{icon}</span>
      {label}
    </span>
  );
}
