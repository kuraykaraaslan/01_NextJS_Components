'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDisplay, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/modules/ui/Button';
import { DropdownMenu } from '../ui/DropdownMenu';

type Theme = 'light' | 'dark' | 'system';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  if (!mounted) {
    return <Button variant="ghost" size="sm" iconOnly aria-label="Theme"><FontAwesomeIcon icon={faDisplay} /></Button>;
  }

  const toggleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const icon = theme === 'light' ? faSun : theme === 'dark' ? faMoon : faDisplay;

  return (
    <DropdownMenu
      trigger={
        <Button variant="outline" size="sm" className="gap-2">
          <span className="w-4 flex items-center justify-center shrink-0" aria-hidden="true">
            <FontAwesomeIcon icon={icon} className="w-4 h-4" />
          </span>
          <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
          <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3 text-text-disabled" />
        </Button>
      }      
      items={[
        { type: 'item', label: 'Light', icon: <FontAwesomeIcon icon={faSun} />, onClick: () => setTheme('light') },
        { type: 'item', label: 'Dark', icon: <FontAwesomeIcon icon={faMoon} />, onClick: () => setTheme('dark') },
        { type: 'item', label: 'System', icon: <FontAwesomeIcon icon={faDisplay} />, onClick: () => setTheme('system') },
      ]}
    />
  );
}