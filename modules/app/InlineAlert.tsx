'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faCircleInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

type InlineAlertVariant = 'success' | 'error' | 'warning' | 'info';

type InlineAlertProps = {
  variant?: InlineAlertVariant;
  message: React.ReactNode;
  className?: string;
};

const variantClasses: Record<InlineAlertVariant, string> = {
  success: 'bg-success-subtle border-success text-success-fg',
  error:   'bg-error-subtle border-error text-error',
  warning: 'bg-warning-subtle border-warning text-text-primary',
  info:    'bg-info-subtle border-info text-text-primary',
};

const variantIcons = {
  success: faCheck,
  error:   faXmark,
  warning: faTriangleExclamation,
  info:    faCircleInfo,
};

export function InlineAlert({ variant = 'success', message, className }: InlineAlertProps) {
  return (
    <div
      className={cn(
        'rounded-lg border px-4 py-2.5 text-sm font-medium flex items-center gap-1.5',
        variantClasses[variant],
        className,
      )}
    >
      <FontAwesomeIcon icon={variantIcons[variant]} className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
