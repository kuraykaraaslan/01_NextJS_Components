'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList, faTableCells } from '@fortawesome/free-solid-svg-icons';

export type ViewOrientation = 'horizontal' | 'vertical';

type ViewToggleProps = {
  value: ViewOrientation;
  onChange: (v: ViewOrientation) => void;
  labels?: { horizontal?: string; vertical?: string };
  ariaLabel?: string;
  className?: string;
};

export function ViewToggle({ value, onChange, labels, ariaLabel, className }: ViewToggleProps) {
  const hLabel = labels?.horizontal ?? 'Horizontal';
  const vLabel = labels?.vertical   ?? 'Vertical';

  return (
    <div
      className={cn('flex items-center gap-0.5 rounded-lg p-0.5 border border-border bg-surface-raised', className)}
      role="group"
      aria-label={ariaLabel ?? 'View options'}
    >
      {(['horizontal', 'vertical'] as const).map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={cn(
            'px-3 py-1.5 rounded-md text-xs font-semibold transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
            value === opt
              ? 'bg-primary text-primary-fg shadow-sm'
              : 'text-text-secondary hover:text-text-primary',
          )}
        >
          <span className="flex items-center gap-1.5">
            <FontAwesomeIcon
              icon={opt === 'horizontal' ? faTableList : faTableCells}
              className="w-3.5 h-3.5"
              aria-hidden="true"
            />
            {opt === 'horizontal' ? hLabel : vLabel}
          </span>
        </button>
      ))}
    </div>
  );
}
