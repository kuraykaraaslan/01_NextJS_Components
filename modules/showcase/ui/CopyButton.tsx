'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy code"
      className={cn(
        'px-2.5 py-1 text-xs rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        copied
          ? 'bg-success-subtle text-success-fg'
          : 'bg-surface-overlay text-text-secondary hover:text-text-primary hover:bg-surface-sunken'
      )}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
