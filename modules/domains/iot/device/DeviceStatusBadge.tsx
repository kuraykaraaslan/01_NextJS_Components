'use client';
import { Badge } from '@/modules/ui/Badge';
import type { DeviceStatus } from '../types';

const statusMeta: Record<DeviceStatus, { label: string; variant: 'success' | 'error' | 'warning' | 'neutral' }> = {
  ONLINE:      { label: 'Online',      variant: 'success' },
  OFFLINE:     { label: 'Offline',     variant: 'neutral' },
  ERROR:       { label: 'Error',       variant: 'error' },
  MAINTENANCE: { label: 'Maintenance', variant: 'warning' },
};

type DeviceStatusBadgeProps = { status: DeviceStatus; size?: 'sm' | 'md'; className?: string };

export function DeviceStatusBadge({ status, size = 'md', className }: DeviceStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
