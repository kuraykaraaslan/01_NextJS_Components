'use client';
import { cn } from '@/libs/utils/cn';
import type { AIChatMessage } from '@/modules/domains/ai/types';

type ChatMessageProps = {
  message: AIChatMessage;
  className?: string;
};

function formatTime(d?: Date | null): string {
  if (!d) return '';
  return new Date(d).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ChatMessage({ message, className }: ChatMessageProps) {
  const isUser = message.role === 'USER';
  const isSystem = message.role === 'SYSTEM';

  if (isSystem) {
    return (
      <div className={cn('flex justify-center py-2', className)}>
        <div className="rounded-full bg-surface-sunken px-4 py-1.5 text-xs text-text-secondary italic max-w-prose text-center">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row',
        className
      )}
    >
      {/* Avatar dot */}
      <div
        className={cn(
          'mt-1 shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold',
          isUser
            ? 'bg-primary text-primary-fg'
            : 'bg-secondary/20 text-secondary'
        )}
        aria-hidden="true"
      >
        {isUser ? 'U' : 'AI'}
      </div>

      {/* Bubble */}
      <div className={cn('flex flex-col gap-1 max-w-[75%]', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
            isUser
              ? 'bg-primary text-primary-fg rounded-tr-sm'
              : 'bg-surface-raised border border-border text-text-primary rounded-tl-sm'
          )}
        >
          {message.content}
        </div>
        <div className="flex items-center gap-2 px-1">
          {message.tokens != null && (
            <span className="text-[10px] text-text-disabled">
              {message.tokens} tokens
            </span>
          )}
          {message.createdAt && (
            <span className="text-[10px] text-text-disabled">
              {formatTime(message.createdAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
