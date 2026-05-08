'use client';
import { Badge } from '@/modules/ui/Badge';
import type { JobExperienceLevel } from '../types';

const levelMeta: Record<JobExperienceLevel, { label: string; variant: 'success' | 'info' | 'primary' | 'warning' | 'error' }> = {
  JUNIOR:    { label: 'Junior',    variant: 'success' },
  MID:       { label: 'Mid-level', variant: 'info' },
  SENIOR:    { label: 'Senior',    variant: 'primary' },
  LEAD:      { label: 'Lead',      variant: 'warning' },
  DIRECTOR:  { label: 'Director',  variant: 'error' },
};

type JobExperienceBadgeProps = { level: JobExperienceLevel; size?: 'sm' | 'md' | 'lg'; className?: string };

export function JobExperienceBadge({ level, size = 'md', className }: JobExperienceBadgeProps) {
  const meta = levelMeta[level] ?? { label: level, variant: 'neutral' as const };
  return <Badge variant={meta.variant} size={size} className={className}>{meta.label}</Badge>;
}
