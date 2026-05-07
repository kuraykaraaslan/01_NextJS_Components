'use client';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDesktop, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavPopover } from './useNavPopover';
import { NavDropdown, NavDropdownHeader, NavTriggerButton } from './NavDropdown';

type ThemeOption = 'light' | 'dark' | 'system';

const THEME_OPTIONS: { id: ThemeOption; icon: React.ReactNode; label: string }[] = [
  { id: 'light',  icon: <FontAwesomeIcon icon={faSun} className="w-3.5 h-3.5" aria-hidden="true" />,     label: 'Açık'   },
  { id: 'dark',   icon: <FontAwesomeIcon icon={faMoon} className="w-3.5 h-3.5" aria-hidden="true" />,    label: 'Koyu'   },
  { id: 'system', icon: <FontAwesomeIcon icon={faDesktop} className="w-3.5 h-3.5" aria-hidden="true" />, label: 'Sistem' },
];

export function NavThemeSwitcher() {
  const { open, setOpen, ref } = useNavPopover();
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
        <span className="leading-none flex items-center">
          {mounted ? current.icon : <FontAwesomeIcon icon={faDesktop} className="w-3.5 h-3.5" aria-hidden="true" />}
        </span>
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
