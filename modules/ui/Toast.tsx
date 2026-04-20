'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useState } from 'react';

type ToastVariant = 'success' | 'warning' | 'error' | 'info';

const variantMap: Record<ToastVariant, { container: string; icon: string }> = {
  success: { container: 'bg-success-subtle border-success text-success-fg', icon: '✓' },
  warning: { container: 'bg-warning-subtle border-warning text-warning-fg', icon: '⚠' },
  error:   { container: 'bg-error-subtle border-error text-error-fg',       icon: '✕' },
  info:    { container: 'bg-info-subtle border-info text-info-fg',          icon: 'ℹ' },
};

export function Toast({
  variant = 'info',
  message,
  duration,
  onDismiss,
  className,
}: {
  variant?: ToastVariant;
  message: string;
  duration?: number;
  onDismiss?: () => void;
  className?: string;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (variant === 'error') return;
    const ms = duration ?? 5000;
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, ms);
    return () => clearTimeout(t);
  }, [variant, duration, onDismiss]);

  if (!visible) return null;

  const { container, icon } = variantMap[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : undefined}
      aria-live={variant === 'error' ? undefined : 'polite'}
      className={cn(
        'max-w-sm w-full rounded-lg border p-4 shadow-lg flex items-start gap-3 pointer-events-auto',
        container,
        className
      )}
    >
      <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold">{icon}</span>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => { setVisible(false); onDismiss?.(); }}
        className="shrink-0 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
      >
        ✕
      </button>
    </div>
  );
}

export function ToastRegion({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className={cn('fixed top-4 right-4 z-50 space-y-2 pointer-events-none', className)}
    >
      {children}
    </div>
  );
}
