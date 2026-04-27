'use client';
import { cn } from '@/libs/utils/cn';
import { CategoryBadge } from '../category/CategoryBadge';
import { PostStatusBadge } from './PostStatusBadge';
import { PostMeta } from './PostMeta';
import type { PostWithData } from '../types';

type PostCardProps = {
  post: PostWithData;
  showStatus?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function PostCard({ post, showStatus = false, href, onClick, className }: PostCardProps) {
  const isInteractive = !!(href || onClick);

  const body = (
    <>
      {post.image && (
        <div className="aspect-video overflow-hidden bg-surface-sunken">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryBadge category={post.category} size="sm" />
          {showStatus && <PostStatusBadge status={post.status} size="sm" />}
        </div>
        <h3 className="text-base font-semibold text-text-primary line-clamp-2 leading-snug">
          {post.title}
        </h3>
        {post.description && (
          <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        )}
        <div className="mt-auto pt-3 border-t border-border">
          <PostMeta post={post} showAvatar />
        </div>
      </div>
    </>
  );

  const baseClass = cn(
    'group flex flex-col rounded-xl border border-border overflow-hidden bg-surface-raised',
    isInteractive && 'hover:shadow-md hover:border-border-focus transition-all duration-200',
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {body}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(baseClass, 'text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}>
        {body}
      </button>
    );
  }

  return <div className={baseClass}>{body}</div>;
}
