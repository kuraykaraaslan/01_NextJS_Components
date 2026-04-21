import { cn } from '@/libs/utils/cn';
import { Card } from '@/modules/ui/Card';
import { ContentScoreBar, type ScoreRule } from '@/modules/ui/ContentScoreBar';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';

const HEALTH_RULES: ScoreRule[] = [
  { label: 'Temperature normal (< 80°C)', check: (v) => parseFloat(v) < 80, points: 25 },
  { label: 'Vibration low (< 0.5 mm/s)',  check: () => true, points: 25 },
  { label: 'Uptime > 95%',               check: () => true, points: 25 },
  { label: 'No active fault codes',       check: () => true, points: 25 },
];

export type MachineHealthCardProps = {
  machineId: string;
  machineName: string;
  location?: string;
  temperature?: number;
  vibration?: number;
  uptimePct?: number;
  lastMaintenance?: string;
  nextMaintenance?: string;
  faultCodes?: string[];
  status: 'ok' | 'warning' | 'critical' | 'offline';
  className?: string;
};

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'error' | 'neutral'; icon: string }> = {
  ok:       { variant: 'success', icon: '✓' },
  warning:  { variant: 'warning', icon: '⚠' },
  critical: { variant: 'error',   icon: '✕' },
  offline:  { variant: 'neutral', icon: '○' },
};

export function MachineHealthCard({
  machineId, machineName, location,
  temperature, vibration, uptimePct,
  lastMaintenance, nextMaintenance, faultCodes = [],
  status, className,
}: MachineHealthCardProps) {
  const cfg = statusConfig[status];
  const tempStr = temperature != null ? String(temperature) : '0';

  return (
    <Card className={className}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-text-primary">{machineName}</p>
              <Badge variant={cfg.variant} size="sm">{cfg.icon} {status}</Badge>
            </div>
            <p className="text-xs text-text-disabled font-mono">ID: {machineId}</p>
            {location && <p className="text-xs text-text-secondary">{location}</p>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          {temperature != null && (
            <Tooltip content="Operating temperature">
              <div className="cursor-default rounded-lg bg-surface-sunken p-2">
                <p className={cn('text-lg font-bold tabular-nums', temperature > 80 ? 'text-error-fg' : 'text-text-primary')}>{temperature}°</p>
                <p className="text-[10px] text-text-disabled">Temp</p>
              </div>
            </Tooltip>
          )}
          {vibration != null && (
            <Tooltip content="Vibration level (mm/s)">
              <div className="cursor-default rounded-lg bg-surface-sunken p-2">
                <p className={cn('text-lg font-bold tabular-nums', vibration > 0.5 ? 'text-warning-fg' : 'text-text-primary')}>{vibration}</p>
                <p className="text-[10px] text-text-disabled">Vibr.</p>
              </div>
            </Tooltip>
          )}
          {uptimePct != null && (
            <Tooltip content="Uptime percentage this period">
              <div className="cursor-default rounded-lg bg-surface-sunken p-2">
                <p className={cn('text-lg font-bold tabular-nums', uptimePct < 95 ? 'text-warning-fg' : 'text-text-primary')}>{uptimePct}%</p>
                <p className="text-[10px] text-text-disabled">Uptime</p>
              </div>
            </Tooltip>
          )}
        </div>

        <ContentScoreBar value={tempStr} rules={HEALTH_RULES} label="Health score" />

        {faultCodes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {faultCodes.map((code) => (
              <Badge key={code} variant="error" size="sm">{code}</Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary pt-1 border-t border-border">
          {lastMaintenance && <div><span className="text-text-disabled">Last:</span> {lastMaintenance}</div>}
          {nextMaintenance && <div><span className="text-text-disabled">Next:</span> {nextMaintenance}</div>}
        </div>
      </div>
    </Card>
  );
}
