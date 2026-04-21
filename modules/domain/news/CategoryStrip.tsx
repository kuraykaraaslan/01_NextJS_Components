'use client';
import { useState } from 'react';
import { TabGroup } from '@/modules/ui/TabGroup';
import { Badge } from '@/modules/ui/Badge';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { Card } from '@/modules/ui/Card';

const CATEGORIES = [
  { id: 'world', label: 'World', count: 248, items: ['US-China trade talks resume amid renewed tensions', 'EU drafts framework for migrant processing centers', 'African Union condemns Sahel coup wave'] },
  { id: 'tech', label: 'Technology', count: 193, items: ['OpenAI releases GPT-5 with enhanced reasoning', 'Meta announces layoffs in Reality Labs division', 'EU fines Google €2.4B for search monopoly'] },
  { id: 'finance', label: 'Finance', count: 167, items: ['S&P 500 hits record high on earnings optimism', 'Bitcoin surges past $90,000 after ETF inflows', 'JPMorgan posts Q1 profit beat, raises guidance'] },
  { id: 'science', label: 'Science', count: 142, items: ['CERN confirms detection of rare particle decay', 'Mars colonization feasibility study released by NASA', 'RNA vaccine platform shows promise against cancer'] },
  { id: 'health', label: 'Health', count: 118, items: ['WHO issues guidance on ultra-processed food limits', 'New Alzheimer\'s drug slows cognitive decline', 'Global vaccination coverage rises to 72%'] },
];

const SORT_ITEMS: ButtonGroupItem[] = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'editors', label: "Editor's pick" },
];

function CategoryContent({ cat }: { cat: typeof CATEGORIES[0] }) {
  const [sortBy, setSortBy] = useState('latest');
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">{cat.count}</span> articles in {cat.label}
        </p>
        <ButtonGroup items={SORT_ITEMS} value={sortBy} onChange={setSortBy} variant="outline" size="sm" />
      </div>
      <div className="space-y-2">
        {cat.items.map((item, i) => (
          <Card key={i} className="px-4 py-3 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="text-sm font-bold text-text-disabled tabular-nums w-5 shrink-0">{i + 1}</span>
              <p className="text-sm text-text-primary leading-snug">{item}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function CategoryStrip({ className }: { className?: string }) {
  return (
    <div className={className}>
      <TabGroup
        label="News categories"
        tabs={CATEGORIES.map((cat) => ({
          id: cat.id,
          label: cat.label,
          badge: (
            <Badge variant="neutral" size="sm">{cat.count}</Badge>
          ),
          content: <CategoryContent cat={cat} />,
        }))}
      />
    </div>
  );
}
