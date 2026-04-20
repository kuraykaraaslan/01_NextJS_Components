'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/libs/utils/cn';

export function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark(!dark)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'px-3 py-1.5 text-sm rounded-md border transition-colors font-medium',
        'border-border text-text-primary hover:bg-surface-overlay',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus'
      )}
    >
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
