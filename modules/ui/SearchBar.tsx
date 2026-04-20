'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';

export function SearchBar({
  id = 'search',
  placeholder = 'Search…',
  value,
  onChange,
  onClear,
  className,
}: {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}) {
  const [internal, setInternal] = useState('');
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internal;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!controlled) setInternal(e.target.value);
    onChange?.(e.target.value);
  }

  function handleClear() {
    if (!controlled) setInternal('');
    onChange?.('');
    onClear?.();
  }

  return (
    <div className={cn('relative flex items-center', className)}>
      <span
        aria-hidden="true"
        className="absolute left-3 text-text-disabled pointer-events-none select-none"
      >
        ⌕
      </span>
      <input
        id={id}
        type="search"
        role="searchbox"
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        data-testid={`searchbar-${id}`}
        className={cn(
          'block w-full rounded-md border border-border bg-surface-base px-3 py-2 pl-8 text-sm',
          'text-text-primary placeholder:text-text-disabled',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:border-border-focus',
          'transition-colors',
          currentValue && 'pr-8'
        )}
      />
      {currentValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2 text-text-disabled hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
        >
          ✕
        </button>
      )}
    </div>
  );
}
