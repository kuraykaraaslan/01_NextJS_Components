'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';

type AlertVariant = 'success' | 'warning' | 'error' | 'info';

const variantMap: Record<AlertVariant, { container: string; icon: string }> = {
  success: { container: 'bg-success-subtle border-success text-success-fg', icon: '✓' },
  warning: { container: 'bg-warning-subtle border-warning text-warning-fg', icon: '⚠' },
  error:   { container: 'bg-error-subtle border-error text-error-fg',       icon: '✕' },
  info:    { container: 'bg-info-subtle border-info text-info-fg',          icon: 'ℹ' },
};

export function AlertBanner({
  variant = 'info',
  title,
  message,
  dismissible = false,
  className,
}: {
  variant?: AlertVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
  className?: string;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const { container, icon } = variantMap[variant];

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4',
        container,
        className
      )}
    >
      <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold">{icon}</span>
      <div className="flex-1 text-sm">
        {title && <p className="font-semibold">{title}</p>}
        <p className={cn(title && 'mt-0.5')}>{message}</p>
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="shrink-0 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
        >
          ✕
        </button>
      )}
    </div>
  );
}
