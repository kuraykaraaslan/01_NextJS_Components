'use client';
import { cn } from '@/libs/utils/cn';
import { useRef, useState } from 'react';

type FileEntry = {
  file: File;
  error?: string;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileInput({
  id,
  label,
  hint,
  multiple = false,
  accept,
  maxSizeBytes,
  allowedTypes,
  disabled,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  multiple?: boolean;
  accept?: string;
  maxSizeBytes?: number;
  allowedTypes?: string[];
  disabled?: boolean;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [dragging, setDragging] = useState(false);

  function validate(file: File): string | undefined {
    if (maxSizeBytes && file.size > maxSizeBytes) {
      return `File exceeds ${formatBytes(maxSizeBytes)} limit`;
    }
    if (allowedTypes && !allowedTypes.includes(file.type)) {
      return `File type not allowed`;
    }
    return undefined;
  }

  function addFiles(files: FileList | null) {
    if (!files) return;
    const newEntries: FileEntry[] = Array.from(files).map((file) => ({
      file,
      error: validate(file),
    }));
    setEntries((prev) => multiple ? [...prev, ...newEntries] : newEntries);
  }

  function removeEntry(i: number) {
    setEntries((prev) => prev.filter((_, idx) => idx !== i));
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">{label}</label>

      <div
        className={cn(
          'relative rounded-lg border-2 border-dashed border-border bg-surface-base transition-colors',
          'flex flex-col items-center justify-center gap-2 px-6 py-8 text-center',
          dragging && 'border-primary bg-primary-subtle',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) addFiles(e.dataTransfer.files);
        }}
      >
        <span className="text-2xl" aria-hidden="true">📁</span>
        <p className="text-sm text-text-secondary">
          Drag & drop files here, or{' '}
          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="text-primary underline underline-offset-2 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded disabled:cursor-not-allowed"
          >
            browse
          </button>
        </p>
        {hint && <p className="text-xs text-text-disabled">{hint}</p>}
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {entries.length > 0 && (
        <ul className="space-y-1.5" aria-label="Selected files">
          {entries.map((entry, i) => (
            <li
              key={i}
              className={cn(
                'flex items-center gap-3 rounded-md border px-3 py-2 text-sm',
                entry.error
                  ? 'border-error bg-error-subtle text-error-fg'
                  : 'border-border bg-surface-raised text-text-primary'
              )}
            >
              <span className="flex-1 truncate min-w-0">
                <span className="font-medium">{entry.file.name}</span>
                <span className="ml-2 text-xs text-text-secondary">{formatBytes(entry.file.size)}</span>
              </span>
              {entry.error && (
                <span className="text-xs text-error shrink-0">{entry.error}</span>
              )}
              <button
                type="button"
                aria-label={`Remove ${entry.file.name}`}
                onClick={() => removeEntry(i)}
                className="shrink-0 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
