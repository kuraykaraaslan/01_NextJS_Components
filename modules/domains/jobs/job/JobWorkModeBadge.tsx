'use client';
import { Badge } from '@/modules/ui/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import type { JobWorkMode } from '../types';

const modeMeta: Record<JobWorkMode, { label: string; variant: 'primary' | 'success' | 'info'; icon: typeof faBuilding }> = {
  ONSITE: { label: 'On-site',  variant: 'info',    icon: faBuilding },
  REMOTE: { label: 'Remote',   variant: 'success',  icon: faHouse },
  HYBRID: { label: 'Hybrid',   variant: 'primary',  icon: faLocationDot },
};

type JobWorkModeBadgeProps = { workMode: JobWorkMode; size?: 'sm' | 'md' | 'lg'; className?: string };

export function JobWorkModeBadge({ workMode, size = 'md', className }: JobWorkModeBadgeProps) {
  const meta = modeMeta[workMode] ?? { label: workMode, variant: 'neutral' as const, icon: faLocationDot };
  return (
    <Badge variant={meta.variant} size={size} className={className}>
      <FontAwesomeIcon icon={meta.icon} className="mr-1 w-3 h-3" aria-hidden="true" />
      {meta.label}
    </Badge>
  );
}
