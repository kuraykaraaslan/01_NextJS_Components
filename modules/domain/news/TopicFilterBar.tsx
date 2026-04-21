'use client';
import { useState } from 'react';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Select } from '@/modules/ui/Select';
import { MultiSelect } from '@/modules/ui/MultiSelect';
import { DateRangePicker, type DateRange } from '@/modules/ui/DateRangePicker';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'world', label: 'World' },
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'health', label: 'Health' },
  { value: 'science', label: 'Science' },
  { value: 'politics', label: 'Politics' },
  { value: 'environment', label: 'Environment' },
  { value: 'sport', label: 'Sport' },
];

const TAG_OPTIONS = [
  { value: 'ai', label: 'AI' },
  { value: 'climate', label: 'Climate' },
  { value: 'economy', label: 'Economy' },
  { value: 'elections', label: 'Elections' },
  { value: 'space', label: 'Space' },
  { value: 'health-crisis', label: 'Health Crisis' },
  { value: 'markets', label: 'Markets' },
  { value: 'innovation', label: 'Innovation' },
];

export function TopicFilterBar({ className }: { className?: string }) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });

  const activeCount = [
    keyword.trim().length > 0,
    category !== '',
    tags.length > 0,
    dateRange.start !== null,
  ].filter(Boolean).length;

  function handleReset() {
    setKeyword('');
    setCategory('');
    setTags([]);
    setDateRange({ start: null, end: null });
  }

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">Filter Articles</span>
            {activeCount > 0 && (
              <Badge variant="info" size="sm">{activeCount} active</Badge>
            )}
          </div>
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset all
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <SearchBar
              value={keyword}
              onChange={setKeyword}
              placeholder="Search by keyword, title, or author…"
            />
          </div>
          <Select
            id="filter-category"
            label="Category"
            options={CATEGORIES}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <MultiSelect
            id="filter-tags"
            label="Tags"
            options={TAG_OPTIONS}
            value={tags}
            onChange={setTags}
            placeholder="Select tags…"
          />
          <div className="sm:col-span-2">
            <DateRangePicker
              id="filter-date"
              label="Date range"
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="sm">
            Apply filters {activeCount > 0 && `(${activeCount})`}
          </Button>
        </div>
      </div>
    </div>
  );
}
