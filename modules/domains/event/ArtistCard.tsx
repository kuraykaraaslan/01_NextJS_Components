'use client';
import { cn } from '@/libs/utils/cn';
import type { Artist } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMicrophone } from '@fortawesome/free-solid-svg-icons';

type Props = {
  artist: Artist;
  eventCount?: number;
  href?: string;
  className?: string;
};

export function ArtistCard({ artist, eventCount, href, className }: Props) {
  const url = href ?? `/themes/event/artists/${artist.slug}`;

  return (
    <a
      href={url}
      className={cn(
        'group flex flex-col rounded-2xl border border-border bg-surface-raised overflow-hidden',
        'hover:shadow-lg hover:border-border-strong transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        className,
      )}
    >
      {/* cover image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-surface-overlay">
        {artist.coverImage ?? artist.image ? (
          <img
            src={(artist.coverImage ?? artist.image)!}
            alt={artist.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-disabled">
            <FontAwesomeIcon icon={faMicrophone} className="w-12 h-12" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* artist avatar overlapping bottom */}
        {artist.image && (
          <div className="absolute bottom-3 left-4">
            <img
              src={artist.image}
              alt=""
              aria-hidden="true"
              className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-lg"
            />
          </div>
        )}

        {/* verified */}
        {artist.verified && (
          <div
            className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-fg shadow"
            title="Doğrulanmış sanatçı"
          >
            <FontAwesomeIcon icon={faCheck} className="w-3 h-3" aria-hidden="true" />
          </div>
        )}

        {/* event count badge */}
        {eventCount != null && eventCount > 0 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
            {eventCount} etkinlik
          </div>
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-2 p-4 pt-3">
        <div>
          <h3 className="font-bold text-text-primary text-sm leading-tight group-hover:text-primary transition-colors">
            {artist.name}
          </h3>
          {artist.origin && (
            <p className="text-xs text-text-secondary mt-0.5">{artist.origin}</p>
          )}
        </div>

        {artist.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {artist.genres.slice(0, 3).map((g) => (
              <span
                key={g}
                className="inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-sunken text-text-secondary"
              >
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
