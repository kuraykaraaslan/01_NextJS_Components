'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ActiveRentalPanel } from '@/modules/domain/mobility/ActiveRentalPanel';
import { RentalStartPanel } from '@/modules/domain/mobility/RentalStartPanel';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import {
  VEHICLES,
  SERVICE_ZONES,
  findZoneForPoint,
  formatPrice,
  type VehicleCardItem,
  type PricingMode,
} from '../rental.data';

// Leaflet must be loaded client-side only
const VehicleMapInner = dynamic(
  () => import('@/modules/domain/mobility/VehicleMapInner').then((m) => m.VehicleMapInner),
  { ssr: false, loading: () => <div className="w-full h-full bg-surface-overlay animate-pulse rounded-xl" /> }
);

// ─── Simulated user position (inside Beşiktaş zone by default) ─────────────────

const DEFAULT_USER_POS: [number, number] = [41.042, 29.005];

// ─── Rental state ──────────────────────────────────────────────────────────────

type RentalState = {
  vehicle: VehicleCardItem;
  mode: PricingMode;
  startTime: Date;
};

type TripSummary = {
  vehicle: VehicleCardItem;
  mode: PricingMode;
  durationSec: number;
  costEur: number;
  endedAt: Date;
};

// ─── Sidebar panels ────────────────────────────────────────────────────────────

function ZoneLegend() {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Service zones</p>
      {SERVICE_ZONES.map((z) => (
        <div key={z.id} className="flex items-center gap-2 text-xs text-text-secondary">
          <span
            className="w-3 h-3 rounded-sm shrink-0 border border-white/30"
            style={{ background: z.color, opacity: 0.7 }}
          />
          {z.name}
        </div>
      ))}
      <p className="text-xs text-text-disabled pt-1">
        You can only end a rental inside a service zone.
      </p>
    </div>
  );
}

