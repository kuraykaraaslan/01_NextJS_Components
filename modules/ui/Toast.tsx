'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { useToastStore, getEffectiveDuration, type ToastVariant, type ToastItem } from './Toast.store';

export { useToastStore, toast } from './Toast.store';
export type { ToastItem, ToastVariant, ToastItemAction } from './Toast.store';

/** @deprecated */
export type ToastAction = { label: string; onClick: () => void };

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconSuccess() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0">
      <path fillRule="evenodd" d="M16.704 5.296a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.296-7.29a1 1 0 0 1 1.408 0Z" clipRule="evenodd"/>
    </svg>
  );
}
function IconWarning() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd"/>
    </svg>
  );
}
function IconError() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd"/>
    </svg>
  );
}
function IconInfo() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd"/>
    </svg>
  );
}
function IconSpinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 animate-spin">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  );
}
function IconClose() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
    </svg>
  );
}

// ─── Variant config ────────────────────────────────────────────────────────────

type VariantConfig = { container: string; iconColor: string; progressColor: string; defaultIcon: React.ReactNode };

const variantMap: Record<ToastVariant, VariantConfig> = {
  success: {
    container:     'bg-success-subtle border-success',
    iconColor:     'text-success-fg',
    progressColor: 'bg-success',
    defaultIcon:   <IconSuccess />,
  },
  warning: {
    container:     'bg-warning-subtle border-warning',
    iconColor:     'text-warning',
    progressColor: 'bg-warning',
    defaultIcon:   <IconWarning />,
  },
  error: {
    container:     'bg-error-subtle border-error',
    iconColor:     'text-error',
    progressColor: 'bg-error',
    defaultIcon:   <IconError />,
  },
  info: {
    container:     'bg-info-subtle border-info',
    iconColor:     'text-info',
    progressColor: 'bg-info',
    defaultIcon:   <IconInfo />,
  },
  loading: {
    container:     'bg-surface-raised border-border',
    iconColor:     'text-text-secondary',
    progressColor: 'bg-primary',
    defaultIcon:   <IconSpinner />,
  },
};

// ─── ToastCard ─────────────────────────────────────────────────────────────────

const TICK_MS = 50;

function ToastCard({ item, onRemove }: { item: ToastItem; onRemove: () => void }) {
  const duration = getEffectiveDuration(item);
  const hasDuration = duration !== null;

  const [progress, setProgress] = useState(100);
  const [paused, setPaused]     = useState(false);
  const [show, setShow]         = useState(false);
  const [exiting, setExiting]   = useState(false);

  const remainingRef  = useRef(duration ?? 0);
  const lastTickRef   = useRef(0);

  // Enter animation
  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(onRemove, 250);
  }, [onRemove]);

  // Countdown tick
  useEffect(() => {
    if (!hasDuration || paused || exiting) return;
    lastTickRef.current = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - lastTickRef.current;
      lastTickRef.current = Date.now();
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      setProgress((remainingRef.current / duration!) * 100);
      if (remainingRef.current <= 0) { clearInterval(id); dismiss(); }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [hasDuration, paused, exiting, duration, dismiss]);

  // Pause when browser tab loses focus
  useEffect(() => {
    if (!hasDuration) return;
    const handler = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [hasDuration]);

  // Re-sync remaining when duration changes (e.g. loading → success)
  useEffect(() => {
    remainingRef.current = duration ?? 0;
    setProgress(100);
    setExiting(false);
  }, [duration]);

  const { container, iconColor, progressColor, defaultIcon } = variantMap[item.variant];
  const icon = item.icon ?? defaultIcon;
  const showClose = item.closeButton !== false;

  return (
    <div
      role={item.variant === 'error' ? 'alert' : 'status'}
      aria-live={item.variant === 'error' ? 'assertive' : 'polite'}
      onMouseEnter={() => hasDuration && setPaused(true)}
      onMouseLeave={() => hasDuration && setPaused(false)}
      className={cn(
        'relative w-80 rounded-xl border shadow-lg overflow-hidden pointer-events-auto',
        'transition-all duration-250 ease-out',
        show && !exiting ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95',
        container,
      )}
    >
      {/* Body */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-3">
        {/* Icon */}
        <span className={cn('mt-0.5', iconColor)} aria-hidden="true">{icon}</span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          {item.title && (
            <p className="text-sm font-semibold text-text-primary leading-snug">{item.title}</p>
          )}
          <p className={cn('text-sm text-text-secondary leading-snug', item.title && 'mt-0.5')}>
            {item.message}
          </p>

          {/* Actions */}
          {item.actions && item.actions.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5">
              {item.actions.map((action, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => action.onClick(dismiss)}
                  className={cn(
                    'text-xs font-semibold rounded transition-opacity hover:opacity-70',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                    action.variant === 'danger' ? 'text-error' : 'text-text-primary underline underline-offset-2',
                  )}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close */}
        {showClose && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={dismiss}
            className={cn(
              'shrink-0 mt-0.5 rounded text-text-secondary hover:text-text-primary transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
            )}
          >
            <IconClose />
          </button>
        )}
      </div>

      {/* Progress bar */}
      {hasDuration && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/5">
          <div
            className={cn('h-full rounded-full transition-none', progressColor)}
            style={{ width: `${progress}%`, opacity: 0.5 }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Position ──────────────────────────────────────────────────────────────────

export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

const positionMap: Record<ToastPosition, string> = {
  'top-right':     'top-4 right-4 items-end',
  'top-left':      'top-4 left-4 items-start',
  'top-center':    'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right':  'bottom-4 right-4 items-end',
  'bottom-left':   'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

// ─── ToastProvider ─────────────────────────────────────────────────────────────

export function ToastProvider({ position = 'top-right' }: { position?: ToastPosition }) {
  const { toasts, remove } = useToastStore();

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-2 pointer-events-none',
        positionMap[position],
      )}
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} item={t} onRemove={() => remove(t.id)} />
      ))}
    </div>
  );
}

// ─── Deprecated compat exports ─────────────────────────────────────────────────

/** @deprecated Use ToastProvider + toast helper instead */
export function Toast({
  variant = 'info',
  message,
  duration,
  onDismiss,
  action,
}: {
  variant?: ToastVariant;
  message: string;
  duration?: number;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
}) {
  const item: ToastItem = {
    id: '',
    variant,
    message,
    duration,
    actions: action ? [{ label: action.label, onClick: (d) => { action.onClick(); d(); } }] : undefined,
  };
  return <ToastCard item={item} onRemove={onDismiss ?? (() => {})} />;
}

/** @deprecated Use ToastProvider instead */
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
      className={cn(
        'fixed z-50 flex flex-col gap-2 pointer-events-none',
        positionMap[position],
        className,
      )}
    >
      {children}
    </div>
  );
}
