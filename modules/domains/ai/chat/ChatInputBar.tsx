'use client';
import { useState, useRef } from 'react';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faArrowUp, faMicrophone } from '@fortawesome/free-solid-svg-icons';

type ChatInputBarProps = {
  onSend?: (message: string) => void;
  placeholder?: string;
  modelName?: string;
  disabled?: boolean;
  className?: string;
};

export function ChatInputBar({
  onSend,
  placeholder = "Umay'a mesaj yaz",
  modelName,
  disabled = false,
  className,
}: ChatInputBarProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = value.trim().length > 0 && !disabled;

  function handleSend() {
    if (!canSend) return;
    onSend?.(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex items-center gap-1 rounded-2xl border border-border bg-surface-raised px-2 py-2 focus-within:border-border-focus transition-colors">
          <Button variant="ghost" size="sm" iconOnly aria-label="Attach file" disabled={disabled}>
            <FontAwesomeIcon icon={faPaperclip} className="w-4 h-4" aria-hidden="true" />
          </Button>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={placeholder}
            rows={1}
            disabled={disabled}
            aria-label="Message input"
            className="flex-1 resize-none bg-transparent text-sm text-text-primary placeholder:text-text-disabled leading-relaxed focus:outline-none disabled:opacity-50 max-h-[200px] overflow-y-auto"
          />

          {canSend ? (
            <Button variant="primary" size="sm" iconOnly aria-label="Send message" onClick={handleSend}>
              <FontAwesomeIcon icon={faArrowUp} className="w-4 h-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" iconOnly aria-label="Voice input" disabled={disabled}>
              <FontAwesomeIcon icon={faMicrophone} className="w-4 h-4" aria-hidden="true" />
            </Button>
          )}
        </div>

        {modelName && (
          <p className="mt-2 text-center text-[11px] text-text-secondary">{modelName}</p>
        )}
      </div>
    </div>
  );
}
