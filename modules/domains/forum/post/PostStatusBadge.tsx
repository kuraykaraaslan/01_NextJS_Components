'use client';
import { Badge } from '@/modules/ui/Badge';
import type { ForumPostStatus } from '../types';

const statusMeta: Record<ForumPostStatus, { label: string; variant: 'success' | 'warning' | 'neutral' | 'error' }> = {
  PUBLISHED:      { label: 'Published',      variant: 'success' },
  PENDING_REVIEW: { label: 'Pending Review', variant: 'warning' },
  HIDDEN:         { label: 'Hidden',         variant: 'neutral' },
  DELETED:        { label: 'Deleted',        variant: 'error' },
  SPAM:           { label: 'Spam',           variant: 'error' },
};

type PostStatusBadgeProps = { status: ForumPostStatus; size?: 'sm' | 'md'; className?: string };

export function PostStatusBadge({ status, size = 'md', className }: PostStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return <Badge variant={meta.variant} size={size} dot className={className}>{meta.label}</Badge>;
}
