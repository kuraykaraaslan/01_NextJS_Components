'use client';
import { Badge } from '@/modules/ui/Badge';
import type { WalletStatus } from '../types';

const statusMeta: Record<WalletStatus, { label: string; variant: 'success' | 'warning' | 'error' }> = {
  ACTIVE: { label: 'Active', variant: 'success' },
  FROZEN: { label: 'Frozen', variant: 'warning' },
  CLOSED: { label: 'Closed', variant: 'error' },
};

type WalletStatusBadgeProps = { status: WalletStatus; size?: 'sm' | 'md'; className?: string };

export function WalletStatusBadge({ status, size = 'md', className }: WalletStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
