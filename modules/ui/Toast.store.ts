import { create } from 'zustand';
import type { ReactNode } from 'react';

export type ToastVariant = 'success' | 'warning' | 'error' | 'info' | 'loading';

export type ToastItemAction = {
  label: string;
  /** Receives a `dismiss` callback so actions can optionally close the toast. */
  onClick: (dismiss: () => void) => void;
  variant?: 'default' | 'danger';
};

export type ToastItem = {
  id: string;
  variant: ToastVariant;
  message: string;
  title?: string;
  icon?: ReactNode;
  /** ms — undefined = variant default; 0 = persistent */
  duration?: number;
  actions?: ToastItemAction[];
  /** Show the × close button (default: true) */
  closeButton?: boolean;
};

const VARIANT_DURATION: Record<ToastVariant, number | null> = {
  success: 5000,
  info:    5000,
  warning: 5000,
  error:   null,   // persistent
  loading: null,   // persistent — resolves via toast.promise / toast.update
};

export function getEffectiveDuration(item: Pick<ToastItem, 'variant' | 'duration'>): number | null {
  if (item.duration === 0) return null;
  if (item.duration !== undefined) return item.duration;
  return VARIANT_DURATION[item.variant];
}

type ToastStore = {
  toasts: ToastItem[];
  add:    (item: Omit<ToastItem, 'id'>) => string;
  update: (id: string, patch: Partial<Omit<ToastItem, 'id'>>) => void;
  remove: (id: string) => void;
  clear:  () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (item) => {
    const id = crypto.randomUUID();
    set((s) => ({ toasts: [...s.toasts, { closeButton: true, ...item, id }] }));
    return id;
  },
  update: (id, patch) =>
    set((s) => ({ toasts: s.toasts.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
  remove: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  clear: () => set({ toasts: [] }),
}));

type ToastOpts = Partial<Omit<ToastItem, 'id' | 'variant' | 'message'>>;

export const toast = {
  success: (message: string, opts?: ToastOpts) =>
    useToastStore.getState().add({ variant: 'success', message, ...opts }),
  warning: (message: string, opts?: ToastOpts) =>
    useToastStore.getState().add({ variant: 'warning', message, ...opts }),
  error: (message: string, opts?: ToastOpts) =>
    useToastStore.getState().add({ variant: 'error', message, ...opts }),
  info: (message: string, opts?: ToastOpts) =>
    useToastStore.getState().add({ variant: 'info', message, ...opts }),
  loading: (message: string, opts?: ToastOpts) =>
    useToastStore.getState().add({ variant: 'loading', message, ...opts }),

  update: (id: string, patch: Partial<Omit<ToastItem, 'id'>>) =>
    useToastStore.getState().update(id, patch),

  dismiss: (id: string) =>
    useToastStore.getState().remove(id),

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error:   string | ((err: unknown) => string);
    },
    opts?: ToastOpts,
  ): string => {
    const id = useToastStore.getState().add({ variant: 'loading', message: messages.loading, ...opts });
    promise
      .then((data) => useToastStore.getState().update(id, {
        variant: 'success',
        message: typeof messages.success === 'function' ? messages.success(data) : messages.success,
      }))
      .catch((err) => useToastStore.getState().update(id, {
        variant: 'error',
        message: typeof messages.error === 'function' ? messages.error(err) : messages.error,
      }));
    return id;
  },
};
