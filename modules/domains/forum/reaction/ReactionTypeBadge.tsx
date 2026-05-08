'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faHeart,
  faFaceGrinSquint,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { ReactionType } from '../types';

const reactionMeta: Record<
  ReactionType,
  { icon: IconDefinition; label: string; colorClass: string; bgClass: string }
> = {
  LIKE:     { icon: faThumbsUp,       label: 'Like',     colorClass: 'text-success-fg',    bgClass: 'bg-success-subtle border-success/30' },
  DISLIKE:  { icon: faThumbsDown,     label: 'Dislike',  colorClass: 'text-error',          bgClass: 'bg-error-subtle border-error/30' },
  THANKS:   { icon: faHeart,          label: 'Thanks',   colorClass: 'text-warning',        bgClass: 'bg-warning-subtle border-warning/30' },
  LAUGH:    { icon: faFaceGrinSquint, label: 'Laugh',    colorClass: 'text-info',           bgClass: 'bg-info-subtle border-info/30' },
  CONFUSED: { icon: faQuestion,       label: 'Confused', colorClass: 'text-text-secondary', bgClass: 'bg-surface-overlay border-border' },
};

type ReactionTypeBadgeProps = {
  type: ReactionType;
  count?: number;
  size?: 'sm' | 'md';
  className?: string;
};

export function ReactionTypeBadge({ type, count, size = 'md', className }: ReactionTypeBadgeProps) {
  const meta = reactionMeta[type] ?? reactionMeta.CONFUSED;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
        meta.bgClass,
        meta.colorClass,
        className
      )}
    >
      <FontAwesomeIcon
        icon={meta.icon}
        className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'}
        aria-hidden="true"
      />
      {meta.label}
      {count !== undefined && (
        <span className="font-semibold">{count}</span>
      )}
    </span>
  );
}
