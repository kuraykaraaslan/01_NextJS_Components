'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Button } from '@/modules/ui/Button';
import { ButtonGroup } from '@/modules/ui/ButtonGroup';
import { EventListCard } from '@/modules/domain/event/EventListCard';
import { EVENTS, CATEGORIES, type EventCategory } from '../tickets.data';

const ALL_CATEGORY = '' as const;
type FilterCategory = EventCategory | typeof ALL_CATEGORY;

const SORT_OPTIONS = [
  { value: 'date',       label: 'Date' },
  { value: 'price-asc',  label: 'Price ↑' },
  { value: 'price-desc', label: 'Price ↓' },
  { value: 'rating',     label: 'Top rated' },
];

export default function EventsPage() {
  const [category, setCategory] = useState<FilterCategory>(ALL_CATEGORY);
  const [sort, setSort] = useState('date');
  const [search, setSearch] = useState('');
  const [onlyHot, setOnlyHot] = useState(false);

  const filtered = useMemo(() => {
    let list = [...EVENTS];
    if (category)  list = list.filter((e) => e.category === category);
    if (onlyHot)   list = list.filter((e) => e.hot);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.performers.some((p) => p.toLowerCase().includes(q)),
      );
    }
    if (sort === 'price-asc')  list.sort((a, b) => a.minPrice - b.minPrice);
    if (sort === 'price-desc') list.sort((a, b) => b.minPrice - a.minPrice);
    if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, sort, search, onlyHot]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href="/theme/tickets" className="hover:text-text-primary transition-colors">Home</Link>
        <span>›</span>
        <span className="text-text-primary font-medium">All Events</span>
        {category && (
          <>
            <span>›</span>
            <span className="text-text-primary font-medium capitalize">{category}</span>
          </>
        )}
      </nav>

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-black text-text-primary">
          {category ? CATEGORIES.find((c) => c.slug === category)?.label ?? 'Events' : 'All Events'}
        </h1>
        <p className="text-text-secondary mt-1">
          {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
          {search && ` for "${search}"`}
        </p>
      </div>

      {/* Search bar */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled">🔍</span>
        <input
          type="search"
          placeholder="Search by artist, venue, or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-surface-base text-sm text-text-primary placeholder-text-disabled outline-none focus:ring-2 focus:ring-border-focus focus:border-transparent transition"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
        {/* Category pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setCategory(ALL_CATEGORY)}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
              category === ALL_CATEGORY
                ? 'bg-primary text-white'
                : 'bg-surface-overlay text-text-secondary hover:text-text-primary'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                category === cat.slug
                  ? 'bg-primary text-white'
                  : 'bg-surface-overlay text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 ml-auto flex-wrap">
          {/* Hot only toggle */}
          <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyHot}
              onChange={(e) => setOnlyHot(e.target.checked)}
              className="w-4 h-4 rounded border-border accent-primary focus-visible:ring-2 focus-visible:ring-border-focus"
            />
            🔥 Hot only
          </label>

          {/* Sort */}
          <ButtonGroup items={SORT_OPTIONS} value={sort} onChange={setSort} size="sm" />
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <span className="text-5xl">🎭</span>
          <p className="text-lg font-bold text-text-primary">No events found</p>
          <p className="text-sm text-text-secondary">Try adjusting your search or filters</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setCategory(ALL_CATEGORY); setSearch(''); setOnlyHot(false); }}
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((event) => (
            <Link
              key={event.id}
              href={`/theme/tickets/events/${event.slug}`}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl"
            >
              <EventListCard
                title={event.title}
                subtitle={event.subtitle}
                category={event.category}
                date={event.date}
                time={event.time}
                venue={event.venue}
                city={event.city}
                emoji={event.emoji}
                accent={event.accent}
                minPrice={event.minPrice}
                rating={event.rating}
                reviewCount={event.reviewCount}
                hot={event.hot}
                soldOut={event.soldOut}
                className="hover:shadow-md hover:border-primary/30"
              />
            </Link>
          ))}
        </div>
      )}

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        {[
          { label: 'Total events',  value: EVENTS.length.toString() },
          { label: 'Hot events',    value: EVENTS.filter((e) => e.hot).length.toString() },
          { label: 'Cities',        value: [...new Set(EVENTS.map((e) => e.city))].length.toString() },
          { label: 'Avg. rating',   value: (EVENTS.reduce((s, e) => s + e.rating, 0) / EVENTS.length).toFixed(1) },
        ].map((s) => (
          <div key={s.label} className="text-center p-4 rounded-xl bg-surface-raised">
            <p className="text-2xl font-black text-primary">{s.value}</p>
            <p className="text-xs text-text-secondary mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
