'use client';
import { cn } from '@/libs/utils/cn';
import { useRef, useState } from 'react';

export function TagInput({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  placeholder = 'Type and press Enter or comma…',
  disabled,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [input, setInput] = useState('');
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  function addTags(raw: string) {
    const tags = raw.split(',').map((t) => t.trim()).filter(Boolean);
    onChange([...new Set([...value, ...tags])]);
    setInput('');
  }

  function removeTag(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  function handleInputChange(v: string) {
    if (v.includes(',')) {
      const parts = v.split(',');
      parts.slice(0, -1).forEach((p) => p.trim() && addTags(p));
      setInput(parts[parts.length - 1]);
    } else {
      setInput(v);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      addTags(input);
    } else if (e.key === 'Backspace' && !input && value.length) {
      removeTag(value.length - 1);
    }
  }

  function finishEdit() {
    if (editingIdx === null) return;
    const trimmed = editValue.trim();
    if (trimmed) {
      const next = [...value];
      next[editingIdx] = trimmed;
      onChange([...new Set(next)]);
    }
    setEditingIdx(null);
    setEditValue('');
  }

  return (
    <div className={cn('space-y-1', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          'flex flex-wrap gap-1.5 min-h-10 w-full rounded-md border px-3 py-2 transition-colors cursor-text',
          'focus-within:ring-2 focus-within:ring-border-focus focus-within:border-border-focus',
          disabled
            ? 'opacity-50 cursor-not-allowed bg-surface-sunken border-border'
            : 'bg-surface-base border-border',
          error && 'border-error ring-1 ring-error bg-error-subtle'
        )}
      >
        {value.map((tag, i) =>
          editingIdx === i ? (
            <input
              key={i}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={finishEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); finishEdit(); }
                if (e.key === 'Escape') { setEditingIdx(null); setEditValue(''); }
              }}
              autoFocus
              className="inline-block w-24 rounded border border-border-focus bg-surface-base px-1.5 py-0.5 text-xs text-text-primary outline-none"
            />
          ) : (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-subtle text-primary"
              onDoubleClick={() => { if (!disabled) { setEditingIdx(i); setEditValue(tag); } }}
              title="Double-click to edit"
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeTag(i); }}
                  aria-label={`Remove ${tag}`}
                  className="hover:opacity-70 focus-visible:outline-none rounded-full"
                >
                  ✕
                </button>
              )}
            </span>
          )
        )}
        {!disabled && (
          <input
            ref={inputRef}
            id={id}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => { if (input.trim()) addTags(input); }}
            placeholder={value.length === 0 ? placeholder : undefined}
            aria-describedby={describedBy}
            className="flex-1 min-w-24 bg-transparent text-sm text-text-primary placeholder:text-text-disabled outline-none"
          />
        )}
      </div>
      {hint && !error && <p id={hintId} className="text-xs text-text-secondary">{hint}</p>}
      {!hint && !error && value.length > 0 && <p className="text-xs text-text-disabled">Double-click a tag to edit it</p>}
      {error && <p id={errorId} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}
