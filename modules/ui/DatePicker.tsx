'use client';
import { cn } from '@/libs/utils/cn';

export function DatePicker({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  disabled,
  required,
  min,
  max,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  required?: boolean;
  min?: string;
  max?: string;
  className?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const formatted =
    value && !isNaN(value.getTime()) ? value.toISOString().split('T')[0] : '';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) { onChange(null); return; }
    const d = new Date(e.target.value);
    onChange(isNaN(d.getTime()) ? null : d);
  }

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
      <input
        id={id}
        type="date"
        value={formatted}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        aria-describedby={describedBy}
        aria-invalid={!!error}
        data-testid={`datepicker-${id}`}
        className={cn(
          'block w-full rounded-md border px-3 py-2 text-sm transition-colors',
          'text-text-primary bg-surface-base',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:border-border-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-sunken',
          error ? 'border-error ring-1 ring-error bg-error-subtle' : 'border-border'
        )}
      />
      {hint && !error && <p id={hintId} className="text-xs text-text-secondary">{hint}</p>}
      {error && <p id={errorId} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}
