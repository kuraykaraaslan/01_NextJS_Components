'use client';
import Link from 'next/link';
import { useState } from 'react';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';

const NAV_LINKS = [
  { label: 'World', href: '/theme/news/category' },
  { label: 'Technology', href: '/theme/news/category' },
  { label: 'Finance', href: '/theme/news/category' },
  { label: 'Science', href: '/theme/news/category' },
  { label: 'Health', href: '/theme/news/category' },
  { label: 'Environment', href: '/theme/news/category' },
  { label: 'Politics', href: '/theme/news/category' },
  { label: 'Sport', href: '/theme/news/category' },
];

function NewsHeader() {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface-base border-b border-border shadow-sm">
      {/* Top bar */}
      <div className="border-b border-border bg-surface-raised">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Badge variant="error" size="sm">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </span>
            </Badge>
            <span className="text-xs text-text-secondary hidden sm:block">
              Monday, April 21, 2026 · Markets open · Dow +0.8%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="xs">Sign in</Button>
            <Button variant="primary" size="xs">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/theme/news" className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded">
          <div className="w-8 h-8 rounded-lg bg-error flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm">N</span>
          </div>
          <span className="text-xl font-black text-text-primary tracking-tight hidden sm:block">
            NewsHub
          </span>
        </Link>

        <div className="flex-1 max-w-sm hidden md:block">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search articles, topics…"
          />
        </div>

        <div className="flex items-center gap-2">
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

      {/* Navigation */}
      <nav
        aria-label="Main navigation"
        className={`border-t border-border bg-surface-base ${menuOpen ? 'block' : 'hidden'} md:block`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:items-center gap-0 md:gap-0 overflow-x-auto">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="md:ml-auto">
              <Link
                href="/theme/news/article"
                className="block px-3 py-2.5 text-sm font-medium text-primary hover:text-primary-hover whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
              >
                Today's Top Story →
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

function NewsFooter() {
  return (
    <footer className="bg-surface-raised border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-error flex items-center justify-center">
                <span className="text-white font-black text-xs">N</span>
              </div>
              <span className="text-base font-black text-text-primary">NewsHub</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Independent journalism you can trust. Reporting the stories that matter since 2008.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-3">Sections</h4>
            <ul className="space-y-2">
              {['World', 'Technology', 'Finance', 'Science', 'Health'].map((s) => (
                <li key={s}>
                  <Link href="/theme/news/category" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-3">Company</h4>
            <ul className="space-y-2">
              {['About us', 'Careers', 'Press', 'Contact', 'Advertise'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-3">Legal</h4>
            <ul className="space-y-2">
              {['Privacy policy', 'Terms of use', 'Cookie settings', 'Corrections'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-disabled">© 2026 NewsHub Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Badge variant="success" size="sm">RSS</Badge>
            <Badge variant="info" size="sm">Podcast</Badge>
            <Badge variant="neutral" size="sm">App</Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <NewsHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <NewsFooter />
    </div>
  );
}
