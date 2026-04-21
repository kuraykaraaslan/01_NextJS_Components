'use client';
import Link from 'next/link';
import { EventListCard } from '@/modules/domain/event/EventListCard';
import type { VenueItem, EventItem } from '../../tickets.data';

const VENUE_TYPE_LABELS: Record<string, string> = {
  arena: 'Arena', stadium: 'Stadium', theater: 'Theater', park: 'Outdoor Park', hall: 'Concert Hall',
};

type Props = { venue: VenueItem; events: EventItem[]; related: VenueItem[] };

export default function VenueDetailView({ venue, events, related }: Props) {
  return (
    <div>
      {/* Hero */}
      <div
        className="relative py-16 px-4"
        style={{ background: `linear-gradient(135deg, #0a0f1e 0%, ${venue.accent}22 60%, #0a0f1e 100%)` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-8">
          <div
            className="w-40 h-40 md:w-48 md:h-48 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl border border-white/10"
            style={{ background: `linear-gradient(135deg, ${venue.accent}55 0%, ${venue.accent}22 100%)` }}
          >
            <span className="text-8xl">{venue.emoji}</span>
          </div>
          <div className="text-center md:text-left">
            <span
              className="inline-block text-xs px-3 py-1 rounded-full font-semibold text-white mb-3"
              style={{ background: venue.accent }}
            >
              {VENUE_TYPE_LABELS[venue.type]}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {venue.name}
            </h1>
            <p className="text-gray-400 mt-3 text-sm flex items-center gap-1.5 justify-center md:justify-start">
              <span>📍</span>
              <span>{venue.address}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b border-border" style={{ background: '#0d1424' }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap gap-10">
          <div>
            <p className="text-2xl font-black text-white">{venue.capacity.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Capacity</p>
          </div>
          <div>
            <p className="text-2xl font-black text-white">{VENUE_TYPE_LABELS[venue.type]}</p>
            <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Venue Type</p>
          </div>
          <div>
            <p className="text-2xl font-black text-white">{venue.yearOpened}</p>
            <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Established</p>
          </div>
          <div>
            <p className="text-2xl font-black text-white">{events.length}</p>
            <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Upcoming Events</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        <section>
          <h2 className="text-xl font-black text-text-primary mb-4">About {venue.name}</h2>
          <p className="text-text-secondary leading-relaxed max-w-3xl">{venue.description}</p>
        </section>

        <section>
          <h2 className="text-xl font-black text-text-primary mb-4">Amenities & Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {venue.amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-surface-raised"
              >
                <span className="text-primary text-sm shrink-0">✓</span>
                <span className="text-sm text-text-primary">{amenity}</span>
              </div>
            ))}
          </div>
        </section>

        {events.length > 0 && (
          <section>
            <h2 className="text-xl font-black text-text-primary mb-4">Upcoming Events Here</h2>
            <div className="space-y-3">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/theme/tickets/events/${event.slug}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                >
                  <EventListCard
                    title={event.title}
                    subtitle={event.subtitle}
                    category={event.category}
                    date={event.date}
                    time={event.time}
                    venue={event.venue}
                    city={event.city}
                    emoji={event.emoji}
                    accent={event.accent}
                    minPrice={event.minPrice}
                    rating={event.rating}
                    reviewCount={event.reviewCount}
                    hot={event.hot}
                    soldOut={event.soldOut}
                    className="hover:shadow-md hover:border-primary/30"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-black text-text-primary mb-4">Other Venues</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((v) => (
                <Link
                  key={v.id}
                  href={`/theme/tickets/venues/${v.slug}`}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                >
                  <div className="rounded-xl border border-border bg-surface-raised overflow-hidden hover:shadow-md hover:border-primary/30 transition-all text-center p-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ background: `linear-gradient(135deg, ${v.accent}33 0%, ${v.accent}11 100%)` }}
                    >
                      <span className="text-3xl">{v.emoji}</span>
                    </div>
                    <p className="font-bold text-text-primary text-sm group-hover:text-primary transition-colors leading-tight">
                      {v.name}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">{v.city}</p>
                    <p className="text-xs text-text-secondary">{VENUE_TYPE_LABELS[v.type]}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
