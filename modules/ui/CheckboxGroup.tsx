'use client';
import { cn } from '@/libs/utils/cn';

type CheckboxOption = { value: string; label: string };

export function CheckboxGroup({
  legend,
  options,
  selected,
  onChange,
  disabled,
  error,
  className,
}: {
  legend: string;
  options: CheckboxOption[];
  selected: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}) {
  function toggle(value: string, checked: boolean) {
    onChange(checked ? [...selected, value] : selected.filter((s) => s !== value));
  }

  return (
    <fieldset className={cn('space-y-2', className)}>
      <legend className="text-sm font-medium text-text-primary mb-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(({ value, label }) => {
          const isSelected = selected.includes(value);
          return (
            <label
              key={value}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-colors',
                'focus-within:ring-2 focus-within:ring-border-focus',
                disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer',
                isSelected
                  ? 'bg-primary-subtle border-primary text-primary'
                  : 'bg-surface-base border-border text-text-primary hover:bg-surface-overlay'
              )}
            >
              <input
                type="checkbox"
                checked={isSelected}
                disabled={disabled}
                onChange={(e) => toggle(value, e.target.checked)}
                data-testid={`checkboxgroup-${value}`}
                className="sr-only"
              />
              {isSelected && <span aria-hidden="true" className="text-xs font-bold">✓</span>}
              <span>{label}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="text-xs text-error mt-1" role="alert">{error}</p>}
    </fieldset>
  );
}
