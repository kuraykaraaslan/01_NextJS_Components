'use client';
import { cn } from '@/libs/utils/cn';
import type { EventWithData } from './types';
import { EventStatusBadge } from './EventStatusBadge';
import { EventFormatBadge } from './EventFormatBadge';
import { EventCategoryBadge } from './EventCategoryBadge';

type Props = {
  event: EventWithData;
  href?: string;
  className?: string;
};

const FMT_DATE = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
const FMT_TIME = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' });

export function EventCard({ event, href, className }: Props) {
  const url = href ?? `/themes/event/events/${event.slug}`;

  const priceLabel = event.minPrice != null
    ? event.minPrice === 0
      ? 'Ücretsiz'
      : event.maxPrice != null && event.maxPrice !== event.minPrice
        ? `₺${event.minPrice.toLocaleString('tr-TR')} – ₺${event.maxPrice.toLocaleString('tr-TR')}`
        : `₺${event.minPrice.toLocaleString('tr-TR')} den`
    : null;

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
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-text-disabled">
            🎫
          </div>
        )}
        {/* overlay badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {event.status !== 'PUBLISHED' && <EventStatusBadge status={event.status} />}
          <EventFormatBadge format={event.format} />
        </div>
        {/* price pill */}
        {priceLabel && (
          <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
            {priceLabel}
          </div>
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <EventCategoryBadge category={event.category} size="sm" />

        <h3 className="line-clamp-2 text-sm font-semibold text-text-primary leading-snug group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <div className="mt-auto space-y-1 text-xs text-text-secondary">
          <div className="flex items-center gap-1.5">
            <span>📅</span>
            <span>{FMT_DATE.format(event.startAt)} · {FMT_TIME.format(event.startAt)}</span>
          </div>
          {event.organizer && (
            <div className="flex items-center gap-1.5">
              <span>🎤</span>
              <span className="truncate">{event.organizer.name}</span>
              {event.organizer.verified && (
                <span className="text-primary" title="Doğrulanmış organizatör">✓</span>
              )}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
