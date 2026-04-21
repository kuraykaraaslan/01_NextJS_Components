'use client';
import Link from 'next/link';
import { useState } from 'react';
import { VehicleCard } from '@/modules/domain/mobility/VehicleCard';
import { VehicleSearchPanel } from '@/modules/domain/mobility/VehicleSearchPanel';
import { ActiveRentalPanel } from '@/modules/domain/mobility/ActiveRentalPanel';
import { VEHICLES as ALL_VEHICLES } from './rental.data';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import {
  VEHICLES,
  FLEET_CATEGORIES,
  HERO_SLIDES,
  FEATURED_VEHICLE_IDS,
  TESTIMONIALS,
} from './rental.data';

// ─── Hero ──────────────────────────────────────────────────────────────────────

function HeroBanner() {
  const [active, setActive] = useState(0);
  const slide = HERO_SLIDES[active];

  return (
    <div className="relative rounded-2xl overflow-hidden min-h-[340px] flex flex-col justify-center bg-surface-raised border border-border">
      <div className={`absolute inset-0 opacity-10 ${slide.accent}`} />
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12">
        <div className="flex-1 space-y-5 text-center lg:text-left">
          <Badge variant="primary" size="sm">{slide.badge}</Badge>
          <h1 className="text-3xl md:text-5xl font-black text-text-primary leading-tight">
            {slide.headline}
          </h1>
          <p className="text-base text-text-secondary max-w-md mx-auto lg:mx-0">{slide.sub}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link href={slide.ctaHref}>
              <Button variant="primary" size="lg">{slide.cta}</Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg">How it works</Button>
            </a>
          </div>
        </div>
        <div className="flex-shrink-0 text-[120px] select-none opacity-25 hidden lg:block">
          {slide.emoji}
        </div>
      </div>

      {/* Search panel */}
      <div className="relative z-10 px-8 pb-8 lg:pb-10">
        <VehicleSearchPanel compact onSearch={() => {}} />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 right-8 flex gap-2">
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

// ─── Active demo rental ────────────────────────────────────────────────────────

// Tesla Model 3 is parked in Levent (inside zone z3 "Levent & Sarıyer")
const DEMO_VEHICLE = ALL_VEHICLES.find((v) => v.id === '4')!;
const DEMO_USER_POS: [number, number] = [41.062, 28.988]; // inside Şişli zone

function ActiveRentalDemo() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative">
      <div className="absolute -top-2 left-4 z-10">
        <Badge variant="success" size="sm">Demo — click map for live version</Badge>
      </div>
      <ActiveRentalPanel
        vehicle={DEMO_VEHICLE}
        pricingMode="minute"
        startTime={new Date(Date.now() - 1000 * 60 * 37)}
        userPosition={DEMO_USER_POS}
        onEndRental={() => setDismissed(true)}
      />
    </div>
  );
}

// ─── Fleet categories ──────────────────────────────────────────────────────────

