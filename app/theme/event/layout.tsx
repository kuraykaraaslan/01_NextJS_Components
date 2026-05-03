'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SkipLink } from '@/modules/ui/SkipLink';
import { SearchBar } from '@/modules/ui/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck, faXmark, faBars, faLocationDot, faTicket, faMusic, faTrophy, faMasksTheater, faFaceSmile, faStar, faLaptop, faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';

/* ────────────────────────────────────────────────────────
   Data
──────────────────────────────────────────────────────── */

const CITIES = [
  { id: 'istanbul',  label: 'İstanbul',  count: 142 },
  { id: 'ankara',    label: 'Ankara',    count: 58  },
  { id: 'izmir',     label: 'İzmir',     count: 43  },
  { id: 'bursa',     label: 'Bursa',     count: 21  },
  { id: 'antalya',   label: 'Antalya',   count: 17  },
  { id: 'adana',     label: 'Adana',     count: 9   },
  { id: 'konya',     label: 'Konya',     count: 8   },
  { id: 'gaziantep', label: 'Gaziantep', count: 6   },
];

const LANGUAGES = [
  { id: 'tr', label: 'Türkçe',   flag: '🇹🇷' },
  { id: 'en', label: 'English',  flag: '🇬🇧' },
  { id: 'de', label: 'Deutsch',  flag: '🇩🇪' },
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
  { id: 'ar', label: 'العربية',  flag: '🇸🇦' },
  { id: 'ru', label: 'Русский',  flag: '🇷🇺' },
];

const CATEGORIES = [
  { label: 'Konserler', href: '/theme/event/events?category=muzik',    icon: <FontAwesomeIcon icon={faMusic} className="w-4 h-4" aria-hidden="true" /> },
  { label: 'Spor',      href: '/theme/event/events?category=spor',     icon: <FontAwesomeIcon icon={faTrophy} className="w-4 h-4" aria-hidden="true" /> },
  { label: 'Tiyatro',   href: '/theme/event/events?category=tiyatro',  icon: <FontAwesomeIcon icon={faMasksTheater} className="w-4 h-4" aria-hidden="true" /> },
  { label: 'Stand-up',  href: '/theme/event/events?category=standup',  icon: <FontAwesomeIcon icon={faFaceSmile} className="w-4 h-4" aria-hidden="true" /> },
  { label: 'Festival',  href: '/theme/event/events?category=festival', icon: <FontAwesomeIcon icon={faStar} className="w-4 h-4" aria-hidden="true" /> },
  { label: 'Konferans', href: '/theme/event/events?category=konferans',icon: <FontAwesomeIcon icon={faLaptop} className="w-4 h-4" aria-hidden="true" /> },
  { label: 'Sanatçılar', href: '/theme/event/artists', icon: null },
  { label: 'Mekanlar',  href: '/theme/event/venues',  icon: null },
  { label: 'Tümü',      href: '/theme/event/events',  icon: null },
];

const FOOTER_COLS = [
  {
    heading: 'Keşfet',
    links: [
      { label: 'Konserler',         href: '/theme/event/events?category=muzik'    },
      { label: 'Spor Etkinlikleri', href: '/theme/event/events?category=spor'     },
      { label: 'Tiyatro & Sahne',   href: '/theme/event/events?category=tiyatro'  },
      { label: 'Festival',          href: '/theme/event/events?category=festival' },
      { label: 'Stand-up',          href: '/theme/event/events?category=standup'  },
      { label: 'Sanatçılar',        href: '/theme/event/artists'                  },
      { label: 'Mekanlar',          href: '/theme/event/venues'                   },
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
      { label: 'Organizatör Ol',    href: '#' },
      { label: 'Etkinlik Oluştur',  href: '#' },
      { label: 'Fiyatlandırma',     href: '#' },
      { label: 'Başarı Hikayeleri', href: '#' },
    ],
  },
  {
    heading: 'Destek',
    links: [
      { label: 'Yardım Merkezi',      href: '#' },
      { label: 'İade Politikası',     href: '#' },
      { label: 'Bize Ulaşın',         href: '#' },
      { label: 'Gizlilik',            href: '#' },
      { label: 'Kullanım Koşulları',  href: '#' },
    ],
  },
];

