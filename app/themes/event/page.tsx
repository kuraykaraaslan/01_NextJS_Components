import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { EventCard } from '@/modules/domains/event/EventCard';
import { EventCategoryBadge } from '@/modules/domains/event/EventCategoryBadge';
import { EventStatusBadge } from '@/modules/domains/event/EventStatusBadge';
import {
  EVENTS,
  EVENT_CATEGORIES,
  FEATURED_EVENT,
} from '@/app/themes/event/event.data';

const FMT_DATE = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const FMT_TIME = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' });

const CATEGORY_ICONS: Record<string, string> = {
  'cat-music': '🎵',
  'cat-sports': '⚽',
  'cat-theater': '🎭',
  'cat-conference': '💻',
  'cat-comedy': '😄',
  'cat-festival': '🎪',
};

export default function EventThemePage() {
  const priceLabel = FEATURED_EVENT.minPrice === 0
    ? 'Ücretsiz'
    : `₺${FEATURED_EVENT.minPrice?.toLocaleString('tr-TR')} den`;

  return (
    <div className="bg-surface-base">
      <style>{`
        @keyframes evt-fade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes evt-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* background */}
        <div className="absolute inset-0 -z-10">
          {FEATURED_EVENT.bannerImage && (
            <img
              src={FEATURED_EVENT.bannerImage}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-surface-base" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] items-center">
            <div className="space-y-5 motion-safe:animate-[evt-fade_0.7s_ease-out]">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary" size="sm">Öne Çıkan Etkinlik</Badge>
                <EventCategoryBadge category={FEATURED_EVENT.category} size="sm" />
                <EventStatusBadge status={FEATURED_EVENT.status} size="sm" />
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight max-w-2xl">
                {FEATURED_EVENT.title}
              </h1>

              <p className="text-white/80 text-base max-w-xl leading-relaxed">
                {FEATURED_EVENT.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5">
                  📅 {FMT_DATE.format(FEATURED_EVENT.startAt)} · {FMT_TIME.format(FEATURED_EVENT.startAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  📍 İstanbul, Türkiye
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  🎫 {priceLabel}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`/themes/event/events/${FEATURED_EVENT.slug}`}
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-fg hover:bg-primary-hover px-5 py-2.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  Bilet Al
                </a>
                <a
                  href={`/themes/event/events/${FEATURED_EVENT.slug}`}
                  className="inline-flex items-center justify-center rounded-md border border-white/30 text-white hover:bg-white/10 px-5 py-2.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  Detayları Gör
                </a>
              </div>

              {FEATURED_EVENT.remainingCapacity != null && (
                <p className="text-xs text-white/50">
                  🔥 {FEATURED_EVENT.remainingCapacity.toLocaleString('tr-TR')} koltuk kaldı
                </p>
              )}
            </div>
          </div>
        </div>
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
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-primary-fg">Etkinliklerden Haberdar Ol</h2>
            <p className="text-primary-fg/80 mt-1 text-sm">
              Sana özel etkinlikleri kaçırmamak için bildirimlere kaydol.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button variant="outline" size="md" className="border-white/40 text-white hover:bg-white/15">
              Daha Fazla Bilgi
            </Button>
            <Button
              size="md"
              className="bg-white text-primary font-bold hover:bg-white/90"
            >
              Ücretsiz Kaydol
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
