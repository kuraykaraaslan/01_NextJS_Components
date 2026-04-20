import { cn } from '@/libs/utils/cn';

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'primary';

const variantMap: Record<BadgeVariant, string> = {
  success: 'bg-success-subtle text-success-fg',
  error:   'bg-error-subtle text-error-fg',
  warning: 'bg-warning-subtle text-warning-fg',
  info:    'bg-info-subtle text-info-fg',
  neutral: 'bg-surface-sunken text-text-secondary',
  primary: 'bg-primary-subtle text-primary',
};

export function Badge({
  children,
  variant = 'neutral',
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variantMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
