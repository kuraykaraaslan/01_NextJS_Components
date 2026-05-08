'use client';
import { Badge } from '@/modules/ui/Badge';
import type { VideoStatus } from '../types';

const statusMeta: Record<VideoStatus, { label: string; variant: 'neutral' | 'warning' | 'success' | 'info' | 'error' }> = {
  DRAFT:      { label: 'Draft',      variant: 'neutral' },
  PROCESSING: { label: 'Processing', variant: 'warning' },
  PUBLISHED:  { label: 'Published',  variant: 'success' },
  PRIVATE:    { label: 'Private',    variant: 'info' },
  UNLISTED:   { label: 'Unlisted',   variant: 'neutral' },
  BLOCKED:    { label: 'Blocked',    variant: 'error' },
  DELETED:    { label: 'Deleted',    variant: 'error' },
};

type VideoStatusBadgeProps = {
  status: VideoStatus;
  size?: 'sm' | 'md';
  className?: string;
};

export function VideoStatusBadge({ status, size = 'md', className }: VideoStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
