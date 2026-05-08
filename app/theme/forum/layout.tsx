'use client';
import { useState } from 'react';
import { SkipLink } from '@/modules/ui/SkipLink';
import { Button } from '@/modules/ui/Button';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faHouse,
  faLayerGroup,
  faBolt,
  faMagnifyingGlass,
  faBars,
  faRss,
} from '@fortawesome/free-solid-svg-icons';
import { faXTwitter as faXTwitterBrand, faGithub as faGithubBrand, faDiscord as faDiscordBrand } from '@fortawesome/free-brands-svg-icons';

const NAV_ITEMS = [
  { label: 'Home',       href: '/theme/forum',            icon: faHouse },
  { label: 'Categories', href: '/theme/forum/categories', icon: faLayerGroup },
  { label: 'Latest',     href: '/theme/forum/topics',     icon: faBolt },
];

const FOOTER_COLUMNS = [
  {
    heading: 'Community',
    links: [
      { label: 'Latest Topics',  href: '/theme/forum/topics' },
      { label: 'Categories',     href: '/theme/forum/categories' },
      { label: 'New Members',    href: '/theme/forum' },
      { label: 'FAQ',            href: '/theme/forum' },
      { label: 'Leaderboard',    href: '/theme/forum' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Guidelines',     href: '/theme/forum' },
      { label: 'Moderation',     href: '/theme/forum' },
      { label: 'API Docs',       href: '/theme/forum' },
      { label: 'Badges',         href: '/theme/forum' },
      { label: 'Trust Levels',   href: '/theme/forum' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',          href: '/theme/forum' },
      { label: 'Blog',           href: '/theme/forum' },
      { label: 'Privacy Policy', href: '/theme/forum' },
      { label: 'Terms of Use',   href: '/theme/forum' },
      { label: 'Contact',        href: '/theme/forum' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/theme/forum' },
  { label: 'Terms of Service', href: '/theme/forum' },
  { label: 'Cookie Settings', href: '/theme/forum' },
];

export default function ForumThemeLayout({ children }: { children: React.ReactNode }) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-surface-base text-text-primary">
      <SkipLink href="#main-content" />

      <header className="sticky top-0 z-50 shadow-sm">
        {/* ── Row 1: Brand + Search + Auth ── */}
        <div className="bg-[var(--surface-base)] border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center gap-3 h-16">

              {/* Logo */}
              <a
                href="/theme/forum"
                className="inline-flex items-center gap-2 shrink-0 mr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-lg"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                  <FontAwesomeIcon icon={faComments} className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-lg font-extrabold tracking-tight text-text-primary hidden sm:block">
                  Dis<span className="text-primary">course</span>
                </span>
              </a>

              {/* Search — desktop */}
              <div className="hidden md:flex flex-1 max-w-xl items-center rounded-xl border border-border bg-surface-raised overflow-hidden focus-within:ring-2 focus-within:ring-border-focus transition-shadow px-3 gap-2">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 text-text-secondary shrink-0" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search topics, posts, or users…"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-secondary outline-none py-2.5"
                  aria-label="Search forum"
                />
              </div>

              {/* Auth */}
              <div className="ml-auto flex items-center gap-2 shrink-0">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-text-secondary hover:text-text-primary">
                  Log In
                </Button>
                <Button variant="primary" size="sm" className="hidden sm:inline-flex font-semibold">
                  Sign Up
                </Button>

                {/* Mobile hamburger */}
                <div className="sm:hidden">
                  <NavDrawer
                    title="Discourse"
                    side="right"
                    trigger={(
                      <Button variant="ghost" size="sm" iconOnly aria-label="Open menu">
                        <FontAwesomeIcon icon={faBars} className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    )}
                  >
                    <div className="space-y-5">
                      {/* Mobile search */}
                      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-3 py-2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 text-text-secondary" aria-hidden="true" />
                        <input
                          type="search"
                          placeholder="Search…"
                          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-secondary outline-none"
                        />
                      </div>

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
                        <Button variant="outline" fullWidth size="sm">Log In</Button>
                        <Button variant="primary" fullWidth size="sm">Sign Up Free</Button>
                      </div>
                    </div>
                  </NavDrawer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: Category nav ── */}
        <div className="hidden sm:block bg-surface-raised border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <nav className="flex items-center gap-1" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-subtle rounded transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <FontAwesomeIcon icon={item.icon} className="w-3.5 h-3.5" aria-hidden="true" />
                  {item.label}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t" />
                </a>
              ))}
            </nav>
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
              <a href="/theme/forum" className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                  <FontAwesomeIcon icon={faComments} className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-base font-extrabold tracking-tight">
                  Dis<span className="text-primary">course</span>
                </span>
              </a>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                A friendly community forum for developers, designers, and makers to learn and grow together.
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
                <a href="/theme/forum" aria-label="RSS Feed" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faRss} className="w-3.5 h-3.5" aria-hidden="true" />
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
                      <a href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
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
              &copy; {new Date().getFullYear()} Discourse Community. All rights reserved.
            </p>
            <nav className="flex flex-wrap items-center gap-4 order-1 sm:order-2" aria-label="Legal navigation">
              {LEGAL_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="text-xs text-text-secondary hover:text-text-primary transition-colors">
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
