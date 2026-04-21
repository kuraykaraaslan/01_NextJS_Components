'use client';
import { ContentScoreBar } from '@/modules/ui/ContentScoreBar';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Badge } from '@/modules/ui/Badge';
import { Card } from '@/modules/ui/Card';

const CURRENT_LOAD = 82; // percent

const TIPS = [
  { label: 'High Impact', tip: 'Shift dishwasher/laundry to off-peak hours (10pm–6am)' },
  { label: 'Medium Impact', tip: 'Set HVAC thermostat 2°F warmer during peak hours' },
  { label: 'Medium Impact', tip: 'Turn off idle monitors and equipment' },
  { label: 'Low Impact', tip: 'Switch to LED lighting in high-usage areas' },
];

const tipVariant: Record<string, 'error' | 'warning' | 'neutral'> = {
  'High Impact': 'error',
  'Medium Impact': 'warning',
  'Low Impact': 'neutral',
};

const LOAD_RULES = [
  { label: 'Current load', check: () => true, points: CURRENT_LOAD },
  { label: 'Headroom', check: () => false, points: 100 - CURRENT_LOAD },
];

export function PeakUsageAlertPanel() {
  const isNearPeak = CURRENT_LOAD > 80;

  return (
    <Card className="max-w-lg">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">Peak Usage Monitor</h3>
          <Badge variant={isNearPeak ? 'error' : 'success'} size="sm">
            {CURRENT_LOAD}% capacity
          </Badge>
        </div>

        {isNearPeak && (
          <AlertBanner
            variant="warning"
            title="Approaching peak demand"
            message={`Current load is ${CURRENT_LOAD}% of capacity. Consider reducing non-essential usage.`}
          />
        )}

        <ContentScoreBar value="" rules={LOAD_RULES} label={`${CURRENT_LOAD}kW / 100kW peak capacity`} />

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Energy-saving tips</h4>
          {TIPS.map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <Badge variant={tipVariant[tip.label]} size="sm">{tip.label}</Badge>
              <p className="text-xs text-text-secondary flex-1">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