const SOCIAL        = ['IG', 'X', 'YT', 'TK'];
const PAYMENT_BADGES = ['VISA', 'MC', 'AMEX', 'TROY', 'İyzico'];

/* ────────────────────────────────────────────────────────
   Shared hook: close popover on outside click + Escape
──────────────────────────────────────────────────────── */

function usePopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onMouse = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onMouse);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouse);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return { open, setOpen, ref };
}

/* ────────────────────────────────────────────────────────
   Shared: dark-navbar dropdown shell
──────────────────────────────────────────────────────── */

function NavDropdown({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute top-full mt-2 z-[100] rounded-xl overflow-hidden shadow-2xl shadow-black/60"
      style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#1c2a3e' }}
    >
      {children}
    </div>
  );
}

function NavDropdownHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-3 pt-3 pb-2"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {children}
      </p>
    </div>
  );
}

function NavTriggerButton({
  onClick,
  expanded,
  children,
}: {
  onClick: () => void;
  expanded: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-haspopup="listbox"
      aria-expanded={expanded}
      className="flex items-center gap-1.5 text-xs font-medium transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
      style={{ color: 'rgba(255,255,255,0.55)' }}
      onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
      onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
    >
      {children}
      <FontAwesomeIcon
        icon={faChevronDown}
        className="h-3 w-3 transition-transform duration-200"
        style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        aria-hidden="true"
      />
    </button>
  );
}

/* ────────────────────────────────────────────────────────
   CityPicker
──────────────────────────────────────────────────────── */

