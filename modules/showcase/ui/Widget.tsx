import { cn } from '@/libs/utils/cn';

type WidgetProps = {
  title: string;
  titleBadge?: React.ReactNode;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  className?: string;
};

export function Widget({
  title,
  titleBadge,
  headerRight,
  children,
  contentClassName,
  className,
}: WidgetProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="widget-drag-handle flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-surface-overlay shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-text-disabled text-xs shrink-0 select-none leading-none" aria-hidden="true">
            ⠿
          </span>
          <h3 className="text-sm font-semibold text-text-primary truncate">{title}</h3>
          {titleBadge}
        </div>
        {headerRight && (
          <div className="flex items-center gap-2 shrink-0">{headerRight}</div>
        )}
      </div>
      <div className={cn('flex-1 min-h-0', contentClassName)}>{children}</div>
    </div>
  );
}
