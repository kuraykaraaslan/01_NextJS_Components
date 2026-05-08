'use client';
import { useState } from 'react';
import { HotelCard } from '@/modules/domains/travel/hotel/HotelCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilter, faHotel, faStar } from '@fortawesome/free-solid-svg-icons';
import { HOTELS } from '../travel.data';

export default function HotelsPage() {
  const [destination, setDestination] = useState('');
  const [starsFilter, setStarsFilter] = useState<number | 0>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const filtered = HOTELS.filter((h) => {
    if (destination && !h.city.toLowerCase().includes(destination.toLowerCase()) && !h.country.toLowerCase().includes(destination.toLowerCase())) return false;
    if (starsFilter && h.stars < starsFilter) return false;
    if (maxPrice > 0 && h.pricePerNight > maxPrice) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <FontAwesomeIcon icon={faHotel} className="w-5 h-5 text-primary" aria-hidden="true" />
          Search Hotels
        </h1>
        <p className="mt-1 text-text-secondary text-sm">Discover top hotels around the world</p>
      </div>

      {/* Filter bar */}
      <div className="bg-surface-raised border border-border rounded-xl p-4 mb-8 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-text-secondary mb-1.5">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-3 mr-1" aria-hidden="true" />
            Destination
          </label>
          <input
            type="text"
            placeholder="City or country"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-border-focus"
          />
        </div>

        <div className="min-w-[140px]">
          <label className="block text-xs font-medium text-text-secondary mb-1.5">
            <FontAwesomeIcon icon={faStar} className="w-3 h-3 mr-1 text-warning" aria-hidden="true" />
            Min Stars
          </label>
          <select
            value={starsFilter}
            onChange={(e) => setStarsFilter(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
            aria-label="Filter by minimum stars"
          >
            <option value={0}>Any</option>
            <option value={3}>3+ Stars</option>
            <option value={4}>4+ Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>

        <div className="min-w-[160px]">
          <label className="block text-xs font-medium text-text-secondary mb-1.5">
            <FontAwesomeIcon icon={faFilter} className="w-3 h-3 mr-1" aria-hidden="true" />
            Max Price / Night
          </label>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
            aria-label="Filter by max price per night"
          >
            <option value={0}>Any price</option>
            <option value={200}>Up to $200</option>
            <option value={400}>Up to $400</option>
            <option value={600}>Up to $600</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-text-secondary mb-4">
        {filtered.length} {filtered.length === 1 ? 'hotel' : 'hotels'} found
      </p>

      {/* Hotel grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((hotel) => (
            <HotelCard
              key={hotel.hotelId}
              hotel={hotel}
              href={`/theme/travel/hotels/${hotel.slug}`}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-text-secondary">
          <FontAwesomeIcon icon={faHotel} className="w-10 h-10 mx-auto mb-3 opacity-30" aria-hidden="true" />
          <p className="font-medium">No hotels found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
