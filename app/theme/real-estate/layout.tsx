'use client';
import { useState } from 'react';
import { SkipLink } from '@/modules/ui/SkipLink';
import { Button } from '@/modules/ui/Button';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faBars,
  faHome,
  faList,
  faKey,
  faUsers,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { faXTwitter as faXTwitterBrand, faLinkedin as faLinkedinBrand, faInstagram as faInstagramBrand } from '@fortawesome/free-brands-svg-icons';

const NAV_ITEMS = [
  { label: 'Home',        href: '/theme/real-estate',            icon: faHome    },
  { label: 'Properties',  href: '/theme/real-estate/properties', icon: faList    },
  { label: 'For Sale',    href: '/theme/real-estate/properties', icon: faTag     },
  { label: 'For Rent',    href: '/theme/real-estate/properties', icon: faKey     },
  { label: 'Agents',      href: '/theme/real-estate/agents',     icon: faUsers   },
];

const FOOTER_COLUMNS = [
  {
    heading: 'Browse',
    links: [
      { label: 'All Properties',  href: '/theme/real-estate/properties' },
      { label: 'For Sale',        href: '/theme/real-estate/properties' },
      { label: 'For Rent',        href: '/theme/real-estate/properties' },
      { label: 'Short-term',      href: '/theme/real-estate/properties' },
      { label: 'New Listings',    href: '/theme/real-estate/properties' },
    ],
  },
  {
    heading: 'Property Types',
    links: [
      { label: 'Apartments',  href: '/theme/real-estate/properties' },
      { label: 'Houses',      href: '/theme/real-estate/properties' },
      { label: 'Villas',      href: '/theme/real-estate/properties' },
      { label: 'Commercial',  href: '/theme/real-estate/properties' },
      { label: 'Land',        href: '/theme/real-estate/properties' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',    href: '/theme/real-estate' },
      { label: 'Our Agents',  href: '/theme/real-estate/agents' },
      { label: 'Careers',     href: '/theme/real-estate' },
      { label: 'Blog',        href: '/theme/real-estate' },
      { label: 'Contact',     href: '/theme/real-estate' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   href: '/theme/real-estate' },
  { label: 'Terms of Service', href: '/theme/real-estate' },
  { label: 'Cookie Settings',  href: '/theme/real-estate' },
];

export default function RealEstateThemeLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-surface-base text-text-primary">
      <SkipLink href="#main-content" />

      <header className="sticky top-0 z-50 shadow-sm bg-surface-base border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <a href="/theme/real-estate" className="inline-flex items-center gap-2 shrink-0">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                <FontAwesomeIcon icon={faBuilding} className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-text-primary hidden sm:block">
                Estate<span className="text-primary">View</span>
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

            {/* Auth actions */}
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-text-secondary hover:text-text-primary">
                Sign In
              </Button>
              <Button variant="primary" size="sm" className="hidden sm:inline-flex font-semibold">
                List Property
              </Button>

              {/* Mobile hamburger */}
              <div className="md:hidden">
                <NavDrawer
                  title="EstateView"
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
                      <Button variant="primary" fullWidth size="sm">List Property</Button>
                    </div>
                  </div>
                </NavDrawer>
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
              <a href="/theme/real-estate" className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                  <FontAwesomeIcon icon={faBuilding} className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-base font-extrabold tracking-tight">
                  Estate<span className="text-primary">View</span>
                </span>
              </a>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                Find your perfect property in Turkey. Thousands of verified listings from trusted agents.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://x.com" aria-label="X (Twitter)" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faXTwitterBrand} className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faLinkedinBrand} className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a href="https://instagram.com" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faInstagramBrand} className="w-3.5 h-3.5" aria-hidden="true" />
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

          {/* Bottom bar */}
          <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-secondary order-2 sm:order-1">
              &copy; {new Date().getFullYear()} EstateView. All rights reserved.
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
