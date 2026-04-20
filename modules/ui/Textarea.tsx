'use client';
import { cn } from '@/libs/utils/cn';

export function Textarea({
  id,
  label,
  hint,
  error,
  disabled,
  required,
  rows = 4,
  className,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'rows'>) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('space-y-1', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
        {required && (
          <>
            <span className="text-error ml-1" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
      <textarea
        id={id}
        rows={rows}
        disabled={disabled}
        required={required}
        aria-describedby={describedBy}
        aria-invalid={!!error}
        data-testid={`textarea-${id}`}
        className={cn(
          'block w-full rounded-md border px-3 py-2 text-sm transition-colors resize-y',
          'text-text-primary placeholder:text-text-disabled',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:border-border-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-sunken',
          error ? 'border-error ring-1 ring-error bg-error-subtle' : 'border-border bg-surface-base'
        )}
        {...props}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-text-secondary">{hint}</p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-error" role="alert">{error}</p>
      )}
    </div>
  );
}
