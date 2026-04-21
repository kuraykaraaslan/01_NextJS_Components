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

export type ToastAction = { label: string; onClick: () => void };

export function Toast({
  variant = 'info',
  message,
  duration,
  onDismiss,
  action,
  className,
}: {
  variant?: ToastVariant;
  message: string;
  duration?: number;
  onDismiss?: () => void;
  action?: ToastAction;
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

  function dismiss() {
    setVisible(false);
    onDismiss?.();
  }

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
      {action && (
        <button
          type="button"
          onClick={() => { action.onClick(); dismiss(); }}
          className="shrink-0 text-xs font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
        >
          {action.label}
        </button>
      )}
      <button
        type="button"
        aria-label="Dismiss"
        onClick={dismiss}
        className="shrink-0 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
      >
        ✕
      </button>
    </div>
  );
}

type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

const positionMap: Record<ToastPosition, string> = {
  'top-right':     'top-4 right-4',
  'top-left':      'top-4 left-4',
  'top-center':    'top-4 left-1/2 -translate-x-1/2',
  'bottom-right':  'bottom-4 right-4',
  'bottom-left':   'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export function ToastRegion({
  children,
  position = 'top-right',
  className,
}: {
  children?: React.ReactNode;
  position?: ToastPosition;
  className?: string;
}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className={cn(
        'fixed z-50 space-y-2 pointer-events-none',
        positionMap[position],
        className
      )}
    >
      {children}
    </div>
  );
}
