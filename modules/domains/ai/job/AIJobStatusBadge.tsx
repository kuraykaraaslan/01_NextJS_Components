'use client';
import { Badge } from '@/modules/ui/Badge';
import type { AIJobStatus } from '../types';

const statusMeta: Record<AIJobStatus, { label: string; variant: 'warning' | 'info' | 'success' | 'error' | 'neutral' }> = {
  PENDING:   { label: 'Pending',   variant: 'warning' },
  RUNNING:   { label: 'Running',   variant: 'info'    },
  COMPLETED: { label: 'Completed', variant: 'success' },
  FAILED:    { label: 'Failed',    variant: 'error'   },
  CANCELLED: { label: 'Cancelled', variant: 'neutral' },
};

type AIJobStatusBadgeProps = {
  status: AIJobStatus;
  size?: 'sm' | 'md';
  className?: string;
};

export function AIJobStatusBadge({ status, size = 'md', className }: AIJobStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} dot className={className}>
      {meta.label}
    </Badge>
  );
}
