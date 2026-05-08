'use client';
import { useState, useMemo } from 'react';
import { PropertyCard } from '@/modules/domains/real-estate/property/PropertyCard';
import { Button } from '@/modules/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PROPERTIES, CITIES, PROPERTY_TYPES } from '../real-estate.data';
import type { PropertyType, ListingType } from '@/modules/domains/real-estate/types';

const LISTING_TYPES: { label: string; value: ListingType | '' }[] = [
  { label: 'Any',        value: '' },
  { label: 'For Sale',   value: 'SALE' },
  { label: 'For Rent',   value: 'RENT' },
  { label: 'Short-term', value: 'SHORT_TERM' },
];

const TYPE_LABELS: Record<PropertyType, string> = {
  APARTMENT:  'Apartment',
  HOUSE:      'House',
  VILLA:      'Villa',
  LAND:       'Land',
  COMMERCIAL: 'Commercial',
  OFFICE:     'Office',
};

export default function PropertiesPage() {
  const [city, setCity] = useState('');
  const [type, setType] = useState<PropertyType | ''>('');
  const [listingType, setListingType] = useState<ListingType | ''>('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (city && p.city !== city) return false;
      if (type && p.type !== type) return false;
      if (listingType && p.listingType !== listingType) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      return true;
    });
  }, [city, type, listingType, minPrice, maxPrice]);

  const hasFilters = city || type || listingType || minPrice || maxPrice;

  function clearFilters() {
    setCity('');
    setType('');
    setListingType('');
    setMinPrice('');
    setMaxPrice('');
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">All Properties</h1>
        <p className="text-text-secondary mt-1 text-sm">{filtered.length} result{filtered.length !== 1 ? 's' : ''} found</p>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap gap-3 mb-8 items-end">
        {/* City */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-text-secondary" htmlFor="filter-city">City</label>
          <select
            id="filter-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-surface-raised text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
          >
            <option value="">All cities</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-text-secondary" htmlFor="filter-type">Type</label>
          <select
            id="filter-type"
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType | '')}
            className="px-3 py-2 rounded-lg border border-border bg-surface-raised text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
          >
            <option value="">All types</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
          </select>
        </div>

        {/* Listing type */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-text-secondary" htmlFor="filter-listing">Listing</label>
          <select
            id="filter-listing"
            value={listingType}
            onChange={(e) => setListingType(e.target.value as ListingType | '')}
            className="px-3 py-2 rounded-lg border border-border bg-surface-raised text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
          >
            {LISTING_TYPES.map((lt) => (
              <option key={lt.value} value={lt.value}>{lt.label}</option>
            ))}
          </select>
        </div>

        {/* Min price */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-text-secondary" htmlFor="filter-min">Min Price</label>
          <input
            id="filter-min"
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-32 px-3 py-2 rounded-lg border border-border bg-surface-raised text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
          />
        </div>

        {/* Max price */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-text-secondary" htmlFor="filter-max">Max Price</label>
          <input
            id="filter-max"
            type="number"
            placeholder="Any"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-32 px-3 py-2 rounded-lg border border-border bg-surface-raised text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
          />
        </div>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="self-end text-text-secondary">
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4 mr-1" aria-hidden="true" />
            Clear
          </Button>
        )}
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((property) => (
            <PropertyCard
              key={property.propertyId}
              property={{
                propertyId: property.propertyId,
                title: property.title,
                slug: property.slug,
                price: property.price,
                currency: property.currency,
                type: property.type,
                listingType: property.listingType,
                status: property.status,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                area: property.area,
                city: property.city,
                imageUrl: property.imageUrl,
              }}
              href={`/theme/real-estate/properties/${property.slug}`}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <FontAwesomeIcon icon={faFilter} className="w-10 h-10 text-text-disabled mx-auto mb-4" aria-hidden="true" />
          <p className="text-text-secondary text-sm">No properties match your filters.</p>
          <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">Clear filters</Button>
        </div>
      )}
    </div>
  );
}
