'use client';
import { useState } from 'react';
import { Badge } from '@/modules/ui/Badge';
import { TagInput } from '@/modules/ui/TagInput';
import { ButtonGroup } from '@/modules/ui/ButtonGroup';

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'primary';

type Topic = {
  name: string;
  count: number;
  trending: boolean;
  isNew: boolean;
};

const ALL_TOPICS: Topic[] = [
  { name: 'React', count: 1420, trending: true, isNew: false },
  { name: 'TypeScript', count: 1180, trending: true, isNew: false },
  { name: 'Next.js', count: 980, trending: true, isNew: false },
  { name: 'AI/ML', count: 850, trending: true, isNew: false },
  { name: 'Web3', count: 430, trending: false, isNew: false },
  { name: 'GraphQL', count: 380, trending: false, isNew: false },
  { name: 'Rust', count: 290, trending: false, isNew: true },
  { name: 'Svelte', count: 240, trending: false, isNew: true },
  { name: 'Bun', count: 180, trending: false, isNew: true },
  { name: 'Edge Computing', count: 150, trending: false, isNew: true },
  { name: 'CSS', count: 820, trending: false, isNew: false },
  { name: 'DevOps', count: 560, trending: false, isNew: false },
];

const FILTER_ITEMS = [
  { value: 'all', label: 'All' },
  { value: 'trending', label: 'Trending' },
  { value: 'new', label: 'New' },
];

function topicVariant(t: Topic): BadgeVariant {
  if (t.count > 1000) return 'error';
  if (t.count > 500) return 'warning';
  if (t.isNew) return 'primary';
  return 'neutral';
}

export function TopicTagCloud() {
  const [filter, setFilter] = useState('all');
  const [customTopics, setCustomTopics] = useState<string[]>([]);

  const filtered = ALL_TOPICS.filter((t) => {
    if (filter === 'trending') return t.trending;
    if (filter === 'new') return t.isNew;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-sm font-semibold text-text-primary">Topic Tag Cloud</h3>
        <ButtonGroup items={FILTER_ITEMS} value={filter} onChange={setFilter} size="sm" />
      </div>

      <div className="flex flex-wrap gap-2">
        {filtered.map((t) => (
          <button
            key={t.name}
            type="button"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-full"
          >
            <Badge variant={topicVariant(t)}>
              {t.name} <span className="opacity-70 text-xs">({t.count})</span>
            </Badge>
          </button>
        ))}
        {customTopics.map((t) => (
          <Badge key={t} variant="primary">{t}</Badge>
        ))}
      </div>

      <TagInput id="topic-search" label="Add custom topics" placeholder="Search or add topics…" value={customTopics} onChange={setCustomTopics} />
    </div>
  );
}
