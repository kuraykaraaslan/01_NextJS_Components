'use client';
import { cn } from '@/libs/utils/cn';
import React, { useEffect, useRef, useState } from 'react';

export type DropdownItem =
  | { type?: 'item'; label: string; icon?: React.ReactNode; onClick?: () => void; danger?: boolean; disabled?: boolean }
  | { type: 'separator' };

export function DropdownMenu({
  trigger,
  items,
  header,
  align = 'left',
  className,
}: {
  trigger: React.ReactNode;
  items: DropdownItem[];
  header?: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      <div
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </div>
      {open && (
        <div
          role="menu"
          className={cn(
            'absolute z-50 mt-1 min-w-[10rem] rounded-lg border border-border bg-surface-raised shadow-lg py-1',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {header && (
            <div className="border-b border-border mb-1">
              {header}
            </div>
          )}
          {items.map((item, i) => {
            if (item.type === 'separator') {
              return <div key={i} role="separator" className="my-1 border-t border-border" />;
            }
            return (
              <button
                key={i}
                role="menuitem"
                type="button"
                disabled={item.disabled}
                onClick={() => { item.onClick?.(); setOpen(false); }}
                className={cn(
                  'flex w-full items-center gap-2 px-3 py-2 text-sm text-left transition-colors',
                  'focus-visible:outline-none focus-visible:bg-surface-overlay',
                  item.danger
                    ? 'text-error hover:bg-error-subtle'
                    : 'text-text-primary hover:bg-surface-overlay',
                  item.disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {item.icon && <span aria-hidden="true">{item.icon}</span>}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
