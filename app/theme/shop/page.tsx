'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ProductCard } from '@/modules/domain/ecommerce/ProductCard';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import {
  PRODUCTS,
  CATEGORIES,
  HERO_SLIDES,
  FEATURED_PRODUCT_IDS,
  NEW_ARRIVALS_IDS,
} from './shop.data';

function HeroBanner() {
  const [active, setActive] = useState(0);
  const slide = HERO_SLIDES[active];

  return (
    <div className="relative rounded-2xl overflow-hidden min-h-[320px] flex flex-col justify-center bg-surface-raised border border-border">
      <div className={`absolute inset-0 opacity-10 ${slide.accent}`} />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <Badge variant="primary" size="sm">{slide.badge}</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-text-primary leading-tight">
            {slide.headline}
          </h1>
          <p className="text-base text-text-secondary max-w-md">{slide.sub}</p>
          <Link href={slide.ctaHref}>
            <Button variant="primary" size="lg">{slide.cta}</Button>
          </Link>
        </div>
        <div className="flex-shrink-0 text-8xl select-none opacity-30">🛍️</div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
              i === active ? 'bg-primary' : 'bg-border-strong hover:bg-text-disabled'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryGrid() {
  return (
    <section aria-labelledby="categories-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="categories-heading" className="text-xl font-bold text-text-primary">
          Shop by Category
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/theme/shop/products?category=${cat.slug}`}
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl"
          >
            <Card hoverable className="text-center p-4 space-y-2 h-full">
              <div className="text-3xl">{cat.icon}</div>
              <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                {cat.label}
              </p>
              <p className="text-xs text-text-secondary">{cat.count} items</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const featured = FEATURED_PRODUCT_IDS
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  return (
    <section aria-labelledby="featured-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="featured-heading" className="text-xl font-bold text-text-primary">
          Featured Products
        </h2>
        <Link href="/theme/shop/products">
          <Button variant="ghost" size="sm">View all →</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((product) => (
          <Link
            key={product.id}
            href={`/theme/shop/products/${product.slug}`}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-6 bg-primary-subtle border-0 flex flex-col gap-3">
        <Badge variant="primary" size="sm">Electronics</Badge>
        <h3 className="text-lg font-bold text-text-primary">Tech That Moves You</h3>
        <p className="text-sm text-text-secondary">Headphones, keyboards, speakers — top brands at great prices.</p>
        <Link href="/theme/shop/products?category=electronics">
          <Button variant="primary" size="sm">Shop Electronics</Button>
        </Link>
      </Card>
      <Card className="p-6 bg-success-subtle border-0 flex flex-col gap-3">
        <Badge variant="success" size="sm">Sports</Badge>
        <h3 className="text-lg font-bold text-text-primary">Get Moving This Season</h3>
        <p className="text-sm text-text-secondary">Shoes, mats, bottles — everything for your active lifestyle.</p>
        <Link href="/theme/shop/products?category=sports">
          <Button variant="ghost" size="sm" className="text-success-fg hover:text-success">Shop Sports</Button>
        </Link>
      </Card>
    </div>
  );
}

function NewArrivals() {
  const arrivals = NEW_ARRIVALS_IDS
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  return (
    <section aria-labelledby="new-arrivals-heading">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 id="new-arrivals-heading" className="text-xl font-bold text-text-primary">New Arrivals</h2>
          <Badge variant="success" size="sm">Just in</Badge>
        </div>
        <Link href="/theme/shop/products">
          <Button variant="ghost" size="sm">See all →</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {arrivals.map((product) => (
          <Link
            key={product.id}
            href={`/theme/shop/products/${product.slug}`}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function TrustBar() {
  const perks = [
    { icon: '🚚', title: 'Free Shipping', sub: 'On orders over $50' },
    { icon: '↩️', title: 'Free Returns', sub: '30-day hassle-free returns' },
    { icon: '🔒', title: 'Secure Payment', sub: 'PCI-DSS compliant checkout' },
    { icon: '💬', title: '24/7 Support', sub: 'Chat, email, or phone' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {perks.map((p) => (
        <Card key={p.title} className="p-4 text-center space-y-1">
          <div className="text-2xl">{p.icon}</div>
          <p className="text-sm font-semibold text-text-primary">{p.title}</p>
          <p className="text-xs text-text-secondary">{p.sub}</p>
        </Card>
      ))}
    </div>
  );
}

function NewsletterBanner() {
  return (
    <Card className="p-6 md:p-10 text-center space-y-4 bg-surface-raised">
      <Badge variant="info" size="sm">Newsletter</Badge>
      <h3 className="text-2xl font-bold text-text-primary">Get Deals First</h3>
      <p className="text-text-secondary text-sm max-w-md mx-auto">
        Subscribe and be the first to hear about exclusive offers, new arrivals, and flash sales.
      </p>
      <form
        className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-4 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
          aria-label="Email address"
        />
        <Button variant="primary" size="sm" type="submit">Subscribe</Button>
      </form>
      <p className="text-xs text-text-disabled">No spam, unsubscribe at any time.</p>
    </Card>
  );
}

export default function ShopHomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      <HeroBanner />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoBanner />
      <NewArrivals />
      <NewsletterBanner />
    </div>
  );
}
