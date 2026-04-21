'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef } from 'react';

export function Checkbox({
  id,
  label,
  hint,
  error,
  disabled,
  indeterminate,
  className,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'>) {
  const ref = useRef<HTMLInputElement>(null);
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        disabled={disabled}
        aria-describedby={describedBy}
        aria-invalid={!!error}
        aria-checked={indeterminate ? 'mixed' : undefined}
        data-testid={`checkbox-${id}`}
        className={cn(
          'mt-0.5 h-4 w-4 rounded border-border text-primary',
          'focus-visible:ring-2 focus-visible:ring-border-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-error'
        )}
        {...props}
      />
      <div>
        <label htmlFor={id} className={cn('text-sm font-medium', disabled ? 'text-text-disabled' : 'text-text-primary')}>
          {label}
        </label>
        {hint && !error && (
          <p id={hintId} className="text-xs text-text-secondary mt-0.5">{hint}</p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-error mt-0.5" role="alert">{error}</p>
        )}
      </div>
    </div>
  );
}
