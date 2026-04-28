'use client';
import { useState, useRef, useEffect } from 'react';
import { SkipLink } from '@/modules/ui/SkipLink';
import { SearchBar } from '@/modules/ui/SearchBar';

/* ────────────────────────────────────────────────────────
   Data
──────────────────────────────────────────────────────── */

const CITIES = [
  { id: 'istanbul', label: 'İstanbul', count: 142 },
  { id: 'ankara',   label: 'Ankara',   count: 58 },
  { id: 'izmir',    label: 'İzmir',    count: 43 },
  { id: 'bursa',    label: 'Bursa',    count: 21 },
  { id: 'antalya',  label: 'Antalya',  count: 17 },
  { id: 'adana',    label: 'Adana',    count: 9 },
  { id: 'konya',    label: 'Konya',    count: 8 },
  { id: 'gaziantep',label: 'Gaziantep',count: 6 },
];

const CATEGORIES = [
  { label: 'Konserler', href: '/themes/event/events?category=muzik',    icon: '🎵' },
  { label: 'Spor',      href: '/themes/event/events?category=spor',     icon: '⚽' },
  { label: 'Tiyatro',   href: '/themes/event/events?category=tiyatro',  icon: '🎭' },
  { label: 'Stand-up',  href: '/themes/event/events?category=standup',  icon: '😄' },
  { label: 'Festival',  href: '/themes/event/events?category=festival', icon: '🎪' },
  { label: 'Konferans', href: '/themes/event/events?category=konferans',icon: '💻' },
  { label: 'Tümü',      href: '/themes/event/events',                   icon: null },
];

const FOOTER_COLS = [
  {
    heading: 'Keşfet',
    links: [
      { label: 'Konserler',          href: '/themes/event/events?category=muzik' },
      { label: 'Spor Etkinlikleri',  href: '/themes/event/events?category=spor' },
      { label: 'Tiyatro & Sahne',    href: '/themes/event/events?category=tiyatro' },
      { label: 'Festival',           href: '/themes/event/events?category=festival' },
      { label: 'Stand-up',           href: '/themes/event/events?category=standup' },
    ],
  },
  {
    heading: 'Şehirler',
    links: [
      { label: 'İstanbul', href: '#' },
      { label: 'Ankara',   href: '#' },
      { label: 'İzmir',    href: '#' },
      { label: 'Bursa',    href: '#' },
      { label: 'Antalya',  href: '#' },
    ],
  },
  {
    heading: 'Organizatörler',
    links: [
      { label: 'Organizatör Ol',     href: '#' },
      { label: 'Etkinlik Oluştur',   href: '#' },
      { label: 'Fiyatlandırma',      href: '#' },
      { label: 'Başarı Hikayeleri',  href: '#' },
    ],
  },
  {
    heading: 'Destek',
    links: [
      { label: 'Yardım Merkezi',       href: '#' },
      { label: 'İade Politikası',      href: '#' },
      { label: 'Bize Ulaşın',          href: '#' },
      { label: 'Gizlilik',             href: '#' },
      { label: 'Kullanım Koşulları',   href: '#' },
    ],
  },
];

const SOCIAL = [
  { label: 'Instagram', abbr: 'IG', href: '#' },
  { label: 'X / Twitter', abbr: 'X', href: '#' },
  { label: 'YouTube', abbr: 'YT', href: '#' },
  { label: 'TikTok', abbr: 'TK', href: '#' },
];

const PAYMENT_BADGES = ['VISA', 'MC', 'AMEX', 'TROY', 'İyzico'];

/* ────────────────────────────────────────────────────────
   CityPicker — dropdown popover
──────────────────────────────────────────────────────── */

