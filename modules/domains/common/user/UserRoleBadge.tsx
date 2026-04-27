'use client';
import { Badge } from '@/modules/ui/Badge';
import type { UserRole } from '../types';

const roleMeta: Record<UserRole, { label: string; variant: 'error' | 'primary' | 'neutral' }> = {
  ADMIN:  { label: 'Admin',  variant: 'error' },
  AUTHOR: { label: 'Author', variant: 'primary' },
  USER:   { label: 'User',   variant: 'neutral' },
};

type UserRoleBadgeProps = {
  role: UserRole;
  size?: 'sm' | 'md' | 'lg';
};

export function UserRoleBadge({ role, size = 'md' }: UserRoleBadgeProps) {
  const meta = roleMeta[role] ?? { label: role, variant: 'neutral' as const };
  return <Badge variant={meta.variant} size={size}>{meta.label}</Badge>;
}
