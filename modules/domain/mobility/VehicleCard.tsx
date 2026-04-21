'use client';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import type { VehicleCardItem } from '@/app/theme/rental/rental.data';

type VehicleCardProps = {
  vehicle: VehicleCardItem;
  onSelect?: (vehicle: VehicleCardItem) => void;
  className?: string;
};

const fuelLabels: Record<VehicleCardItem['fuelType'], string> = {
  petrol:   'Petrol',
  diesel:   'Diesel',
  electric: 'Electric',
  hybrid:   'Hybrid',
};

const fuelVariants: Record<VehicleCardItem['fuelType'], 'neutral' | 'success' | 'info' | 'primary'> = {
  petrol:   'neutral',
  diesel:   'neutral',
  electric: 'success',
  hybrid:   'info',
};

export function VehicleCard({ vehicle, onSelect, className }: VehicleCardProps) {
  const { name, brand, emoji, category, pricePerHour, pricePerDay, rating, reviewCount,
          seats, transmission, fuelType, location, available, year } = vehicle;

  return (
    <Card
      hoverable={available}
      className={cn('flex flex-col overflow-hidden', !available && 'opacity-60', className)}
    >
      {/* Thumbnail */}
      <div className="relative flex items-center justify-center bg-surface-overlay rounded-lg h-36 mb-3 text-6xl select-none">
        {emoji}
        {!available && (
          <div className="absolute inset-0 bg-surface-overlay/70 flex items-center justify-center rounded-lg">
            <Badge variant="neutral" size="sm">Unavailable</Badge>
          </div>
        )}
        <Badge
          variant={fuelVariants[fuelType]}
          size="sm"
          className="absolute top-2 right-2"
        >
          {fuelLabels[fuelType]}
        </Badge>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col gap-2 px-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-text-secondary font-medium">{brand}</p>
            <h3 className="text-base font-bold text-text-primary leading-tight">{name} <span className="text-text-disabled font-normal text-sm">{year}</span></h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-black text-primary">€{pricePerHour}<span className="text-xs font-normal text-text-secondary">/hr</span></p>
            <p className="text-xs text-text-secondary">€{pricePerDay}/day</p>
          </div>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <span title="Seats">👥 {seats}</span>
          <span title="Transmission">⚙️ {transmission === 'automatic' ? 'Auto' : 'Manual'}</span>
          <span title="Location">📍 {location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-warning font-semibold">★ {rating.toFixed(1)}</span>
          <span className="text-text-disabled">({reviewCount} reviews)</span>
          <span className="ml-auto text-xs text-text-secondary capitalize">{category}</span>
        </div>
      </div>

      {/* Action */}
      <div className="pt-3 mt-auto">
        <Button
          variant={available ? 'primary' : 'ghost'}
          size="sm"
          fullWidth
          disabled={!available}
          onClick={() => onSelect?.(vehicle)}
          aria-label={`Select ${brand} ${name}`}
        >
          {available ? 'Reserve' : 'Unavailable'}
        </Button>
      </div>
    </Card>
  );
}
