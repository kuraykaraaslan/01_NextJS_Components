'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ActiveRentalPanel } from '@/modules/domain/mobility/ActiveRentalPanel';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import { VEHICLES } from '../rental.data';

type BookingStatus = 'active' | 'upcoming' | 'completed' | 'cancelled';

type Booking = {
  id: string;
  vehicleId: string;
  status: BookingStatus;
  from: string;
  to: string;
  totalCost: number;
  ref: string;
};

const MOCK_BOOKINGS: Booking[] = [
  { id: '1', vehicleId: '4',  status: 'active',    from: '2026-04-21', to: '2026-04-21', totalCost: 52.36, ref: 'MV-834021' },
  { id: '2', vehicleId: '7',  status: 'upcoming',  from: '2026-04-25', to: '2026-04-26', totalCost: 158,   ref: 'MV-720183' },
  { id: '3', vehicleId: '2',  status: 'completed', from: '2026-04-15', to: '2026-04-16', totalCost: 116,   ref: 'MV-619042' },
  { id: '4', vehicleId: '1',  status: 'completed', from: '2026-04-10', to: '2026-04-10', totalCost: 42,    ref: 'MV-501938' },
  { id: '5', vehicleId: '5',  status: 'cancelled', from: '2026-04-08', to: '2026-04-09', totalCost: 0,     ref: 'MV-498231' },
  { id: '6', vehicleId: '10', status: 'completed', from: '2026-03-30', to: '2026-04-01', totalCost: 225,   ref: 'MV-381045' },
];

const statusBadge: Record<BookingStatus, { variant: 'success' | 'info' | 'neutral' | 'error'; label: string }> = {
  active:    { variant: 'success', label: 'Active'    },
  upcoming:  { variant: 'info',    label: 'Upcoming'  },
  completed: { variant: 'neutral', label: 'Completed' },
  cancelled: { variant: 'error',   label: 'Cancelled' },
};

function BookingCard({ booking }: { booking: Booking }) {
  const vehicle = VEHICLES.find((v) => v.id === booking.vehicleId);
  if (!vehicle) return null;
  const { variant, label } = statusBadge[booking.status];

  return (
    <Card className="p-5">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="w-14 h-14 rounded-xl bg-surface-overlay flex items-center justify-center text-3xl shrink-0">
          {vehicle.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant={variant} size="sm">{label}</Badge>
            <span className="text-xs text-text-disabled font-mono">{booking.ref}</span>
          </div>
          <h3 className="text-base font-bold text-text-primary">{vehicle.brand} {vehicle.name}</h3>
          <p className="text-sm text-text-secondary">{booking.from} → {booking.to} · 📍 {vehicle.location}</p>
        </div>
        <div className="text-right shrink-0">
          {booking.totalCost > 0 ? (
            <>
              <p className="text-lg font-black text-text-primary">€{booking.totalCost.toFixed(2)}</p>
              <p className="text-xs text-text-secondary">total cost</p>
            </>
          ) : (
            <p className="text-sm text-text-secondary">Cancelled</p>
          )}
        </div>
      </div>

      {(booking.status === 'upcoming' || booking.status === 'completed') && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-border flex-wrap">
          {booking.status === 'upcoming' && (
            <>
              <Button variant="primary" size="sm">View details</Button>
              <Button variant="ghost" size="sm">Cancel booking</Button>
            </>
          )}
          {booking.status === 'completed' && (
            <>
              <Link href={`/theme/rental/vehicles/${vehicle.slug}`}>
                <Button variant="outline" size="sm">Book again</Button>
              </Link>
              <Button variant="ghost" size="sm">Leave a review</Button>
              <Button variant="ghost" size="sm">Download receipt</Button>
            </>
          )}
        </div>
      )}
    </Card>
  );
}

const TABS = [
  { id: 'all',       label: 'All trips'  },
  { id: 'upcoming',  label: 'Upcoming'   },
  { id: 'completed', label: 'Past trips' },
  { id: 'cancelled', label: 'Cancelled'  },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab]     = useState('all');
  const [rentalEnded, setRentalEnded] = useState(false);

  const activeRental  = MOCK_BOOKINGS.find((b) => b.status === 'active');
  const activeVehicle = activeRental ? VEHICLES.find((v) => v.id === activeRental.vehicleId) : null;

  const filtered = MOCK_BOOKINGS.filter((b) => {
    if (activeTab === 'all') return b.status !== 'active';
    return b.status === activeTab;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href="/theme/rental" className="hover:text-text-primary transition-colors">Home</Link>
        <span>›</span>
        <span className="text-text-primary font-medium">My trips</span>
      </nav>

      <div>
        <h1 className="text-2xl font-black text-text-primary">My trips</h1>
        <p className="text-text-secondary mt-1">Manage your reservations and rental history</p>
      </div>

      {/* Active rental */}
      {activeRental && activeVehicle && !rentalEnded && (
        <div className="space-y-2">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
            Currently driving
          </h2>
          <ActiveRentalPanel
            vehicle={activeVehicle}
            pricingMode="minute"
            startTime={new Date(Date.now() - 1000 * 60 * 37)}
            userPosition={[41.085, 29.025]}
            onEndRental={() => setRentalEnded(true)}
          />
        </div>
      )}

      {rentalEnded && (
        <Card className="p-6 border-2 border-success text-center space-y-3">
          <div className="text-4xl">✅</div>
          <h2 className="text-xl font-black text-text-primary">Trip ended successfully</h2>
          <p className="text-sm text-text-secondary">Your receipt has been sent to your email. Thank you for driving with Moovy!</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm">Download receipt</Button>
            <Button variant="ghost" size="sm">Leave a review</Button>
          </div>
        </Card>
      )}

      {/* Trip stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total trips',  value: MOCK_BOOKINGS.filter((b) => b.status === 'completed').length.toString() },
          { label: 'Total spent',  value: `€${MOCK_BOOKINGS.filter((b) => b.status === 'completed').reduce((s, b) => s + b.totalCost, 0).toFixed(0)}` },
          { label: 'Upcoming',     value: MOCK_BOOKINGS.filter((b) => b.status === 'upcoming').length.toString() },
          { label: 'Member since', value: 'Jan 2026' },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <p className="text-xl font-black text-primary">{s.value}</p>
            <p className="text-xs text-text-secondary mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Trip history tabs */}
      <div>
        <div
          role="tablist"
          aria-label="Trip filter"
          className="flex items-center gap-1 border-b border-border"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-t -mb-px ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-3xl mb-3">🚗</p>
              <p className="text-base font-semibold text-text-primary">No trips here yet</p>
              <Link href="/theme/rental/vehicles">
                <Button variant="primary" size="sm" className="mt-4">Find a car</Button>
              </Link>
            </div>
          ) : (
            filtered.map((booking) => <BookingCard key={booking.id} booking={booking} />)
          )}
        </div>
      </div>
    </div>
  );
}
