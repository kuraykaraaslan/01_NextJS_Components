'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';

function RentalHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface-base border-b border-border shadow-sm">
      {/* Promo bar */}
      <div className="bg-primary text-primary-fg text-xs text-center py-2 px-4 font-medium">
        New: Electric vehicles now available across 12 Istanbul districts
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link
          href="/theme/rental"
          className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
        >
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm">M</span>
          </div>
          <span className="text-xl font-black text-text-primary tracking-tight hidden sm:block">
            Moovy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1 flex-1">
          <Link href="/theme/rental/map" className="px-3 py-1.5 text-sm font-semibold text-primary hover:bg-primary-subtle rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus flex items-center gap-1">
            🗺️ Live map
          </Link>
          <Link href="/theme/rental/vehicles" className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-overlay rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
            Fleet
          </Link>
          <a href="#pricing" className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-overlay rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
            Pricing
          </a>
          <Link href="/theme/rental/bookings" className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-overlay rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
            My trips
          </Link>
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            Log in
          </Button>
          <Button variant="primary" size="sm" className="hidden sm:flex">
            Sign up free
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            ☰
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-border bg-surface-raised md:hidden">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            <Link href="/theme/rental/vehicles" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg transition-colors">
              Fleet
            </Link>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg transition-colors">
              How it works
            </a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg transition-colors">
              Pricing
            </a>
            <Link href="/theme/rental/bookings" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg transition-colors">
              My trips
            </Link>
            <div className="flex gap-2 pt-2 border-t border-border mt-1">
              <Button variant="ghost" size="sm" fullWidth>Log in</Button>
              <Button variant="primary" size="sm" fullWidth>Sign up</Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function RentalFooter() {
  return (
    <footer className="bg-surface-raised border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <span className="text-white font-black text-xs">M</span>
              </div>
              <span className="text-base font-black text-text-primary">Moovy</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Your city, your car. Find, reserve, and drive away in minutes with Moovy's smart rental platform.
            </p>
            <div className="flex gap-2 mt-3">
              <Badge variant="success" size="sm">App Store</Badge>
              <Badge variant="info" size="sm">Google Play</Badge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-3">Explore</h4>
            <ul className="space-y-2">
              {['All vehicles', 'Compacts', 'SUVs', 'Electric', 'Luxury', 'Vans'].map((s) => (
                <li key={s}>
                  <Link href="/theme/rental/vehicles" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-3">Support</h4>
            <ul className="space-y-2">
              {['Help centre', 'Damage & claims', 'Cancellation policy', 'Roadside assist', 'Contact us'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-3">Company</h4>
            <ul className="space-y-2">
              {['About Moovy', 'Careers', 'Press', 'Sustainability', 'Privacy policy', 'Terms of use'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-disabled">© 2026 Moovy Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Badge variant="neutral" size="sm">🔒 Fully insured</Badge>
            <Badge variant="success" size="sm">✅ Verified drivers</Badge>
            <Badge variant="info" size="sm">📞 24/7 support</Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RentalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-primary text-primary-fg px-4 py-2 rounded-lg text-sm font-medium">
        Skip to main content
      </a>
      <RentalHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <RentalFooter />
    </div>
  );
}
