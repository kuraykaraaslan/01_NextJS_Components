'use client';
import { Badge } from '@/modules/ui/Badge';
import type { JobType } from '../types';

const typeMeta: Record<JobType, { label: string; variant: 'primary' | 'info' | 'neutral' | 'warning' | 'success' }> = {
  FULL_TIME:   { label: 'Full-time',  variant: 'primary' },
  PART_TIME:   { label: 'Part-time',  variant: 'info' },
  CONTRACT:    { label: 'Contract',   variant: 'warning' },
  FREELANCE:   { label: 'Freelance',  variant: 'neutral' },
  INTERNSHIP:  { label: 'Internship', variant: 'success' },
};

type JobTypeBadgeProps = { type: JobType; size?: 'sm' | 'md' | 'lg'; className?: string };

export function JobTypeBadge({ type, size = 'md', className }: JobTypeBadgeProps) {
  const meta = typeMeta[type] ?? { label: type, variant: 'neutral' as const };
  return <Badge variant={meta.variant} size={size} className={className}>{meta.label}</Badge>;
}
