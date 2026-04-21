'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Toast, ToastRegion } from '@/modules/ui/Toast';

export type ProductionLine = {
  id: string;
  name: string;
  product: string;
  status: 'running' | 'idle' | 'fault' | 'maintenance';
  efficiency: number;
  unitsPerHour: number;
  targetUph: number;
  shift: string;
  lastAlert?: string;
};

const statusConfig: Record<ProductionLine['status'], { variant: 'success' | 'neutral' | 'error' | 'warning'; label: string }> = {
  running:     { variant: 'success', label: 'Running'     },
  idle:        { variant: 'neutral', label: 'Idle'        },
  fault:       { variant: 'error',   label: 'Fault'       },
  maintenance: { variant: 'warning', label: 'Maintenance' },
};

export function ProductionLineStatus({
  lines,
  onAcknowledge,
  className,
}: {
  lines: ProductionLine[];
  onAcknowledge?: (id: string) => void;
  className?: string;
}) {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [toasts, setToasts] = useState<string[]>([]);

  const faults = lines.filter((l) => l.status === 'fault' && !dismissedAlerts.has(l.id));

  function acknowledge(id: string) {
    setDismissedAlerts((p) => new Set([...p, id]));
    onAcknowledge?.(id);
    const line = lines.find((l) => l.id === id);
    setToasts((t) => [...t, `Fault acknowledged: ${line?.name}`]);
  }

  const columns = [
    { key: 'name'       as const, header: 'Line', render: (r: ProductionLine) => (
      <div>
        <p className="text-sm font-medium text-text-primary">{r.name}</p>
        <p className="text-xs text-text-disabled">{r.product}</p>
      </div>
    )},
    { key: 'status'     as const, header: 'Status', render: (r: ProductionLine) => (
      <Badge variant={statusConfig[r.status].variant} size="sm">{statusConfig[r.status].label}</Badge>
    )},
    { key: 'efficiency' as const, header: 'Efficiency', render: (r: ProductionLine) => (
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className={cn('font-medium', r.efficiency < 70 ? 'text-error-fg' : r.efficiency < 90 ? 'text-warning-fg' : 'text-success-fg')}>
            {r.efficiency}%
          </span>
        </div>
        <div className="h-1.5 w-24 rounded-full bg-surface-sunken overflow-hidden">
          <div
            className={cn('h-full rounded-full', r.efficiency < 70 ? 'bg-error' : r.efficiency < 90 ? 'bg-warning' : 'bg-success')}
            style={{ width: `${r.efficiency}%` }}
          />
        </div>
      </div>
    )},
    { key: 'unitsPerHour' as const, header: 'UPH', render: (r: ProductionLine) => (
      <span className={cn('font-mono text-sm', r.unitsPerHour < r.targetUph ? 'text-warning-fg' : 'text-text-primary')}>
        {r.unitsPerHour} / {r.targetUph}
      </span>
    )},
    { key: 'shift'      as const, header: 'Shift' },
    { key: 'lastAlert'  as const, header: 'Last alert', render: (r: ProductionLine) => (
      r.lastAlert ? <span className="text-xs text-text-secondary">{r.lastAlert}</span> : <span className="text-xs text-text-disabled">—</span>
    )},
  ];

  return (
    <div className={cn('space-y-3', className)}>
      {faults.map((l) => (
        <AlertBanner
          key={l.id}
          variant="error"
          title={`Line fault: ${l.name}`}
          message={l.lastAlert ?? 'Check production line immediately.'}
          action={{ label: 'Acknowledge', onClick: () => acknowledge(l.id) }}
          dismissible
        />
      ))}

      <AdvancedDataTable
        columns={columns}
        rows={lines}
        stickyHeader
        emptyMessage="No production lines configured."
      />

      <ToastRegion position="bottom-right">
        {toasts.map((msg, i) => (
          <Toast key={i} variant="success" message={msg} onDismiss={() => setToasts((t) => t.filter((_, j) => j !== i))} />
        ))}
      </ToastRegion>
    </div>
  );
}
