'use client';
import { cn } from '@/libs/utils/cn';
import { Avatar } from '@/modules/ui/Avatar';
import { Button } from '@/modules/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons';

type ChannelCardChannel = {
  channelId: string;
  name: string;
  handle: string;
  description?: string | null;
  avatarUrl?: string | null;
  subscriberCount?: number;
  videoCount?: number;
  verified?: boolean;
};

type ChannelCardProps = {
  channel: ChannelCardChannel;
  href?: string;
  className?: string;
};

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function ChannelCard({ channel, href, className }: ChannelCardProps) {
  const isInteractive = !!href;

  const body = (
    <div className="p-5 flex flex-col gap-4">
      {/* Top row: avatar + info */}
      <div className="flex items-start gap-3">
        <Avatar
          src={channel.avatarUrl}
          name={channel.name}
          size="lg"
          className="rounded-full flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-base font-semibold text-text-primary truncate">
              {channel.name}
            </span>
            {channel.verified && (
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="w-4 h-4 text-info flex-shrink-0"
                aria-label="Verified channel"
              />
            )}
          </div>
          <p className="text-sm text-text-secondary">@{channel.handle}</p>
        </div>
      </div>

      {/* Description */}
      {channel.description && (
        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
          {channel.description}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-text-secondary">
        {channel.subscriberCount !== undefined && (
          <span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faUsers} className="w-3.5 h-3.5" aria-hidden="true" />
            {formatCount(channel.subscriberCount)} subscribers
          </span>
        )}
        {channel.videoCount !== undefined && (
          <span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faVideo} className="w-3.5 h-3.5" aria-hidden="true" />
            {channel.videoCount} videos
          </span>
        )}
      </div>

      {/* Subscribe button */}
      <Button
        variant="outline"
        size="sm"
        className="self-start focus-visible:ring-2 focus-visible:ring-border-focus"
        onClick={(e) => e.preventDefault()}
      >
        Subscribe
      </Button>
    </div>
  );

  const baseClass = cn(
    'rounded-xl border border-border bg-surface-raised flex flex-col overflow-hidden',
    isInteractive && 'hover:shadow-md hover:border-border-focus transition-all duration-200 group',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}
      >
        {body}
      </a>
    );
  }

  return <div className={baseClass}>{body}</div>;
}
