'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useFocusTrap } from '@/libs/hooks/useFocusTrap';

export function Drawer({
  open,
  onClose,
  title,
  side = 'right',
  children,
  footer,
  className,
  ref,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: 'left' | 'right';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, { active: open, onEscape: onClose });

  return (
    <div
      className={cn('fixed inset-0 z-[100] flex', !open && 'pointer-events-none')}
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      <div
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={(node) => {
          // Support both internal ref and forwarded ref (React 19 ref prop)
          (panelRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        tabIndex={-1}
        className={cn(
          'relative z-[101] flex flex-col w-80 max-w-full h-full bg-surface-raised border-border shadow-xl',
          'transition-transform duration-200 focus-visible:outline-none',
          side === 'right' ? 'ml-auto border-l' : 'mr-auto border-r',
          open
            ? 'translate-x-0'
            : side === 'right'
              ? 'translate-x-full'
              : '-translate-x-full',
          className
        )}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-border shrink-0">
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="text-text-disabled hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
          >
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">{children}</div>
        {footer && (
          <div className="px-4 py-4 border-t border-border shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
