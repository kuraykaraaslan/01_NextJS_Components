'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef, useState } from 'react';

export type ComboBoxOption = { value: string; label: string };

export function ComboBox({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  searchPlaceholder = 'Search…',
  hint,
  error,
  disabled,
  required,
  clearable = true,
  className,
}: {
  id: string;
  label: string;
  options: ComboBoxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);
  const filtered = search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => searchRef.current?.focus(), 30);
    function onOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpen(false); setSearch(''); }
    }
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function select(v: string) {
    onChange(v);
    setOpen(false);
    setSearch('');
  }

  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div ref={containerRef} className={cn('space-y-1', className)}>
      <label htmlFor={`${id}-btn`} className="block text-sm font-medium text-text-primary">
        {label}
        {required && (
          <>
            <span className="text-error ml-1" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>

      <button
        id={`${id}-btn`}
        type="button"
        onClick={() => !disabled && setOpen((p) => !p)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-describedby={describedBy}
        aria-invalid={!!error}
        data-testid={`combobox-${id}`}
        className={cn(
          'flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:border-border-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-sunken',
          error
            ? 'border-error ring-1 ring-error bg-error-subtle'
            : 'border-border bg-surface-base',
          !selected && 'text-text-disabled',
          selected && 'text-text-primary'
        )}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <span
          aria-hidden="true"
          className={cn(
            'ml-2 shrink-0 text-text-disabled text-xs transition-transform duration-150',
            open && 'rotate-180'
          )}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          className="relative z-50 mt-1 w-full rounded-lg border border-border bg-surface-raised shadow-lg overflow-hidden"
        >
          <div className="p-2 border-b border-border">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className={cn(
                'block w-full rounded-md border border-border bg-surface-base px-3 py-1.5 text-sm',
                'text-text-primary placeholder:text-text-disabled',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus'
              )}
            />
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {clearable && (
              <button
                type="button"
                onClick={() => select('')}
                className="w-full px-3 py-2 text-left text-sm text-text-disabled hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:bg-surface-overlay"
              >
                {placeholder}
              </button>
            )}
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-sm text-center text-text-secondary">No results found.</p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={opt.value === value}
                  onClick={() => select(opt.value)}
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:bg-surface-overlay',
                    opt.value === value
                      ? 'bg-primary-subtle text-primary font-medium'
                      : 'text-text-primary hover:bg-surface-overlay'
                  )}
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {hint && !error && <p id={hintId} className="text-xs text-text-secondary">{hint}</p>}
      {error && <p id={errorId} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}
