'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { VideoStatusBadge } from './VideoStatusBadge';
import type { VideoStatus } from '../types';

type VideoCardVideo = {
  videoId: string;
  title: string;
  slug: string;
  thumbnailUrl?: string | null;
  duration?: number;
  viewCount?: number;
  likeCount?: number;
  status: VideoStatus;
  channelName: string;
  channelHandle: string;
  channelVerified?: boolean;
  publishedAt?: Date | string | null;
};

type VideoCardProps = {
  video: VideoCardVideo;
  href?: string;
  className?: string;
};

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function timeAgo(date: Date | string): string {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function VideoCard({ video, href, className }: VideoCardProps) {
  const isInteractive = !!href;

  const thumbnail = (
    <div className="relative aspect-video w-full overflow-hidden bg-surface-sunken rounded-t-xl">
      {video.thumbnailUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-sunken to-surface-overlay">
          <FontAwesomeIcon icon={faPlay} className="w-10 h-10 text-text-disabled" aria-hidden="true" />
        </div>
      )}

      {/* Duration overlay */}
      {video.duration !== undefined && video.duration > 0 && (
        <span className="absolute bottom-2 right-2 rounded px-1.5 py-0.5 text-xs font-semibold bg-[rgba(0,0,0,0.75)] text-white">
          {formatDuration(video.duration)}
        </span>
      )}

      {/* Play overlay on hover */}
      {isInteractive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/0 group-hover:bg-white/90 transition-all scale-75 group-hover:scale-100">
            <FontAwesomeIcon icon={faPlay} className="w-5 h-5 text-text-primary translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      )}
    </div>
  );

  const body = (
    <>
      {thumbnail}
      <div className="p-3 flex flex-col gap-1.5">
        {/* Status badge (only if not published) */}
        {video.status !== 'PUBLISHED' && (
          <div>
            <VideoStatusBadge status={video.status} size="sm" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug">
          {video.title}
        </h3>

        {/* Channel */}
        <div className="flex items-center gap-1 text-xs text-text-secondary">
          <span>{video.channelName}</span>
          {video.channelVerified && (
            <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-info" aria-label="Verified" />
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-text-secondary flex-wrap">
          {video.viewCount !== undefined && (
            <span>{formatCount(video.viewCount)} views</span>
          )}
          {video.publishedAt && (
            <span>{timeAgo(video.publishedAt)}</span>
          )}
        </div>
      </div>
    </>
  );

  const baseClass = cn(
    'group rounded-xl border border-border bg-surface-raised flex flex-col overflow-hidden',
    isInteractive && 'hover:shadow-md hover:border-border-focus transition-all duration-200',
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
