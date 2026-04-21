'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';

export type EventNavLink = {
  href: string;
  label: string;
};

export type Language = {
  code: string;
  label: string;
  flag: string;
};

export type CityOption = {
  city: string;
  country: string;
  label: string;
};

export const DEFAULT_LANGUAGES: Language[] = [
  { code: 'en', label: 'English',   flag: '🇺🇸' },
  { code: 'tr', label: 'Türkçe',    flag: '🇹🇷' },
  { code: 'es', label: 'Español',   flag: '🇪🇸' },
  { code: 'fr', label: 'Français',  flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch',   flag: '🇩🇪' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ja', label: '日本語',    flag: '🇯🇵' },
  { code: 'ar', label: 'العربية',   flag: '🇸🇦' },
];

export const DEFAULT_CITIES: CityOption[] = [
  { city: 'New York',    country: 'United States',  label: 'New York, NY' },
  { city: 'Los Angeles', country: 'United States',  label: 'Los Angeles, CA' },
  { city: 'Chicago',     country: 'United States',  label: 'Chicago, IL' },
  { city: 'Miami',       country: 'United States',  label: 'Miami, FL' },
  { city: 'Las Vegas',   country: 'United States',  label: 'Las Vegas, NV' },
  { city: 'Boston',      country: 'United States',  label: 'Boston, MA' },
  { city: 'London',      country: 'United Kingdom', label: 'London, UK' },
  { city: 'Manchester',  country: 'United Kingdom', label: 'Manchester, UK' },
  { city: 'Paris',       country: 'France',         label: 'Paris, France' },
  { city: 'Berlin',      country: 'Germany',        label: 'Berlin, Germany' },
  { city: 'Istanbul',    country: 'Turkey',         label: 'Istanbul, Turkey' },
  { city: 'Ankara',      country: 'Turkey',         label: 'Ankara, Turkey' },
  { city: 'Tokyo',       country: 'Japan',          label: 'Tokyo, Japan' },
  { city: 'Sydney',      country: 'Australia',      label: 'Sydney, Australia' },
  { city: 'Dubai',       country: 'UAE',            label: 'Dubai, UAE' },
  { city: 'Toronto',     country: 'Canada',         label: 'Toronto, Canada' },
  { city: 'Singapore',   country: 'Singapore',      label: 'Singapore' },
  { city: 'São Paulo',   country: 'Brazil',         label: 'São Paulo, Brazil' },
];

const DEFAULT_NAV_LINKS: EventNavLink[] = [
  { href: '#concerts',  label: '🎤 Concerts' },
  { href: '#sports',    label: '⚽ Sports' },
  { href: '#theater',   label: '🎭 Theater' },
  { href: '#comedy',    label: '😂 Comedy' },
  { href: '#family',    label: '👨‍👩‍👧 Family' },
  { href: '#festivals', label: '🎪 Festivals' },
];

type EventNavbarProps = {
  logoText?: string;
  logoAbbr?: string;
  navLinks?: EventNavLink[];
  promoText?: string;
  languages?: Language[];
  defaultLanguage?: string;
  onLanguageChange?: (lang: Language) => void;
  cities?: CityOption[];
  defaultCity?: string;
  onCityChange?: (city: CityOption) => void;
  searchPlaceholder?: string;
  searchHref?: string;
  myTicketsHref?: string;
  onSignIn?: () => void;
  onSearch?: (params: { query: string; startDate: string; endDate: string }) => void;
  className?: string;
};

function groupByCountry(cities: CityOption[]): [string, CityOption[]][] {
  const map: Record<string, CityOption[]> = {};
  for (const c of cities) {
    if (!map[c.country]) map[c.country] = [];
    map[c.country].push(c);
  }
  return Object.entries(map);
}

function formatDateLabel(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
}

const DROPDOWN_BG = '#1a2035';

