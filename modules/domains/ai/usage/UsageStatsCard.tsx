'use client';
import { cn } from '@/libs/utils/cn';
import { StatCard } from '@/modules/ui/StatCard';
import type { AIUsage } from '../types';

type UsageStatsCardProps = {
  usage: AIUsage;
  className?: string;
};

export function UsageStatsCard({ usage, className }: UsageStatsCardProps) {
  const totalTokens = usage.tokensPrompt + usage.tokensCompletion;

  return (
    <div className={cn('rounded-xl border border-border bg-surface-raised p-4 flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Usage — {usage.modelId}
        </p>
        <p className="text-xs text-text-secondary">
          {usage.createdAt
            ? new Date(usage.createdAt).toLocaleDateString()
            : ''}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Prompt tokens"
          value={usage.tokensPrompt.toLocaleString()}
          accent="text-primary"
        />
        <StatCard
          label="Completion tokens"
          value={usage.tokensCompletion.toLocaleString()}
          accent="text-info-fg"
        />
        <StatCard
          label="Total tokens"
          value={totalTokens.toLocaleString()}
          accent="text-text-primary"
        />
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <p className="text-xs text-text-secondary">Estimated cost</p>
        <p className="text-sm font-bold text-text-primary">
          ${usage.cost.toFixed(6)}
        </p>
      </div>
    </div>
  );
}
