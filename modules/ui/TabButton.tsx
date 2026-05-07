'use client';
import { cn } from '@/libs/utils/cn';

type TabButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
  className?: string;
};

export function TabButton({ active, onClick, children, count, className }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        active
          ? 'bg-primary text-primary-fg shadow-sm'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay',
        className,
      )}
    >
      {children}
      {count !== undefined && (
        <span
          className={cn(
            'text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none',
            active ? 'bg-primary-fg/20 text-primary-fg' : 'bg-surface-sunken text-text-disabled',
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
