import { notFound } from 'next/navigation';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { Card } from '@/modules/ui/Card';
import { EventStatusBadge } from '@/modules/domains/event/EventStatusBadge';
import { EventFormatBadge } from '@/modules/domains/event/EventFormatBadge';
import { EventCategoryBadge } from '@/modules/domains/event/EventCategoryBadge';
import { OrganizerCard } from '@/modules/domains/event/OrganizerCard';
import {
  getEventBySlug,
  getPricingsByEventId,
  getOrganizerById,
  getVenueById,
  ORGANIZERS,
  VENUES,
  EVENTS,
} from '@/app/themes/event/event.data';

type Props = { params: Promise<{ slug: string }> };

const FMT_DATE = new Intl.DateTimeFormat('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const FMT_TIME = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' });

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
            <Card variant="flat">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Tarih & Saat</p>
                  <p className="font-semibold text-text-primary">{FMT_DATE.format(event.startAt)}</p>
                  <p className="text-text-secondary">
                    {FMT_TIME.format(event.startAt)}
                    {event.endAt && ` – ${FMT_TIME.format(event.endAt)}`}
                  </p>
                </div>

                {venue && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Mekan</p>
                    <p className="font-semibold text-text-primary">{venue.name}</p>
                    <p className="text-text-secondary">{venue.address}</p>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Format</p>
                  <p className="font-semibold text-text-primary">
                    {event.format === 'PHYSICAL' ? 'Yüz Yüze' : event.format === 'ONLINE' ? 'Online' : 'Hibrit'}
                  </p>
                </div>

                {event.remainingCapacity != null && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Kalan Kapasite</p>
                    <p className="font-semibold text-text-primary">
                      {event.remainingCapacity.toLocaleString('tr-TR')} koltuk
                    </p>
                    {event.totalCapacity && (
                      <div className="w-full h-1.5 bg-surface-sunken rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${Math.max(0, 100 - (event.remainingCapacity / event.totalCapacity) * 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>

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
          <aside className="lg:sticky lg:top-24 space-y-4">
            <div className="rounded-2xl border border-border bg-surface-raised overflow-hidden shadow-sm">
              {/* price header */}
              <div className="bg-primary px-5 py-4">
                <p className="text-primary-fg/80 text-xs font-medium">Bilet fiyatları</p>
                <p className="text-primary-fg font-black text-2xl mt-0.5">{priceLabel}</p>
              </div>

              <div className="p-5 space-y-4">
                {/* pricings */}
                {pricings.length > 0 ? (
                  <div className="space-y-2">
                    {pricings.map((p) => {
                      const remaining = p.capacity != null ? p.capacity - p.soldCount : null;
                      const soldOut = remaining != null && remaining <= 0;
                      return (
                        <div
                          key={p.eventSectionPricingId}
                          className="flex items-center justify-between py-2 border-b border-border last:border-0"
                        >
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{p.name}</p>
                            {remaining != null && remaining <= 20 && remaining > 0 && (
                              <p className="text-xs text-warning font-medium">Son {remaining} koltuk</p>
                            )}
                            {soldOut && <p className="text-xs text-error font-medium">Tükendi</p>}
                          </div>
                          <span className="text-sm font-bold text-text-primary tabular-nums">
                            {p.price === 0
                              ? 'Ücretsiz'
                              : `₺${p.price.toLocaleString('tr-TR')}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-text-secondary">Bilet bilgisi yakında.</p>
                )}

                {/* buy button */}
                {canBuy ? (
                  <a
                    href={`/themes/event/events/${event.slug}/checkout`}
                    className="flex w-full items-center justify-center rounded-md bg-primary text-primary-fg hover:bg-primary-hover px-5 py-2.5 text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    Bilet Satın Al
                  </a>
                ) : (
                  <Button fullWidth size="lg" disabled>
                    {isSoldOut ? 'Biletler Tükendi' : isCancelled ? 'İptal Edildi' : 'Mevcut Değil'}
                  </Button>
                )}

                {event.remainingCapacity != null && event.remainingCapacity < 1000 && !isSoldOut && (
                  <p className="text-center text-xs text-warning font-medium">
                    ⚡ Hızlı sat — sadece {event.remainingCapacity.toLocaleString('tr-TR')} bilet kaldı!
                  </p>
                )}

                <p className="text-center text-xs text-text-secondary">
                  🔒 Güvenli ödeme · İade garantisi
                </p>
              </div>
            </div>

            {/* map placeholder */}
            {venue && (
              <div className="rounded-xl border border-border bg-surface-raised p-4 space-y-2">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Konum</p>
                <p className="font-semibold text-text-primary text-sm">{venue.name}</p>
                <p className="text-xs text-text-secondary">{venue.address}, {venue.city}</p>
                <div className="h-32 rounded-lg bg-surface-overlay border border-border flex items-center justify-center text-text-disabled text-sm">
                  📍 Harita görünümü
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
