'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { cn } from '@/libs/utils/cn';
import { ProductCard } from '@/modules/domain/ecommerce/ProductCard';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Select } from '@/modules/ui/Select';
import { EmptyState } from '@/modules/ui/EmptyState';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { PRODUCTS, CATEGORIES, SPEC_FILTER_KEYS, type ProductSpecs } from '../shop.data';

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'name',       label: 'Name A–Z' },
];

const ALL_BRANDS = [...new Set(PRODUCTS.map((p) => p.brand).filter(Boolean) as string[])].sort();

function getSpecOptions(key: keyof ProductSpecs): string[] {
  const vals = PRODUCTS.map((p) => p.specs?.[key]).filter(Boolean) as string[];
  return [...new Set(vals)].sort();
}

// ── Accordion ──────────────────────────────────────────────────────────────
function FilterAccordion({
  title,
  badge,
  defaultOpen = true,
  children,
}: {
  title: string;
  badge?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-surface-raised hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          {title}
          {badge != null && badge > 0 && (
            <Badge variant="primary" size="sm">{badge}</Badge>
          )}
        </span>
        <span
          className={cn(
            'text-text-secondary text-xs transition-transform duration-200',
            open ? 'rotate-180' : 'rotate-0'
          )}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="px-4 py-3 bg-surface-base border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Spec checkbox row ───────────────────────────────────────────────────────
function SpecCheckList({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  function toggle(val: string) {
    onChange(
      selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]
    );
  }
  return (
    <ul className="space-y-1.5">
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <li key={opt}>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(opt)}
                className="w-4 h-4 accent-primary focus-visible:ring-2 focus-visible:ring-border-focus rounded"
              />
              <span
                className={cn(
                  'text-sm transition-colors',
                  checked ? 'font-semibold text-primary' : 'text-text-primary group-hover:text-primary'
                )}
              >
                {opt}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [search, setSearch]                     = useState('');
  const [sort, setSort]                         = useState('featured');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands]     = useState<string[]>([]);
  const [inStockOnly, setInStockOnly]           = useState(false);
  const [priceMin, setPriceMin]                 = useState('');
  const [priceMax, setPriceMax]                 = useState('');
  const [minRating, setMinRating]               = useState(0);
  const [selectedSpecs, setSelectedSpecs]       = useState<Partial<Record<keyof ProductSpecs, string[]>>>({});

  function toggleCategory(id: string) {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  }

  function toggleSpec(key: keyof ProductSpecs, val: string) {
    setSelectedSpecs((prev) => {
      const cur = prev[key] ?? [];
      return {
        ...prev,
        [key]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val],
      };
    });
  }

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategoryIds.length > 0) {
      list = list.filter((p) => selectedCategoryIds.includes(p.category));
    }
    if (selectedBrands.length > 0) {
      list = list.filter((p) => p.brand && selectedBrands.includes(p.brand));
    }
    if (inStockOnly) {
      list = list.filter((p) => p.inStock !== false);
    }
    const min = parseFloat(priceMin);
    const max = parseFloat(priceMax);
    if (!isNaN(min)) list = list.filter((p) => p.price >= min);
    if (!isNaN(max)) list = list.filter((p) => p.price <= max);
    if (minRating > 0) {
      list = list.filter((p) => (p.rating ?? 0) >= minRating);
    }
    Object.entries(selectedSpecs).forEach(([key, vals]) => {
      if (!vals || vals.length === 0) return;
      list = list.filter((p) => {
        const v = p.specs?.[key as keyof ProductSpecs];
        return v != null && vals.includes(v);
      });
    });
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
      case 'name':       list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return list;
  }, [search, sort, selectedCategoryIds, selectedBrands, inStockOnly, priceMin, priceMax, minRating, selectedSpecs]);

  const specActiveCount = Object.values(selectedSpecs).reduce((s, v) => s + (v?.length ?? 0), 0);
  const activeFilterCount =
    selectedCategoryIds.length +
    selectedBrands.length +
    (inStockOnly ? 1 : 0) +
    (priceMin || priceMax ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    specActiveCount;

  function clearFilters() {
    setSelectedCategoryIds([]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setPriceMin('');
    setPriceMax('');
    setMinRating(0);
    setSelectedSpecs({});
    setSearch('');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Home', href: '/theme/shop' }, { label: 'All Products' }]} />

      <div className="mt-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-text-primary">All Products</h1>
          <p className="text-sm text-text-secondary mt-0.5">{filtered.length} products found</p>
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all filters <Badge variant="neutral" size="sm">{activeFilterCount}</Badge>
          </Button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-64 shrink-0 space-y-3" aria-label="Product filters">

          {/* Search */}
          <FilterAccordion title="Search" defaultOpen>
            <SearchBar value={search} onChange={setSearch} placeholder="Search products…" />
          </FilterAccordion>

          {/* Sort */}
          <FilterAccordion title="Sort by" defaultOpen>
            <Select
              id="sort"
              label=""
              options={SORT_OPTIONS}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            />
          </FilterAccordion>

          {/* Category */}
          <FilterAccordion title="Category" badge={selectedCategoryIds.length} defaultOpen>
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => {
                const active = selectedCategoryIds.includes(cat.id);
                const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      aria-pressed={active}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                        active
                          ? 'bg-primary-subtle text-primary font-semibold'
                          : 'text-text-primary hover:bg-surface-overlay'
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        {cat.label}
                      </span>
                      <span className={cn('text-xs', active ? 'text-primary' : 'text-text-disabled')}>
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {selectedCategoryIds.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedCategoryIds([])}
                className="mt-2 text-xs text-text-secondary hover:text-error transition-colors"
              >
                ✕ Clear
              </button>
            )}
          </FilterAccordion>

          {/* Price range */}
          <FilterAccordion title="Price Range" badge={priceMin || priceMax ? 1 : 0} defaultOpen={false}>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                placeholder="Min $"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-border bg-surface-base text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
              />
              <span className="text-text-disabled text-sm shrink-0">—</span>
              <input
                type="number"
                min={0}
                placeholder="Max $"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-border bg-surface-base text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
              />
            </div>
            {(priceMin || priceMax) && (
              <button
                type="button"
                onClick={() => { setPriceMin(''); setPriceMax(''); }}
                className="mt-2 text-xs text-text-secondary hover:text-error transition-colors"
              >
                ✕ Clear
              </button>
            )}
          </FilterAccordion>

          {/* Brand */}
          <FilterAccordion title="Brand" badge={selectedBrands.length} defaultOpen={false}>
            <SpecCheckList
              options={ALL_BRANDS}
              selected={selectedBrands}
              onChange={setSelectedBrands}
            />
            {selectedBrands.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedBrands([])}
                className="mt-2 text-xs text-text-secondary hover:text-error transition-colors"
              >
                ✕ Clear
              </button>
            )}
          </FilterAccordion>

          {/* Rating */}
          <FilterAccordion title="Min Rating" badge={minRating > 0 ? 1 : 0} defaultOpen={false}>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMinRating(minRating === r ? 0 : r)}
                  className={cn(
                    'flex-1 py-1.5 text-xs rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                    minRating === r
                      ? 'bg-warning text-white border-warning font-bold'
                      : 'border-border text-text-secondary hover:border-warning hover:text-warning'
                  )}
                  aria-pressed={minRating === r}
                  title={`${r}★ and above`}
                >
                  {r}★
                </button>
              ))}
            </div>
          </FilterAccordion>

          {/* Availability */}
          <FilterAccordion title="Availability" defaultOpen>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-primary focus-visible:ring-2 focus-visible:ring-border-focus rounded"
              />
              <span className="text-sm text-text-primary group-hover:text-primary transition-colors">
                In stock only
              </span>
            </label>
          </FilterAccordion>

          {/* Specifications */}
          <FilterAccordion title="Specifications" badge={specActiveCount} defaultOpen={false}>
            <div className="space-y-5">
              {SPEC_FILTER_KEYS.map(({ key, label }) => {
                const opts = getSpecOptions(key);
                if (opts.length === 0) return null;
                const selected = selectedSpecs[key] ?? [];
                return (
                  <div key={key}>
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-2">{label}</p>
                    <SpecCheckList
                      options={opts}
                      selected={selected}
                      onChange={(next) => setSelectedSpecs((prev) => ({ ...prev, [key]: next }))}
                    />
                  </div>
                );
              })}
              {specActiveCount > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedSpecs({})}
                  className="text-xs text-text-secondary hover:text-error transition-colors"
                >
                  ✕ Clear all specs
                </button>
              )}
            </div>
          </FilterAccordion>

        </aside>

        {/* ── Product grid ── */}
        <div className="flex-1 min-w-0">
          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategoryIds.map((id) => {
                const cat = CATEGORIES.find((c) => c.id === id);
                if (!cat) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleCategory(id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-subtle text-primary border border-primary hover:bg-primary hover:text-primary-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    {cat.icon} {cat.label} ✕
                  </button>
                );
              })}
              {selectedBrands.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleBrand(b)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface-overlay text-text-primary border border-border hover:border-error hover:text-error transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  {b} ✕
                </button>
              ))}
              {minRating > 0 && (
                <button
                  type="button"
                  onClick={() => setMinRating(0)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/40 hover:bg-warning hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  {minRating}★+ ✕
                </button>
              )}
              {Object.entries(selectedSpecs).flatMap(([key, vals]) =>
                (vals ?? []).map((val) => (
                  <button
                    key={`${key}-${val}`}
                    type="button"
                    onClick={() => toggleSpec(key as keyof ProductSpecs, val)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-info-subtle text-info border border-info/30 hover:bg-info hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    {val} ✕
                  </button>
                ))
              )}
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No products found"
              description="Try adjusting your search or clearing the filters."
              action={
                <Button variant="primary" size="sm" onClick={clearFilters}>
                  Clear all filters
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  href={`/theme/shop/products/${product.slug}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
