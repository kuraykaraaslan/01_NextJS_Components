'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import type { PricingMode, VehicleCardItem } from '@/app/theme/rental/rental.data';
import { findZoneForPoint } from '@/app/theme/rental/rental.data';

type ActiveRentalPanelProps = {
  vehicle: VehicleCardItem;
  pricingMode: PricingMode;
  startTime: Date;
  userPosition: [number, number];
  onEndRental: (costEur: number) => void;
  className?: string;
};

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function computeCost(seconds: number, mode: PricingMode, vehicle: VehicleCardItem): number {
  switch (mode) {
    case 'minute': return (seconds / 60)  * vehicle.pricePerMinute;
    case 'day':    return (seconds / 86400) * vehicle.pricePerDay;
    case 'month':  return (seconds / (86400 * 30)) * vehicle.pricePerMonth;
  }
}

const modeLabel: Record<PricingMode, string> = {
  minute: 'Per minute',
  day:    'Daily',
  month:  'Monthly',
};

const modeRate = (mode: PricingMode, v: VehicleCardItem) => {
  switch (mode) {
    case 'minute': return `€${v.pricePerMinute.toFixed(2)}/min`;
    case 'day':    return `€${v.pricePerDay}/day`;
    case 'month':  return `€${v.pricePerMonth}/mo`;
  }
};

export function ActiveRentalPanel({
  vehicle,
  pricingMode,
  startTime,
  userPosition,
  onEndRental,
  className,
}: ActiveRentalPanelProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const initial = Math.floor((Date.now() - startTime.getTime()) / 1000);
    setElapsed(initial < 0 ? 0 : initial);
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [startTime]);

  const currentZone = findZoneForPoint(userPosition[0], userPosition[1]);
  const canEnd      = currentZone !== null;
  const cost        = computeCost(elapsed, pricingMode, vehicle);

  return (
    <Card className={cn('p-5 border-2 border-primary space-y-4', className)}>
      {/* Status bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
        <Badge variant="success">Active rental</Badge>
        <Badge variant="neutral" size="sm">{modeLabel[pricingMode]}</Badge>
        <span className="ml-auto text-xs text-text-secondary">{modeRate(pricingMode, vehicle)}</span>
      </div>

      {/* Vehicle info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary-subtle flex items-center justify-center text-2xl shrink-0">
          {vehicle.emoji}
        </div>
        <div>
          <p className="text-base font-bold text-text-primary">{vehicle.brand} {vehicle.name}</p>
          <p className="text-xs text-text-secondary font-mono">📍 {vehicle.location}</p>
        </div>
      </div>

      {/* Live counters */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-3 rounded-xl bg-surface-overlay">
          <p className="text-xs text-text-secondary mb-1">Time</p>
          <p className="font-mono font-bold text-text-primary text-sm">{formatDuration(elapsed)}</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-primary-subtle">
          <p className="text-xs text-text-secondary mb-1">Cost</p>
          <p className="font-bold text-primary text-sm">€{cost.toFixed(2)}</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-surface-overlay">
          <p className="text-xs text-text-secondary mb-1">Rate</p>
          <p className="font-bold text-text-primary text-xs">{modeRate(pricingMode, vehicle)}</p>
        </div>
      </div>

      {/* Zone status */}
      <div className={cn(
        'flex items-center gap-2 p-3 rounded-xl text-sm',
        canEnd ? 'bg-success-subtle' : 'bg-error-subtle'
      )}>
        <span className="text-lg shrink-0">{canEnd ? '✅' : '⚠️'}</span>
        <div>
          <p className={cn('font-semibold text-xs', canEnd ? 'text-success-fg' : 'text-error')}>
            {canEnd ? `In service zone — ${currentZone!.name}` : 'Outside service zone'}
          </p>
          <p className="text-xs text-text-secondary mt-0.5">
            {canEnd
              ? 'You can end your rental here.'
              : 'Drive into a blue zone on the map to end rental.'}
          </p>
        </div>
      </div>

      {/* End button */}
      <Button
        variant="danger"
        fullWidth
        disabled={!canEnd}
        onClick={() => canEnd && onEndRental(cost)}
        aria-label={canEnd ? 'End rental and park' : 'Drive to a service zone to end rental'}
      >
        {canEnd ? 'End rental & park here' : 'Drive to a service zone first'}
      </Button>
    </Card>
  );
}
