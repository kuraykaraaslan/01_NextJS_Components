'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/modules/ui/Button';

type StepShellProps = {
  number: number;
  title: string;
  active: boolean;
  done: boolean;
  onEdit?: () => void;
  summary?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function StepShell({
  number,
  title,
  active,
  done,
  onEdit,
  summary,
  children,
  className,
}: StepShellProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border transition-all bg-surface-raised overflow-hidden',
        active ? 'border-primary shadow-sm' : 'border-border',
        className,
      )}
    >
      {/* header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
            done
              ? 'bg-success text-white'
              : active
              ? 'bg-primary text-primary-fg'
              : 'bg-surface-overlay text-text-disabled',
          )}
        >
          {done
            ? <FontAwesomeIcon icon={faCheck} className="w-3 h-3" aria-hidden="true" />
            : number}
        </span>
        <h2
          className={cn(
            'flex-1 text-sm font-semibold',
            active ? 'text-text-primary' : done ? 'text-text-secondary' : 'text-text-disabled',
          )}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {done && onEdit && (
          <Button variant="ghost" size="xs" onClick={onEdit} className="text-primary shrink-0">
            Edit
          </Button>
        )}
      </div>

      {/* collapsed summary */}
      {done && summary && (
        <div className="px-5 pb-4 border-t border-border pt-3 opacity-70">
          {summary}
        </div>
      )}

      {/* active body */}
      {active && children && (
        <div className="px-5 pb-5 border-t border-border pt-4">
          {children}
        </div>
      )}
    </div>
  );
}
