'use client';
import { useState } from 'react';
import { SkipLink } from '@/modules/ui/SkipLink';
import { Button } from '@/modules/ui/Button';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faWallet,
  faArrowRightArrowLeft,
  faPaperPlane,
  faBars,
  faCreditCard,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import { faXTwitter as faXTwitterBrand, faLinkedin as faLinkedinBrand, faGithub as faGithubBrand } from '@fortawesome/free-brands-svg-icons';

const NAV_ITEMS = [
  { label: 'Dashboard',    href: '/theme/fintech',              icon: faChartPie },
  { label: 'Wallets',      href: '/theme/fintech/wallets',      icon: faWallet },
  { label: 'Transactions', href: '/theme/fintech/transactions', icon: faArrowRightArrowLeft },
  { label: 'Transfer',     href: '/theme/fintech/transfer',     icon: faPaperPlane },
];

const FOOTER_COLUMNS = [
  {
    heading: 'Products',
    links: [
      { label: 'Digital Wallet', href: '/theme/fintech' },
      { label: 'FX Exchange',    href: '/theme/fintech' },
      { label: 'Payments',       href: '/theme/fintech' },
      { label: 'Transfers',      href: '/theme/fintech/transfer' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',    href: '/theme/fintech' },
      { label: 'Careers',     href: '/theme/fintech' },
      { label: 'Blog',        href: '/theme/fintech' },
      { label: 'Press',       href: '/theme/fintech' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center',  href: '/theme/fintech' },
      { label: 'Contact Us',   href: '/theme/fintech' },
      { label: 'Status',       href: '/theme/fintech' },
      { label: 'Security',     href: '/theme/fintech' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   href: '/theme/fintech' },
  { label: 'Terms of Service', href: '/theme/fintech' },
  { label: 'Cookie Settings',  href: '/theme/fintech' },
];

export default function FintechThemeLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  void mobileMenuOpen;

  return (
    <div className="min-h-screen flex flex-col bg-surface-base text-text-primary">
      <SkipLink href="#main-content" />

      <header className="sticky top-0 z-50 bg-surface-base border-b border-border shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3 h-16">

            {/* Logo */}
            <a href="/theme/fintech" className="inline-flex items-center gap-2 shrink-0 mr-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-text-primary hidden sm:block">
                Fin<span className="text-primary">Pay</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
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

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" iconOnly aria-label="Notifications" className="hidden sm:inline-flex">
                <FontAwesomeIcon icon={faBell} className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                Sign In
              </Button>
              <Button variant="primary" size="sm" className="hidden md:inline-flex font-semibold">
                Get Started
              </Button>

              {/* Mobile hamburger */}
              <div className="md:hidden">
                <NavDrawer
                  title="FinPay"
                  side="right"
                  trigger={(
                    <Button variant="ghost" size="sm" iconOnly aria-label="Open menu">
                      <FontAwesomeIcon icon={faBars} className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  )}
                >
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
                  <div className="flex flex-col gap-2 pt-4 border-t border-border mt-4">
                    <Button variant="outline" fullWidth size="sm">Sign In</Button>
                    <Button variant="primary" fullWidth size="sm">Get Started</Button>
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
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4">
              <a href="/theme/fintech" className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                  <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-base font-extrabold tracking-tight">
                  Fin<span className="text-primary">Pay</span>
                </span>
              </a>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                Digital banking and payments for everyone. Fast, secure, and borderless.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://x.com" aria-label="X (Twitter)" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faXTwitterBrand} className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faLinkedinBrand} className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a href="https://github.com" aria-label="GitHub" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faGithubBrand} className="w-3.5 h-3.5" aria-hidden="true" />
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
              &copy; {new Date().getFullYear()} FinPay Ltd. All rights reserved.
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
