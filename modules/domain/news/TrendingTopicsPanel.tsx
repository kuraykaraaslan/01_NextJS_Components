'use client';
import { useState } from 'react';
import { Badge } from '@/modules/ui/Badge';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { SearchBar } from '@/modules/ui/SearchBar';

type TrendingTopic = {
  id: string;
  name: string;
  articleCount: number;
  change: 'up' | 'down' | 'stable';
  category: string;
};

const ALL_TOPICS: TrendingTopic[] = [
  { id: '1', name: 'Climate Summit', articleCount: 847, change: 'up', category: 'World' },
  { id: '2', name: 'AI Regulation', articleCount: 634, change: 'up', category: 'Technology' },
  { id: '3', name: 'Fed Rate Decision', articleCount: 521, change: 'stable', category: 'Finance' },
  { id: '4', name: 'Ukraine Ceasefire', articleCount: 489, change: 'down', category: 'World' },
  { id: '5', name: 'Quantum Computing', articleCount: 312, change: 'up', category: 'Technology' },
  { id: '6', name: 'Gaza Humanitarian', articleCount: 298, change: 'stable', category: 'World' },
  { id: '7', name: 'Apple iPhone 17', articleCount: 275, change: 'up', category: 'Technology' },
  { id: '8', name: 'Inflation Data', articleCount: 241, change: 'down', category: 'Finance' },
  { id: '9', name: 'Space Tourism', articleCount: 198, change: 'up', category: 'Science' },
  { id: '10', name: 'Bird Flu H5N1', articleCount: 167, change: 'up', category: 'Health' },
  { id: '11', name: 'EV Battery Range', articleCount: 154, change: 'stable', category: 'Technology' },
  { id: '12', name: 'Drought Forecast', articleCount: 139, change: 'up', category: 'Environment' },
];

const changeIcon: Record<string, string> = { up: '↑', down: '↓', stable: '→' };
const changeColor: Record<string, string> = {
  up: 'text-success-fg',
  down: 'text-error-fg',
  stable: 'text-text-disabled',
};

const TIME_ITEMS: ButtonGroupItem[] = [
  { value: '24h', label: '24h' },
  { value: '7d', label: '7d' },
  { value: '30d', label: '30d' },
];

export function TrendingTopicsPanel({ className }: { className?: string }) {
  const [timeFilter, setTimeFilter] = useState('24h');
  const [query, setQuery] = useState('');

  const filtered = ALL_TOPICS.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-surface-overlay flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-text-primary">Trending Topics</span>
            <Badge variant="error" size="sm">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
                LIVE
              </span>
            </Badge>
          </div>
          <ButtonGroup items={TIME_ITEMS} value={timeFilter} onChange={setTimeFilter} variant="outline" size="sm" />
        </div>

        <div className="px-4 py-3 border-b border-border">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search trending topics…"
          />
        </div>

        <div className="divide-y divide-border">
          {filtered.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-text-secondary">No topics found.</p>
          ) : (
            filtered.map((topic, i) => (
              <div
                key={topic.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface-overlay transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold text-text-disabled w-5 tabular-nums shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-text-primary truncate">{topic.name}</span>
                    <span className={`text-xs font-bold ${changeColor[topic.change]}`} aria-label={`Trending ${topic.change}`}>
                      {changeIcon[topic.change]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Badge variant="neutral" size="sm">{topic.category}</Badge>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-sm font-semibold text-text-primary tabular-nums">
                    {topic.articleCount.toLocaleString()}
                  </span>
                  <p className="text-xs text-text-disabled">articles</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