export function EventNavbar({
  logoText = 'TixVault',
  logoAbbr = 'TM',
  navLinks = DEFAULT_NAV_LINKS,
  promoText = '🎟 Fan-to-Fan Exchange now live — resell your tickets safely',
  languages = DEFAULT_LANGUAGES,
  defaultLanguage = 'en',
  onLanguageChange,
  cities = DEFAULT_CITIES,
  defaultCity = 'New York, NY',
  onCityChange,
  searchPlaceholder = 'Artists, events, venues...',
  searchHref = '#',
  myTicketsHref = '#',
  onSignIn,
  onSearch,
  className,
}: EventNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');

  const [selectedLang, setSelectedLang] = useState<Language>(
    languages.find((l) => l.code === defaultLanguage) ?? languages[0],
  );
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [query, setQuery] = useState('');

  const langRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityOpen(false);
        setCitySearch('');
      }
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) setDateOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function selectLang(lang: Language) {
    setSelectedLang(lang);
    setLangOpen(false);
    onLanguageChange?.(lang);
  }

  function selectCity(city: CityOption) {
    setSelectedCity(city.label);
    setCityOpen(false);
    setCitySearch('');
    onCityChange?.(city);
  }

  function clearDates() {
    setStartDate('');
    setEndDate('');
  }

  function applyDates() {
    setDateOpen(false);
  }

  function handleFind() {
    setDateOpen(false);
    onSearch?.({ query, startDate, endDate });
  }

  const hasDateRange = startDate || endDate;
  const dateLabelText = startDate && endDate
    ? `${formatDateLabel(startDate)} – ${formatDateLabel(endDate)}`
    : startDate
      ? `From ${formatDateLabel(startDate)}`
      : endDate
        ? `Until ${formatDateLabel(endDate)}`
        : '';

  const filteredCities = citySearch.trim()
    ? cities.filter(
        (c) =>
          c.city.toLowerCase().includes(citySearch.toLowerCase()) ||
          c.country.toLowerCase().includes(citySearch.toLowerCase()),
      )
    : cities;

  const grouped = groupByCountry(filteredCities);

  return (
    <header
      className={cn('sticky top-0 z-50 shadow-xl', className)}
      style={{ background: '#0a0f1e' }}
    >
      {/* Promo bar */}
      {promoText && (
        <div className="bg-primary text-white text-xs text-center py-1.5 px-4 font-medium">
          {promoText}
        </div>
      )}

      {/* Main row */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center font-black text-white text-sm select-none">
              {logoAbbr}
            </div>
            <span className="hidden sm:block text-lg font-black text-white tracking-tight">
              {logoText}
            </span>
          </Link>

          {/* ── City picker ───────────────────────────────────────── */}
          {cities.length > 0 && (
            <div ref={cityRef} className="relative hidden md:block shrink-0">
              <button
                onClick={() => { setCityOpen((v) => !v); setLangOpen(false); setDateOpen(false); }}
                aria-expanded={cityOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary max-w-[160px]"
              >
                <span className="shrink-0">📍</span>
                <span className="truncate">{selectedCity}</span>
                <span className="text-gray-500 text-xs shrink-0">{cityOpen ? '▲' : '▾'}</span>
              </button>

              {cityOpen && (
                <div
                  className="absolute top-full left-0 mt-1.5 w-72 rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
                  style={{ background: DROPDOWN_BG }}
                  role="dialog"
                  aria-label="Select city"
                >
                  <div className="p-3 border-b border-white/10">
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                      <span className="text-gray-400 text-sm shrink-0">🔍</span>
                      <input
                        type="text"
                        placeholder="Search city or country…"
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
                        autoFocus
                      />
                      {citySearch && (
                        <button onClick={() => setCitySearch('')} className="text-gray-400 hover:text-white text-xs shrink-0">✕</button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto" role="listbox">
                    {grouped.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-8">No cities found</p>
                    ) : (
                      grouped.map(([country, countryCities]) => (
                        <div key={country}>
                          <p className="px-3 pt-2 pb-1 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0" style={{ background: DROPDOWN_BG }}>
                            {country}
                          </p>
                          {countryCities.map((city) => (
                            <button
                              key={city.label}
                              role="option"
                              aria-selected={selectedCity === city.label}
                              onClick={() => selectCity(city)}
                              className={cn(
                                'w-full text-left flex items-center justify-between px-4 py-2 text-sm transition-colors',
                                selectedCity === city.label
                                  ? 'text-primary bg-primary/10'
                                  : 'text-gray-300 hover:text-white hover:bg-white/10',
                              )}
                            >
                              <span>{city.city}</span>
                              {selectedCity === city.label && <span className="text-primary text-xs">✓</span>}
                            </button>
                          ))}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Search bar ────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 max-w-2xl">
            <div className="flex items-stretch bg-white rounded-lg overflow-visible shadow divide-x divide-gray-200">

              {/* Text search */}
              <div className="flex items-center flex-1 min-w-0 px-3 gap-2">
                <span className="text-gray-400 shrink-0">🔍</span>
                <input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 min-w-0 py-2 text-sm text-gray-900 bg-transparent outline-none placeholder-gray-400"
                  aria-label="Search events"
                />
              </div>

              {/* ── Date range picker ───────────────────────────── */}
              <div ref={dateRef} className="relative hidden sm:block shrink-0">
                <button
                  onClick={() => { setDateOpen((v) => !v); setCityOpen(false); setLangOpen(false); }}
                  aria-expanded={dateOpen}
                  aria-haspopup="dialog"
                  aria-label="Select date range"
                  className={cn(
                    'flex flex-col items-center justify-center px-4 py-1.5 h-full gap-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                    dateOpen ? 'bg-primary/10' : 'hover:bg-gray-50',
                    hasDateRange ? 'text-primary' : 'text-gray-500',
                  )}
                >
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className={cn('text-xs', hasDateRange ? 'text-primary' : 'text-gray-400')}
                  />
                  {dateLabelText && (
                    <span className="text-xs font-medium whitespace-nowrap max-w-[110px] truncate text-primary">
                      {dateLabelText}
                    </span>
                  )}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={cn('text-[10px] transition-transform', dateOpen && 'rotate-180', hasDateRange ? 'text-primary' : 'text-gray-400')}
                  />
                </button>

                {/* Date range dropdown */}
                {dateOpen && (
                  <div
                    className="absolute top-full right-0 mt-1.5 w-72 rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
                    style={{ background: DROPDOWN_BG }}
                    role="dialog"
                    aria-label="Date range picker"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                      <FontAwesomeIcon icon={faCalendarDays} className="text-primary text-sm" />
                      <span className="text-sm font-bold text-white">Select Date Range</span>
                      {hasDateRange && (
                        <button
                          onClick={clearDates}
                          className="ml-auto text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
                        >
                          <FontAwesomeIcon icon={faXmark} className="text-xs" />
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Date inputs */}
                    <div className="p-4 space-y-4">
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500" />
                          From
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          min={new Date().toISOString().split('T')[0]}
                          max={endDate || undefined}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full bg-white/10 text-white text-sm rounded-lg px-3 py-2.5 border border-white/20 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition [color-scheme:dark]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500" />
                          To
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          min={startDate || new Date().toISOString().split('T')[0]}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full bg-white/10 text-white text-sm rounded-lg px-3 py-2.5 border border-white/20 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition [color-scheme:dark]"
                        />
                      </div>

                      {/* Quick picks */}
                      <div>
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">Quick picks</p>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { label: 'This weekend', days: [5, 7] },
                            { label: 'This week',    days: [0, 7] },
                            { label: 'This month',   days: [0, 30] },
                            { label: 'Next 3 months',days: [0, 90] },
                          ].map(({ label, days }) => {
                            const today = new Date();
                            const from = new Date(today);
                            from.setDate(today.getDate() + days[0]);
                            const to = new Date(today);
                            to.setDate(today.getDate() + days[1]);
                            const fmt = (d: Date) => d.toISOString().split('T')[0];
                            return (
                              <button
                                key={label}
                                onClick={() => { setStartDate(fmt(from)); setEndDate(fmt(to)); }}
                                className="px-2.5 py-1 text-xs rounded-full bg-white/10 text-gray-300 hover:bg-primary/20 hover:text-primary transition-colors border border-white/10"
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-2 px-4 pb-4">
                      <Button variant="ghost" size="sm" fullWidth onClick={clearDates} className="text-gray-300">
                        Reset
                      </Button>
                      <Button variant="primary" size="sm" fullWidth onClick={applyDates}>
                        Apply
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Find button */}
              <Link
                href={searchHref}
                onClick={handleFind}
                className="bg-primary hover:bg-primary-hover text-white text-sm font-bold px-5 flex items-center shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                Find
              </Link>
            </div>
          </div>

          {/* ── Right actions ─────────────────────────────────────── */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto">

            {/* Language picker */}
            {languages.length > 0 && (
              <div ref={langRef} className="relative hidden sm:block">
                <button
                  onClick={() => { setLangOpen((v) => !v); setCityOpen(false); setDateOpen(false); }}
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  aria-label="Select language"
                  className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>{selectedLang.flag}</span>
                  <span className="uppercase font-semibold text-xs tracking-wide">{selectedLang.code}</span>
                  <span className="text-gray-500 text-xs">{langOpen ? '▲' : '▾'}</span>
                </button>

                {langOpen && (
                  <div
                    className="absolute top-full right-0 mt-1.5 w-44 rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 py-1"
                    style={{ background: DROPDOWN_BG }}
                    role="listbox"
                    aria-label="Select language"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        role="option"
                        aria-selected={selectedLang.code === lang.code}
                        onClick={() => selectLang(lang)}
                        className={cn(
                          'w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                          selectedLang.code === lang.code
                            ? 'text-primary bg-primary/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/10',
                        )}
                      >
                        <span>{lang.flag}</span>
                        <span className="flex-1">{lang.label}</span>
                        {selectedLang.code === lang.code && <span className="text-primary text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={onSignIn}
              className="hidden sm:block text-sm text-gray-300 hover:text-white font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Sign in
            </button>

            <Link
              href={myTicketsHref}
              className="hidden sm:flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold px-3 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              🎟 My Tickets
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Category nav strip — desktop */}
        {navLinks.length > 0 && (
          <nav aria-label="Category navigation" className="hidden md:flex items-center gap-1 mt-2 -mb-px">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-t-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────── */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/10 md:hidden"
          style={{ background: '#111827' }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-2">
            {/* Date range — mobile */}
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500" />
                Date range
              </p>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="From"
                  className="flex-1 bg-white/10 text-white text-sm rounded-lg px-3 py-2 border border-white/20 outline-none focus:ring-2 focus:ring-primary [color-scheme:dark]"
                />
                <input
                  type="date"
                  value={endDate}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="To"
                  className="flex-1 bg-white/10 text-white text-sm rounded-lg px-3 py-2 border border-white/20 outline-none focus:ring-2 focus:ring-primary [color-scheme:dark]"
                />
              </div>
            </div>

            {/* City + Language selects */}
            <div className="flex gap-2">
              <select
                value={selectedCity}
                onChange={(e) => {
                  const found = cities.find((c) => c.label === e.target.value);
                  if (found) selectCity(found);
                }}
                className="flex-1 min-w-0 bg-white/10 text-white text-sm rounded-lg px-3 py-2 border border-white/20 outline-none focus:ring-2 focus:ring-primary"
                aria-label="Select city"
              >
                {cities.map((c) => (
                  <option key={c.label} value={c.label} className="bg-gray-900 text-white">{c.label}</option>
                ))}
              </select>
              <select
                value={selectedLang.code}
                onChange={(e) => {
                  const found = languages.find((l) => l.code === e.target.value);
                  if (found) selectLang(found);
                }}
                className="bg-white/10 text-white text-sm rounded-lg px-3 py-2 border border-white/20 outline-none focus:ring-2 focus:ring-primary shrink-0"
                aria-label="Select language"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-gray-900 text-white">{l.flag} {l.label}</option>
                ))}
              </select>
            </div>

            <div className="border-t border-white/10 pt-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex gap-2 pt-2 border-t border-white/10">
              <Button variant="ghost" size="sm" fullWidth className="text-white" onClick={onSignIn}>
                Sign in
              </Button>
              <Button variant="primary" size="sm" fullWidth>
                My Tickets
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
