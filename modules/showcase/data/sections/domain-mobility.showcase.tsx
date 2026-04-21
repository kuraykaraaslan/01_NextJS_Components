'use client';
import { useState } from 'react';
import { VehicleCard }        from '@/modules/domain/mobility/VehicleCard';
import { VehicleSearchPanel } from '@/modules/domain/mobility/VehicleSearchPanel';
import { VehicleSpecsPanel }  from '@/modules/domain/mobility/VehicleSpecsPanel';
import { RentalStartPanel }   from '@/modules/domain/mobility/RentalStartPanel';
import { ActiveRentalPanel }  from '@/modules/domain/mobility/ActiveRentalPanel';
import type { ShowcaseComponent } from '../showcase.types';
import type { VehicleCardItem, PricingMode } from '@/app/theme/rental/rental.data';

const DEMO_VEHICLE: VehicleCardItem = {
  id: 'demo', slug: 'tesla-model-3',
  name: 'Model 3', brand: 'Tesla',
  category: 'electric',
  pricePerMinute: 0.28, pricePerHour: 14, pricePerDay: 89, pricePerMonth: 990,
  emoji: '🚗', rating: 4.9, reviewCount: 312,
  seats: 5, transmission: 'automatic',
  fuelType: 'electric',
  features: ['Autopilot', 'Heated seats', 'Navigation', 'USB-C'],
  location: 'Levent', available: true,
  year: 2024, mileageLimit: 300,
  description: 'Smooth, fast, and eco-friendly.',
  lat: 41.082, lng: 28.993,
};

const UNAVAILABLE_VEHICLE: VehicleCardItem = {
  ...DEMO_VEHICLE,
  id: 'demo2', name: 'Clio', brand: 'Renault',
  category: 'compact', fuelType: 'petrol',
  emoji: '🚙', rating: 4.2, reviewCount: 88,
  pricePerMinute: 0.12, pricePerHour: 6, pricePerDay: 38, pricePerMonth: 390,
  available: false, location: 'Kadıköy', year: 2022,
};

