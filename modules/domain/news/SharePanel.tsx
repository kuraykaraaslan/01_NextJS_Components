'use client';
import { useState } from 'react';
import { Tooltip } from '@/modules/ui/Tooltip';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';
import { Badge } from '@/modules/ui/Badge';

export function SharePanel({
  shareCount = 4821,
  articleUrl = 'https://thenewsroom.com/articles/geneva-climate-accord-2026',
  articleTitle = 'Global Leaders Reach Landmark Climate Agreement at Geneva Summit',
  className,
}: {
  shareCount?: number;
  articleUrl?: string;
  articleTitle?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(shareCount);

  function handleCopy() {
    navigator.clipboard?.writeText(articleUrl).catch(() => {});
    setCopied(true);
    setCount((c) => c + 1);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-text-disabled">Shares:</span>
          <Badge variant="neutral" size="sm">{count.toLocaleString()}</Badge>
        </div>

        <Tooltip content={copied ? 'Link copied!' : 'Copy article link'}>
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
              copied
                ? 'bg-success-subtle border-success text-success-fg'
                : 'bg-surface-overlay border-border text-text-primary hover:bg-surface-sunken'
            }`}
          >
            {copied ? '✓' : '🔗'} {copied ? 'Copied!' : 'Copy link'}
          </button>
        </Tooltip>

        <DropdownMenu
          trigger={
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-border bg-surface-overlay hover:bg-surface-sunken transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
              Share via ▾
            </button>
          }
          items={[
            { label: '𝕏 Share on X (Twitter)', onClick: () => setCount((c) => c + 1) },
            { label: 'in Share on LinkedIn', onClick: () => setCount((c) => c + 1) },
            { label: '📘 Share on Facebook', onClick: () => setCount((c) => c + 1) },
            { label: '📧 Email article', onClick: () => setCount((c) => c + 1) },
            { label: '💬 Share via WhatsApp', onClick: () => setCount((c) => c + 1) },
          ]}
        />
      </div>
    </div>
  );
}
