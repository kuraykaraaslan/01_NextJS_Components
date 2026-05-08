'use client';
import { Badge } from '@/modules/ui/Badge';
import type { TopicStatus } from '../types';

const statusMeta: Record<TopicStatus, { label: string; variant: 'success' | 'warning' | 'primary' | 'neutral' | 'error' }> = {
  OPEN:     { label: 'Open',     variant: 'success' },
  LOCKED:   { label: 'Locked',   variant: 'warning' },
  PINNED:   { label: 'Pinned',   variant: 'primary' },
  ARCHIVED: { label: 'Archived', variant: 'neutral' },
  DELETED:  { label: 'Deleted',  variant: 'error' },
};

type TopicStatusBadgeProps = { status: TopicStatus; size?: 'sm' | 'md'; className?: string };

export function TopicStatusBadge({ status, size = 'md', className }: TopicStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return <Badge variant={meta.variant} size={size} dot className={className}>{meta.label}</Badge>;
}
