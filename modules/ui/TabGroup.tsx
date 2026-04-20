'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';

export type Tab = { id: string; label: string; content: React.ReactNode };

export function TabGroup({
  tabs,
  defaultTab,
  label = 'Tabs',
  className,
}: {
  tabs: Tab[];
  defaultTab?: string;
  label?: string;
  className?: string;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? '');

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight') {
      const next = tabs[(index + 1) % tabs.length];
      setActive(next.id);
    } else if (e.key === 'ArrowLeft') {
      const prev = tabs[(index - 1 + tabs.length) % tabs.length];
      setActive(prev.id);
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <div role="tablist" aria-label={label} className="flex border-b border-border">
        {tabs.map((tab, i) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-btn-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={cn(
                'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`tabpanel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-btn-${tab.id}`}
          tabIndex={0}
          hidden={tab.id !== active}
          className="py-4 focus-visible:outline-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
