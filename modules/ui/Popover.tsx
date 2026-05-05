'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef, useState } from 'react';

type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

const placementClasses: Record<PopoverPlacement, string> = {
  bottom: 'top-full left-0 mt-2',
  top:    'bottom-full left-0 mb-2',
  left:   'right-full top-0 mr-2',
  right:  'left-full top-0 ml-2',
};

export function Popover({
  trigger,
  children,
  placement = 'bottom',
  className,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: PopoverPlacement;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
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
  }, []);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          tabIndex={-1}
          className={cn(
            'absolute z-[70] min-w-[12rem] rounded-lg border border-border bg-surface-raised shadow-xl',
            'focus-visible:outline-none',
            placementClasses[placement],
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
