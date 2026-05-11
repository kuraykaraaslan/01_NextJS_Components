'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faFilePen,
  faBoxArchive,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import type { PostStatus } from '@/modules/domains/social/types';

const STATUS_CONFIG: Record<PostStatus, { label: string; icon: typeof faCircleCheck; className: string }> = {
  PUBLISHED: { label: 'Published',  icon: faCircleCheck, className: 'bg-success-subtle text-success-fg border-success/20' },
  DRAFT:     { label: 'Draft',      icon: faFilePen,     className: 'bg-warning-subtle text-warning border-warning/20' },
  ARCHIVED:  { label: 'Archived',   icon: faBoxArchive,  className: 'bg-surface-overlay text-text-secondary border-border' },
  DELETED:   { label: 'Deleted',    icon: faTrash,       className: 'bg-error-subtle text-error border-error/20' },
};

type PostStatusBadgeProps = {
  status: PostStatus;
  size?: 'sm' | 'md';
  className?: string;
};

export function PostStatusBadge({ status, size = 'md', className }: PostStatusBadgeProps) {
  const { label, icon, className: stateClass } = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        stateClass,
        className
      )}
    >
      <FontAwesomeIcon icon={icon} className="w-3 h-3" aria-hidden="true" />
      {label}
    </span>
  );
}
