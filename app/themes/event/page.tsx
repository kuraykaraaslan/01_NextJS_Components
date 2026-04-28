import { Badge } from '@/modules/ui/Badge';
import { Slider } from '@/modules/ui/Slider';
import { EventCard } from '@/modules/domains/event/EventCard';
import { EventCategoryBadge } from '@/modules/domains/event/EventCategoryBadge';
import { EventStatusBadge } from '@/modules/domains/event/EventStatusBadge';
import {
  EVENTS,
  EVENT_CATEGORIES,
} from '@/app/themes/event/event.data';
import type { EventWithData } from '@/modules/domains/event/types';

/* ── formatters ── */
const FMT_DATE = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const FMT_TIME = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' });

const CATEGORY_ICONS: Record<string, string> = {
  'cat-music':      '🎵',
  'cat-sports':     '⚽',
  'cat-theater':    '🎭',
  'cat-conference': '💻',
  'cat-comedy':     '😄',
  'cat-festival':   '🎪',
};

/* ── Hero slides — pick published events with an image ── */
const HERO_EVENTS: EventWithData[] = EVENTS
  .filter((e) => e.status === 'PUBLISHED' && (e.bannerImage ?? e.image))
  .slice(0, 4);

function HeroSlide({ event }: { event: EventWithData }) {
  const img = event.bannerImage ?? event.image;
  const isSoldOut = event.status === 'SOLD_OUT';

  const priceLabel =
    event.minPrice === 0
      ? 'Ücretsiz'
      : event.maxPrice != null && event.maxPrice !== event.minPrice
        ? `₺${event.minPrice?.toLocaleString('tr-TR')} – ₺${event.maxPrice.toLocaleString('tr-TR')}`
        : `₺${event.minPrice?.toLocaleString('tr-TR')} den`;

  return (
    <div className="relative flex items-end min-h-[520px] sm:min-h-[600px]">

      {/* background image */}
      {img && (
        <img
          src={img}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      )}

      {/* layered gradients — left-side readability + bottom fade */}
      <div className="absolute inset-0" style={{
        background: [
          'linear-gradient(to right, rgba(10,18,32,0.92) 0%, rgba(10,18,32,0.55) 55%, rgba(10,18,32,0.15) 100%)',
          'linear-gradient(to top,   rgba(10,18,32,0.95) 0%, rgba(10,18,32,0.0)  45%)',
        ].join(', '),
      }} />

      {/* content */}
      <div className="relative w-full mx-auto max-w-7xl px-6 sm:px-8 pb-14 sm:pb-16 pt-12">
        <div className="max-w-xl space-y-4">

          {/* badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" size="sm">Öne Çıkan</Badge>
            <EventCategoryBadge category={event.category} size="sm" />
            {event.status !== 'PUBLISHED' && <EventStatusBadge status={event.status} size="sm" />}
          </div>

          {/* title */}
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight drop-shadow-sm">
            {event.title}
          </h2>

          {/* short description */}
          {event.shortDescription && (
            <p className="text-white/75 text-sm sm:text-base leading-relaxed line-clamp-2">
              {event.shortDescription}
            </p>
          )}

          {/* meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/65">
            <span className="flex items-center gap-1.5">
              📅 {FMT_DATE.format(event.startAt)} · {FMT_TIME.format(event.startAt)}
            </span>
            <span className="flex items-center gap-1.5">
              📍 İstanbul
            </span>
            <span className="flex items-center gap-1.5 font-bold text-white">
              🎫 {priceLabel}
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={`/themes/event/events/${event.slug}/checkout`}
              className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                boxShadow: '0 4px 18px rgba(59,130,246,0.45)',
              }}
            >
              Bilet Al
            </a>
            <a
              href={`/themes/event/events/${event.slug}`}
              className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              Detaylar
            </a>
          </div>

          {/* urgency */}
          {event.remainingCapacity != null && event.remainingCapacity < 5000 && !isSoldOut && (
            <p className="text-xs font-medium" style={{ color: '#fbbf24' }}>
              🔥 Son {event.remainingCapacity.toLocaleString('tr-TR')} bilet!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Page
════════════════════════════════════════════════════ */

export default function EventThemePage() {
  const heroSlides = HERO_EVENTS.map((event) => <HeroSlide key={event.eventId} event={event} />);

  return (
    <div>
      <style>{`
        @keyframes evt-fade { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* ── Hero Slider ── */}
      <section style={{ background: '#0a1220' }}>
        <Slider
          slides={heroSlides}
          autoPlay
          autoPlayInterval={6000}
          showDots
          showArrows
          loop
          className="rounded-none"
        />
      </section>

      {/* ── Categories ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-text-primary">Kategoriler</h2>
          <a href="/themes/event/events" className="text-sm text-primary hover:underline">
            Tümünü gör →
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {EVENT_CATEGORIES.map((cat) => (
            <a
              key={cat.categoryId}
              href={`/themes/event/events?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface-raised p-4 hover:border-primary hover:bg-primary-subtle transition-all text-center group"
            >
              <span className="text-2xl">{CATEGORY_ICONS[cat.categoryId] ?? '🎫'}</span>
              <span className="text-xs font-semibold text-text-secondary group-hover:text-primary transition-colors">
                {cat.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-text-primary">Yaklaşan Etkinlikler</h2>
            <p className="text-text-secondary text-sm mt-1">
              {EVENTS.length} etkinlik sizi bekliyor
            </p>
          </div>
          <a
            href="/themes/event/events"
            className="inline-flex items-center justify-center rounded-md border border-border text-text-primary hover:bg-surface-overlay px-3 py-1.5 text-sm font-medium transition-colors"
          >
            Tümünü Gör
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.slice(0, 6).map((event, i) => (
            <div
              key={event.eventId}
              className="motion-safe:animate-[evt-fade_0.6s_ease-out]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e2060 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, #3b82f6 0%, transparent 65%)' }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white">Etkinliklerden Haberdar Ol</h2>
            <p className="text-white/65 mt-1 text-sm">
              Sana özel etkinlikleri kaçırmamak için bildirimlere kaydol.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}
            >
              Daha Fazla Bilgi
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 16px rgba(59,130,246,0.4)' }}
            >
              Ücretsiz Kaydol
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
