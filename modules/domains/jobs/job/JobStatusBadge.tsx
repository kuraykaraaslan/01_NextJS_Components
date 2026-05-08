'use client';
import { Badge } from '@/modules/ui/Badge';
import type { JobStatus } from '../types';

const statusMeta: Record<JobStatus, { label: string; variant: 'warning' | 'success' | 'neutral' | 'error' | 'info' }> = {
  DRAFT:     { label: 'Draft',     variant: 'neutral' },
  PUBLISHED: { label: 'Active',    variant: 'success' },
  PAUSED:    { label: 'Paused',    variant: 'warning' },
  CLOSED:    { label: 'Closed',    variant: 'error' },
  ARCHIVED:  { label: 'Archived',  variant: 'neutral' },
};

type JobStatusBadgeProps = { status: JobStatus; size?: 'sm' | 'md' | 'lg'; className?: string };

export function JobStatusBadge({ status, size = 'md', className }: JobStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return <Badge variant={meta.variant} size={size} dot className={className}>{meta.label}</Badge>;
}
