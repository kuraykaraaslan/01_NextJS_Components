'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef, useState } from 'react';

export type MultiSelectOption = { value: string; label: string; icon?: React.ReactNode; disabled?: boolean };

export function MultiSelect({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  hint,
  error,
  disabled,
  searchable,
  className,
}: {
  id: string;
  label: string;
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
}) {
  const [internal, setInternal] = useState<string[]>(value ?? []);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = value !== undefined ? value : internal;

  const filtered = searchable && search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  function toggle(v: string) {
    const next = selected.includes(v)
      ? selected.filter((s) => s !== v)
      : [...selected, v];
    if (value === undefined) setInternal(next);
    onChange?.(next);
  }

  function remove(v: string, e: React.MouseEvent) {
    e.stopPropagation();
    toggle(v);
  }

  useEffect(() => {
    if (!open) { setSearch(''); return; }
    if (searchable) setTimeout(() => searchRef.current?.focus(), 30);
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [open, searchable]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((o) => !o); }
  }

  const hintId  = hint  ? `${id}-hint`  : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div ref={containerRef} className={cn('space-y-1', className)}>
      <label
        id={`${id}-label`}
        className="block text-sm font-medium text-text-primary"
      >
        {label}
      </label>

      <div className="relative">
      <div
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        aria-describedby={describedBy}
        aria-disabled={disabled}
        id={id}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={cn(
          'min-h-[2.5rem] w-full rounded-md border px-3 py-1.5 text-sm transition-colors cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
          'flex flex-wrap gap-1 items-center',
          error   ? 'border-error ring-1 ring-error bg-error-subtle'
                  : 'border-border bg-surface-base',
          disabled && 'opacity-50 cursor-not-allowed bg-surface-sunken'
        )}
      >
        {selected.length === 0 ? (
          <span className="text-text-disabled">{placeholder}</span>
        ) : (
          selected.map((v) => {
            const opt = options.find((o) => o.value === v);
            return (
              <span
                key={v}
                className="inline-flex items-center gap-1 rounded-full bg-primary-subtle text-primary text-xs font-medium px-2 py-0.5"
              >
                {opt?.icon && <span className="shrink-0">{opt.icon}</span>}
                {opt?.label ?? v}
                <button
                  type="button"
                  aria-label={`Remove ${opt?.label ?? v}`}
                  onClick={(e) => remove(v, e)}
                  className="hover:opacity-70 focus-visible:outline-none"
                >
                  ✕
                </button>
              </span>
            );
          })
        )}
        <span aria-hidden="true" className="ml-auto text-text-disabled text-xs">{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div className="absolute z-20 w-full rounded-md border border-border bg-surface-raised shadow-lg overflow-hidden top-full left-0 mt-1">
          {searchable && (
            <div className="p-2 border-b border-border">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className={cn(
                  'block w-full rounded-md border border-border bg-surface-base px-3 py-1.5 text-sm',
                  'text-text-primary placeholder:text-text-disabled',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus'
                )}
              />
            </div>
          )}
          <ul
            role="listbox"
            aria-labelledby={`${id}-label`}
            aria-multiselectable="true"
            className="py-1 max-h-48 overflow-y-auto"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-4 text-sm text-center text-text-secondary">No results found.</li>
            ) : (
              filtered.map((opt) => {
                const checked = selected.includes(opt.value);
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={checked}
                    aria-disabled={opt.disabled}
                    onClick={() => !opt.disabled && toggle(opt.value)}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && !opt.disabled) {
                        e.preventDefault();
                        toggle(opt.value);
                      }
                    }}
                    tabIndex={opt.disabled ? -1 : 0}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer select-none',
                      'hover:bg-surface-overlay transition-colors',
                      'focus-visible:outline-none focus-visible:bg-surface-overlay',
                      checked && 'text-primary font-medium',
                      opt.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 text-[10px]',
                        checked ? 'bg-primary border-primary text-primary-fg' : 'border-border bg-surface-base'
                      )}
                    >
                      {checked && '✓'}
                    </span>
                    {opt.icon && <span className="shrink-0" aria-hidden="true">{opt.icon}</span>}
                    {opt.label}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      </div>

      {hint && !error && <p id={hintId} className="text-xs text-text-secondary">{hint}</p>}
      {error && <p id={errorId} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}
