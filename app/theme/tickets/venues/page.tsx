'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { VENUES, EVENTS, type VenueItem } from '../tickets.data';

const VENUE_TYPE_LABELS: Record<string, string> = {
  arena: 'Arena', stadium: 'Stadium', theater: 'Theater', park: 'Outdoor Park', hall: 'Concert Hall',
};

const ALL_TYPES = ['All', ...Array.from(new Set(VENUES.map((v) => v.type)))];
const ALL_CITIES = ['All cities', ...Array.from(new Set(VENUES.map((v) => v.city)))];

function getEventCount(venueName: string): number {
  return EVENTS.filter((e) => e.venue === venueName).length;
}

function VenueCard({ venue }: { venue: VenueItem }) {
  const count = getEventCount(venue.name);
  return (
    <Link
      href={`/theme/tickets/venues/${venue.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
    >
      <div className="rounded-xl border border-border bg-surface-raised overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all h-full">
        <div
          className="h-36 flex items-center justify-center relative"
          style={{ background: `linear-gradient(135deg, ${venue.accent}44 0%, ${venue.accent}11 100%)` }}
        >
          <span className="text-6xl select-none">{venue.emoji}</span>
          {count > 0 && (
            <span
              className="absolute bottom-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: venue.accent }}
            >
              {count} event{count !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-text-primary text-sm leading-tight group-hover:text-primary transition-colors">
              {venue.name}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-surface-overlay text-text-secondary border border-border shrink-0">
              {VENUE_TYPE_LABELS[venue.type]}
            </span>
          </div>
          <p className="text-xs text-text-secondary flex items-center gap-1 mt-1">
            <span>📍</span><span>{venue.city}</span>
          </p>
          <p className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
            <span>👥</span><span>Cap. {venue.capacity.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function VenuesPage() {
  const [activeType, setActiveType] = useState('All');
  const [activeCity, setActiveCity] = useState('All cities');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return VENUES.filter((v) => {
      const typeMatch = activeType === 'All' || v.type === activeType;
      const cityMatch = activeCity === 'All cities' || v.city === activeCity;
      const searchMatch =
        !search.trim() ||
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.city.toLowerCase().includes(search.toLowerCase());
      return typeMatch && cityMatch && searchMatch;
    });
  }, [activeType, activeCity, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-text-primary">Venues</h1>
        <p className="text-text-secondary mt-1">Explore the world's greatest live event venues</p>
      </div>

      <div className="space-y-4 mb-8">
        <input
          type="search"
          placeholder="Search venues…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-border bg-surface-base px-3 py-2 text-sm text-text-primary placeholder-text-secondary outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Type:</span>
          {ALL_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeType === t
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-raised text-text-secondary border-border hover:border-primary/50 hover:text-text-primary'
              }`}
            >
              {t === 'All' ? 'All types' : VENUE_TYPE_LABELS[t] ?? t}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">City:</span>
          {ALL_CITIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCity(c)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeCity === c
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-raised text-text-secondary border-border hover:border-primary/50 hover:text-text-primary'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-text-secondary">No venues found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
}
