import { cn } from '@/libs/utils/cn';

export function Card({
  title,
  subtitle,
  headerRight,
  footer,
  children,
  variant = 'raised',
  className,
}: {
  title?: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'raised' | 'flat' | 'outline';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border overflow-hidden',
        variant === 'raised' && 'bg-surface-raised shadow-sm',
        variant === 'flat' && 'bg-surface-base',
        variant === 'outline' && 'bg-transparent',
        className
      )}
    >
      {(title || headerRight) && (
        <div className="flex items-start justify-between gap-3 px-6 py-4 border-b border-border">
          <div>
            {title && <h3 className="text-sm font-semibold text-text-primary">{title}</h3>}
            {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
          </div>
          {headerRight && <div className="shrink-0">{headerRight}</div>}
        </div>
      )}
      {children && <div className="px-6 py-4">{children}</div>}
      {footer && (
        <div className="px-6 py-3 border-t border-border bg-surface-base">
          {footer}
        </div>
      )}
    </div>
  );
}
