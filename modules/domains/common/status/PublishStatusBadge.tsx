'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faGlobe, faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/modules/ui/Badge';
import { cn } from '@/libs/utils/cn';
import type { PublishStatus } from '../StatusTypes';

const statusMeta: Record<PublishStatus, {
  label: string;
  variant: 'warning' | 'success' | 'neutral';
  icon: React.ReactNode;
}> = {
  DRAFT:     { label: 'Draft',     variant: 'warning', icon: <FontAwesomeIcon icon={faPenToSquare} className="w-3 h-3" /> },
  PUBLISHED: { label: 'Published', variant: 'success', icon: <FontAwesomeIcon icon={faGlobe}       className="w-3 h-3" /> },
  ARCHIVED:  { label: 'Archived',  variant: 'neutral', icon: <FontAwesomeIcon icon={faBoxArchive}  className="w-3 h-3" /> },
};

type PublishStatusBadgeProps = {
  status: PublishStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
};

export function PublishStatusBadge({ status, size = 'md', showIcon = true, className }: PublishStatusBadgeProps) {
  const meta = statusMeta[status] ?? { label: status, variant: 'neutral' as const, icon: null };
  return (
    <Badge variant={meta.variant} size={size} className={cn('gap-1', className)}>
      {showIcon && meta.icon}
      {meta.label}
    </Badge>
  );
}
