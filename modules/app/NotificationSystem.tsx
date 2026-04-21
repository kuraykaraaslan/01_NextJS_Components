'use client';
import { createContext, useCallback, useContext, useId, useState } from 'react';
import { Toast, ToastRegion, type ToastAction } from '@/modules/ui/Toast';

type NotifVariant = 'success' | 'error' | 'warning' | 'info';
type NotifPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

type Notification = {
  id: string;
  variant: NotifVariant;
  message: string;
  duration?: number;
  action?: ToastAction;
};

type NotifyFn = (message: string, opts?: { duration?: number; action?: ToastAction }) => void;

type NotificationCtx = {
  success: NotifyFn;
  error:   NotifyFn;
  warning: NotifyFn;
  info:    NotifyFn;
  dismiss: (id: string) => void;
};

const Ctx = createContext<NotificationCtx | null>(null);

export function NotificationProvider({
  children,
  position = 'top-right',
  maxStack = 5,
}: {
  children: React.ReactNode;
  position?: NotifPosition;
  maxStack?: number;
}) {
  const [queue, setQueue] = useState<Notification[]>([]);

  const add = useCallback((variant: NotifVariant, message: string, opts?: { duration?: number; action?: ToastAction }) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setQueue((q) => [{ id, variant, message, ...opts }, ...q].slice(0, maxStack));
  }, [maxStack]);

  const dismiss = useCallback((id: string) => {
    setQueue((q) => q.filter((n) => n.id !== id));
  }, []);

  const ctx: NotificationCtx = {
    success: (m, o) => add('success', m, o),
    error:   (m, o) => add('error',   m, o),
    warning: (m, o) => add('warning', m, o),
    info:    (m, o) => add('info',    m, o),
    dismiss,
  };

  return (
    <Ctx.Provider value={ctx}>
      {children}
      <ToastRegion position={position}>
        {queue.map((n) => (
          <Toast
            key={n.id}
            variant={n.variant}
            message={n.message}
            duration={n.duration}
            action={n.action}
            onDismiss={() => dismiss(n.id)}
          />
        ))}
      </ToastRegion>
    </Ctx.Provider>
  );
}

export function useNotifications(): NotificationCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useNotifications must be used inside <NotificationProvider>');
  return ctx;
}
