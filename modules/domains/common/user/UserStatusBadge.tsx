'use client';
import { Badge } from '@/modules/ui/Badge';
import type { UserStatus } from '../types';

const statusMeta: Record<UserStatus, { label: string; variant: 'success' | 'neutral' | 'error' }> = {
  ACTIVE:   { label: 'Active',  variant: 'success' },
  INACTIVE: { label: 'Inactive', variant: 'neutral' },
  BANNED:   { label: 'Banned',  variant: 'error' },
};

type UserStatusBadgeProps = {
  status: UserStatus;
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
};

export function UserStatusBadge({ status, size = 'md', dot = false }: UserStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return <Badge variant={meta.variant} size={size} dot={dot}>{meta.label}</Badge>;
}
