'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import type { AIChatSession } from '@/modules/domains/ai/types';

type ChatSessionCardProps = {
  session: AIChatSession;
  modelName?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
};

function formatDate(d?: Date | null): string {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ChatSessionCard({
  session,
  modelName,
  href,
  onClick,
  className,
}: ChatSessionCardProps) {
  const isInteractive = !!(href || onClick);
  const title = session.title ?? 'Untitled session';

  const body = (
    <div className="flex items-center gap-3 p-4">
      <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10">
        <FontAwesomeIcon icon={faComments} className="w-4 h-4 text-secondary" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-text-primary truncate">{title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {modelName && (
            <span className="text-xs text-text-secondary truncate">{modelName}</span>
          )}
          {session.createdAt && (
            <>
              {modelName && <span className="text-text-disabled text-xs">·</span>}
              <span className="text-xs text-text-disabled">{formatDate(session.createdAt)}</span>
            </>
          )}
        </div>
      </div>

      {isInteractive && (
        <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 text-text-secondary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
      )}
    </div>
  );

  const baseClass = cn(
    'group rounded-xl border border-border bg-surface-raised overflow-hidden',
    isInteractive && 'hover:shadow-sm hover:border-border-focus transition-all duration-150',
    className
  );

  if (href) {
    return <a href={href} className={baseClass}>{body}</a>;
  }
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(baseClass, 'w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}
      >
        {body}
      </button>
    );
  }
  return <div className={baseClass}>{body}</div>;
}
