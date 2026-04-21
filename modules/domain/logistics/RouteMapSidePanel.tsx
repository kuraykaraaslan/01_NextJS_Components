'use client';
import { cn } from '@/libs/utils/cn';
import { Drawer } from '@/modules/ui/Drawer';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { Button } from '@/modules/ui/Button';
import { useState } from 'react';

export type RouteStop = {
  id: string;
  label: string;
  address: string;
  eta?: string;
  status: 'pending' | 'arrived' | 'departed' | 'skipped';
};

const VIEW_ITEMS: ButtonGroupItem[] = [
  { value: 'list', label: 'List' },
  { value: 'map',  label: 'Map' },
];

export function RouteMapSidePanel({
  open,
  onClose,
  routeId,
  stops,
  totalDistance,
  totalDuration,
  className,
}: {
  open: boolean;
  onClose: () => void;
  routeId: string;
  stops: RouteStop[];
  totalDistance?: string;
  totalDuration?: string;
  className?: string;
}) {
  const [view, setView] = useState('list');

  const statusColor: Record<RouteStop['status'], string> = {
    pending:  'bg-text-disabled',
    arrived:  'bg-primary',
    departed: 'bg-success',
    skipped:  'bg-error',
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={`Route ${routeId}`}
      side="right"
      footer={
        <Button variant="primary" fullWidth onClick={onClose}>Close route view</Button>
      }
      className={className}
    >
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Card variant="flat" className="flex-1">
            <div className="p-3 text-center">
              <p className="text-xs text-text-secondary">Distance</p>
              <p className="font-bold text-text-primary">{totalDistance ?? '—'}</p>
            </div>
          </Card>
          <Card variant="flat" className="flex-1">
            <div className="p-3 text-center">
              <p className="text-xs text-text-secondary">Duration</p>
              <p className="font-bold text-text-primary">{totalDuration ?? '—'}</p>
            </div>
          </Card>
        </div>

        <ButtonGroup items={VIEW_ITEMS} value={view} onChange={setView} variant="outline" size="sm" />

        {view === 'map' ? (
          <div className="h-48 rounded-lg border border-dashed border-border bg-surface-sunken flex items-center justify-center text-text-disabled text-sm">
            🗺 Map placeholder
          </div>
        ) : (
          <ol className="relative space-y-0">
            {stops.map((stop, i) => (
              <li key={stop.id} className="flex gap-3 pb-4 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={cn('w-3 h-3 rounded-full mt-1 shrink-0', statusColor[stop.status])} />
                  {i < stops.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-text-primary">{stop.label}</p>
                    <Badge variant={stop.status === 'departed' ? 'success' : stop.status === 'arrived' ? 'primary' : stop.status === 'skipped' ? 'error' : 'neutral'} size="sm">{stop.status}</Badge>
                  </div>
                  <p className="text-xs text-text-secondary">{stop.address}</p>
                  {stop.eta && <p className="text-xs text-text-disabled">ETA: {stop.eta}</p>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Drawer>
  );
}
