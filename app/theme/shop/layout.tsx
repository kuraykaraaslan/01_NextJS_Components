'use client';
import Link from 'next/link';
import { useState } from 'react';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { CATEGORIES } from './shop.data';

function ShopHeader() {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface-base border-b border-border shadow-sm">
      {/* Promo bar */}
      <div className="bg-primary text-primary-fg text-xs text-center py-2 px-4 font-medium">
        🚚 Free shipping on orders over $50 — Use code <strong>FREESHIP</strong>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link
          href="/theme/shop"
          className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm">N</span>
          </div>
          <span className="text-xl font-black text-text-primary tracking-tight hidden sm:block">
            Nexmart
          </span>
        </Link>

        <div className="flex-1 max-w-lg hidden md:block">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search products, brands…"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="hidden sm:flex" aria-label="Wishlist">
            ♡
          </Button>
          <Link href="/theme/shop/cart">
            <Button variant="outline" size="sm" iconLeft="🛒" aria-label="Cart">
              <span className="hidden sm:inline">Cart</span>
              <Badge variant="error" size="sm" className="ml-1">3</Badge>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="hidden sm:flex" aria-label="Account">
            👤
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

      {/* Category navigation */}
      <nav
        aria-label="Category navigation"
        className={`border-t border-border bg-surface-raised ${menuOpen ? 'block' : 'hidden'} md:block`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:items-center overflow-x-auto">
            <li>
              <Link
                href="/theme/shop/products"
                className="flex items-center gap-1 px-3 py-2.5 text-sm font-semibold text-primary hover:text-primary-hover whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded transition-colors"
              >
                All Products
              </Link>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/theme/shop/products?category=${cat.slug}`}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-overlay whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded transition-colors"
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

function ShopFooter() {
  return (
    <footer className="bg-surface-raised border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-white font-black text-xs">N</span>
              </div>
              <span className="text-base font-black text-text-primary">Nexmart</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Your one-stop shop for electronics, fashion, home goods, sports gear, and more. Quality products, fair prices.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-3">Shop</h4>
            <ul className="space-y-2">
              {['All Products', 'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'].map((s) => (
                <li key={s}>
                  <Link href="/theme/shop/products" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-3">Help</h4>
            <ul className="space-y-2">
              {['Track my order', 'Returns & refunds', 'Shipping info', 'Contact us', 'Size guide'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-3">Company</h4>
            <ul className="space-y-2">
              {['About Nexmart', 'Careers', 'Press', 'Affiliate program', 'Privacy policy', 'Terms of use'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment methods + trust badges */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-disabled">© 2026 Nexmart Ltd. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((pm) => (
              <Badge key={pm} variant="neutral" size="sm">{pm}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm">🔒 Secure checkout</Badge>
            <Badge variant="info" size="sm">📦 Free returns</Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <ShopHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <ShopFooter />
    </div>
  );
}
