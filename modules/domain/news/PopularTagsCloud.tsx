'use client';
import { useState } from 'react';
import { Badge } from '@/modules/ui/Badge';
import { TagInput } from '@/modules/ui/TagInput';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';

const DEFAULT_TAGS = [
  { label: 'Climate Change', count: 847, variant: 'success' as const },
  { label: 'Artificial Intelligence', count: 712, variant: 'info' as const },
  { label: 'Elections 2026', count: 634, variant: 'warning' as const },
  { label: 'Economy', count: 589, variant: 'neutral' as const },
  { label: 'Ukraine', count: 521, variant: 'error' as const },
  { label: 'Space Exploration', count: 412, variant: 'info' as const },
  { label: 'Health Crisis', count: 398, variant: 'error' as const },
  { label: 'Innovation', count: 356, variant: 'success' as const },
  { label: 'Gaza', count: 334, variant: 'warning' as const },
  { label: 'Federal Reserve', count: 298, variant: 'neutral' as const },
  { label: 'Quantum Computing', count: 276, variant: 'info' as const },
  { label: 'Net Zero', count: 254, variant: 'success' as const },
  { label: 'NATO', count: 234, variant: 'neutral' as const },
  { label: 'Bitcoin', count: 212, variant: 'warning' as const },
  { label: 'Cancer Research', count: 198, variant: 'error' as const },
  { label: 'Autonomous Vehicles', count: 176, variant: 'neutral' as const },
];

const SORT_ITEMS: ButtonGroupItem[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'alpha', label: 'A–Z' },
];

export function PopularTagsCloud({ className }: { className?: string }) {
  const [sort, setSort] = useState('popular');
  const [customTags, setCustomTags] = useState<string[]>([]);

  const sorted = [...DEFAULT_TAGS].sort((a, b) =>
    sort === 'popular' ? b.count - a.count : a.label.localeCompare(b.label)
  );

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised p-5 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-base font-bold text-text-primary">Popular Tags</h3>
          <ButtonGroup items={SORT_ITEMS} value={sort} onChange={setSort} variant="outline" size="sm" />
        </div>

        <div className="flex flex-wrap gap-2">
          {sorted.map((tag) => (
            <button
              key={tag.label}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border border-border bg-surface-overlay hover:bg-surface-sunken transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <span className="text-text-primary">{tag.label}</span>
              <Badge variant={tag.variant} size="sm">{tag.count}</Badge>
            </button>
          ))}
        </div>

        <div className="pt-2 border-t border-border space-y-2">
          <p className="text-xs font-medium text-text-secondary">Add custom tag to follow:</p>
          <TagInput
            id="tag-cloud-input"
            label="Custom tags"
            value={customTags}
            onChange={setCustomTags}
            placeholder="Type a tag and press Enter…"
          />
        </div>
      </div>
    </div>
  );
}
