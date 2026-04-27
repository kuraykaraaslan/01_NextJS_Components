'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/modules/ui/Badge';
import { cn } from '@/libs/utils/cn';
import type { Visibility } from '../BaseTypes';

const visibilityMeta: Record<Visibility, {
  label: string;
  variant: 'success' | 'error' | 'neutral';
  icon: React.ReactNode;
}> = {
  PUBLIC:   { label: 'Public',   variant: 'success', icon: <FontAwesomeIcon icon={faEye}     className="w-3 h-3" /> },
  PRIVATE:  { label: 'Private',  variant: 'error',   icon: <FontAwesomeIcon icon={faLock}    className="w-3 h-3" /> },
  UNLISTED: { label: 'Unlisted', variant: 'neutral',  icon: <FontAwesomeIcon icon={faEyeSlash} className="w-3 h-3" /> },
};

type VisibilityBadgeProps = {
  visibility: Visibility;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
};

export function VisibilityBadge({ visibility, size = 'md', showIcon = true, className }: VisibilityBadgeProps) {
  const meta = visibilityMeta[visibility] ?? { label: visibility, variant: 'neutral' as const, icon: null };
  return (
    <Badge variant={meta.variant} size={size} className={cn('gap-1', className)}>
      {showIcon && meta.icon}
      {meta.label}
    </Badge>
  );
}
