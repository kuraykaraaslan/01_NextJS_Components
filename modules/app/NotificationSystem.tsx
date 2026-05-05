'use client';
import { ToastProvider, toast, type ToastPosition } from '@/modules/ui/Toast';

// ─── Re-export toast helper so callers can import from here ───────────────────

export { toast };

// ─── Imperative helpers (named variants) ──────────────────────────────────────

export const notify = {
  success: (message: string, opts?: Parameters<typeof toast.success>[1]) =>
    toast.success(message, opts),
  error: (message: string, opts?: Parameters<typeof toast.error>[1]) =>
    toast.error(message, opts),
  warning: (message: string, opts?: Parameters<typeof toast.warning>[1]) =>
    toast.warning(message, opts),
  info: (message: string, opts?: Parameters<typeof toast.info>[1]) =>
    toast.info(message, opts),
  loading: (message: string, opts?: Parameters<typeof toast.loading>[1]) =>
    toast.loading(message, opts),
  dismiss: (id: string) => toast.dismiss(id),
} as const;

// ─── Provider ─────────────────────────────────────────────────────────────────

export function NotificationProvider({
  children,
  position = 'top-right',
}: {
  children: React.ReactNode;
  position?: ToastPosition;
}) {
  return (
    <>
      {children}
      <ToastProvider position={position} />
    </>
  );
}
