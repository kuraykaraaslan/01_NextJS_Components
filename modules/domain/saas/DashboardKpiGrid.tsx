'use client';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';
import { ContentScoreBar } from '@/modules/ui/ContentScoreBar';

export type KpiMetric = {
  label: string;
  value: string;
  trend: number;
  unit?: string;
  fill: number;
  tooltip: string;
};

const DEFAULT_METRICS: KpiMetric[] = [
  { label: 'MRR', value: '$84,200', trend: 12, unit: '/mo', fill: 72, tooltip: 'Monthly Recurring Revenue — sum of all active subscriptions billed monthly.' },
  { label: 'Churn Rate', value: '2.4%', trend: -0.3, unit: '/mo', fill: 24, tooltip: 'Percentage of customers who cancelled in the last 30 days.' },
  { label: 'DAU', value: '12,480', trend: 8, unit: '/day', fill: 62, tooltip: 'Daily Active Users — unique users who logged in today.' },
  { label: 'NPS', value: '67', trend: 5, fill: 67, tooltip: 'Net Promoter Score — measures customer loyalty on a -100 to 100 scale.' },
];

const MRR_RULES = [
  { label: 'Target reached', check: () => true, points: 72 },
  { label: 'Remaining', check: () => false, points: 28 },
];

function makeRules(fill: number) {
  return [
    { label: 'Used', check: () => true, points: fill },
    { label: 'Remaining', check: () => false, points: 100 - fill },
  ];
}

export function DashboardKpiGrid({ metrics = DEFAULT_METRICS }: { metrics?: KpiMetric[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((m) => {
        const isPositiveTrend = m.label === 'Churn Rate' ? m.trend < 0 : m.trend > 0;
        const trendLabel = m.trend > 0 ? `↑ ${m.trend}%` : `↓ ${Math.abs(m.trend)}%`;
        return (
          <Card key={m.label}>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{m.label}</span>
                <Tooltip content={m.tooltip}>
                  <span className="text-text-disabled cursor-help text-xs select-none">ℹ</span>
                </Tooltip>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-text-primary">{m.value}</span>
                {m.unit && <span className="text-xs text-text-secondary mb-0.5">{m.unit}</span>}
              </div>
              <Badge variant={isPositiveTrend ? 'success' : 'error'} size="sm">{trendLabel} vs last month</Badge>
              <ContentScoreBar value="" rules={makeRules(m.fill)} label="vs capacity" className="text-xs" />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
