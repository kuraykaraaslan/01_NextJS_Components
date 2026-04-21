'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { VehicleCard } from '@/modules/domain/mobility/VehicleCard';
import { VehicleSearchPanel } from '@/modules/domain/mobility/VehicleSearchPanel';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { ButtonGroup } from '@/modules/ui/ButtonGroup';
import { VEHICLES, FLEET_CATEGORIES, type VehicleCategory } from '../rental.data';
import type { SearchParams } from '@/modules/domain/mobility/VehicleSearchPanel';

const sortOptions = [
  { value: 'price-asc',    label: 'Price ↑' },
  { value: 'price-desc',   label: 'Price ↓' },
  { value: 'rating-desc',  label: 'Top rated' },
];

export default function VehiclesPage() {
  const [activeCategory, setActiveCategory] = useState<VehicleCategory | ''>('');
  const [sort, setSort] = useState('price-asc');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  function handleSearch(params: SearchParams) {
    if (params.category) setActiveCategory(params.category);
  }

  const filtered = useMemo(() => {
    let list = [...VEHICLES];
    if (activeCategory)  list = list.filter((v) => v.category === activeCategory);
    if (onlyAvailable)   list = list.filter((v) => v.available);
    if (sort === 'price-asc')   list.sort((a, b) => a.pricePerHour - b.pricePerHour);
    if (sort === 'price-desc')  list.sort((a, b) => b.pricePerHour - a.pricePerHour);
    if (sort === 'rating-desc') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, sort, onlyAvailable]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href="/theme/rental" className="hover:text-text-primary transition-colors">Home</Link>
        <span>›</span>
        <span className="text-text-primary font-medium">Fleet</span>
      </nav>

      <div>
        <h1 className="text-2xl font-black text-text-primary">Our fleet</h1>
        <p className="text-text-secondary mt-1">
          {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} available
          {activeCategory ? ` · ${activeCategory}` : ''}
        </p>
      </div>

      <VehicleSearchPanel compact onSearch={handleSearch} />

      {/* Filter strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
        {/* Category pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory('')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
              activeCategory === '' ? 'bg-primary text-primary-fg' : 'bg-surface-overlay text-text-secondary hover:text-text-primary'
            }`}
          >
            All
          </button>
          {FLEET_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                activeCategory === cat.slug
                  ? 'bg-primary text-primary-fg'
                  : 'bg-surface-overlay text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 ml-auto flex-wrap">
          {/* Available only */}
          <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-4 h-4 rounded border-border accent-primary focus-visible:ring-2 focus-visible:ring-border-focus"
            />
            Available now
          </label>

          {/* Sort */}
          <ButtonGroup
            items={sortOptions}
            value={sort}
            onChange={setSort}
            size="sm"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🚗</p>
          <p className="text-lg font-bold text-text-primary">No vehicles found</p>
          <p className="text-text-secondary text-sm mt-1">Try adjusting your filters</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => { setActiveCategory(''); setOnlyAvailable(false); }}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/theme/rental/vehicles/${vehicle.slug}`}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl"
            >
              <VehicleCard vehicle={vehicle} />
            </Link>
          ))}
        </div>
      )}

      {/* Fleet stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        {[
          { label: 'Total vehicles', value: VEHICLES.length.toString() },
          { label: 'Available now',  value: VEHICLES.filter((v) => v.available).length.toString() },
          { label: 'EV models',      value: VEHICLES.filter((v) => v.fuelType === 'electric').length.toString() },
          { label: 'Avg. rating',    value: (VEHICLES.reduce((s, v) => s + v.rating, 0) / VEHICLES.length).toFixed(1) },
        ].map((s) => (
          <div key={s.label} className="text-center p-4 rounded-xl bg-surface-raised">
            <p className="text-2xl font-black text-primary">{s.value}</p>
            <p className="text-xs text-text-secondary mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