function CityPicker() {
  const { open, setOpen, ref } = usePopover();
  const [city, setCity] = useState(CITIES[0]);

  return (
    <div ref={ref} className="relative">
      <NavTriggerButton onClick={() => setOpen((p) => !p)} expanded={open}>
        <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" aria-hidden="true" />
        <span>{city.label}</span>
      </NavTriggerButton>

      {open && (
        <NavDropdown>
          <NavDropdownHeader>Şehir Seç</NavDropdownHeader>
          <ul role="listbox" className="py-1 max-h-64 overflow-y-auto w-52">
            {CITIES.map((c) => {
              const active = c.id === city.id;
              return (
                <li key={c.id}>
                  <button
                    role="option"
                    aria-selected={active}
                    onClick={() => { setCity(c); setOpen(false); }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors"
                    style={{
                      color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                      background: active ? 'rgba(59,130,246,0.15)' : 'transparent',
                      fontWeight: active ? 600 : 400,
                    }}
                    onMouseOver={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseOut={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span>{c.label}</span>
                    <span className="text-xs tabular-nums" style={{ color: 'rgba(255,255,255,0.28)' }}>{c.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="px-3 py-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button onClick={() => setOpen(false)} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              Tüm şehirler →
            </button>
          </div>
        </NavDropdown>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   LanguageSwitcher
──────────────────────────────────────────────────────── */

function LanguageSwitcher() {
  const { open, setOpen, ref } = usePopover();
  const [lang, setLang] = useState(LANGUAGES[0]);

  return (
    <div ref={ref} className="relative">
      <NavTriggerButton onClick={() => setOpen((p) => !p)} expanded={open}>
        <span>{lang.flag}</span>
        <span className="hidden sm:inline">{lang.label}</span>
      </NavTriggerButton>

      {open && (
        <NavDropdown>
          <NavDropdownHeader>Dil Seç</NavDropdownHeader>
          <ul role="listbox" className="py-1 w-44">
            {LANGUAGES.map((l) => {
              const active = l.id === lang.id;
              return (
                <li key={l.id}>
                  <button
                    role="option"
                    aria-selected={active}
                    onClick={() => { setLang(l); setOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors"
                    style={{
                      color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                      background: active ? 'rgba(59,130,246,0.15)' : 'transparent',
                      fontWeight: active ? 600 : 400,
                    }}
                    onMouseOver={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseOut={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.label}</span>
                    {active && <FontAwesomeIcon icon={faCheck} className="ml-auto w-3 h-3 text-blue-400" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </NavDropdown>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   NavThemeSwitcher — dark-navbar styled, same logic as ThemeSwitcher
──────────────────────────────────────────────────────── */

type ThemeOption = 'light' | 'dark' | 'system';

const THEME_OPTIONS: { id: ThemeOption; icon: React.ReactNode; label: string }[] = [
  { id: 'light',  icon: <FontAwesomeIcon icon={faSun} className="w-3.5 h-3.5" aria-hidden="true" />,     label: 'Açık'   },
  { id: 'dark',   icon: <FontAwesomeIcon icon={faMoon} className="w-3.5 h-3.5" aria-hidden="true" />,    label: 'Koyu'   },
  { id: 'system', icon: <FontAwesomeIcon icon={faDesktop} className="w-3.5 h-3.5" aria-hidden="true" />, label: 'Sistem' },
];

function NavThemeSwitcher() {
  const { open, setOpen, ref } = usePopover();
  const [theme, setTheme] = useState<ThemeOption>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as ThemeOption | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const current = THEME_OPTIONS.find((t) => t.id === theme) ?? THEME_OPTIONS[2];

  return (
    <div ref={ref} className="relative">
      <NavTriggerButton onClick={() => setOpen((p) => !p)} expanded={open}>
        <span className="leading-none flex items-center">{mounted ? current.icon : <FontAwesomeIcon icon={faDesktop} className="w-3.5 h-3.5" aria-hidden="true" />}</span>
        <span className="hidden sm:inline">{mounted ? current.label : 'Tema'}</span>
      </NavTriggerButton>

      {open && (
        <NavDropdown>
          <NavDropdownHeader>Tema</NavDropdownHeader>
          <ul role="listbox" className="py-1 w-40">
            {THEME_OPTIONS.map((opt) => {
              const active = opt.id === theme;
              return (
                <li key={opt.id}>
                  <button
                    role="option"
                    aria-selected={active}
                    onClick={() => { setTheme(opt.id); setOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors"
                    style={{
                      color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                      background: active ? 'rgba(59,130,246,0.15)' : 'transparent',
                      fontWeight: active ? 600 : 400,
                    }}
                    onMouseOver={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseOut={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span className="w-5 flex items-center justify-center">{opt.icon}</span>
                    <span>{opt.label}</span>
                    {active && <FontAwesomeIcon icon={faCheck} className="ml-auto w-3 h-3 text-blue-400" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </NavDropdown>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Divider — reusable vertical separator for top bar
──────────────────────────────────────────────────────── */

function TopBarDivider() {
  return <span className="h-3 w-px" style={{ background: 'rgba(255,255,255,0.12)' }} />;
}

/* ════════════════════════════════════════════════════════
   Layout
════════════════════════════════════════════════════════ */

export default function EventThemeLayout({ children }: { children: React.ReactNode }) {
  const [search, setSearch]     = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function handleSearch(q: string) {
    if (!q.trim()) return;
    router.push(`/theme/event/search?q=${encodeURIComponent(q.trim())}`);
    setSearch('');
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0e1521' }}>
      <SkipLink href="#main-content" />

      {/* ── TOP BAR ── */}
      <div
        className="hidden lg:block border-b"
        style={{ background: '#091018', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-9">

          {/* left: city + organizer */}
          <div className="flex items-center gap-4">
            <CityPicker />
            <TopBarDivider />
            <a
              href="#"
              className="text-xs transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              Organizatör ol
            </a>
          </div>

          {/* right: theme + language + help + my tickets */}
          <div className="flex items-center gap-4">
            <NavThemeSwitcher />
            <TopBarDivider />
            <LanguageSwitcher />
            <TopBarDivider />
            <a
              href="#"
              className="text-xs transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              Yardım
            </a>
            <TopBarDivider />
            <a
              href="/theme/event/orders"
              className="text-xs transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              Siparişlerim
            </a>
            <TopBarDivider />
            <a
              href="/theme/event/tickets"
              className="flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              <FontAwesomeIcon icon={faTicket} className="w-3 h-3" aria-hidden="true" />
              <span>Biletlerim</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'linear-gradient(180deg,#111d2e 0%,#0e1929 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* primary row */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-4 h-[62px]">

            {/* Logo */}
            <a
              href="/theme/event"
              className="flex items-center gap-3 shrink-0 rounded-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg,#3b82f6 0%,#6366f1 100%)',
                  boxShadow: '0 4px 14px rgba(59,130,246,0.45)',
                }}
              >
                <FontAwesomeIcon icon={faTicket} className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="hidden sm:block">
                <div className="text-[15px] font-black text-white tracking-tight leading-tight">
                  BiletMaster
                </div>
                <div
                  className="text-[10px] font-medium uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  Türkiye&apos;nin Bilet Platformu
                </div>
              </div>
            </a>

            {/* Search */}
            <form
              className="flex-1 min-w-0 max-w-lg"
              onSubmit={(e) => { e.preventDefault(); handleSearch(search); }}
            >
              <SearchBar
                id="header-search"
                placeholder="Etkinlik, sanatçı veya mekan ara..."
                value={search}
                onChange={setSearch}
                onClear={() => setSearch('')}
                className="[&_input]:bg-white/7 [&_input]:border-white/12 [&_input]:text-white [&_input]:placeholder:text-white/35 [&_input:focus]:border-blue-500 [&_input:focus]:bg-white/10"
              />
            </form>

            {/* Desktop auth */}
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
                className="px-4 py-2 rounded-lg text-sm font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg,#3b82f6 0%,#6366f1 100%)',
                  boxShadow: '0 2px 12px rgba(59,130,246,0.35)',
                }}
              >
                Kayıt Ol
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={menuOpen}
              className="lg:hidden ml-auto flex h-9 w-9 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              style={{ border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.7)' }}
            >
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* category strip */}
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
                    style={{ background: 'linear-gradient(90deg,#3b82f6,#6366f1)' }}
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* mobile drawer */}
        {menuOpen && (
          <div
            className="lg:hidden border-t"
            style={{ background: '#111d2e', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {/* mobile theme + lang row */}
              <div
                className="flex items-center gap-4 px-3 py-2.5 mb-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <NavThemeSwitcher />
                <TopBarDivider />
                <LanguageSwitcher />
              </div>

              {CATEGORIES.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                  onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {cat.icon && <span>{cat.icon}</span>}
                  {cat.label}
                </a>
              ))}

              <div className="pt-3 border-t flex gap-2" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <a
                  href="#"
                  className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold"
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

      {/* ════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════ */}
      <footer style={{ background: '#0c1623', borderTop: '1px solid rgba(255,255,255,0.07)', color: '#fff' }}>

        {/* newsletter strip */}
        <div style={{ background: 'rgba(59,130,246,0.08)', borderBottom: '1px solid rgba(59,130,246,0.15)' }}>
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white text-sm flex items-center gap-2"><FontAwesomeIcon icon={faTicket} className="w-4 h-4" aria-hidden="true" /> Etkinliklerden İlk Sen Haberdar Ol</p>
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

        {/* columns */}
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

            {/* brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
              <a href="/theme/event" className="flex items-center gap-2.5">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', boxShadow: '0 4px 14px rgba(59,130,246,0.4)' }}
                >
                  <FontAwesomeIcon icon={faTicket} className="w-5 h-5 text-white" aria-hidden="true" />
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
                {SOCIAL.map((abbr) => (
                  <a
                    key={abbr}
                    href="#"
                    aria-label={abbr}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; e.currentTarget.style.color = '#93c5fd'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {abbr}
                  </a>
                ))}
              </div>
            </div>

            {/* link columns */}
            {FOOTER_COLS.map((col) => (
              <div key={col.heading} className="space-y-3">
                <h3 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
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
