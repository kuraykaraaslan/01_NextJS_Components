'use client';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { ContentScoreBar } from '@/modules/ui/ContentScoreBar';
import { Tooltip } from '@/modules/ui/Tooltip';

type EnergyKpi = {
  label: string;
  value: string;
  unit: string;
  trend: string;
  trendDir: 'up' | 'down';
  fill: number;
  capacity: string;
  tooltip: string;
};

const KPI_DATA: EnergyKpi[] = [
  { label: 'Current Usage', value: '42.3', unit: 'kWh', trend: '+8%', trendDir: 'up', fill: 65, capacity: '65kW / 100kW capacity', tooltip: 'Real-time energy draw across all connected meters.' },
  { label: 'Monthly Bill', value: '$284', unit: '/mo', trend: '-12%', trendDir: 'down', fill: 48, capacity: '$284 / $590 budget', tooltip: 'Projected bill based on current usage rate.' },
  { label: 'Carbon Offset', value: '1.2', unit: 'tCO₂', trend: '+5%', trendDir: 'up', fill: 60, capacity: '1.2 / 2.0 tCO₂ target', tooltip: 'Carbon credits offset against your total emissions.' },
  { label: 'Peak Demand', value: '67', unit: 'kW', trend: '+3%', trendDir: 'up', fill: 84, capacity: '67kW / 80kW peak limit', tooltip: 'Highest recorded power demand this month.' },
];

function makeRules(fill: number) {
  return [
    { label: 'Used', check: () => true, points: fill },
    { label: 'Remaining', check: () => false, points: 100 - fill },
  ];
}

export function ConsumptionKpiCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {KPI_DATA.map((kpi) => (
        <Card key={kpi.label}>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{kpi.label}</span>
              <Tooltip content={kpi.tooltip}>
                <span className="text-text-disabled cursor-help text-xs select-none">ℹ</span>
              </Tooltip>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-text-primary">{kpi.value}</span>
              <span className="text-xs text-text-secondary mb-0.5">{kpi.unit}</span>
            </div>
            <Badge variant={kpi.trendDir === 'down' ? 'success' : kpi.fill > 80 ? 'error' : 'neutral'} size="sm">
              {kpi.trendDir === 'up' ? '↑' : '↓'} {kpi.trend} vs last month
            </Badge>
            <ContentScoreBar value="" rules={makeRules(kpi.fill)} label={kpi.capacity} />
          </div>
        </Card>
      ))}
    </div>
  );
}
