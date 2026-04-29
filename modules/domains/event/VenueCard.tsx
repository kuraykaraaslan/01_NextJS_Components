'use client';
import { cn } from '@/libs/utils/cn';
import type { Venue } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBuilding } from '@fortawesome/free-solid-svg-icons';

type Props = {
  venue: Venue;
  eventCount?: number;
  href?: string;
  className?: string;
};

export function VenueCard({ venue, eventCount, href, className }: Props) {
  const url = href ?? `/themes/event/venues/${venue.slug}`;

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
      {/* image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-overlay">
        {venue.image ? (
          <img
            src={venue.image}
            alt={venue.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-disabled">
            <FontAwesomeIcon icon={faBuilding} className="w-10 h-10" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* city badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" aria-hidden="true" /> {venue.city}
        </div>

        {/* event count */}
        {eventCount != null && eventCount > 0 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
            {eventCount} etkinlik
          </div>
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-bold text-text-primary text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {venue.name}
        </h3>
        {venue.address && (
          <p className="text-xs text-text-secondary line-clamp-1">{venue.address}</p>
        )}
        {venue.description && (
          <p className="text-xs text-text-disabled line-clamp-2 mt-auto">{venue.description}</p>
        )}
      </div>
    </a>
  );
}
