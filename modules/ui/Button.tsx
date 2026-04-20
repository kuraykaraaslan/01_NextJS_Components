'use client';
import { cn } from '@/libs/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-primary text-primary-fg hover:bg-primary-hover',
  secondary: 'bg-secondary text-secondary-fg hover:bg-secondary-hover',
  ghost:     'bg-transparent text-text-primary hover:bg-surface-overlay',
  danger:    'bg-error text-text-inverse hover:opacity-90',
  outline:   'border border-border text-text-primary hover:bg-surface-overlay',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
  xl: 'px-6 py-3 text-lg',
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  'data-testid'?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  'data-testid': testId,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading}
      data-testid={testId}
      className={cn(
        'inline-flex items-center gap-2 rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
