'use client';
import Link from 'next/link';
import { useState } from 'react';
import { VehicleSpecsPanel } from '@/modules/domain/mobility/VehicleSpecsPanel';
import { VehicleCard } from '@/modules/domain/mobility/VehicleCard';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import { Input } from '@/modules/ui/Input';
import type { VehicleCardItem } from '@/app/theme/rental/rental.data';

const fuelBadgeVariants = {
  petrol:   'neutral',
  diesel:   'neutral',
  electric: 'success',
  hybrid:   'info',
} as const;

type Props = {
  vehicle: VehicleCardItem;
  similar: VehicleCardItem[];
};

export function VehicleDetailView({ vehicle, similar }: Props) {
  const [dateFrom, setDateFrom]               = useState('');
  const [dateTo, setDateTo]                   = useState('');
  const [reservationDone, setReservationDone] = useState(false);

  const estimatedDays = (() => {
    if (!dateFrom || !dateTo) return null;
    const diff = (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : null;
  })();

  const estimatedCost = estimatedDays ? (estimatedDays * vehicle.pricePerDay).toFixed(2) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href="/theme/rental" className="hover:text-text-primary transition-colors">Home</Link>
        <span>›</span>
        <Link href="/theme/rental/vehicles" className="hover:text-text-primary transition-colors">Fleet</Link>
        <span>›</span>
        <span className="text-text-primary font-medium">{vehicle.brand} {vehicle.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Hero card */}
          <Card className="p-6">
            <div className="flex items-start gap-4 flex-wrap">
              <div className="w-24 h-24 rounded-2xl bg-surface-overlay flex items-center justify-center text-5xl shrink-0">
                {vehicle.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Badge variant={fuelBadgeVariants[vehicle.fuelType]} size="sm">{vehicle.fuelType}</Badge>
                  <Badge variant={vehicle.available ? 'success' : 'neutral'} size="sm">
                    {vehicle.available ? 'Available now' : 'Unavailable'}
                  </Badge>
                  <Badge variant="neutral" size="sm" className="capitalize">{vehicle.category}</Badge>
                </div>
                <h1 className="text-2xl font-black text-text-primary">
                  {vehicle.brand} {vehicle.name}{' '}
                  <span className="text-text-secondary font-normal text-lg">{vehicle.year}</span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-warning font-semibold">★ {vehicle.rating.toFixed(1)}</span>
                  <span className="text-text-disabled text-sm">({vehicle.reviewCount} reviews)</span>
                  <span className="text-text-disabled text-sm">·</span>
                  <span className="text-text-secondary text-sm">📍 {vehicle.location}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-black text-primary">
                  €{vehicle.pricePerHour}<span className="text-sm font-normal text-text-secondary">/hr</span>
                </p>
                <p className="text-sm text-text-secondary">€{vehicle.pricePerDay}/day</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">{vehicle.description}</p>
          </Card>

          <VehicleSpecsPanel vehicle={vehicle} />

          {/* What's included */}
          <Card className="p-5">
            <h2 className="text-base font-bold text-text-primary mb-4">What's included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: '🛡️', label: 'Comprehensive insurance'           },
                { icon: '🔓', label: 'App-based unlock (no keys)'         },
                { icon: '⛽', label: 'First 50 km fuel/charge covered'   },
                { icon: '🛣️', label: `${vehicle.mileageLimit} km/day included` },
                { icon: '📍', label: 'GPS tracking & roadside assist'     },
                { icon: '🧹', label: 'Pre-cleaned & sanitised'            },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm text-text-secondary">
                  <span className="text-success shrink-0">✓</span>
                  <span>{item.icon} {item.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: booking */}
        <div className="space-y-4">
          {reservationDone ? (
            <Card className="p-6 border-2 border-success text-center space-y-4">
              <div className="text-4xl">🎉</div>
              <h2 className="text-xl font-black text-text-primary">Reservation confirmed!</h2>
              <p className="text-sm text-text-secondary">
                Your {vehicle.brand} {vehicle.name} is reserved from {dateFrom} to {dateTo}.
                Head to the pick-up point and unlock with the app.
              </p>
              <Badge variant="success">
                Booking ref: MV-{Math.floor(Math.random() * 900000) + 100000}
              </Badge>
              <Link href="/theme/rental/bookings">
                <Button variant="primary" fullWidth className="mt-2">View my trips</Button>
              </Link>
            </Card>
          ) : (
            <Card className="p-5 space-y-4">
              <h2 className="text-base font-bold text-text-primary">Book this car</h2>

              <Input id="booking-from" label="From" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              <Input id="booking-to"   label="To"   type="date" value={dateTo}   onChange={(e) => setDateTo(e.target.value)}   />

              {estimatedCost && (
                <div className="p-3 rounded-xl bg-primary-subtle text-sm">
                  <div className="flex justify-between text-text-secondary mb-1">
                    <span>€{vehicle.pricePerDay}/day × {estimatedDays} day{estimatedDays !== 1 ? 's' : ''}</span>
                    <span>€{estimatedCost}</span>
                  </div>
                  <div className="flex justify-between font-bold text-text-primary border-t border-border pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-primary">€{estimatedCost}</span>
                  </div>
                </div>
              )}

              <Button
                variant="primary"
                fullWidth
                disabled={!vehicle.available || !dateFrom || !dateTo || !estimatedDays}
                onClick={() => setReservationDone(true)}
              >
                {vehicle.available ? 'Reserve now' : 'Unavailable'}
              </Button>

              {!vehicle.available && (
                <p className="text-xs text-text-secondary text-center">
                  This vehicle is currently unavailable. Browse similar cars below.
                </p>
              )}

              <p className="text-xs text-text-disabled text-center">
                Free cancellation up to 30 min before pick-up
              </p>
            </Card>
          )}

          {/* Pricing breakdown */}
          <Card className="p-4 space-y-2">
            <h3 className="text-sm font-bold text-text-primary">Pricing breakdown</h3>
            <div className="space-y-1.5 text-sm">
              {[
                { label: 'Per hour',     value: `€${vehicle.pricePerHour}`                       },
                { label: 'Per day',      value: `€${vehicle.pricePerDay}`                        },
                { label: 'Weekend rate', value: `€${Math.round(vehicle.pricePerDay * 0.7)}/day`  },
                { label: 'Over limit',   value: '€0.20/km'                                       },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-text-secondary">
                  <span>{r.label}</span>
                  <span className="font-medium text-text-primary">{r.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Similar vehicles */}
      {similar.length > 0 && (
        <section aria-labelledby="similar-heading">
          <h2 id="similar-heading" className="text-xl font-bold text-text-primary mb-4">
            Similar vehicles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {similar.map((v) => (
              <Link
                key={v.id}
                href={`/theme/rental/vehicles/${v.slug}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl"
              >
                <VehicleCard vehicle={v} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
