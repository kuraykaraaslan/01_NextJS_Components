'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef, useState } from 'react';

export type MultiSelectOption = { value: string; label: string; disabled?: boolean };

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
  className?: string;
}) {
  const [internal, setInternal] = useState<string[]>(value ?? []);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = value !== undefined ? value : internal;

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
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

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
        <ul
          role="listbox"
          aria-labelledby={`${id}-label`}
          aria-multiselectable="true"
          className="z-20 w-full rounded-md border border-border bg-surface-raised shadow-lg py-1 max-h-48 overflow-y-auto"
        >
          {options.map((opt) => {
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
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}

      {hint && !error && <p id={hintId} className="text-xs text-text-secondary">{hint}</p>}
      {error && <p id={errorId} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}
