'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { cn } from '@/libs/utils/cn';
import { ActiveRentalPanel } from '@/modules/domain/mobility/ActiveRentalPanel';
import { RentalStartPanel } from '@/modules/domain/mobility/RentalStartPanel';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import {
  VEHICLES,
  SERVICE_ZONES,
  findZoneForPoint,
  type VehicleCardItem,
  type PricingMode,
} from '../rental.data';

// Leaflet is browser-only
const VehicleMapInner = dynamic(
  () => import('@/modules/domain/mobility/VehicleMapInner').then((m) => m.VehicleMapInner),
  { ssr: false, loading: () => <div className="w-full h-full bg-surface-overlay animate-pulse" /> }
);

// ─── Types ─────────────────────────────────────────────────────────────────────

type GeoState = 'idle' | 'loading' | 'ok' | 'denied' | 'error';

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
};

// Fallback position: Beşiktaş (inside service zone)
const FALLBACK_POS: [number, number] = [41.042, 28.985];

// ─── Sub-components ────────────────────────────────────────────────────────────

function ZoneLegend() {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-2">
        Servis bölgeleri
      </p>
      {SERVICE_ZONES.map((z) => (
        <div key={z.id} className="flex items-center gap-2 text-xs text-text-secondary">
          <span
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ background: z.color, opacity: 0.75 }}
          />
          {z.name}
        </div>
      ))}
      <p className="text-xs text-text-disabled pt-1 leading-relaxed">
        Kiralama yalnızca servis bölgesi içinde bitirilebilir.
      </p>
    </div>
  );
}

function NearbyList({
  userPos,
  onSelect,
}: {
  userPos: [number, number];
  onSelect: (v: VehicleCardItem) => void;
}) {
  const sorted = useMemo(() => (
    [...VEHICLES]
      .filter((v) => v.available)
      .sort((a, b) =>
        ((a.lat - userPos[0]) ** 2 + (a.lng - userPos[1]) ** 2) -
        ((b.lat - userPos[0]) ** 2 + (b.lng - userPos[1]) ** 2)
      )
      .slice(0, 5)
  ), [userPos]);

  const km = (v: VehicleCardItem) =>
    (Math.sqrt((v.lat - userPos[0]) ** 2 + (v.lng - userPos[1]) ** 2) * 111).toFixed(1);

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">
        Yakındaki araçlar
      </p>
      {sorted.map((v) => (
        <button
          key={v.id}
          onClick={() => onSelect(v)}
          className="w-full text-left p-3 rounded-xl bg-surface-base hover:bg-primary-subtle border border-border hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl shrink-0">{v.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">
                {v.brand} {v.name}
              </p>
              <p className="text-xs text-text-secondary">
                {km(v)} km · €{v.pricePerMinute.toFixed(2)}/dk
              </p>
            </div>
            <Badge variant="success" size="sm">Müsait</Badge>
          </div>
        </button>
      ))}
    </div>
  );
}

function TripSummaryCard({
  summary,
  onDismiss,
}: {
  summary: TripSummary;
  onDismiss: () => void;
}) {
  const mins = Math.max(1, Math.ceil(summary.durationSec / 60));
  return (
    <Card className="p-5 border-2 border-success space-y-4">
      <div className="text-center">
        <div className="text-4xl mb-2">🏁</div>
        <h2 className="text-lg font-black text-text-primary">Sürüş tamamlandı!</h2>
        <p className="text-xs text-text-secondary mt-0.5">
          Araç servis bölgesinde park edildi
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-lg bg-surface-overlay">
          <p className="text-xs text-text-secondary">Süre</p>
          <p className="text-sm font-bold text-text-primary">{mins} dk</p>
        </div>
        <div className="p-2 rounded-lg bg-success-subtle">
          <p className="text-xs text-text-secondary">Toplam</p>
          <p className="text-sm font-bold text-success-fg">€{summary.costEur.toFixed(2)}</p>
        </div>
        <div className="p-2 rounded-lg bg-surface-overlay">
          <p className="text-xs text-text-secondary">Plan</p>
          <p className="text-sm font-bold text-text-primary capitalize">{summary.mode}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" fullWidth>Makbuz</Button>
        <Button variant="ghost"   size="sm" fullWidth onClick={onDismiss}>Kapat</Button>
      </div>
    </Card>
  );
}

// ─── Mobile bottom sheet ───────────────────────────────────────────────────────

type SheetState = 'closed' | 'peek' | 'open';

