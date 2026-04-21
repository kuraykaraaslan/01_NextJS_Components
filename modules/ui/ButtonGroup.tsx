import { cn } from '@/libs/utils/cn';

type ButtonGroupVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonGroupSize = 'xs' | 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonGroupVariant, { base: string; active: string; inactive: string }> = {
  primary: {
    base:     'text-primary-fg',
    active:   'bg-primary',
    inactive: 'bg-primary/20 hover:bg-primary/40',
  },
  secondary: {
    base:     'text-secondary-fg',
    active:   'bg-secondary',
    inactive: 'bg-secondary/20 hover:bg-secondary/40',
  },
  outline: {
    base:     'border-y border-border text-text-primary',
    active:   'bg-surface-overlay font-semibold',
    inactive: 'bg-surface-base hover:bg-surface-overlay',
  },
  ghost: {
    base:     'text-text-primary',
    active:   'bg-surface-overlay font-semibold',
    inactive: 'hover:bg-surface-overlay',
  },
};

const sizeClasses: Record<ButtonGroupSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export type ButtonGroupItem = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

export function ButtonGroup({
  items,
  value,
  onChange,
  variant = 'outline',
  size = 'md',
  className,
}: {
  items: ButtonGroupItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  className?: string;
}) {
  const v = variantClasses[variant];

  return (
    <div
      role="group"
      className={cn(
        'inline-flex rounded-md overflow-hidden',
        variant === 'outline' && 'border border-border divide-x divide-border',
        className
      )}
    >
      {items.map((item, i) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled}
            aria-pressed={active}
            onClick={() => onChange(item.value)}
            className={cn(
              'font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              v.base,
              active ? v.active : v.inactive,
              sizeClasses[size],
              i === 0 && variant !== 'outline' && 'rounded-l-md',
              i === items.length - 1 && variant !== 'outline' && 'rounded-r-md',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
