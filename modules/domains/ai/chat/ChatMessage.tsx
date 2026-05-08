'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons';
import type { AIChatMessage } from '../types';

type ChatMessageProps = {
  message: AIChatMessage;
  className?: string;
};

export function ChatMessage({ message, className }: ChatMessageProps) {
  const isUser = message.role === 'USER';
  const isAssistant = message.role === 'ASSISTANT';

  return (
    <div
      className={cn(
        'flex gap-3 w-full',
        isUser && 'flex-row-reverse',
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isUser ? 'bg-primary text-primary-fg' : 'bg-surface-sunken text-text-secondary'
        )}
        aria-hidden="true"
      >
        <FontAwesomeIcon
          icon={isUser ? faUser : faRobot}
          className="w-3.5 h-3.5"
        />
      </div>

      {/* Bubble */}
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-primary-fg rounded-tr-sm'
            : 'bg-surface-raised text-text-primary border border-border rounded-tl-sm'
        )}
      >
        {message.content}
        {message.tokens != null && (
          <p
            className={cn(
              'mt-1 text-[10px]',
              isUser ? 'text-primary-fg/60 text-right' : 'text-text-secondary'
            )}
          >
            {message.tokens} tokens
          </p>
        )}
      </div>
    </div>
  );
}
