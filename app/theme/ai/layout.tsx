'use client';
import { useState } from 'react';
import { SkipLink } from '@/modules/ui/SkipLink';
import { Button } from '@/modules/ui/Button';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBrain,
  faBars,
  faHome,
  faCubes,
  faFlask,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import {
  faXTwitter as faXTwitterBrand,
  faGithub as faGithubBrand,
  faDiscord as faDiscordBrand,
} from '@fortawesome/free-brands-svg-icons';

const NAV_ITEMS = [
  { label: 'Home',       href: '/theme/ai',            icon: faHome       },
  { label: 'Models',     href: '/theme/ai/models',     icon: faCubes      },
  { label: 'Playground', href: '/theme/ai/playground', icon: faFlask      },
  { label: 'Usage',      href: '/theme/ai/usage',      icon: faChartLine  },
];

const FOOTER_COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'All Models',    href: '/theme/ai/models'     },
      { label: 'Playground',    href: '/theme/ai/playground' },
      { label: 'Usage',         href: '/theme/ai/usage'      },
      { label: 'Documentation', href: '/theme/ai'            },
    ],
  },
  {
    heading: 'Providers',
    links: [
      { label: 'OpenAI',    href: '/theme/ai/models' },
      { label: 'Anthropic', href: '/theme/ai/models' },
      { label: 'Google',    href: '/theme/ai/models' },
      { label: 'DeepSeek',  href: '/theme/ai/models' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',    href: '/theme/ai' },
      { label: 'Blog',     href: '/theme/ai' },
      { label: 'Careers',  href: '/theme/ai' },
      { label: 'Contact',  href: '/theme/ai' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   href: '/theme/ai' },
  { label: 'Terms of Service', href: '/theme/ai' },
  { label: 'Accessibility',    href: '/theme/ai' },
];

export default function AIThemeLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-surface-base text-text-primary">
      <SkipLink href="#main-content" />

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 shadow-sm bg-surface-base border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center h-16 gap-4">

            {/* Logo */}
            <a href="/theme/ai" className="inline-flex items-center gap-2 shrink-0">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                <FontAwesomeIcon icon={faBrain} className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-text-primary hidden sm:block">
                Neural<span className="text-primary">Hub</span>
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

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-text-secondary hover:text-text-primary">
                Sign In
              </Button>
              <Button variant="primary" size="sm" className="hidden sm:inline-flex">
                Get API Key
              </Button>

              {/* Mobile hamburger */}
              <div className="md:hidden">
                <NavDrawer
                  title="NeuralHub"
                  side="right"
                  trigger={(
                    <Button
                      variant="ghost"
                      size="sm"
                      iconOnly
                      aria-label="Open menu"
                      onClick={() => setMobileOpen(!mobileOpen)}
                    >
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
                      <Button variant="primary" fullWidth size="sm">Get API Key</Button>
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

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-surface-raised mt-16">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-4">
              <a href="/theme/ai" className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                  <FontAwesomeIcon icon={faBrain} className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-base font-extrabold tracking-tight">
                  Neural<span className="text-primary">Hub</span>
                </span>
              </a>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                The AI model directory and playground for developers and researchers.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://x.com" aria-label="X (Twitter)" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faXTwitterBrand} className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a href="https://github.com" aria-label="GitHub" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faGithubBrand} className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a href="https://discord.com" aria-label="Discord" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faDiscordBrand} className="w-3.5 h-3.5" aria-hidden="true" />
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
              &copy; {new Date().getFullYear()} NeuralHub. All rights reserved.
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
