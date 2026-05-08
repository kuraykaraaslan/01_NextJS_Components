'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import type { AIUsage } from '@/modules/domains/ai/types';

type UsageStatsCardProps = {
  usage: AIUsage;
  modelName?: string;
  className?: string;
};

export function UsageStatsCard({ usage, modelName, className }: UsageStatsCardProps) {
  const tokensTotal = usage.tokensPrompt + usage.tokensCompletion;

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface-raised p-5 flex flex-col gap-4',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-text-primary">Usage Record</p>
          {modelName && (
            <p className="text-xs text-text-secondary mt-0.5">{modelName}</p>
          )}
        </div>
        <div className="flex items-center gap-1 rounded-full bg-primary-subtle px-2.5 py-1">
          <FontAwesomeIcon icon={faDollarSign} className="w-3 h-3 text-primary" aria-hidden="true" />
          <span className="text-sm font-bold text-primary">${usage.cost.toFixed(6)}</span>
        </div>
      </div>

      {/* Token stats */}
      <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-info">
            <FontAwesomeIcon icon={faArrowUp} className="w-3 h-3" aria-hidden="true" />
            <span className="text-xs font-medium">Prompt</span>
          </div>
          <p className="mt-1 text-lg font-bold text-text-primary">
            {usage.tokensPrompt.toLocaleString()}
          </p>
          <p className="text-[10px] text-text-secondary">tokens</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-success">
            <FontAwesomeIcon icon={faArrowDown} className="w-3 h-3" aria-hidden="true" />
            <span className="text-xs font-medium">Completion</span>
          </div>
          <p className="mt-1 text-lg font-bold text-text-primary">
            {usage.tokensCompletion.toLocaleString()}
          </p>
          <p className="text-[10px] text-text-secondary">tokens</p>
        </div>

        <div className="text-center border-l border-border">
          <span className="text-xs font-medium text-text-secondary">Total</span>
          <p className="mt-1 text-lg font-bold text-text-primary">
            {tokensTotal.toLocaleString()}
          </p>
          <p className="text-[10px] text-text-secondary">tokens</p>
        </div>
      </div>

      {/* Bar visualisation */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-text-secondary">
          <span>Prompt vs Completion split</span>
          <span>{tokensTotal > 0 ? Math.round((usage.tokensPrompt / tokensTotal) * 100) : 0}% prompt</span>
        </div>
        <div className="h-1.5 rounded-full bg-surface-sunken overflow-hidden flex">
          <div
            className="h-full bg-info rounded-l-full"
            style={{ width: tokensTotal > 0 ? `${(usage.tokensPrompt / tokensTotal) * 100}%` : '0%' }}
          />
          <div
            className="h-full bg-success rounded-r-full"
            style={{ width: tokensTotal > 0 ? `${(usage.tokensCompletion / tokensTotal) * 100}%` : '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
