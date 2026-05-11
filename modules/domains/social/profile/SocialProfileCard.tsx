'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faLocationDot,
  faLink,
  faUserPlus,
  faUserMinus,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/modules/ui/Button';
import { Avatar } from '@/modules/ui/Avatar';
import type { SocialUser } from '@/modules/domains/social/types';

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

type SocialProfileCardProps = {
  user: SocialUser;
  isOwnProfile?: boolean;
  onFollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  className?: string;
};

export function SocialProfileCard({
  user,
  isOwnProfile = false,
  onFollow,
  onMessage,
  className,
}: SocialProfileCardProps) {
  const [following, setFollowing] = useState(user.isFollowing);
  const [followerCount, setFollowerCount] = useState(user.followerCount);

  function handleFollow() {
    setFollowing((v) => !v);
    setFollowerCount((c) => (following ? c - 1 : c + 1));
    onFollow?.(user.userId);
  }

  return (
    <div className={cn('bg-surface-raised border border-border rounded-xl overflow-hidden', className)}>
      {/* Cover */}
      <div className="h-28 bg-gradient-to-br from-primary-subtle via-primary/20 to-secondary/20 relative overflow-hidden">
        {user.coverImage && (
          <img src={user.coverImage} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        )}
      </div>

      {/* Avatar + actions */}
      <div className="px-4 pb-4">
        <div className="flex items-end justify-between -mt-10 mb-3 relative z-10">
          <div className="ring-4 ring-surface-raised rounded-full">
            <Avatar src={user.avatar ?? undefined} name={user.name} size="xl" />
          </div>
          {!isOwnProfile && (
            <div className="flex items-center gap-2 mt-14">
              <Button
                variant="outline"
                size="sm"
                aria-label="Send message"
                onClick={() => onMessage?.(user.userId)}
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5" aria-hidden="true" />
              </Button>
              <Button
                variant={following ? 'outline' : 'primary'}
                size="sm"
                onClick={handleFollow}
                aria-pressed={following}
              >
                <FontAwesomeIcon
                  icon={following ? faUserMinus : faUserPlus}
                  className="w-3.5 h-3.5 mr-1.5"
                  aria-hidden="true"
                />
                {following ? 'Following' : 'Follow'}
              </Button>
            </div>
          )}
          {isOwnProfile && (
            <div className="mt-14">
              <Button variant="outline" size="sm">Edit profile</Button>
            </div>
          )}
        </div>

        {/* Name + username */}
        <div className="mb-2">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-bold text-text-primary leading-tight">{user.name}</h2>
            {user.isVerified && (
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="w-4 h-4 text-primary shrink-0"
                aria-label="Verified"
              />
            )}
          </div>
          <p className="text-sm text-text-secondary">@{user.username}</p>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-sm text-text-primary leading-relaxed mb-3">{user.bio}</p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary mb-4">
          {user.location && (
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" aria-hidden="true" />
              {user.location}
            </span>
          )}
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
            >
              <FontAwesomeIcon icon={faLink} className="w-3 h-3" aria-hidden="true" />
              {user.website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-5 text-sm border-t border-border pt-3">
          <div className="text-center">
            <p className="font-bold text-text-primary">{formatCount(user.postCount)}</p>
            <p className="text-xs text-text-secondary">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-text-primary">{formatCount(followerCount)}</p>
            <p className="text-xs text-text-secondary">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-text-primary">{formatCount(user.followingCount)}</p>
            <p className="text-xs text-text-secondary">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}