function BottomSheet({
  state,
  onStateChange,
  children,
  badge,
}: {
  state: SheetState;
  onStateChange: (s: SheetState) => void;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  const heights: Record<SheetState, string> = {
    closed: '0px',
    peek:   '80px',
    open:   '70vh',
  };

  return (
    <div
      className="lg:hidden absolute bottom-0 left-0 right-0 bg-surface-base rounded-t-2xl shadow-2xl border-t border-border z-[500] flex flex-col transition-all duration-300 ease-out"
      style={{ height: heights[state], overflow: state === 'open' ? 'auto' : 'hidden' }}
    >
      {/* Drag handle + peek row */}
      <button
        onClick={() => onStateChange(state === 'open' ? 'peek' : 'open')}
        className="w-full flex flex-col items-center pt-2.5 pb-2 shrink-0 focus-visible:outline-none"
        aria-label={state === 'open' ? 'Küçült' : 'Büyüt'}
      >
        <div className="w-10 h-1 rounded-full bg-border-strong" />
        {state === 'peek' && badge && (
          <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-text-primary">
            {badge}
          </div>
        )}
      </button>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
        {children}
      </div>
    </div>
  );
}

// ─── Floating map buttons ──────────────────────────────────────────────────────

function MapFab({
  icon,
  label,
  onClick,
  active,
  loading,
  className,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  active?: boolean;
  loading?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn(
        'flex items-center gap-1.5 px-3 py-2 rounded-xl shadow-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        active
          ? 'bg-primary text-primary-fg'
          : 'bg-surface-base text-text-primary hover:bg-surface-overlay border border-border',
        className
      )}
    >
      <span className={loading ? 'animate-spin' : ''}>{loading ? '⟳' : icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MapPage() {
  const [userPos, setUserPos]           = useState<[number, number]>(FALLBACK_POS);
  const [geoState, setGeoState]         = useState<GeoState>('idle');
  const [geoError, setGeoError]         = useState<string | null>(null);
  const [geoLocated, setGeoLocated]     = useState(false);

  const [selected, setSelected]         = useState<VehicleCardItem | null>(null);
  const [activeRental, setActiveRental] = useState<RentalState | null>(null);
  const [tripSummary, setTripSummary]   = useState<TripSummary | null>(null);

  const [sheetState, setSheetState]     = useState<SheetState>('peek');
  const [showZones, setShowZones]       = useState(false);

  const userZone = findZoneForPoint(userPos[0], userPos[1]);

  // ── Geolocation ──────────────────────────────────────────────────────────────

  const locateUser = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setGeoError('Tarayıcınız konum desteklemiyor.');
      return;
    }
    setGeoState('loading');
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setGeoState('ok');
        setGeoLocated(true);
      },
      (err) => {
        setGeoState(err.code === 1 ? 'denied' : 'error');
        setGeoError(
          err.code === 1
            ? 'Konum izni reddedildi. Tarayıcı ayarlarından etkinleştirin.'
            : 'Konum alınamadı. Tekrar deneyin.'
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }, []);

  // Request location on first load
  useEffect(() => { locateUser(); }, [locateUser]);

  // ── Sheet auto-open when content arrives ────────────────────────────────────

  useEffect(() => {
    if (selected || activeRental || tripSummary) setSheetState('open');
    else setSheetState('peek');
  }, [selected, activeRental, tripSummary]);

  // ── Handlers ─────────────────────────────────────────────────────────────────

  function handleVehicleSelect(v: VehicleCardItem) {
    if (activeRental) return;
    setSelected(v);
  }

  function handleStartRental(vehicle: VehicleCardItem, mode: PricingMode) {
    setActiveRental({ vehicle, mode, startTime: new Date() });
    setSelected(null);
  }

  function handleEndRental(costEur: number) {
    if (!activeRental) return;
    setTripSummary({
      vehicle: activeRental.vehicle,
      mode: activeRental.mode,
      durationSec: Math.floor((Date.now() - activeRental.startTime.getTime()) / 1000),
      costEur,
    });
    setActiveRental(null);
  }

  function handleMapClick(lat: number, lng: number) {
    setUserPos([lat, lng]);
    if (!geoLocated) setGeoLocated(false); // demo mode: clicking moves you
    if (!selected && !activeRental) setSheetState('peek');
  }

  // ── Sidebar / sheet content ───────────────────────────────────────────────────

  const panelContent = (
    <>
      {geoError && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-warning-subtle text-xs text-warning">
          <span className="shrink-0 mt-0.5">⚠️</span>
          <span>{geoError}</span>
        </div>
      )}

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

      {selected && !activeRental && (
        <RentalStartPanel
          vehicle={selected}
          onStart={handleStartRental}
          onClose={() => setSelected(null)}
        />
      )}

      {!selected && !activeRental && !tripSummary && (
        <NearbyList userPos={userPos} onSelect={handleVehicleSelect} />
      )}

      {showZones && <ZoneLegend />}

      {/* Stats row */}
      {!selected && !activeRental && !tripSummary && (
        <div className="grid grid-cols-2 gap-2 text-center pt-1">
          <div className="p-3 rounded-xl bg-surface-overlay">
            <p className="text-lg font-black text-primary">
              {VEHICLES.filter((v) => v.available).length}
            </p>
            <p className="text-xs text-text-secondary">Müsait</p>
          </div>
          <div className="p-3 rounded-xl bg-surface-overlay">
            <p className="text-lg font-black text-success">{SERVICE_ZONES.length}</p>
            <p className="text-xs text-text-secondary">Bölge</p>
          </div>
        </div>
      )}
    </>
  );

  // ── Peek badge ────────────────────────────────────────────────────────────────

  const peekBadge = activeRental ? (
    <>
      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
      {activeRental.vehicle.emoji} Kiralama devam ediyor
    </>
  ) : selected ? (
    <>
      {selected.emoji} {selected.brand} {selected.name} seçildi
    </>
  ) : tripSummary ? (
    <>🏁 Sürüş tamamlandı</>
  ) : (
    <>
      <span className={cn('w-2 h-2 rounded-full', userZone ? 'bg-success' : 'bg-error')} />
      {userZone ? userZone.name : 'Bölge dışı'}
    </>
  );

  return (
    /* Fill the layout's flex-1 main completely */
    <div className="flex flex-col" style={{ height: 'calc(100dvh - 128px)' }}>

      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-b border-border bg-surface-base">
        <Link
          href="/theme/rental"
          className="p-1.5 rounded-lg hover:bg-surface-overlay transition-colors text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          aria-label="Geri"
        >
          ←
        </Link>

        <span className="text-sm font-bold text-text-primary">Canlı harita</span>

        {/* Zone status */}
        <div className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors',
          userZone ? 'bg-success-subtle text-success-fg' : 'bg-error-subtle text-error'
        )}>
          <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', userZone ? 'bg-success' : 'bg-error')} />
          <span className="max-w-[120px] truncate">
            {userZone ? userZone.name : 'Bölge dışındasınız'}
          </span>
        </div>

        {/* Active rental pill */}
        {activeRental && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-fg text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {activeRental.vehicle.brand} {activeRental.vehicle.name}
          </div>
        )}

        {/* Locate me button */}
        <button
          onClick={locateUser}
          disabled={geoState === 'loading'}
          className={cn(
            'ml-auto p-2 rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
            geoLocated
              ? 'text-primary bg-primary-subtle hover:bg-primary/10'
              : 'text-text-secondary hover:bg-surface-overlay',
            geoState === 'loading' && 'opacity-60 cursor-wait'
          )}
          title={geoLocated ? 'Konumum' : 'Konumu al'}
          aria-label="Konumu al"
        >
          {geoState === 'loading' ? '⟳' : '⊕'}
        </button>
      </div>

      {/* ── Body: sidebar + map ───────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">

        {/* Desktop sidebar */}
        <aside className="w-80 shrink-0 hidden lg:flex flex-col bg-surface-raised border-r border-border overflow-y-auto">
          <div className="p-4 space-y-5">
            {/* Geo status */}
            {geoError && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-warning-subtle text-xs text-warning">
                <span className="shrink-0">⚠️</span>
                <div>
                  <p className="font-semibold mb-0.5">Konum hatası</p>
                  <p>{geoError}</p>
                  <button
                    onClick={locateUser}
                    className="mt-1.5 text-primary underline underline-offset-2 hover:no-underline"
                  >
                    Tekrar dene
                  </button>
                </div>
              </div>
            )}

            {panelContent}
            <ZoneLegend />
          </div>
        </aside>

        {/* Map + overlays */}
        <div className="flex-1 relative overflow-hidden">
          <VehicleMapInner
            vehicles={VEHICLES}
            zones={SERVICE_ZONES}
            userPosition={userPos}
            activeVehicleId={activeRental?.vehicle.id ?? null}
            onVehicleSelect={handleVehicleSelect}
            onMapClick={handleMapClick}
            className="absolute inset-0"
          />

          {/* Floating action buttons */}
          <div className="absolute top-3 right-3 z-[400] flex flex-col gap-2">
            <MapFab
              icon="⊕"
              label="Konumum"
              onClick={locateUser}
              active={geoLocated}
              loading={geoState === 'loading'}
            />
            <MapFab
              icon="🗺️"
              label="Bölgeler"
              onClick={() => setShowZones((v) => !v)}
              active={showZones}
            />
          </div>

          {/* Active rental floating badge */}
          {activeRental && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] pointer-events-none">
              <div className="bg-primary text-primary-fg px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Kiralama aktif
              </div>
            </div>
          )}

          {/* Mobile zones legend overlay */}
          {showZones && (
            <div className="lg:hidden absolute bottom-24 left-3 z-[400] bg-surface-base/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 max-w-[200px]">
              <ZoneLegend />
            </div>
          )}

          {/* Mobile bottom sheet */}
          <BottomSheet
            state={sheetState}
            onStateChange={setSheetState}
            badge={peekBadge}
          >
            {panelContent}
          </BottomSheet>
        </div>
      </div>
    </div>
  );
}
