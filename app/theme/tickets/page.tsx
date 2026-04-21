import Link from 'next/link';
import { EventCard } from '@/modules/domain/event/EventCard';
import { Badge } from '@/modules/ui/Badge';
import { EVENTS, CATEGORIES, FEATURED_EVENT_IDS, type EventItem } from './tickets.data';

export default function TicketsHomePage() {
  const featured = FEATURED_EVENT_IDS.map((id) => EVENTS.find((e) => e.id === id)!).filter(Boolean);
  const hot = EVENTS.filter((e) => e.hot);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="text-white py-20 px-4" style={{ background: 'linear-gradient(160deg, #0a0f1e 0%, #1a1035 50%, #0a0f1e 100%)' }}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="primary">🎟 10M+ tickets sold worldwide</Badge>

          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Find Your Next<br />
            <span className="text-primary">Live Experience</span>
          </h1>

          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Concerts, sports, theater, comedy — millions of events. One platform. Verified tickets, every time.
          </p>

          {/* Quick category links */}
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {[
              { label: '🎤 Concerts', slug: 'concert' },
              { label: '⚽ Sports', slug: 'sports' },
              { label: '🎭 Theater', slug: 'theater' },
              { label: '😂 Comedy', slug: 'comedy' },
              { label: '🎪 Festivals', slug: 'festival' },
            ].map(({ label, slug }) => (
              <Link
                key={slug}
                href={`/theme/tickets/events?category=${slug}`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary border border-white/20"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10 pt-4">
            {[
              { value: '50K+', label: 'Live Events' },
              { value: '200+', label: 'Cities' },
              { value: '10M+', label: 'Happy Fans' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-primary">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">

        {/* ── Featured Events ──────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-black text-text-primary">Featured Events</h2>
              <p className="text-sm text-text-secondary mt-0.5">Handpicked experiences you won't want to miss</p>
            </div>
            <Link href="/theme/tickets/events" className="text-sm text-primary hover:text-primary-hover font-semibold transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((event) => (
              <Link
                key={event.id}
                href={`/theme/tickets/events/${event.slug}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl"
              >
                <EventCard
                  title={event.title}
                  subtitle={event.subtitle}
                  category={event.category}
                  date={event.date}
                  venue={event.venue}
                  city={event.city}
                  emoji={event.emoji}
                  accent={event.accent}
                  minPrice={event.minPrice}
                  hot={event.hot}
                  soldOut={event.soldOut}
                  className="hover:shadow-lg hover:border-primary/30 h-full"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Browse by Category ───────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-black text-text-primary mb-5">Browse by Category</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/theme/tickets/events?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 p-5 rounded-xl border border-border bg-surface-raised hover:border-primary hover:bg-primary-subtle transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus group"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors text-center">
                  {cat.label}
                </span>
                <span className="text-xs text-text-secondary">{cat.count} events</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Trending This Week ───────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-black text-text-primary">🔥 Trending This Week</h2>
              <p className="text-sm text-text-secondary mt-0.5">High demand — grab your tickets before they're gone</p>
            </div>
            <Link href="/theme/tickets/events" className="text-sm text-primary hover:text-primary-hover font-semibold transition-colors">
              See all →
            </Link>
          </div>
          <div className="space-y-3">
            {hot.map((event, i) => (
              <Link
                key={event.id}
                href={`/theme/tickets/events/${event.slug}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface-base hover:shadow-md hover:border-primary/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus group"
              >
                <span className="text-lg font-black text-text-disabled w-6 text-center shrink-0">{i + 1}</span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `linear-gradient(135deg, ${event.accent}33, ${event.accent}11)` }}
                >
                  <span className="text-2xl">{event.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-text-primary text-sm group-hover:text-primary transition-colors truncate">
                    {event.title}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5 truncate">
                    {event.date} · {event.venue} · {event.city}
                  </p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <p className="text-sm font-black text-primary">From ${event.minPrice}</p>
                  <Badge variant="error" size="sm">🔥 Hot</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Why TixVault ─────────────────────────────────────────────── */}
        <section className="bg-surface-raised rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-black text-text-primary text-center mb-8">Why TixVault?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                emoji: '🛡',
                title: '100% Verified Tickets',
                desc: 'Every ticket is authenticated and guaranteed valid at the door. Zero counterfeits, ever.',
              },
              {
                emoji: '🔄',
                title: 'Easy Fan Exchange',
                desc: "Can't make it? Resell your tickets to other fans at fair prices on our secure marketplace.",
              },
              {
                emoji: '📱',
                title: 'Instant Mobile Delivery',
                desc: 'Tickets land in your app the second you buy. No printing, no waiting, no stress.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-primary-subtle flex items-center justify-center mx-auto text-3xl">
                  {item.emoji}
                </div>
                <h3 className="font-bold text-text-primary">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── App CTA ──────────────────────────────────────────────────── */}
        <section
          className="rounded-2xl p-8 text-white text-center space-y-4"
          style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' }}
        >
          <span className="text-4xl">📱</span>
          <h2 className="text-2xl font-black">Get Tickets on the Go</h2>
          <p className="text-gray-300 max-w-md mx-auto text-sm">
            Download the TixVault app and never miss a moment — browse events, buy tickets, and manage your orders all from your pocket.
          </p>
          <div className="flex justify-center gap-3 flex-wrap pt-2">
            <button className="px-5 py-2.5 bg-white text-gray-900 font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              📲 App Store
            </button>
            <button className="px-5 py-2.5 bg-white/20 text-white font-bold text-sm rounded-xl hover:bg-white/30 transition-colors border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              🤖 Google Play
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
