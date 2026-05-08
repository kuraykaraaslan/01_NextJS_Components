'use client';
import { cn } from '@/libs/utils/cn';
import type { Stat } from '../types';

type StatsBarProps = {
  stats: Stat[];
  variant?: 'band' | 'cards';
  className?: string;
};

export function StatsBar({ stats, variant = 'band', className }: StatsBarProps) {
  if (variant === 'cards') {
    return (
      <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-4', className)}>
        {stats.map((stat) => (
          <div
            key={stat.statId}
            className="rounded-2xl border border-border bg-surface-raised p-5 text-center"
          >
            <p className="text-3xl font-extrabold text-primary tracking-tight">{stat.value}</p>
            <p className="mt-1 text-sm font-medium text-text-primary">{stat.label}</p>
            {stat.description && (
              <p className="mt-0.5 text-xs text-text-secondary">{stat.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'border-y border-border bg-surface-raised py-10',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-6">
        <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 divide-x divide-border">
          {stats.map((stat) => (
            <div key={stat.statId} className="px-6 first:pl-0 text-center sm:text-left">
              <dt className="text-sm text-text-secondary">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-extrabold text-primary tracking-tight">{stat.value}</dd>
              {stat.description && (
                <dd className="mt-0.5 text-xs text-text-secondary">{stat.description}</dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
