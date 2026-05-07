'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavPopover } from './useNavPopover';
import { NavDropdown, NavDropdownHeader, NavTriggerButton } from './NavDropdown';

export type NavLangOption = {
  id: string;
  label: string;
  flag: string;
};

const DEFAULT_LANGUAGES: NavLangOption[] = [
  { id: 'tr', label: 'Türkçe',   flag: '🇹🇷' },
  { id: 'en', label: 'English',  flag: '🇬🇧' },
  { id: 'de', label: 'Deutsch',  flag: '🇩🇪' },
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
  { id: 'ar', label: 'العربية',  flag: '🇸🇦' },
  { id: 'ru', label: 'Русский',  flag: '🇷🇺' },
];

type NavLanguageSwitcherProps = {
  languages?: NavLangOption[];
  value?: string;
  onChange?: (langId: string) => void;
};

export function NavLanguageSwitcher({
  languages = DEFAULT_LANGUAGES,
  value,
  onChange,
}: NavLanguageSwitcherProps) {
  const { open, setOpen, ref } = useNavPopover();
  const [internal, setInternal] = useState(languages[0].id);
  const activeId = value !== undefined ? value : internal;
  const lang = languages.find((l) => l.id === activeId) ?? languages[0];

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
            {languages.map((l) => {
              const active = l.id === activeId;
              return (
                <li key={l.id}>
                  <button
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setInternal(l.id);
                      onChange?.(l.id);
                      setOpen(false);
                    }}
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
