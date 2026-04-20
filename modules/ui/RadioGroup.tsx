'use client';
import { cn } from '@/libs/utils/cn';

export type RadioOption = { value: string; label: string; hint?: string };

export function RadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  disabled,
  className,
}: {
  name: string;
  legend: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <fieldset className={cn('space-y-1', className)}>
      <legend className="text-sm font-medium text-text-primary mb-2">{legend}</legend>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className={cn('flex items-start gap-2', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={disabled}
              onChange={() => onChange?.(opt.value)}
              data-testid={`radio-${name}-${opt.value}`}
              className={cn(
                'mt-0.5 h-4 w-4 border-border text-primary',
                'focus-visible:ring-2 focus-visible:ring-border-focus',
                error && 'border-error'
              )}
            />
            <div>
              <span className="text-sm text-text-primary">{opt.label}</span>
              {opt.hint && <p className="text-xs text-text-secondary">{opt.hint}</p>}
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-xs text-error mt-1" role="alert">{error}</p>
      )}
    </fieldset>
  );
}
