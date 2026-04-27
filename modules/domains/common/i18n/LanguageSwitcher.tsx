'use client';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/libs/utils/cn';
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANG_NAMES,
  LANG_FLAGS,
  getDirection,
  type AppLanguage,
} from '../I18nTypes';

type LanguageSwitcherProps = {
  value?: AppLanguage;
  onChange?: (lang: AppLanguage) => void;
  languages?: AppLanguage[];
  className?: string;
};

export function LanguageSwitcher({
  value,
  onChange,
  languages = AVAILABLE_LANGUAGES as AppLanguage[],
  className,
}: LanguageSwitcherProps) {
  const [current, setCurrent] = useState<AppLanguage>(value ?? DEFAULT_LANGUAGE);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) setCurrent(value);
  }, [value]);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [open]);

  function select(lang: AppLanguage) {
    setCurrent(lang);
    onChange?.(lang);
    setOpen(false);
  }

  const label = LANG_NAMES[current] ?? current.toUpperCase();
  const flag  = LANG_FLAGS[current] ?? '🌐';

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${label}`}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-1.5 rounded-md border border-border bg-surface-base px-3 py-1.5 text-sm text-text-primary',
          'hover:bg-surface-overlay transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus'
        )}
      >
        <FontAwesomeIcon icon={faGlobe} className="w-3 h-3 text-text-disabled" />
        <span>{flag}</span>
        <span className="hidden sm:inline">{label}</span>
        <FontAwesomeIcon icon={faChevronDown} className={cn('w-2.5 h-2.5 text-text-disabled transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute z-30 mt-1 min-w-[9rem] rounded-md border border-border bg-surface-raised shadow-lg py-1 right-0"
        >
          {languages.map((lang) => {
            const active = lang === current;
            const dir = getDirection(lang);
            return (
              <li
                key={lang}
                role="option"
                aria-selected={active}
                dir={dir}
                onClick={() => select(lang)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(lang); } }}
                tabIndex={0}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer select-none transition-colors',
                  'hover:bg-surface-overlay focus-visible:outline-none focus-visible:bg-surface-overlay',
                  active ? 'text-primary font-medium' : 'text-text-primary'
                )}
              >
                <span>{LANG_FLAGS[lang] ?? '🌐'}</span>
                <span className="flex-1">{LANG_NAMES[lang] ?? lang.toUpperCase()}</span>
                {active && <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-primary ml-auto" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
