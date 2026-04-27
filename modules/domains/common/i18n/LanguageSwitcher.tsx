'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import * as Flags from 'country-flag-icons/react/3x2';
import { Button } from '@/modules/ui/Button';
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANG_NAMES,
  LANG_FLAGS,
  type AppLanguage,
} from '../I18nTypes';
import { DropdownMenu, type DropdownItem } from '@/modules/ui/DropdownMenu';

type LanguageSwitcherProps = {
  value?: AppLanguage;
  onChange?: (lang: AppLanguage) => void;
  languages?: AppLanguage[];
  className?: string;
};

const langToCountry: Record<string, keyof typeof Flags> = {
  en: 'US', // veya 'GB' kullanılabilir
  tr: 'TR',
  de: 'DE',
  fr: 'FR',
  ar: 'SA',
};

function getFlag(lang: string) {
  const countryCode = langToCountry[lang];
  if (countryCode) {
    const FlagComp = Flags[countryCode] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
    if (FlagComp) {
      return <FlagComp className="w-4 h-auto rounded-[2px] shadow-sm" />;
    }
  }
  // Eşleşme bulunamazsa I18nTypes'tan gelen emoji formatındaki bayrağa geri dön.
  return LANG_FLAGS[lang as AppLanguage];
}

export function LanguageSwitcher({
  value,
  onChange,
  languages = AVAILABLE_LANGUAGES as AppLanguage[],
  className,
}: LanguageSwitcherProps) {
  const [internal, setInternal] = useState<AppLanguage>(DEFAULT_LANGUAGE);
  const current = value !== undefined ? value : internal;

  const items: DropdownItem[] = languages.map((lang) => ({
    type: 'item',
    label: LANG_NAMES[lang],
    icon: getFlag(lang) as any, // DropdownMenu string beklediği için cast ediyoruz
    onClick: () => {
      setInternal(lang);
      onChange?.(lang);
    },
  }));

  return (
    <DropdownMenu
      className={className}
      trigger={
        <Button variant="outline" size="sm" className="gap-2">
          <span className="w-4 flex items-center justify-center shrink-0" aria-hidden="true">
            {getFlag(current)}
          </span>
          <span>{LANG_NAMES[current]}</span>
          <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3 text-text-disabled" />
        </Button>
      }
      items={items}
    />
  );
} 