function NearbyVehicleList({
  vehicles,
  userPos,
  onSelect,
}: {
  vehicles: VehicleCardItem[];
  userPos: [number, number];
  onSelect: (v: VehicleCardItem) => void;
}) {
  // Sort by rough distance (Euclidean on lat/lng is fine for display)
  const sorted = useMemo(() => {
    return [...vehicles]
      .filter((v) => v.available)
      .sort((a, b) => {
        const da = (a.lat - userPos[0]) ** 2 + (a.lng - userPos[1]) ** 2;
        const db = (b.lat - userPos[0]) ** 2 + (b.lng - userPos[1]) ** 2;
        return da - db;
      })
      .slice(0, 6);
  }, [vehicles, userPos]);

  const approxKm = (v: VehicleCardItem) => {
    const deg = Math.sqrt((v.lat - userPos[0]) ** 2 + (v.lng - userPos[1]) ** 2);
    return (deg * 111).toFixed(1);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Nearby vehicles</p>
      {sorted.map((v) => (
        <button
          key={v.id}
          onClick={() => onSelect(v)}
          className="w-full text-left p-3 rounded-xl bg-surface-base hover:bg-primary-subtle border border-border hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl shrink-0">{v.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary leading-tight truncate">
                {v.brand} {v.name}
              </p>
              <p className="text-xs text-text-secondary">
                {approxKm(v)} km · €{v.pricePerMinute.toFixed(2)}/min
              </p>
            </div>
            <Badge variant="success" size="sm">Free</Badge>
          </div>
        </button>
      ))}
    </div>
  );
}

function TripSummaryCard({ summary, onDismiss }: { summary: TripSummary; onDismiss: () => void }) {
  const mins = Math.ceil(summary.durationSec / 60);
  return (
    <Card className="p-5 border-2 border-success space-y-3">
      <div className="text-center">
        <div className="text-4xl mb-2">🏁</div>
        <h2 className="text-lg font-black text-text-primary">Trip complete!</h2>
        <p className="text-xs text-text-secondary mt-0.5">
          Vehicle parked in service zone
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-lg bg-surface-overlay">
          <p className="text-xs text-text-secondary">Duration</p>
          <p className="text-sm font-bold text-text-primary">{mins} min</p>
        </div>
        <div className="p-2 rounded-lg bg-success-subtle">
          <p className="text-xs text-text-secondary">Total</p>
          <p className="text-sm font-bold text-success-fg">€{summary.costEur.toFixed(2)}</p>
        </div>
        <div className="p-2 rounded-lg bg-surface-overlay">
          <p className="text-xs text-text-secondary">Plan</p>
          <p className="text-sm font-bold text-text-primary capitalize">{summary.mode}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" fullWidth>Receipt</Button>
        <Button variant="ghost" size="sm" fullWidth onClick={onDismiss}>Done</Button>
      </div>
    </Card>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MapPage() {
  const [userPos, setUserPos]             = useState<[number, number]>(DEFAULT_USER_POS);
  const [selectedVehicle, setSelected]    = useState<VehicleCardItem | null>(null);
  const [activeRental, setActiveRental]   = useState<RentalState | null>(null);
  const [tripSummary, setTripSummary]     = useState<TripSummary | null>(null);

  const userZone     = findZoneForPoint(userPos[0], userPos[1]);
  const activeVehicleId = activeRental?.vehicle.id ?? null;

  function handleVehicleSelect(v: VehicleCardItem) {
    if (activeRental) return; // don't allow selecting another car mid-rental
    setSelected(v);
  }

  function handleStartRental(vehicle: VehicleCardItem, mode: PricingMode) {
    setActiveRental({ vehicle, mode, startTime: new Date() });
    setSelected(null);
  }

  function handleEndRental(costEur: number) {
    if (!activeRental) return;
    const durationSec = Math.floor((Date.now() - activeRental.startTime.getTime()) / 1000);
    setTripSummary({
      vehicle: activeRental.vehicle,
      mode: activeRental.mode,
      durationSec,
      costEur,
      endedAt: new Date(),
    });
    setActiveRental(null);
  }

  function handleMapClick(lat: number, lng: number) {
    // Left-clicking the map simulates the user moving there (for demo)
    setUserPos([lat, lng]);
    setSelected(null);
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-surface-base shrink-0">
        <Link href="/theme/rental" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
          ← Back
        </Link>
        <span className="text-sm font-bold text-text-primary">Live map</span>

        {/* Zone status pill */}
        <div className={`ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
          userZone ? 'bg-success-subtle text-success-fg' : 'bg-error-subtle text-error'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${userZone ? 'bg-success' : 'bg-error'}`} />
          {userZone ? userZone.name : 'Outside service zone'}
        </div>

        <p className="hidden sm:block text-xs text-text-disabled">
          Click map to move your position
        </p>
      </div>

      {/* Main area: sidebar + map */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="w-80 shrink-0 hidden lg:flex flex-col bg-surface-raised border-r border-border overflow-y-auto">
          <div className="p-4 space-y-5">

            {/* Trip summary */}
            {tripSummary && (
              <TripSummaryCard
                summary={tripSummary}
                onDismiss={() => setTripSummary(null)}
              />
            )}

            {/* Active rental */}
            {activeRental && (
              <ActiveRentalPanel
                vehicle={activeRental.vehicle}
                pricingMode={activeRental.mode}
                startTime={activeRental.startTime}
                userPosition={userPos}
                onEndRental={handleEndRental}
              />
            )}

            {/* Vehicle start panel */}
            {selectedVehicle && !activeRental && (
              <RentalStartPanel
                vehicle={selectedVehicle}
                onStart={handleStartRental}
                onClose={() => setSelected(null)}
              />
            )}

            {/* Nearby vehicles list (when nothing is selected) */}
            {!selectedVehicle && !activeRental && !tripSummary && (
              <NearbyVehicleList
                vehicles={VEHICLES}
                userPos={userPos}
                onSelect={handleVehicleSelect}
              />
            )}

            {/* Zone legend (always shown) */}
            <ZoneLegend />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 rounded-xl bg-surface-overlay">
                <p className="text-lg font-black text-primary">
                  {VEHICLES.filter((v) => v.available).length}
                </p>
                <p className="text-xs text-text-secondary">Available</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-overlay">
                <p className="text-lg font-black text-success">
                  {SERVICE_ZONES.length}
                </p>
                <p className="text-xs text-text-secondary">Zones</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Map ─────────────────────────────────────────────────────── */}
        <div className="flex-1 relative">
          <VehicleMapInner
            vehicles={VEHICLES}
            zones={SERVICE_ZONES}
            userPosition={userPos}
            activeVehicleId={activeVehicleId}
            onVehicleSelect={handleVehicleSelect}
            onMapClick={handleMapClick}
            className="w-full h-full"
          />

          {/* Mobile: bottom sheet */}
          <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-surface-base border-t border-border p-4 space-y-3 max-h-[55vh] overflow-y-auto rounded-t-2xl shadow-xl">
            {tripSummary && (
              <TripSummaryCard
                summary={tripSummary}
                onDismiss={() => setTripSummary(null)}
              />
            )}
            {activeRental && (
              <ActiveRentalPanel
                vehicle={activeRental.vehicle}
                pricingMode={activeRental.mode}
                startTime={activeRental.startTime}
                userPosition={userPos}
                onEndRental={handleEndRental}
              />
            )}
            {selectedVehicle && !activeRental && (
              <RentalStartPanel
                vehicle={selectedVehicle}
                onStart={handleStartRental}
                onClose={() => setSelected(null)}
              />
            )}
            {!selectedVehicle && !activeRental && !tripSummary && (
              <>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                  Tap a car pin on the map
                </p>
                <NearbyVehicleList
                  vehicles={VEHICLES}
                  userPos={userPos}
                  onSelect={handleVehicleSelect}
                />
              </>
            )}
          </div>

          {/* Active rental badge overlay on map */}
          {activeRental && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000]">
              <div className="bg-primary text-primary-fg px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Rental active · {activeRental.vehicle.brand} {activeRental.vehicle.name}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
