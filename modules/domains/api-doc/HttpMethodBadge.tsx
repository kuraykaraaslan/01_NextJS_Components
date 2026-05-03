'use client';
import { cn } from '@/libs/utils/cn';
import type { HttpMethod } from './types';

const methodStyles: Record<HttpMethod, string> = {
  GET:     'bg-success-subtle text-success-fg border-success/30',
  POST:    'bg-primary-subtle text-primary border-primary/30',
  PUT:     'bg-warning-subtle text-warning-fg border-warning/30',
  PATCH:   'bg-warning-subtle text-warning-fg border-warning/30',
  DELETE:  'bg-error-subtle text-error-fg border-error/30',
  HEAD:    'bg-surface-sunken text-text-secondary border-border',
  OPTIONS: 'bg-surface-sunken text-text-secondary border-border',
  TRACE:   'bg-surface-sunken text-text-secondary border-border',
};

type Size = 'sm' | 'md' | 'lg';

const sizeStyles: Record<Size, string> = {
  sm: 'text-[10px] px-1.5 py-0 min-w-[38px]',
  md: 'text-xs px-2 py-0.5 min-w-[48px]',
  lg: 'text-sm px-3 py-1 min-w-[60px]',
};

type Props = {
  method: HttpMethod;
  size?: Size;
  className?: string;
};

export function HttpMethodBadge({ method, size = 'md', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded font-mono font-bold border uppercase tracking-wide shrink-0',
        methodStyles[method],
        sizeStyles[size],
        className,
      )}
    >
      {method}
    </span>
  );
}
