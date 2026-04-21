'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import type { VehicleCardItem, PricingMode } from '@/app/theme/rental/rental.data';

type RentalStartPanelProps = {
  vehicle: VehicleCardItem;
  onStart: (vehicle: VehicleCardItem, mode: PricingMode) => void;
  onClose?: () => void;
  className?: string;
};

const MODES: { id: PricingMode; label: string; desc: string }[] = [
  { id: 'minute', label: 'Per minute', desc: 'Pay only for the time you drive. Best for quick errands.'   },
  { id: 'day',    label: 'Daily',      desc: 'Full day access. Great for day trips and errands.'           },
  { id: 'month',  label: 'Monthly',    desc: 'Unlimited access for a month. Best value for daily drivers.' },
];

const fuelVariants: Record<VehicleCardItem['fuelType'], 'neutral' | 'success' | 'info' | 'primary'> = {
  petrol: 'neutral', diesel: 'neutral', electric: 'success', hybrid: 'info',
};

export function RentalStartPanel({ vehicle, onStart, onClose, className }: RentalStartPanelProps) {
  const [mode, setMode] = useState<PricingMode>('minute');

  const priceDisplay: Record<PricingMode, string> = {
    minute: `€${vehicle.pricePerMinute.toFixed(2)} / min`,
    day:    `€${vehicle.pricePerDay} / day`,
    month:  `€${vehicle.pricePerMonth} / month`,
  };

  return (
    <Card className={cn('p-5 space-y-4', className)}>
      {/* Vehicle summary */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-primary-subtle flex items-center justify-center text-3xl shrink-0">
          {vehicle.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Badge variant={fuelVariants[vehicle.fuelType]} size="sm">{vehicle.fuelType}</Badge>
            <Badge variant="success" size="sm">Ready to go</Badge>
          </div>
          <p className="text-base font-bold text-text-primary leading-tight">
            {vehicle.brand} {vehicle.name} <span className="text-text-secondary font-normal text-sm">{vehicle.year}</span>
          </p>
          <p className="text-xs text-text-secondary">📍 {vehicle.location} · {vehicle.seats} seats · {vehicle.transmission}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-text-disabled hover:text-text-secondary text-xl leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>

      {/* Pricing mode selector */}
      <div>
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">Choose billing</p>
        <div className="space-y-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                'w-full text-left p-3 rounded-xl border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                mode === m.id
                  ? 'border-primary bg-primary-subtle'
                  : 'border-border bg-surface-base hover:border-border-strong hover:bg-surface-overlay'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn('text-sm font-semibold', mode === m.id ? 'text-primary' : 'text-text-primary')}>
                    {m.label}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">{m.desc}</p>
                </div>
                <p className={cn('text-sm font-black shrink-0 ml-3', mode === m.id ? 'text-primary' : 'text-text-primary')}>
                  {priceDisplay[m.id]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Start button */}
      <div className="space-y-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => onStart(vehicle, mode)}
          aria-label={`Start ${mode} rental of ${vehicle.brand} ${vehicle.name}`}
        >
          Unlock &amp; start — {priceDisplay[mode]}
        </Button>
        <p className="text-xs text-text-disabled text-center">
          Walk to the car, tap start, and drive. Vehicle unlocks automatically.
        </p>
      </div>
    </Card>
  );
}
