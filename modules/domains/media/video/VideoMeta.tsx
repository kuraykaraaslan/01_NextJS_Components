'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp, faClock } from '@fortawesome/free-solid-svg-icons';

type VideoMetaProps = {
  video: {
    viewCount: number;
    likeCount?: number;
    publishedAt?: Date | string | null;
    duration?: number;
  };
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

export function VideoMeta({ video, className }: VideoMetaProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary', className)}>
      <span className="flex items-center gap-1">
        <FontAwesomeIcon icon={faEye} className="w-3.5 h-3.5" aria-hidden="true" />
        {formatCount(video.viewCount)} views
      </span>

      {video.likeCount !== undefined && video.likeCount > 0 && (
        <span className="flex items-center gap-1">
          <FontAwesomeIcon icon={faThumbsUp} className="w-3.5 h-3.5" aria-hidden="true" />
          {formatCount(video.likeCount)}
        </span>
      )}

      {video.duration !== undefined && video.duration > 0 && (
        <span className="flex items-center gap-1">
          <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" aria-hidden="true" />
          {formatDuration(video.duration)}
        </span>
      )}

      {video.publishedAt && (
        <span>{timeAgo(video.publishedAt)}</span>
      )}
    </div>
  );
}
