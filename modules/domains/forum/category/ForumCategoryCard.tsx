'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faFileLines, faClock } from '@fortawesome/free-solid-svg-icons';

type ForumCategoryCardProps = {
  category: {
    categoryId: string;
    title: string;
    slug: string;
    description?: string | null;
    topicCount?: number;
    postCount?: number;
    lastActivityAt?: Date | string | null;
  };
  href?: string;
  className?: string;
};

function formatRelativeTime(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function ForumCategoryCard({ category, href, className }: ForumCategoryCardProps) {
  const body = (
    <div className="p-5 flex flex-col gap-3">
      {/* Icon + title */}
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
          <FontAwesomeIcon icon={faComments} className="w-5 h-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-text-primary truncate leading-snug">
            {category.title}
          </h3>
          {category.description && (
            <p className="text-sm text-text-secondary mt-0.5 line-clamp-2 leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-text-secondary border-t border-border pt-3">
        {category.topicCount !== undefined && (
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faComments} className="w-3 h-3" aria-hidden="true" />
            <span className="font-medium text-text-primary">{category.topicCount.toLocaleString()}</span>
            {' topics'}
          </span>
        )}
        {category.postCount !== undefined && (
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faFileLines} className="w-3 h-3" aria-hidden="true" />
            <span className="font-medium text-text-primary">{category.postCount.toLocaleString()}</span>
            {' posts'}
          </span>
        )}
        {category.lastActivityAt && (
          <span className="flex items-center gap-1 ml-auto">
            <FontAwesomeIcon icon={faClock} className="w-3 h-3" aria-hidden="true" />
            {formatRelativeTime(category.lastActivityAt)}
          </span>
        )}
      </div>
    </div>
  );

  const baseClass = cn(
    'group rounded-xl border border-border bg-surface-raised flex flex-col overflow-hidden',
    href && 'hover:shadow-md hover:border-border-focus transition-all duration-200 cursor-pointer',
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
