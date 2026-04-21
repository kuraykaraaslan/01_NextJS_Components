import { cn } from '@/libs/utils/cn';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';
import { ContentScoreBar, type ScoreRule } from '@/modules/ui/ContentScoreBar';

const HEALTH_RULES: ScoreRule[] = [
  { label: 'Positive balance',    check: (v) => parseFloat(v) > 0,      points: 40 },
  { label: 'Above safety buffer', check: (v) => parseFloat(v) > 1000,   points: 30 },
  { label: 'Above target',        check: (v) => parseFloat(v) > 10000,  points: 30 },
];

export type AccountBalanceCardProps = {
  accountName: string;
  accountNumber: string;
  balance: number;
  currency?: string;
  change?: number;
  changeLabel?: string;
  type?: 'checking' | 'savings' | 'credit' | 'investment';
  className?: string;
};

const typeConfig: Record<string, { icon: string; variant: 'primary' | 'success' | 'warning' | 'info' }> = {
  checking:   { icon: '🏦', variant: 'primary' },
  savings:    { icon: '💰', variant: 'success' },
  credit:     { icon: '💳', variant: 'warning' },
  investment: { icon: '📈', variant: 'info' },
};

export function AccountBalanceCard({
  accountName,
  accountNumber,
  balance,
  currency = 'USD',
  change,
  changeLabel = '30d change',
  type = 'checking',
  className,
}: AccountBalanceCardProps) {
  const cfg = typeConfig[type];
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format;
  const masked = `•••• ${accountNumber.slice(-4)}`;

  return (
    <Card className={className}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="text-2xl">{cfg.icon}</span>
            <div>
              <p className="text-sm font-semibold text-text-primary">{accountName}</p>
              <p className="text-xs text-text-disabled font-mono">{masked}</p>
            </div>
          </div>
          <Badge variant={cfg.variant} size="sm">{type}</Badge>
        </div>

        <div>
          <p className="text-xs text-text-secondary mb-0.5">Available balance</p>
          <p className="text-3xl font-bold text-text-primary tabular-nums">{fmt(balance)}</p>
          {change != null && (
            <Tooltip content={changeLabel}>
              <span className={cn('inline-flex items-center gap-1 text-xs mt-1 cursor-default',
                change >= 0 ? 'text-success-fg' : 'text-error-fg'
              )}>
                {change >= 0 ? '▲' : '▼'} {fmt(Math.abs(change))}
              </span>
            </Tooltip>
          )}
        </div>

        <ContentScoreBar
          value={String(balance)}
          rules={HEALTH_RULES}
          label="Account health"
        />
      </div>
    </Card>
  );
}
