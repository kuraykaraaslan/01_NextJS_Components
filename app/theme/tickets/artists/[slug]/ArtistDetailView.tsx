'use client';
import Link from 'next/link';
import { EventListCard } from '@/modules/domain/event/EventListCard';
import type { ArtistItem, EventItem } from '../../tickets.data';

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toString();
}

type Props = { artist: ArtistItem; events: EventItem[]; related: ArtistItem[] };

export default function ArtistDetailView({ artist, events, related }: Props) {
  return (
    <div>
      {/* Hero */}
      <div
        className="relative py-16 px-4"
        style={{ background: `linear-gradient(135deg, #0a0f1e 0%, ${artist.accent}22 60%, #0a0f1e 100%)` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-8">
          <div
            className="w-40 h-40 md:w-48 md:h-48 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl border border-white/10"
            style={{ background: `linear-gradient(135deg, ${artist.accent}55 0%, ${artist.accent}22 100%)` }}
          >
            <span className="text-8xl">{artist.emoji}</span>
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Artist</span>
              {artist.verified && (
                <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">✓ Verified</span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">{artist.name}</h1>
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {artist.subGenres.map((g) => (
                <span
                  key={g}
                  className="text-sm px-3 py-1 rounded-full border border-white/20 text-gray-300"
                  style={{ background: `${artist.accent}22` }}
                >
                  {g}
                </span>
              ))}
            </div>
            <p className="text-gray-400 mt-3 text-sm">📍 {artist.hometown}</p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b border-border" style={{ background: '#0d1424' }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap gap-10">
          <div>
            <p className="text-2xl font-black text-white">{fmt(artist.followers)}</p>
            <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Followers</p>
          </div>
          {artist.monthlyListeners > 0 && (
            <div>
              <p className="text-2xl font-black text-white">{fmt(artist.monthlyListeners)}</p>
              <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Monthly Listeners</p>
            </div>
          )}
          <div>
            <p className="text-2xl font-black text-white">{events.length}</p>
            <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Upcoming Events</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        <section>
          <h2 className="text-xl font-black text-text-primary mb-4">About</h2>
          <p className="text-text-secondary leading-relaxed max-w-3xl">{artist.bio}</p>
        </section>

        {events.length > 0 && (
          <section>
            <h2 className="text-xl font-black text-text-primary mb-4">Upcoming Events</h2>
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
            <h2 className="text-xl font-black text-text-primary mb-4">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((a) => (
                <Link
                  key={a.id}
                  href={`/theme/tickets/artists/${a.slug}`}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                >
                  <div className="rounded-xl border border-border bg-surface-raised overflow-hidden hover:shadow-md hover:border-primary/30 transition-all text-center p-5">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ background: `linear-gradient(135deg, ${a.accent}33 0%, ${a.accent}11 100%)` }}
                    >
                      <span className="text-3xl">{a.emoji}</span>
                    </div>
                    <p className="font-bold text-text-primary text-sm group-hover:text-primary transition-colors truncate">
                      {a.name}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5">{a.genre}</p>
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
