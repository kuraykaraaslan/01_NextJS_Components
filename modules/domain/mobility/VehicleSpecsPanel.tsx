'use client';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';
import { Card } from '@/modules/ui/Card';
import type { VehicleCardItem } from '@/app/theme/rental/rental.data';

type VehicleSpecsPanelProps = {
  vehicle: VehicleCardItem;
  className?: string;
};

const fuelBadgeVariant: Record<VehicleCardItem['fuelType'], 'neutral' | 'success' | 'info' | 'primary'> = {
  petrol:   'neutral',
  diesel:   'neutral',
  electric: 'success',
  hybrid:   'info',
};

export function VehicleSpecsPanel({ vehicle, className }: VehicleSpecsPanelProps) {
  const specs = [
    { icon: '👥', label: 'Seats',           value: `${vehicle.seats} passengers` },
    { icon: '⚙️', label: 'Transmission',    value: vehicle.transmission === 'automatic' ? 'Automatic' : 'Manual' },
    { icon: '⛽', label: 'Fuel type',       value: vehicle.fuelType.charAt(0).toUpperCase() + vehicle.fuelType.slice(1) },
    { icon: '📅', label: 'Model year',      value: String(vehicle.year) },
    { icon: '🛣️', label: 'Daily limit',     value: `${vehicle.mileageLimit} km/day` },
    { icon: '📍', label: 'Pick-up point',   value: vehicle.location },
  ];

  return (
    <Card className={cn('p-5', className)}>
      <h2 className="text-base font-bold text-text-primary mb-4">Specifications</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {specs.map((s) => (
          <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl bg-surface-overlay">
            <span className="text-xl shrink-0">{s.icon}</span>
            <div>
              <p className="text-xs text-text-secondary">{s.label}</p>
              <p className="text-sm font-semibold text-text-primary">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {vehicle.features.length > 0 && (
        <>
          <p className="text-sm font-bold text-text-primary mb-2">Included features</p>
          <div className="flex flex-wrap gap-2">
            {vehicle.features.map((f) => (
              <Badge key={f} variant={fuelBadgeVariant[vehicle.fuelType] === 'success' ? 'success' : 'neutral'} size="sm">
                {f}
              </Badge>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
