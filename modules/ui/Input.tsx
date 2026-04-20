'use client';
import { cn } from '@/libs/utils/cn';

type InputProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  id,
  label,
  hint,
  error,
  required,
  className,
  ...props
}: InputProps) {
  const describedBy = [
    hint && !error ? `${id}-hint` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
        {required && (
          <>
            <span className="text-error ml-1" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        className={cn(
          'block w-full rounded-md border px-3 py-2 text-sm transition-colors',
          'text-text-primary placeholder:text-text-disabled',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-sunken',
          error
            ? 'border-error ring-1 ring-error bg-error-subtle'
            : 'border-border bg-surface-base',
          className
        )}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-text-secondary">{hint}</p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-error" role="alert">{error}</p>
      )}
    </div>
  );
}