function FleetCategories() {
  return (
    <section aria-labelledby="categories-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="categories-heading" className="text-xl font-bold text-text-primary">
          Browse by type
        </h2>
        <Link href="/theme/rental/vehicles">
          <Button variant="ghost" size="sm">View all →</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {FLEET_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/theme/rental/vehicles?category=${cat.slug}`}
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl"
          >
            <Card hoverable className="text-center p-4 space-y-2 h-full">
              <div className="text-3xl">{cat.emoji}</div>
              <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                {cat.label}
              </p>
              <p className="text-xs text-text-secondary">{cat.count} cars</p>
              <p className="text-xs font-semibold text-primary">from €{cat.priceFrom}/hr</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Featured vehicles ─────────────────────────────────────────────────────────

function FeaturedVehicles() {
  const featured = FEATURED_VEHICLE_IDS
    .map((id) => VEHICLES.find((v) => v.id === id))
    .filter(Boolean) as typeof VEHICLES;

  return (
    <section aria-labelledby="featured-heading">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 id="featured-heading" className="text-xl font-bold text-text-primary">
            Featured vehicles
          </h2>
          <Badge variant="primary" size="sm">Top picks</Badge>
        </div>
        <Link href="/theme/rental/vehicles">
          <Button variant="ghost" size="sm">See all →</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map((vehicle) => (
          <Link
            key={vehicle.id}
            href={`/theme/rental/vehicles/${vehicle.slug}`}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl"
          >
            <VehicleCard vehicle={vehicle} />
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── How it works ──────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { icon: '🔍', step: '01', title: 'Find a car',       desc: 'Search by location, date, and vehicle type. Real-time availability shown on the map.' },
    { icon: '📱', step: '02', title: 'Reserve it',       desc: 'Tap to reserve. Add your licence once — it\'s saved securely for future bookings.' },
    { icon: '🚗', step: '03', title: 'Unlock & drive',   desc: 'Walk to the car, unlock with the app, and go. No keys, no queues, no paperwork.' },
    { icon: '✅', step: '04', title: 'Park & pay',       desc: 'End the rental in the app. Lock, walk away. Payment is automatic from your wallet.' },
  ];

  return (
    <section id="how-it-works" aria-labelledby="how-heading">
      <div className="text-center mb-8">
        <Badge variant="info" size="sm" className="mb-3">Simple process</Badge>
        <h2 id="how-heading" className="text-2xl md:text-3xl font-black text-text-primary">
          Driving made effortless
        </h2>
        <p className="text-text-secondary mt-2 max-w-lg mx-auto">
          From zero to driving in under 3 minutes. Really.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <div key={s.step} className="relative">
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border z-0 -translate-x-1/2" />
            )}
            <Card className="p-5 space-y-3 relative z-10 h-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-subtle flex items-center justify-center text-lg shrink-0">
                  {s.icon}
                </div>
                <span className="text-xs font-black text-primary">{s.step}</span>
              </div>
              <h3 className="text-base font-bold text-text-primary">{s.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Pricing plans ─────────────────────────────────────────────────────────────

function PricingSection() {
  const plans = [
    {
      name: 'Pay as you go',
      price: 'From €6',
      per: 'per hour',
      badge: 'Most flexible',
      badgeVariant: 'neutral' as const,
      features: ['No subscription', 'Pay per minute after first hour', 'Free cancellation up to 30 min', 'All compact vehicles'],
      cta: 'Start driving',
      highlight: false,
    },
    {
      name: 'Monthly pass',
      price: '€49',
      per: 'per month',
      badge: 'Best value',
      badgeVariant: 'primary' as const,
      features: ['20 free hours included', 'Priority vehicle selection', '15% off all bookings', 'Access to EVs & SUVs', 'Rollover unused hours'],
      cta: 'Get monthly pass',
      highlight: true,
    },
    {
      name: 'Business',
      price: 'Custom',
      per: 'per month',
      badge: 'For teams',
      badgeVariant: 'info' as const,
      features: ['Centralised billing', 'Driver management', 'Usage reports & analytics', 'Dedicated account manager', 'Volume discounts'],
      cta: 'Contact sales',
      highlight: false,
    },
  ];

  return (
    <section id="pricing" aria-labelledby="pricing-heading">
      <div className="text-center mb-8">
        <Badge variant="warning" size="sm" className="mb-3">Transparent pricing</Badge>
        <h2 id="pricing-heading" className="text-2xl md:text-3xl font-black text-text-primary">
          Plans that fit your life
        </h2>
        <p className="text-text-secondary mt-2">No hidden fees. Ever.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-6 flex flex-col gap-4 ${plan.highlight ? 'border-2 border-primary' : ''}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-text-primary">{plan.name}</h3>
              <Badge variant={plan.badgeVariant} size="sm">{plan.badge}</Badge>
            </div>
            <div>
              <span className="text-3xl font-black text-text-primary">{plan.price}</span>
              <span className="text-sm text-text-secondary ml-1">{plan.per}</span>
            </div>
            <ul className="space-y-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-success mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button variant={plan.highlight ? 'primary' : 'outline'} fullWidth>
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ─── Trust bar ─────────────────────────────────────────────────────────────────

function TrustBar() {
  const perks = [
    { icon: '🛡️', title: 'Fully insured',       sub: 'Comprehensive cover on every trip' },
    { icon: '📍', title: '200+ locations',        sub: 'Cars across every Istanbul district' },
    { icon: '⚡', title: 'Unlock in 30 seconds', sub: 'NFC + app unlock, no keys needed'  },
    { icon: '💬', title: '24/7 support',          sub: 'Live chat, call, or in-app help'   },
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

// ─── Testimonials ──────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section aria-labelledby="reviews-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="reviews-heading" className="text-xl font-bold text-text-primary">
          What drivers say
        </h2>
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-warning font-bold">★ 4.8</span>
          <span className="text-text-secondary">· 3,200+ reviews</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t) => (
          <Card key={t.id} className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-warning text-sm">★</span>
              ))}
            </div>
            <p className="text-sm text-text-secondary leading-relaxed flex-1">
              &ldquo;{t.comment}&rdquo;
            </p>
            <div>
              <p className="text-sm font-semibold text-text-primary">{t.name}</p>
              <p className="text-xs text-text-disabled">{t.city} · drove {t.vehicle}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ─── App download CTA ──────────────────────────────────────────────────────────

function AppDownloadBanner() {
  return (
    <Card className="p-8 md:p-12 bg-primary text-center space-y-4 border-0">
      <p className="text-4xl">📱</p>
      <h3 className="text-2xl font-black text-primary-fg">Get the app — drive smarter</h3>
      <p className="text-primary-fg/80 text-sm max-w-md mx-auto">
        Real-time map, one-tap unlock, trip history, and instant support — all in your pocket.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Button variant="ghost" size="lg" className="bg-white text-primary hover:bg-white/90 border-0">
          App Store
        </Button>
        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
          Google Play
        </Button>
      </div>
    </Card>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function RentalHomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      <HeroBanner />
      <TrustBar />
      <ActiveRentalDemo />
      <FleetCategories />
      <FeaturedVehicles />
      <HowItWorks />
      <PricingSection />
      <Testimonials />
      <AppDownloadBanner />
    </div>
  );
}
