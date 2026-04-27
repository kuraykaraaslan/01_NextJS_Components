'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDisplay } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/modules/ui/Button';

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
    <Button variant="ghost" size="sm" onClick={toggleTheme} iconOnly aria-label="Toggle Theme" title={`Theme: ${theme}`}>
      <FontAwesomeIcon icon={icon} className="text-text-secondary hover:text-text-primary transition-colors" />
      <span className="sr-only">{`Current theme: ${theme}`}</span>
    </Button>
  );
}