'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useMemo, useRef, useState } from 'react';

export type ComboBoxOption = {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type ComboBoxProps = {
  id: string;
  label: string;
  options: ComboBoxOption[];
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => ComboBoxOption[] | Promise<ComboBoxOption[]>;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  noResultsText?: string;
  className?: string;
};

export function ComboBox({
  id,
  label,
  options,
  value,
  onChange,
  onSearch,
  placeholder = 'Search or select...',
  hint,
  error,
  disabled,
  required,
  clearable = true,
  noResultsText = 'No results found.',
  className,
}: ComboBoxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState(value ?? '');
  const [asyncOptions, setAsyncOptions] = useState<ComboBoxOption[] | null>(null);

  const selectedValue = value !== undefined ? value : internalValue;
  const sourceOptions = asyncOptions ?? options;

  const selectedOption = useMemo(
    () => sourceOptions.find((opt) => opt.value === selectedValue) ?? options.find((opt) => opt.value === selectedValue),
    [options, selectedValue, sourceOptions]
  );

  const filteredOptions = useMemo(() => {
    if (onSearch) return sourceOptions;

    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return sourceOptions;

    return sourceOptions.filter((opt) => (
      opt.label.toLowerCase().includes(normalizedQuery)
      || opt.description?.toLowerCase().includes(normalizedQuery)
    ));
  }, [onSearch, query, sourceOptions]);

  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  const listboxId = `${id}-listbox`;

  useEffect(() => {
    if (!open) {
      setQuery(selectedOption?.label ?? '');
      setHighlightedIndex(-1);
    }
  }, [open, selectedOption?.label]);

  useEffect(() => {
    if (!onSearch || !open) return;

    let active = true;
    const result = onSearch(query.trim());

    if (typeof (result as Promise<ComboBoxOption[]>).then === 'function') {
      setLoading(true);
      Promise.resolve(result)
        .then((next) => {
          if (!active) return;
          setAsyncOptions(next);
        })
        .catch(() => {
          if (!active) return;
          setAsyncOptions([]);
        })
        .finally(() => {
          if (!active) return;
          setLoading(false);
        });
    } else {
      setLoading(false);
      setAsyncOptions(result as ComboBoxOption[]);
    }

    return () => {
      active = false;
    };
  }, [onSearch, open, query]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!rootRef.current || rootRef.current.contains(event.target as Node)) return;
      setOpen(false);
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  function commitValue(next: string) {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }

  function handleSelect(option: ComboBoxOption) {
    if (option.disabled) return;
    commitValue(option.value);
    setQuery(option.label);
    setOpen(false);
    setHighlightedIndex(-1);
  }

  function handleClear(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (disabled) return;
    commitValue('');
    setQuery('');
    setOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }

  function moveHighlight(direction: 1 | -1) {
    if (filteredOptions.length === 0) return;

    let idx = highlightedIndex;
    for (let i = 0; i < filteredOptions.length; i += 1) {
      idx = (idx + direction + filteredOptions.length) % filteredOptions.length;
      if (!filteredOptions[idx]?.disabled) {
        setHighlightedIndex(idx);
        break;
      }
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) setOpen(true);
      moveHighlight(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) setOpen(true);
      moveHighlight(-1);
      return;
    }

    if (event.key === 'Enter') {
      if (!open || highlightedIndex < 0) return;
      event.preventDefault();
      const opt = filteredOptions[highlightedIndex];
      if (opt) handleSelect(opt);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key === 'Tab') {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className={cn('space-y-1', className)}>
      <label id={`${id}-label`} htmlFor={`${id}-input`} className="block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="ml-1 text-error" aria-hidden="true">*</span>}
      </label>

      <div
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-labelledby={`${id}-label`}
        aria-disabled={disabled}
        aria-invalid={!!error}
        className={cn(
          'flex min-h-10 w-full items-center gap-2 rounded-md border bg-surface-base px-3 py-1.5 transition-colors',
          'focus-within:ring-2 focus-within:ring-border-focus',
          error ? 'border-error ring-1 ring-error bg-error-subtle' : 'border-border',
          disabled && 'cursor-not-allowed bg-surface-sunken opacity-50'
        )}
        onClick={() => {
          if (disabled) return;
          inputRef.current?.focus();
          setOpen(true);
        }}
      >
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="text"
          role="searchbox"
          disabled={disabled}
          required={required}
          value={open ? query : (selectedOption?.label ?? query)}
          placeholder={placeholder}
          aria-describedby={describedBy}
          aria-autocomplete="list"
          aria-activedescendant={highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined}
          className={cn(
            'w-full bg-transparent text-sm text-text-primary placeholder:text-text-disabled',
            'outline-none'
          )}
          onFocus={() => {
            if (disabled) return;
            setOpen(true);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setHighlightedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
        />

        {clearable && !!selectedValue && !disabled && (
          <button
            type="button"
            aria-label="Clear selection"
            onClick={handleClear}
            className="rounded px-1 text-text-disabled transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            x
          </button>
        )}

        <span aria-hidden="true" className="select-none text-xs text-text-disabled">
          {open ? '^' : 'v'}
        </span>
      </div>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="z-20 max-h-60 w-full overflow-y-auto rounded-md border border-border bg-surface-raised py-1 shadow-lg"
        >
          {loading ? (
            <li className="px-3 py-3 text-sm text-text-secondary">Loading...</li>
          ) : filteredOptions.length === 0 ? (
            <li className="px-3 py-3 text-sm text-text-secondary">{noResultsText}</li>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = option.value === selectedValue;
              const isHighlighted = index === highlightedIndex;

              return (
                <li key={option.value} id={`${id}-option-${index}`} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    disabled={option.disabled}
                    className={cn(
                      'flex w-full items-start gap-2 px-3 py-2 text-left text-sm transition-colors',
                      'focus-visible:outline-none',
                      isHighlighted ? 'bg-surface-overlay' : 'hover:bg-surface-overlay',
                      isSelected && 'font-medium text-primary',
                      option.disabled && 'cursor-not-allowed opacity-50'
                    )}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelect(option)}
                  >
                    {option.icon && <span className="mt-0.5 shrink-0" aria-hidden="true">{option.icon}</span>}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{option.label}</span>
                      {option.description && (
                        <span className="block truncate text-xs text-text-secondary">{option.description}</span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      )}

      {hint && !error && <p id={hintId} className="text-xs text-text-secondary">{hint}</p>}
      {error && <p id={errorId} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}
