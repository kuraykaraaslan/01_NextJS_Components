'use client';
import { useState } from 'react';
import { SkipLink } from '@/modules/ui/SkipLink';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { NavDrawer } from '@/modules/app/NavDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faShoppingCart,
  faClipboardList,
  faBars,
  faHome,
  faBoxOpen,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { faXTwitter as faXTwitterBrand, faInstagram as faInstagramBrand, faGithub as faGithubBrand } from '@fortawesome/free-brands-svg-icons';
import { CART_ITEMS } from './commerce.data';

const NAV_ITEMS = [
  { label: 'Home',     href: '/theme/commerce',         icon: faHome },
  { label: 'Products', href: '/theme/commerce/products', icon: faBoxOpen },
  { label: 'Orders',   href: '/theme/commerce/orders',   icon: faClipboardList },
];

const FOOTER_COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'All Products',    href: '/theme/commerce/products' },
      { label: 'Electronics',     href: '/theme/commerce/products' },
      { label: 'Clothing',        href: '/theme/commerce/products' },
      { label: 'Software',        href: '/theme/commerce/products' },
      { label: 'Books',           href: '/theme/commerce/products' },
      { label: 'Services',        href: '/theme/commerce/products' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'My Orders',       href: '/theme/commerce/orders' },
      { label: 'My Cart',         href: '/theme/commerce/cart'   },
      { label: 'Wishlist',        href: '/theme/commerce'        },
      { label: 'Profile',         href: '/theme/commerce'        },
      { label: 'Addresses',       href: '/theme/commerce'        },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'FAQ',             href: '/theme/commerce' },
      { label: 'Shipping Info',   href: '/theme/commerce' },
      { label: 'Returns',         href: '/theme/commerce' },
      { label: 'Track Order',     href: '/theme/commerce' },
      { label: 'Contact Us',      href: '/theme/commerce' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',        href: '/theme/commerce' },
      { label: 'Blog',            href: '/theme/commerce' },
      { label: 'Press',           href: '/theme/commerce' },
      { label: 'Careers',         href: '/theme/commerce' },
      { label: 'Privacy Policy',  href: '/theme/commerce' },
      { label: 'Terms of Service',href: '/theme/commerce' },
    ],
  },
];

export default function CommerceThemeLayout({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('');
  const cartCount = CART_ITEMS.length;

  return (
    <div className="min-h-screen flex flex-col bg-surface-base text-text-primary">
      <SkipLink href="#main-content" />

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-surface-base border-b border-border shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3 h-16">

            {/* Brand */}
            <a href="/theme/commerce" className="inline-flex items-center gap-2 shrink-0 mr-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                <FontAwesomeIcon icon={faStore} className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-text-primary hidden sm:block">
                Shop<span className="text-primary">Flow</span>
              </span>
            </a>

            {/* Search — desktop */}
            <div className="hidden md:flex flex-1 max-w-xl items-center rounded-xl border border-border bg-surface-raised px-3 py-0 focus-within:ring-2 focus-within:ring-border-focus transition-shadow overflow-hidden">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 text-text-secondary shrink-0 mr-2" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-secondary outline-none py-2.5"
                aria-label="Search products"
              />
            </div>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-text-secondary">
                Sign In
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                Register
              </Button>

              {/* Cart */}
              <a
                href="/theme/commerce/cart"
                className="relative inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-surface-raised text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                aria-label={`Shopping cart, ${cartCount} items`}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-fg">
                    {cartCount}
                  </span>
                )}
              </a>

              {/* Mobile menu */}
              <div className="md:hidden">
                <NavDrawer
                  title="ShopFlow"
                  side="right"
                  trigger={(
                    <Button variant="ghost" size="sm" iconOnly aria-label="Open menu">
                      <FontAwesomeIcon icon={faBars} className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  )}
                >
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-3 py-2">
                      <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 text-text-secondary" aria-hidden="true" />
                      <input
                        type="search"
                        placeholder="Search products…"
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
                      <a
                        href="/theme/commerce/cart"
                        className="flex items-center gap-3 px-2 py-3 text-sm font-medium text-text-primary hover:bg-surface-overlay rounded-lg transition-colors"
                      >
                        <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4 text-text-secondary" aria-hidden="true" />
                        Cart
                        {cartCount > 0 && (
                          <Badge variant="primary" size="sm">{cartCount}</Badge>
                        )}
                      </a>
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

        {/* ── Category nav ── */}
        <div className="hidden md:block bg-surface-raised border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <nav className="flex items-center gap-1" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-subtle rounded transition-colors relative group"
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
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-4">
              <a href="/theme/commerce" className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
                  <FontAwesomeIcon icon={faStore} className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-base font-extrabold tracking-tight">
                  Shop<span className="text-primary">Flow</span>
                </span>
              </a>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                A modern e-commerce experience — discover products you will love, delivered fast.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://x.com" aria-label="X (Twitter)" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faXTwitterBrand} className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a href="https://instagram.com" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  <FontAwesomeIcon icon={faInstagramBrand} className="w-3.5 h-3.5" aria-hidden="true" />
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
              &copy; {new Date().getFullYear()} ShopFlow, Inc. All rights reserved.
            </p>
            <nav className="flex flex-wrap items-center gap-4 order-1 sm:order-2" aria-label="Legal navigation">
              {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((label) => (
                <a key={label} href="/theme/commerce" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
