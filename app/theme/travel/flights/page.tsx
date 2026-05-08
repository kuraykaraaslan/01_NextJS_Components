'use client';
import { useState } from 'react';
import { FlightCard } from '@/modules/domains/travel/flight/FlightCard';
import { FlightCabinBadge } from '@/modules/domains/travel/flight/FlightCabinBadge';
import { FlightSegmentStatusBadge } from '@/modules/domains/travel/flight/FlightSegmentStatusBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilter, faPlane } from '@fortawesome/free-solid-svg-icons';
import { FLIGHTS } from '../travel.data';
import type { FlightCabinClass, FlightSegmentStatus } from '@/modules/domains/travel/types';

const CABIN_OPTIONS: FlightCabinClass[] = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'];
const STATUS_OPTIONS: FlightSegmentStatus[] = ['SCHEDULED', 'DELAYED', 'DEPARTED', 'ARRIVED', 'CANCELLED'];

export default function FlightsPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [cabinFilter, setCabinFilter] = useState<FlightCabinClass | ''>('');
  const [statusFilter, setStatusFilter] = useState<FlightSegmentStatus | ''>('');

  const filtered = FLIGHTS.filter((f) => {
    if (origin && !f.origin.toLowerCase().includes(origin.toLowerCase()) && !f.originCity.toLowerCase().includes(origin.toLowerCase())) return false;
    if (destination && !f.destination.toLowerCase().includes(destination.toLowerCase()) && !f.destinationCity.toLowerCase().includes(destination.toLowerCase())) return false;
    if (cabinFilter && f.cabin !== cabinFilter) return false;
    if (statusFilter && f.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <FontAwesomeIcon icon={faPlane} className="w-5 h-5 text-primary" aria-hidden="true" />
          Search Flights
        </h1>
        <p className="mt-1 text-text-secondary text-sm">Find the best fares for your journey</p>
      </div>

      {/* Search + Filter bar */}
      <div className="bg-surface-raised border border-border rounded-xl p-4 mb-8 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-text-secondary mb-1.5">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-3 mr-1" aria-hidden="true" />
            Origin
          </label>
          <input
            type="text"
            placeholder="City or code (e.g. IST)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-border-focus"
          />
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-text-secondary mb-1.5">Destination</label>
          <input
            type="text"
            placeholder="City or code (e.g. LHR)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-border-focus"
          />
        </div>

        <div className="min-w-[160px]">
          <label className="block text-xs font-medium text-text-secondary mb-1.5">
            <FontAwesomeIcon icon={faFilter} className="w-3 h-3 mr-1" aria-hidden="true" />
            Cabin Class
          </label>
          <select
            value={cabinFilter}
            onChange={(e) => setCabinFilter(e.target.value as FlightCabinClass | '')}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
            aria-label="Filter by cabin class"
          >
            <option value="">All Cabins</option>
            {CABIN_OPTIONS.map((c) => (
              <option key={c} value={c}>{c.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

        <div className="min-w-[140px]">
          <label className="block text-xs font-medium text-text-secondary mb-1.5">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as FlightSegmentStatus | '')}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
            aria-label="Filter by flight status"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filters */}
      {(cabinFilter || statusFilter) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {cabinFilter && <FlightCabinBadge cabin={cabinFilter} size="sm" />}
          {statusFilter && <FlightSegmentStatusBadge status={statusFilter} size="sm" />}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-text-secondary mb-4">
        {filtered.length} {filtered.length === 1 ? 'flight' : 'flights'} found
      </p>

      {/* Flight grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((flight) => (
            <FlightCard
              key={flight.flightId}
              flight={flight}
              href={`/theme/travel/flights/${flight.flightId}`}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-text-secondary">
          <FontAwesomeIcon icon={faPlane} className="w-10 h-10 mx-auto mb-3 opacity-30" aria-hidden="true" />
          <p className="font-medium">No flights found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
