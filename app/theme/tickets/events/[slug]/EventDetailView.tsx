'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Modal } from '@/modules/ui/Modal';
import { EventSeatMapSelector } from '@/modules/domain/event/EventSeatMapSelector';
import { cn } from '@/libs/utils/cn';
import { type EventItem, type TicketTier, ARTISTS, VENUES } from '../../tickets.data';

const ARTIST_SLUG: Record<string, string> = Object.fromEntries(
  ARTISTS.map((a) => [a.name.toLowerCase(), a.slug])
);

const VENUE_SLUG: Record<string, string> = Object.fromEntries(
  VENUES.map((v) => [v.name.toLowerCase(), v.slug])
);

type Props = { event: EventItem; related: EventItem[] };

function TierCard({
  tier,
  selected,
  onSelect,
}: {
  tier: TicketTier;
  selected: boolean;
  onSelect: () => void;
}) {
  const low = tier.available <= 20;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'w-full text-left p-4 rounded-xl border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        selected
          ? 'border-primary bg-primary-subtle'
          : 'border-border bg-surface-base hover:border-primary/50',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm text-text-primary">{tier.name}</span>
            {low && <Badge variant="warning" size="sm">{tier.available} left</Badge>}
          </div>
          <ul className="mt-2 space-y-0.5">
            {tier.perks.map((perk) => (
              <li key={perk} className="text-xs text-text-secondary flex items-center gap-1.5">
                <span className="text-success">✓</span> {perk}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-black text-primary">${tier.price}</p>
          <p className="text-xs text-text-secondary">per ticket</p>
        </div>
      </div>
    </button>
  );
}

export function EventDetailView({ event, related }: Props) {
  const [selectedTierId, setSelectedTierId] = useState(event.tiers[0]?.id ?? '');
  const [qty, setQty] = useState(1);
  const [seatMapOpen, setSeatMapOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const selectedTier = event.tiers.find((t) => t.id === selectedTierId);
  const total = selectedTier ? selectedTier.price * qty : 0;

  function handleOrder() {
    setOrdered(true);
    setTimeout(() => setOrdered(false), 4000);
  }

  return (
    <div>
      {/* ── Event hero banner ─────────────────────────────────────────── */}
      <div
        className="w-full py-16 flex flex-col items-center justify-center gap-4 text-center px-4"
        style={{ background: `linear-gradient(160deg, #0a0f1e 0%, ${event.accent}22 60%, #0a0f1e 100%)` }}
      >
        <span className="text-7xl drop-shadow-lg">{event.emoji}</span>
        <div className="space-y-2">
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="primary" className="capitalize">{event.category}</Badge>
            {event.hot && <Badge variant="error">🔥 Trending</Badge>}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight max-w-2xl">
            {event.title}
          </h1>
          <p className="text-gray-300 text-sm md:text-base">{event.subtitle}</p>
        </div>

        {/* Quick info pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <span className="px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20">
            📅 {event.date}
          </span>
          <span className="px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20">
            🕐 {event.time}
          </span>
          {VENUE_SLUG[event.venue.toLowerCase()] ? (
            <Link
              href={`/theme/tickets/venues/${VENUE_SLUG[event.venue.toLowerCase()]}`}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-full border border-white/20 hover:border-white/40 transition-colors"
            >
              📍 {event.venue}
            </Link>
          ) : (
            <span className="px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20">
              📍 {event.venue}
            </span>
          )}
          <span className="px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20">
            🏙 {event.city}
          </span>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-secondary mb-6">
          <Link href="/theme/tickets" className="hover:text-text-primary transition-colors">Home</Link>
          <span>›</span>
          <Link href="/theme/tickets/events" className="hover:text-text-primary transition-colors">Events</Link>
          <span>›</span>
          <span className="text-text-primary font-medium line-clamp-1">{event.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: event info ──────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Description */}
            <section>
              <h2 className="text-lg font-black text-text-primary mb-3">About this event</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{event.description}</p>
            </section>

            {/* Performers */}
            <section>
              <h2 className="text-lg font-black text-text-primary mb-3">Performers</h2>
              <div className="flex flex-wrap gap-2">
                {event.performers.map((p) => {
                  const slug = ARTIST_SLUG[p.toLowerCase()];
                  const base = 'flex items-center gap-2 px-3 py-2 bg-surface-raised border border-border rounded-xl text-sm font-medium text-text-primary';
                  return slug ? (
                    <Link
                      key={p}
                      href={`/theme/tickets/artists/${slug}`}
                      className={`${base} hover:border-primary/50 hover:text-primary hover:bg-primary-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                    >
                      🎤 {p}
                    </Link>
                  ) : (
                    <span key={p} className={base}>🎤 {p}</span>
                  );
                })}
              </div>
            </section>

            {/* Tags */}
            <section>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
                ))}
              </div>
            </section>

            {/* Venue info */}
            <section className="p-5 bg-surface-raised rounded-xl border border-border space-y-3">
              <h2 className="text-base font-bold text-text-primary">Venue Information</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0">🏟</span>
                  <div>
                    {VENUE_SLUG[event.venue.toLowerCase()] ? (
                      <Link
                        href={`/theme/tickets/venues/${VENUE_SLUG[event.venue.toLowerCase()]}`}
                        className="font-semibold text-text-primary hover:text-primary transition-colors"
                      >
                        {event.venue} →
                      </Link>
                    ) : (
                      <p className="font-semibold text-text-primary">{event.venue}</p>
                    )}
                    <p className="text-text-secondary">{event.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg shrink-0">🚇</span>
                  <p className="text-text-secondary">Multiple transit options nearby. Check local transport for directions.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg shrink-0">♿</span>
                  <p className="text-text-secondary">Accessible seating and facilities available on request.</p>
                </div>
              </div>
            </section>

            {/* Seat map */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-black text-text-primary">Seat Map</h2>
                <Button variant="outline" size="sm" onClick={() => setSeatMapOpen(true)}>
                  View full map
                </Button>
              </div>
              <div className="p-4 bg-surface-raised rounded-xl border border-border">
                <EventSeatMapSelector />
              </div>
            </section>

          </div>

          {/* ── Right: ticket purchase ───────────────────────────────── */}
          <div className="space-y-5">
            <div className="sticky top-24 space-y-5">

              {/* Rating */}
              <div className="flex items-center gap-2 px-4 py-3 bg-surface-raised rounded-xl border border-border">
                <span className="text-warning text-lg">★</span>
                <span className="font-bold text-text-primary">{event.rating}</span>
                <span className="text-text-secondary text-sm">({event.reviewCount.toLocaleString()} reviews)</span>
                <span className="ml-auto text-xs text-text-disabled">Verified fans</span>
              </div>

              {ordered && (
                <AlertBanner
                  variant="success"
                  title="Order placed!"
                  message={`${qty} × ${selectedTier?.name} ticket${qty > 1 ? 's' : ''} added to your cart.`}
                  dismissible
                />
              )}

              {/* Tier selection */}
              <div className="space-y-3">
                <h2 className="text-base font-black text-text-primary">Select Tickets</h2>
                {event.tiers.map((tier) => (
                  <TierCard
                    key={tier.id}
                    tier={tier}
                    selected={selectedTierId === tier.id}
                    onSelect={() => setSelectedTierId(tier.id)}
                  />
                ))}
              </div>

              {/* Quantity */}
              {selectedTier && (
                <div className="p-4 bg-surface-raised rounded-xl border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-text-primary">Quantity</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus font-bold"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-bold text-text-primary">{qty}</span>
                      <button
                        onClick={() => setQty((q) => Math.min(8, q + 1))}
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">${selectedTier.price} × {qty}</span>
                    <span className="font-bold text-text-primary">${(selectedTier.price * qty).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-border pt-2">
                    <span className="text-text-secondary">Service fee</span>
                    <span className="text-text-secondary">${(total * 0.12).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-black border-t border-border pt-2">
                    <span className="text-text-primary">Total</span>
                    <span className="text-primary">${(total * 1.12).toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* CTA */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={event.soldOut || !selectedTier}
                onClick={handleOrder}
              >
                {event.soldOut ? 'Sold Out' : `🎟 Get ${qty > 1 ? `${qty} Tickets` : 'Ticket'}`}
              </Button>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="neutral" size="sm">🔒 Secure checkout</Badge>
                <Badge variant="success" size="sm">✅ Verified tickets</Badge>
                <Badge variant="info" size="sm">🔄 Resale available</Badge>
              </div>

            </div>
          </div>
        </div>

        {/* ── Related events ────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-text-primary">More {event.category} events</h2>
              <Link href={`/theme/tickets/events?category=${event.category}`} className="text-sm text-primary hover:text-primary-hover font-semibold transition-colors">
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/theme/tickets/events/${rel.slug}`}
                  className="group rounded-xl border border-border bg-surface-base hover:shadow-lg hover:border-primary/30 transition-all overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <div
                    className="h-28 flex items-center justify-center text-4xl"
                    style={{ background: `linear-gradient(135deg, ${rel.accent}44, ${rel.accent}11)` }}
                  >
                    {rel.emoji}
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="font-bold text-text-primary text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {rel.title}
                    </p>
                    <p className="text-xs text-text-secondary">{rel.date}</p>
                    <p className="text-xs font-bold text-primary">From ${rel.minPrice}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Seat map modal ───────────────────────────────────────────────── */}
      <Modal open={seatMapOpen} onClose={() => setSeatMapOpen(false)} title="Interactive Seat Map" size="lg">
        <div className="p-4">
          <p className="text-sm text-text-secondary mb-4">
            Select up to 4 seats from the interactive map below. Green = available, blue = selected, grey = taken.
          </p>
          <EventSeatMapSelector />
        </div>
      </Modal>
    </div>
  );
}
