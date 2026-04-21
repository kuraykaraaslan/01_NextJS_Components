'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ARTISTS, EVENTS, type ArtistItem } from '../tickets.data';

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toString();
}

function getEventCount(artistName: string): number {
  return EVENTS.filter((e) =>
    e.performers.some((p) => p.toLowerCase() === artistName.toLowerCase())
  ).length;
}

const ALL_GENRES = ['All', ...Array.from(new Set(ARTISTS.map((a) => a.genre.split(' / ')[0])))];

function ArtistCard({ artist }: { artist: ArtistItem }) {
  const count = getEventCount(artist.name);
  return (
    <Link
      href={`/theme/tickets/artists/${artist.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
    >
      <div className="rounded-xl border border-border bg-surface-raised overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all h-full">
        <div
          className="h-40 flex items-center justify-center relative"
          style={{ background: `linear-gradient(135deg, ${artist.accent}44 0%, ${artist.accent}11 100%)` }}
        >
          <span className="text-7xl select-none">{artist.emoji}</span>
          {artist.verified && (
            <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
              ✓ Verified
            </span>
          )}
          {count > 0 && (
            <span
              className="absolute bottom-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: artist.accent }}
            >
              {count} event{count !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-text-primary text-base leading-tight group-hover:text-primary transition-colors truncate">
            {artist.name}
          </h3>
          <p className="text-sm text-text-secondary mt-0.5">{artist.genre}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-text-secondary">
            {artist.followers > 0 && (
              <span className="flex items-center gap-1">
                <span>👥</span>
                <span>{fmt(artist.followers)} followers</span>
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {artist.subGenres.slice(0, 3).map((g) => (
              <span
                key={g}
                className="text-xs px-2 py-0.5 rounded-full bg-surface-overlay text-text-secondary border border-border"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ArtistsPage() {
  const [activeGenre, setActiveGenre] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return ARTISTS.filter((a) => {
      const genreMatch = activeGenre === 'All' || a.genre.split(' / ')[0] === activeGenre;
      const searchMatch = !search.trim() || a.name.toLowerCase().includes(search.toLowerCase());
      return genreMatch && searchMatch;
    });
  }, [activeGenre, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-text-primary">Artists</h1>
        <p className="text-text-secondary mt-1">Discover performers at upcoming events</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8 flex-wrap">
        <input
          type="search"
          placeholder="Search artists…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs rounded-lg border border-border bg-surface-base px-3 py-2 text-sm text-text-primary placeholder-text-secondary outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
        <div className="flex flex-wrap gap-2">
          {ALL_GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeGenre === g
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-raised text-text-secondary border-border hover:border-primary/50 hover:text-text-primary'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-text-secondary">No artists found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filtered.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}
