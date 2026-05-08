'use client';
import { useState } from 'react';
import { SkipLink } from '@/modules/ui/SkipLink';
import { Button } from '@/modules/ui/Button';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlane,
  faHotel,
  faTicket,
  faHouse,
  faBars,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import {
  faXTwitter as faXTwitterBrand,
  faInstagram as faInstagramBrand,
  faFacebook as faFacebookBrand,
} from '@fortawesome/free-brands-svg-icons';

const NAV_ITEMS = [
  { label: 'Home',        href: '/theme/travel',          icon: faHouse   },
  { label: 'Flights',     href: '/theme/travel/flights',  icon: faPlane   },
  { label: 'Hotels',      href: '/theme/travel/hotels',   icon: faHotel   },
  { label: 'My Bookings', href: '/theme/travel/bookings', icon: faTicket  },
];

const FOOTER_COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Flights',          href: '/theme/travel/flights'  },
      { label: 'Hotels',           href: '/theme/travel/hotels'   },
      { label: 'Popular Deals',    href: '/theme/travel'          },
      { label: 'Last Minute',      href: '/theme/travel'          },
    ],
  },
  {
    heading: 'Destinations',
    links: [
      { label: 'Istanbul',  href: '/theme/travel' },
      { label: 'London',    href: '/theme/travel' },
      { label: 'Dubai',     href: '/theme/travel' },
      { label: 'Paris',     href: '/theme/travel' },
      { label: 'New York',  href: '/theme/travel' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',    href: '/theme/travel' },
      { label: 'Careers',     href: '/theme/travel' },
      { label: 'Press',       href: '/theme/travel' },
      { label: 'Help Center', href: '/theme/travel' },
      { label: 'Contact',     href: '/theme/travel' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   href: '/theme/travel' },
  { label: 'Terms of Service', href: '/theme/travel' },
  { label: 'Cookie Settings',  href: '/theme/travel' },
];

export default function TravelThemeLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  void mobileMenuOpen; // used by NavDrawer internally

  return (
    <div className="min-h-screen flex flex-col bg-surface-base text-text-primary">
      <SkipLink href="#main-content" />

      <header className="sticky top-0 z-50 shadow-sm">
        {/* Brand row */}
        <div className="bg-[var(--surface-base)] border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center gap-4 h-16">

              {/* Logo */}
              <a href="/theme/travel" className="inline-flex items-center gap-2 shrink-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                  <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-lg font-extrabold tracking-tight text-text-primary hidden sm:block">
                  Voya<span className="text-primary">ger</span>
                </span>
              </a>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-1 ml-4" aria-label="Primary navigation">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-3.5 h-3.5" aria-hidden="true" />
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Auth */}
              <div className="ml-auto flex items-center gap-2 shrink-0">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Sign In
                </Button>
                <Button variant="primary" size="sm" className="hidden sm:inline-flex">
                  Register
                </Button>

                {/* Mobile hamburger */}
                <div className="md:hidden">
                  <NavDrawer
                    title="Voyager"
                    side="right"
                    trigger={(
                      <Button variant="ghost" size="sm" iconOnly aria-label="Open menu">
                        <FontAwesomeIcon icon={faBars} className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    )}
                  >
                    <div className="space-y-5">
                      <nav className="flex flex-col" aria-label="Mobile navigation">
                        {NAV_ITEMS.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-2 py-3 text-sm font-medium text-text-primary hover:bg-surface-overlay rounded-lg transition-colors"
                          >
                            <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-text-secondary" aria-hidden="true" />
                            {item.label}
                          </a>
                        ))}
                      </nav>
                      <div className="flex flex-col gap-2 pt-3 border-t border-border">
                        <Button variant="outline" fullWidth size="sm">Sign In</Button>
                        <Button variant="primary" fullWidth size="sm">Register</Button>
                      </div>
                    </div>
                  </NavDrawer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-raised mt-16">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-4">
              <a href="/theme/travel" className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                  <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-base font-extrabold tracking-tight">
                  Voya<span className="text-primary">ger</span>
                </span>
              </a>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                Your trusted travel companion. Discover flights, hotels, and adventures around the world.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://x.com" aria-label="X (Twitter)" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faXTwitterBrand} className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a href="https://instagram.com" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faInstagramBrand} className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a href="https://facebook.com" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faFacebookBrand} className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading} className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  {col.heading}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-secondary order-2 sm:order-1">
              &copy; {new Date().getFullYear()} Voyager Travel, Inc. All rights reserved.
            </p>
            <nav className="flex flex-wrap items-center gap-4 order-1 sm:order-2" aria-label="Legal navigation">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
