'use client';
import { cn } from '@/libs/utils/cn';

export type SelectOption = { value: string; label: string };

export function Select({
  id,
  label,
  options,
  placeholder,
  hint,
  error,
  disabled,
  required,
  className,
  ...props
}: {
  id: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'>) {
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
      <select
        id={id}
        disabled={disabled}
        required={required}
        aria-describedby={describedBy}
        aria-invalid={!!error}
        data-testid={`select-${id}`}
        className={cn(
          'block w-full rounded-md border px-3 py-2 text-sm transition-colors appearance-none',
          'bg-surface-base text-text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:border-border-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-sunken',
          error ? 'border-error ring-1 ring-error bg-error-subtle' : 'border-border'
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {hint && !error && (
        <p id={hintId} className="text-xs text-text-secondary">{hint}</p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-error" role="alert">{error}</p>
      )}
    </div>
  );
}