export function buildMobilityData(): ShowcaseComponent[] {
  return [
    // ── VehicleCard ────────────────────────────────────────────────────────────
    {
      id: 'mb-vehicle-card',
      title: 'VehicleCard',
      category: 'Domain' as const,
      abbr: 'Vc',
      description: 'Rental vehicle listing card with emoji thumbnail, pricing (hourly/daily), specs row, rating, and availability state.',
      filePath: 'modules/domain/mobility/VehicleCard.tsx',
      sourceCode: `import { VehicleCard } from '@/modules/domain/mobility/VehicleCard';\n\n<VehicleCard vehicle={vehicle} onSelect={(v) => console.log(v)} />`,
      variants: [
        {
          title: 'Available vehicle',
          layout: 'stack' as const,
          preview: (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
              <VehicleCard vehicle={DEMO_VEHICLE} />
              <VehicleCard vehicle={UNAVAILABLE_VEHICLE} />
            </div>
          ),
          code: `<VehicleCard vehicle={{\n  id: '1', slug: 'tesla-model-3',\n  name: 'Model 3', brand: 'Tesla',\n  category: 'electric',\n  pricePerHour: 14, pricePerDay: 89,\n  pricePerMinute: 0.28, pricePerMonth: 990,\n  emoji: '🚗', rating: 4.9, reviewCount: 312,\n  seats: 5, transmission: 'automatic',\n  fuelType: 'electric', location: 'Levent',\n  available: true, year: 2024,\n  mileageLimit: 300, features: ['Autopilot'],\n  description: '...', lat: 41.082, lng: 28.993,\n}} />`,
        },
      ],
    },

    // ── VehicleSearchPanel ─────────────────────────────────────────────────────
    {
      id: 'mb-search-panel',
      title: 'VehicleSearchPanel',
      category: 'Domain' as const,
      abbr: 'Vs',
      description: 'Location + date + category search form. Supports a compact inline variant for hero banners and a full card variant.',
      filePath: 'modules/domain/mobility/VehicleSearchPanel.tsx',
      sourceCode: `import { VehicleSearchPanel } from '@/modules/domain/mobility/VehicleSearchPanel';\n\n// Full form\n<VehicleSearchPanel onSearch={(params) => console.log(params)} />\n\n// Compact (for hero banners)\n<VehicleSearchPanel compact onSearch={(params) => console.log(params)} />`,
      variants: [
        {
          title: 'Full search form',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-lg">
              <VehicleSearchPanel onSearch={() => {}} />
            </div>
          ),
          code: `<VehicleSearchPanel onSearch={(params) => console.log(params)} />`,
        },
        {
          title: 'Compact (hero banner)',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-2xl">
              <VehicleSearchPanel compact onSearch={() => {}} />
            </div>
          ),
          code: `<VehicleSearchPanel compact onSearch={(params) => console.log(params)} />`,
        },
      ],
    },

    // ── VehicleSpecsPanel ──────────────────────────────────────────────────────
    {
      id: 'mb-specs-panel',
      title: 'VehicleSpecsPanel',
      category: 'Domain' as const,
      abbr: 'Sp',
      description: 'Specs grid showing seats, transmission, fuel type, model year, daily mileage limit, and pick-up point. Includes feature badges.',
      filePath: 'modules/domain/mobility/VehicleSpecsPanel.tsx',
      sourceCode: `import { VehicleSpecsPanel } from '@/modules/domain/mobility/VehicleSpecsPanel';\n\n<VehicleSpecsPanel vehicle={vehicle} />`,
      variants: [
        {
          title: 'Vehicle specs',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-lg">
              <VehicleSpecsPanel vehicle={DEMO_VEHICLE} />
            </div>
          ),
          code: `<VehicleSpecsPanel vehicle={vehicle} />`,
        },
      ],
    },

    // ── RentalStartPanel ───────────────────────────────────────────────────────
    {
      id: 'mb-rental-start',
      title: 'RentalStartPanel',
      category: 'Domain' as const,
      abbr: 'Rs',
      description: 'Instant rental panel with minute / daily / monthly pricing mode selector. Shows per-mode price and triggers unlock on confirm.',
      filePath: 'modules/domain/mobility/RentalStartPanel.tsx',
      sourceCode: `import { RentalStartPanel } from '@/modules/domain/mobility/RentalStartPanel';\n\n<RentalStartPanel\n  vehicle={vehicle}\n  onStart={(vehicle, mode) => startRental(vehicle, mode)}\n  onClose={() => setSelected(null)}\n/>`,
      variants: [
        {
          title: 'Rental start panel',
          layout: 'stack' as const,
          preview: (() => {
            function Demo() {
              const [started, setStarted] = useState<{ mode: PricingMode } | null>(null);
              if (started) {
                return (
                  <div className="text-center py-8 space-y-2">
                    <p className="text-3xl">🔓</p>
                    <p className="font-bold text-text-primary">Rental started ({started.mode})</p>
                    <button onClick={() => setStarted(null)} className="text-sm text-primary underline">Reset</button>
                  </div>
                );
              }
              return (
                <div className="w-full max-w-sm">
                  <RentalStartPanel
                    vehicle={DEMO_VEHICLE}
                    onStart={(_, mode) => setStarted({ mode })}
                    onClose={() => {}}
                  />
                </div>
              );
            }
            return <Demo />;
          })(),
          code: `<RentalStartPanel\n  vehicle={vehicle}\n  onStart={(vehicle, mode) => startRental(vehicle, mode)}\n  onClose={() => setSelected(null)}\n/>`,
        },
      ],
    },

    // ── ActiveRentalPanel ──────────────────────────────────────────────────────
    {
      id: 'mb-active-rental',
      title: 'ActiveRentalPanel',
      category: 'Domain' as const,
      abbr: 'Ar',
      description: 'Live rental tracker with elapsed timer, running cost counter, and zone-aware end-rental button. End rental is blocked when user is outside a service zone.',
      filePath: 'modules/domain/mobility/ActiveRentalPanel.tsx',
      sourceCode: `import { ActiveRentalPanel } from '@/modules/domain/mobility/ActiveRentalPanel';\n\n<ActiveRentalPanel\n  vehicle={vehicle}\n  pricingMode="minute"\n  startTime={new Date(Date.now() - 1000 * 60 * 12)}\n  userPosition={[41.062, 28.988]}\n  onEndRental={(cost) => console.log('Ended, cost:', cost)}\n/>`,
      variants: [
        {
          title: 'Active rental — inside service zone',
          layout: 'stack' as const,
          preview: (() => {
            function Demo() {
              const [ended, setEnded] = useState<number | null>(null);
              if (ended !== null) {
                return (
                  <div className="text-center py-8 space-y-2">
                    <p className="text-3xl">✅</p>
                    <p className="font-bold text-text-primary">Trip ended — €{ended.toFixed(2)}</p>
                    <button onClick={() => setEnded(null)} className="text-sm text-primary underline">Reset</button>
                  </div>
                );
              }
              return (
                <div className="w-full max-w-sm">
                  <ActiveRentalPanel
                    vehicle={DEMO_VEHICLE}
                    pricingMode="minute"
                    startTime={new Date(Date.now() - 1000 * 60 * 12)}
                    userPosition={[41.062, 28.988]}
                    onEndRental={(cost) => setEnded(cost)}
                  />
                </div>
              );
            }
            return <Demo />;
          })(),
          code: `<ActiveRentalPanel\n  vehicle={vehicle}\n  pricingMode="minute"\n  startTime={new Date(Date.now() - 1000 * 60 * 12)}\n  userPosition={[41.062, 28.988]}\n  onEndRental={(cost) => handleEnd(cost)}\n/>`,
        },
        {
          title: 'Outside service zone (end blocked)',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <ActiveRentalPanel
                vehicle={DEMO_VEHICLE}
                pricingMode="day"
                startTime={new Date(Date.now() - 1000 * 60 * 45)}
                userPosition={[41.000, 28.800]}
                onEndRental={() => {}}
              />
            </div>
          ),
          code: `<ActiveRentalPanel\n  vehicle={vehicle}\n  pricingMode="day"\n  startTime={startTime}\n  userPosition={[41.000, 28.800]} // outside all zones\n  onEndRental={(cost) => handleEnd(cost)}\n/>`,
        },
      ],
    },
  ];
}
