'use client';
import { Badge } from '@/modules/ui/Badge';
import type { ApplicationStatus } from '../types';

const statusMeta: Record<ApplicationStatus, { label: string; variant: 'neutral' | 'info' | 'primary' | 'warning' | 'success' | 'error' }> = {
  PENDING:     { label: 'Pending',     variant: 'neutral' },
  REVIEWING:   { label: 'Reviewing',   variant: 'info' },
  SHORTLISTED: { label: 'Shortlisted', variant: 'primary' },
  INTERVIEW:   { label: 'Interview',   variant: 'warning' },
  OFFERED:     { label: 'Offered',     variant: 'success' },
  REJECTED:    { label: 'Rejected',    variant: 'error' },
  WITHDRAWN:   { label: 'Withdrawn',   variant: 'neutral' },
};

type ApplicationStatusBadgeProps = { status: ApplicationStatus; size?: 'sm' | 'md' | 'lg'; className?: string };

export function ApplicationStatusBadge({ status, size = 'md', className }: ApplicationStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const };
  return <Badge variant={meta.variant} size={size} dot className={className}>{meta.label}</Badge>;
}
