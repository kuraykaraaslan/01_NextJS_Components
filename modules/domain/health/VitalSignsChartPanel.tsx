import { cn } from '@/libs/utils/cn';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { ContentScoreBar, type ScoreRule } from '@/modules/ui/ContentScoreBar';
import { Table } from '@/modules/ui/Table';

export type VitalReading = {
  time: string;
  hr: number;
  bp: string;
  spo2: number;
  temp: number;
  rr: number;
};

const HR_RULES: ScoreRule[] = [
  { label: 'In normal range (60–100)', check: (v) => { const n = parseInt(v); return n >= 60 && n <= 100; }, points: 100 },
];

const SPO2_RULES: ScoreRule[] = [
  { label: 'Above 94%', check: (v) => parseInt(v) >= 94, points: 100 },
];

const TEMP_RULES: ScoreRule[] = [
  { label: 'Normal (36.1–37.2 °C)', check: (v) => { const n = parseFloat(v); return n >= 36.1 && n <= 37.2; }, points: 100 },
];

export function VitalSignsChartPanel({
  readings,
  className,
}: {
  readings: VitalReading[];
  className?: string;
}) {
  const latest = readings.at(-1);

  const columns = [
    { key: 'time' as const, header: 'Time', render: (r: VitalReading) => <span className="font-mono text-xs">{r.time}</span> },
    { key: 'hr'   as const, header: 'HR (bpm)', render: (r: VitalReading) => (
      <span className={cn('font-mono text-sm', r.hr < 60 || r.hr > 100 ? 'text-error-fg font-bold' : 'text-text-primary')}>{r.hr}</span>
    )},
    { key: 'bp'   as const, header: 'BP (mmHg)' },
    { key: 'spo2' as const, header: 'SpO₂ (%)', render: (r: VitalReading) => (
      <span className={cn('font-mono text-sm', r.spo2 < 94 ? 'text-error-fg font-bold' : 'text-text-primary')}>{r.spo2}</span>
    )},
    { key: 'temp' as const, header: 'Temp (°C)' },
    { key: 'rr'   as const, header: 'RR (/min)' },
  ];

  return (
    <div className={cn('space-y-4', className)}>
      {latest && (
        <div className="grid grid-cols-3 gap-3">
          <Card variant="flat">
            <div className="p-3 space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-xs text-text-secondary">Heart rate</p>
                <Badge variant={latest.hr < 60 || latest.hr > 100 ? 'error' : 'success'} size="sm">
                  {latest.hr < 60 || latest.hr > 100 ? 'Abnormal' : 'Normal'}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-text-primary tabular-nums">{latest.hr} <span className="text-sm font-normal text-text-disabled">bpm</span></p>
              <ContentScoreBar value={String(latest.hr)} rules={HR_RULES} />
            </div>
          </Card>
          <Card variant="flat">
            <div className="p-3 space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-xs text-text-secondary">SpO₂</p>
                <Badge variant={latest.spo2 < 94 ? 'error' : 'success'} size="sm">
                  {latest.spo2 < 94 ? 'Low' : 'Normal'}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-text-primary tabular-nums">{latest.spo2}<span className="text-sm font-normal text-text-disabled">%</span></p>
              <ContentScoreBar value={String(latest.spo2)} rules={SPO2_RULES} />
            </div>
          </Card>
          <Card variant="flat">
            <div className="p-3 space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-xs text-text-secondary">Temperature</p>
                <Badge variant={latest.temp > 37.2 ? 'error' : 'success'} size="sm">
                  {latest.temp > 37.2 ? 'Fever' : 'Normal'}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-text-primary tabular-nums">{latest.temp}<span className="text-sm font-normal text-text-disabled">°C</span></p>
              <ContentScoreBar value={String(latest.temp)} rules={TEMP_RULES} />
            </div>
          </Card>
        </div>
      )}

      <Table columns={columns} rows={readings} caption="Vital signs history" />
    </div>
  );
}
