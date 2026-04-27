'use client';
import { cn } from '@/libs/utils/cn';
import type { SeoFields } from '../SeoTypes';

type SeoPreviewProps = {
  seo: SeoFields;
  url?: string;
  siteName?: string;
  className?: string;
};

const TITLE_PLACEHOLDER = 'Page title will appear here';
const DESC_PLACEHOLDER  = 'Meta description will appear here. Keep it between 120–160 characters for best results in search engines.';

export function SeoPreview({ seo, url = 'https://example.com/page', siteName, className }: SeoPreviewProps) {
  const title = seo.seoTitle?.trim() || TITLE_PLACEHOLDER;
  const desc  = seo.seoDescription?.trim() || DESC_PLACEHOLDER;
  const hasTitle = !!seo.seoTitle?.trim();
  const hasDesc  = !!seo.seoDescription?.trim();

  return (
    <div className={cn('rounded-xl border border-border bg-surface-raised p-4 space-y-3', className)}>
      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Google Preview</p>

      <div className="max-w-lg space-y-1">
        {siteName && (
          <p className="text-xs text-text-secondary truncate">{siteName}</p>
        )}
        <p className="text-xs text-success-fg truncate">{url}</p>
        <p className={cn('text-base font-medium leading-snug truncate', hasTitle ? 'text-[#1a0dab]' : 'text-text-disabled italic')}>
          {title}
        </p>
        <p className={cn('text-sm leading-relaxed line-clamp-2', hasDesc ? 'text-text-secondary' : 'text-text-disabled italic')}>
          {desc}
        </p>
      </div>

      <div className="flex gap-4 pt-1 border-t border-border">
        <div className="text-center">
          <p className={cn('text-sm font-semibold tabular-nums', (seo.seoTitle?.length ?? 0) > 60 ? 'text-error' : 'text-text-primary')}>
            {seo.seoTitle?.length ?? 0}
            <span className="text-text-secondary font-normal">/60</span>
          </p>
          <p className="text-xs text-text-secondary">Title</p>
        </div>
        <div className="text-center">
          <p className={cn('text-sm font-semibold tabular-nums', (seo.seoDescription?.length ?? 0) > 160 ? 'text-error' : 'text-text-primary')}>
            {seo.seoDescription?.length ?? 0}
            <span className="text-text-secondary font-normal">/160</span>
          </p>
          <p className="text-xs text-text-secondary">Description</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-text-primary tabular-nums">
            {seo.keywords?.length ?? 0}
          </p>
          <p className="text-xs text-text-secondary">Keywords</p>
        </div>
      </div>
    </div>
  );
}
