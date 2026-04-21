'use client';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';

export function BreadcrumbNav({
  items = [
    { label: 'Home', href: '/' },
    { label: 'World', href: '/world' },
    { label: 'Climate', href: '/world/climate' },
    { label: 'Geneva Summit 2026' },
  ],
  category = 'World / Climate',
  className,
}: {
  items?: Array<{ label: string; href?: string }>;
  category?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised p-4 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Navigation
          </span>
          <Tooltip content="Breadcrumb navigation helps search engines understand the page hierarchy and improves SEO crawlability. Schema.org BreadcrumbList markup is auto-generated.">
            <span>
              <Badge variant="info" size="sm">SEO: schema.org</Badge>
            </span>
          </Tooltip>
        </div>

        <Breadcrumb items={items} />

        <div className="flex items-center gap-2 pt-1 border-t border-border">
          <span className="text-xs text-text-disabled">Category path:</span>
          <Badge variant="neutral" size="sm">{category}</Badge>
          <Tooltip content="Category breadcrumb is used to generate JSON-LD structured data for Google rich results. This improves click-through rates in search.">
            <span>
              <Badge variant="success" size="sm">✓ Structured data active</Badge>
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
