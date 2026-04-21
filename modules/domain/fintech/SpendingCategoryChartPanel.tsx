'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Card } from '@/modules/ui/Card';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { Badge } from '@/modules/ui/Badge';
import { DateRangePicker, type DateRange } from '@/modules/ui/DateRangePicker';

export type SpendingCategory = {
  name: string;
  amount: number;
  color: string;
  icon?: string;
};

export type SpendingPeriod = {
  id: string;
  label: string;
  categories: SpendingCategory[];
};

export function SpendingCategoryChartPanel({
  periods,
  currency = 'USD',
  className,
}: {
  periods: SpendingPeriod[];
  currency?: string;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(periods[0]?.id ?? '');
  const [customRange, setCustomRange] = useState<DateRange>({ start: null, end: null });

  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format;

  const current = periods.find((p) => p.id === activeTab) ?? periods[0];
  const total = current?.categories.reduce((s, c) => s + c.amount, 0) ?? 0;

  const tabs: ButtonGroupItem[] = [
    ...periods.map((p) => ({ value: p.id, label: p.label })),
    { value: 'custom', label: 'Custom' },
  ];

  return (
    <Card className={className}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Spending by category</h3>
            <p className="text-2xl font-bold text-text-primary mt-1 tabular-nums">{fmt(total)}</p>
          </div>
          <Badge variant="info" size="sm">{current?.label ?? 'Custom'}</Badge>
        </div>

        <ButtonGroup items={tabs} value={activeTab} onChange={setActiveTab} variant="outline" size="sm" />

        {activeTab === 'custom' && (
          <DateRangePicker
            id="spending-range"
            label="Date range"
            value={customRange}
            onChange={setCustomRange}
          />
        )}

        {current && (
          <div className="space-y-2 pt-1">
            {current.categories.map((cat) => {
              const pct = total > 0 ? (cat.amount / total) * 100 : 0;
              return (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5">
                      {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
                      <span className="text-text-primary">{cat.name}</span>
                    </span>
                    <span className="font-medium text-text-primary tabular-nums">{fmt(cat.amount)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-sunken overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: cat.color }}
                    />
                  </div>
                  <p className="text-xs text-text-disabled text-right">{pct.toFixed(1)}%</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
