'use client';
import { cn } from '@/libs/utils/cn';
import { Avatar } from '@/modules/ui/Avatar';
import type { PostWithData } from '../types';

function estimateReadTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

type PostMetaProps = {
  post: PostWithData;
  showAvatar?: boolean;
  className?: string;
};

export function PostMeta({ post, showAvatar = true, className }: PostMetaProps) {
  const authorName = post.author.userProfile?.name ?? 'Anonymous';
  const profilePic = post.author.userProfile?.profilePicture ?? null;
  const readMin = estimateReadTime(post.content);
  const displayDate = post.publishedAt ?? post.createdAt;
  const dateStr = displayDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={cn('flex items-center gap-2.5 text-sm text-text-secondary flex-wrap', className)}>
      {showAvatar && (
        <Avatar src={profilePic} name={authorName} size="sm" />
      )}
      <span className="font-medium text-text-primary">{authorName}</span>
      <span aria-hidden="true" className="text-border-strong">·</span>
      <time dateTime={displayDate.toISOString()}>{dateStr}</time>
      <span aria-hidden="true" className="text-border-strong">·</span>
      <span>{readMin} min read</span>
      {post.views > 0 && (
        <>
          <span aria-hidden="true" className="text-border-strong">·</span>
          <span>{post.views.toLocaleString('en-US')} views</span>
        </>
      )}
    </div>
  );
}
