'use client';
import { cn } from '@/libs/utils/cn';

type StatCardProps = {
  label: string;
  value: number | string;
  accent?: string;
  className?: string;
};

export function StatCard({ label, value, accent, className }: StatCardProps) {
  return (
    <div className={cn('bg-surface-raised border border-border rounded-xl px-5 py-4 flex flex-col gap-1', className)}>
      <span className={cn('text-2xl font-black tabular-nums', accent ?? 'text-text-primary')}>{value}</span>
      <span className="text-xs text-text-secondary">{label}</span>
    </div>
  );
}
