'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUserGroup, faLock } from '@fortawesome/free-solid-svg-icons';
import type { SocialPrivacy } from '@/modules/domains/social/types';

const PRIVACY_CONFIG: Record<SocialPrivacy, { label: string; icon: typeof faGlobe; className: string }> = {
  PUBLIC:  { label: 'Public',       icon: faGlobe,      className: 'text-info' },
  FRIENDS: { label: 'Friends only', icon: faUserGroup,  className: 'text-primary' },
  PRIVATE: { label: 'Only me',      icon: faLock,       className: 'text-text-secondary' },
};

type PostPrivacyBadgeProps = {
  privacy: SocialPrivacy;
  showLabel?: boolean;
  className?: string;
};

export function PostPrivacyBadge({ privacy, showLabel = false, className }: PostPrivacyBadgeProps) {
  const { label, icon, className: colorClass } = PRIVACY_CONFIG[privacy];
  return (
    <span
      className={cn('inline-flex items-center gap-1 text-xs', colorClass, className)}
      title={label}
    >
      <FontAwesomeIcon icon={icon} className="w-3 h-3" aria-hidden="true" />
      {showLabel && <span>{label}</span>}
    </span>
  );
}
