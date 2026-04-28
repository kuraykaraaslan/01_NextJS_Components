import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { EventStatusBadge } from '@/modules/domains/event/EventStatusBadge';
import { EventFormatBadge } from '@/modules/domains/event/EventFormatBadge';
import { EventCategoryBadge } from '@/modules/domains/event/EventCategoryBadge';
import { OrganizerCard } from '@/modules/domains/event/OrganizerCard';
import { EventInfoGrid } from '@/modules/domains/event/EventInfoGrid';
import { TicketSidebarBox } from '@/modules/domains/event/TicketSidebarBox';
import {
  getEventBySlug,
  getPricingsByEventId,
  ORGANIZERS,
  VENUES,
  EVENTS,
} from '@/app/themes/event/event.data';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const pricings = getPricingsByEventId(event.eventId);
  const organizer = ORGANIZERS.find((o) => o.organizerId === event.organizerId) ?? null;
  const venue = VENUES[0]; // link first venue for demo

  const isSoldOut = event.status === 'SOLD_OUT';
  const isCancelled = event.status === 'CANCELLED';
  const canBuy = !isSoldOut && !isCancelled && event.status !== 'ARCHIVED';

  const priceLabel = event.minPrice === 0
    ? 'Ücretsiz'
    : event.maxPrice != null && event.maxPrice !== event.minPrice
      ? `₺${event.minPrice?.toLocaleString('tr-TR')} – ₺${event.maxPrice.toLocaleString('tr-TR')}`
      : `₺${event.minPrice?.toLocaleString('tr-TR')} den`;

  return (
    <div className="bg-surface-base">
      {/* Banner */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        {event.bannerImage ? (
          <img src={event.bannerImage} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-primary/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-black/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 -mt-8 relative z-10 pb-16">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/themes/event' },
            { label: 'Etkinlikler', href: '/themes/event/events' },
            { label: event.title },
          ]}
          className="mb-6"
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-start">
          {/* ── Left: details ── */}
          <div className="space-y-6">
            {/* title block */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <EventCategoryBadge category={event.category} />
                <EventFormatBadge format={event.format} />
                {event.status !== 'PUBLISHED' && <EventStatusBadge status={event.status} />}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-text-primary leading-tight">
                {event.title}
              </h1>

              {event.shortDescription && (
                <p className="text-text-secondary text-base">{event.shortDescription}</p>
              )}
            </div>

            {/* info grid */}
            <EventInfoGrid event={event} venue={venue} />

            {/* description */}
            {event.description && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-text-primary">Etkinlik Hakkında</h2>
                <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                  {event.description.trim()}
                </div>
              </div>
            )}

            {/* tags */}
            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-surface-overlay border border-border text-text-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* organizer */}
            {organizer && <OrganizerCard organizer={organizer} />}
          </div>

          {/* ── Right: ticket box ── */}
          <TicketSidebarBox
            priceLabel={priceLabel}
            pricings={pricings}
            canBuy={canBuy}
            isSoldOut={isSoldOut}
            isCancelled={isCancelled}
            eventSlug={event.slug}
            remainingCapacity={event.remainingCapacity}
            venue={venue}
          />
        </div>
      </div>
    </div>
  );
}
