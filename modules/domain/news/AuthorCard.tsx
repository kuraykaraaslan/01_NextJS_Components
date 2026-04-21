'use client';
import { useState } from 'react';
import { Avatar } from '@/modules/ui/Avatar';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';

export function AuthorCard({
  name = 'Sarah Mitchell',
  initials = 'SM',
  title = 'Senior World Affairs Correspondent',
  bio = 'Sarah Mitchell has covered international diplomacy and climate policy for over 12 years, reporting from more than 40 countries. She joined the newsroom in 2014 after a decade at the Associated Press.',
  articleCount = 847,
  followerCount = 24300,
  isFollowing: initialFollowing = false,
  socialLinks = { twitter: '@sarahmitchell', linkedin: 'in/smitchell' },
  className,
}: {
  name?: string;
  initials?: string;
  title?: string;
  bio?: string;
  articleCount?: number;
  followerCount?: number;
  isFollowing?: boolean;
  socialLinks?: { twitter?: string; linkedin?: string };
  className?: string;
}) {
  const [following, setFollowing] = useState(initialFollowing);
  const [followers, setFollowers] = useState(followerCount);

  function handleFollow() {
    setFollowing((f) => !f);
    setFollowers((c) => following ? c - 1 : c + 1);
  }

  return (
    <Card className={className}>
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-4">
          <Avatar name={name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-text-primary">{name}</h3>
              <Badge variant="info" size="sm">{articleCount} articles</Badge>
            </div>
            <p className="text-sm text-text-secondary mt-0.5">{title}</p>
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.twitter && (
                <span className="text-xs text-text-disabled">{socialLinks.twitter}</span>
              )}
              {socialLinks.linkedin && (
                <span className="text-xs text-text-disabled">{socialLinks.linkedin}</span>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">{bio}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-sm font-bold text-text-primary tabular-nums">
                {followers.toLocaleString()}
              </p>
              <p className="text-xs text-text-disabled">followers</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-text-primary tabular-nums">{articleCount}</p>
              <p className="text-xs text-text-disabled">articles</p>
            </div>
          </div>
          <Button
            variant={following ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleFollow}
          >
            {following ? 'Following' : 'Follow'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
