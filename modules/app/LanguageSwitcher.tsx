'use client';

import { useState } from 'react';
import { US, TR, DE } from 'country-flag-icons/react/3x2';
import { Button } from '@/modules/ui/Button';

const LANGUAGES = [
  { code: 'en', label: 'English', icon: US },
  { code: 'tr', label: 'Türkçe', icon: TR },
  { code: 'de', label: 'Deutsch', icon: DE },
];

export function LanguageSwitcher() {
  const [lang, setLang] = useState(LANGUAGES[0]);

  const toggleLang = () => {
    const currentIndex = LANGUAGES.findIndex((l) => l.code === lang.code);
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    setLang(LANGUAGES[nextIndex]);
  };

  const FlagIcon = lang.icon;

  return (
    <Button variant="ghost" size="sm" onClick={toggleLang} aria-label="Switch Language" title={`Language: ${lang.label}`} className="px-2">
      <div className="flex items-center gap-2">
        <FlagIcon className="w-5 h-auto rounded-[2px] shadow-sm" />
      </div>
    </Button>
  );
}