function CityPicker() {
  const [open, setOpen]     = useState(false);
  const [city, setCity]     = useState(CITIES[0]);
  const ref                 = useRef<HTMLDivElement>(null);

  /* close on outside click */
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  /* close on Escape */
  useEffect(() => {
    if (!open) return;
    function handle(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-xs text-white/55 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 rounded"
      >
        <span>📍</span>
        <span className="font-medium">{city.label}</span>
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Şehir seç"
          className="absolute top-full left-0 mt-2 z-[100] w-56 rounded-xl border border-white/12 bg-[#1c2a3e] shadow-2xl shadow-black/60 overflow-hidden"
        >
          <div className="px-3 pt-3 pb-2 border-b border-white/8">
            <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
              Şehir Seç
            </p>
          </div>
          <ul className="py-1 max-h-64 overflow-y-auto">
            {CITIES.map((c) => {
              const active = c.id === city.id;
              return (
                <li key={c.id}>
                  <button
                    role="option"
                    aria-selected={active}
                    onClick={() => { setCity(c); setOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors text-left ${
                      active
                        ? 'bg-blue-500/15 text-white font-semibold'
                        : 'text-white/65 hover:bg-white/6 hover:text-white'
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="text-xs tabular-nums text-white/30">{c.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="px-3 py-2 border-t border-white/8">
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Tüm şehirler →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Layout
──────────────────────────────────────────────────────── */

export default function EventThemeLayout({ children }: { children: React.ReactNode }) {
  const [search, setSearch]     = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0e1521' }}>
      <SkipLink href="#main-content" />

      {/* ── TOP BAR ── */}
      <div
        className="hidden lg:block border-b"
        style={{ background: '#091018', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <CityPicker />
            <span style={{ color: 'rgba(255,255,255,0.12)' }}>|</span>
            <a href="#" className="text-xs text-white/45 hover:text-white transition-colors">
              Organizatör ol
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/45">
            <a href="#" className="hover:text-white transition-colors">Türkçe</a>
            <span style={{ color: 'rgba(255,255,255,0.12)' }}>|</span>
            <a href="#" className="hover:text-white transition-colors">Yardım</a>
            <span style={{ color: 'rgba(255,255,255,0.12)' }}>|</span>
            <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span>🎫</span>
              <span>Biletlerim</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'linear-gradient(180deg, #111d2e 0%, #0e1929 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* primary row */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-4 h-[62px]">

            {/* Logo */}
            <a
              href="/themes/event"
              className="flex items-center gap-3 shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-xl transition-transform group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                  boxShadow: '0 4px 14px rgba(59,130,246,0.45)',
                }}
              >
                🎫
              </div>
              <div className="hidden sm:block">
                <div className="text-[15px] font-black text-white tracking-tight leading-tight">
                  BiletMaster
                </div>
                <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Türkiye&apos;nin Bilet Platformu
                </div>
              </div>
            </a>

            {/* Search */}
            <div className="flex-1 min-w-0 max-w-lg">
              <SearchBar
                id="header-search"
                placeholder="Etkinlik, sanatçı veya mekan ara..."
                value={search}
                onChange={setSearch}
                onClear={() => setSearch('')}
                className="[&_input]:bg-white/7 [&_input]:border-white/12 [&_input]:text-white [&_input]:placeholder:text-white/35 [&_input:focus]:border-blue-500 [&_input:focus]:bg-white/10 [&_input:focus]:ring-0"
              />
            </div>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-2 ml-auto shrink-0">
              <a
                href="#"
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)' }}
                onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = 'transparent'; }}
              >
                Giriş Yap
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-lg text-sm font-bold text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                  boxShadow: '0 2px 12px rgba(59,130,246,0.35)',
                }}
              >
                Kayıt Ol
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={menuOpen}
              className="lg:hidden ml-auto flex h-9 w-9 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              style={{ border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.7)' }}
            >
              <span className="text-lg leading-none">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* ── category strip ── */}
        <div
          className="hidden lg:block border-t"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div className="mx-auto max-w-7xl px-6">
            <nav className="flex items-center" aria-label="Kategori navigasyonu">
              {CATEGORIES.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  className="relative flex items-center gap-1.5 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors group"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {cat.icon && <span className="text-sm leading-none">{cat.icon}</span>}
                  {cat.label}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                    style={{ background: 'linear-gradient(90deg, #3b82f6, #6366f1)' }}
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* ── mobile drawer ── */}
        {menuOpen && (
          <div
            className="lg:hidden border-t"
            style={{ background: '#111d2e', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {CATEGORIES.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {cat.icon && <span>{cat.icon}</span>}
                  {cat.label}
                </a>
              ))}
              <div className="pt-3 border-t flex gap-2" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <a
                  href="#"
                  className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
                >
                  Giriş Yap
                </a>
                <a
                  href="#"
                  className="flex-1 text-center py-2.5 rounded-lg text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}
                >
                  Kayıt Ol
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ── */}
      <main id="main-content" className="flex-1 bg-surface-base text-text-primary">
        {children}
      </main>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer style={{ background: '#0c1623', borderTop: '1px solid rgba(255,255,255,0.07)', color: '#fff' }}>

        {/* newsletter strip */}
        <div style={{ background: 'rgba(59,130,246,0.08)', borderBottom: '1px solid rgba(59,130,246,0.15)' }}>
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white text-sm">🎫 Etkinliklerden İlk Sen Haberdar Ol</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Şehrine özel etkinlik bildirimleri ve erken bilet fırsatları.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto shrink-0">
              <input
                type="email"
                placeholder="E-posta adresin"
                className="flex-1 sm:w-64 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
              />
              <button
                className="px-4 py-2 rounded-lg text-sm font-bold text-white shrink-0"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', boxShadow: '0 2px 10px rgba(59,130,246,0.3)' }}
              >
                Abone Ol
              </button>
            </div>
          </div>
        </div>

        {/* main columns */}
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

            {/* brand column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
              <a href="/themes/event" className="flex items-center gap-2.5">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', boxShadow: '0 4px 14px rgba(59,130,246,0.4)' }}
                >
                  🎫
                </div>
                <div>
                  <div className="font-black text-white text-base tracking-tight">BiletMaster</div>
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Bilet Platformu
                  </div>
                </div>
              </a>

              <p className="text-xs leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Türkiye&apos;nin en büyük etkinlik biletleme platformu. Konser, spor, tiyatro ve daha fazlası.
              </p>

              <div className="flex items-center gap-2">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; e.currentTarget.style.color = '#93c5fd'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {s.abbr}
                  </a>
                ))}
              </div>
            </div>

            {/* link columns */}
            {FOOTER_COLS.map((col) => (
              <div key={col.heading} className="space-y-3">
                <h3
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {col.heading}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                        onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                        onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              © 2026 BiletMaster Biletleme A.Ş. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-2">
              {PAYMENT_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="flex h-6 items-center justify-center rounded px-2 text-[10px] font-bold"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
