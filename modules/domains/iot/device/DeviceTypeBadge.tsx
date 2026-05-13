'use client';
import { Badge } from '@/modules/ui/Badge';
import type { DeviceType } from '../types';

const typeMeta: Record<DeviceType, { label: string; variant: 'primary' | 'info' | 'neutral' }> = {
  INTERNAL:    { label: 'Internal',    variant: 'primary' },
  INTEGRATION: { label: 'Integration', variant: 'info' },
  EXTERNAL:    { label: 'External',    variant: 'neutral' },
};

type DeviceTypeBadgeProps = { type: DeviceType; size?: 'sm' | 'md'; className?: string };

export function DeviceTypeBadge({ type, size = 'md', className }: DeviceTypeBadgeProps) {
  const meta = typeMeta[type] ?? { label: type, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} className={className}>
      {meta.label}
    </Badge>
  );
}
