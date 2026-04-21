'use client';
import { useState } from 'react';
import { Select } from '@/modules/ui/Select';
import { MultiSelect } from '@/modules/ui/MultiSelect';
import { DateRangePicker, type DateRange } from '@/modules/ui/DateRangePicker';
import { CheckboxGroup } from '@/modules/ui/CheckboxGroup';
import { Input } from '@/modules/ui/Input';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';

const CATEGORIES = [
  { value: '', label: 'Any category' },
  { value: 'world', label: 'World' },
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'health', label: 'Health' },
  { value: 'science', label: 'Science' },
  { value: 'politics', label: 'Politics' },
  { value: 'environment', label: 'Environment' },
];

const TAG_OPTIONS = [
  { value: 'ai', label: 'Artificial Intelligence' },
  { value: 'climate', label: 'Climate Change' },
  { value: 'elections', label: 'Elections' },
  { value: 'economy', label: 'Economy' },
  { value: 'space', label: 'Space' },
  { value: 'health-crisis', label: 'Health Crisis' },
];

const REGION_OPTIONS = ['North America', 'Europe', 'Asia-Pacific', 'Middle East', 'Africa', 'Latin America'];

export function AdvancedSearchFilters({ className }: { className?: string }) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [regions, setRegions] = useState<string[]>([]);

  const activeCount = [
    keyword.trim().length > 0,
    category !== '',
    tags.length > 0,
    dateRange.start !== null,
    regions.length > 0,
  ].filter(Boolean).length;

  function handleReset() {
    setKeyword('');
    setCategory('');
    setTags([]);
    setDateRange({ start: null, end: null });
    setRegions([]);
  }

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised p-5 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-text-primary">Advanced Search</h3>
            {activeCount > 0 && <Badge variant="info" size="sm">{activeCount} filter{activeCount > 1 ? 's' : ''}</Badge>}
          </div>
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReset}>Clear all</Button>
          )}
        </div>

        <Input
          id="adv-keyword"
          label="Keyword"
          placeholder="Enter keywords, article title, or author name…"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            id="adv-category"
            label="Category"
            options={CATEGORIES}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <MultiSelect
            id="adv-tags"
            label="Tags"
            options={TAG_OPTIONS}
            value={tags}
            onChange={setTags}
            placeholder="Select topic tags…"
          />
        </div>

        <DateRangePicker
          id="adv-daterange"
          label="Publication date range"
          value={dateRange}
          onChange={setDateRange}
        />

        <CheckboxGroup
          legend="Region"
          options={REGION_OPTIONS}
          selected={regions}
          onChange={setRegions}
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <Button variant="secondary" size="sm" onClick={handleReset}>Reset</Button>
          <Button variant="primary" size="sm">
            Search {activeCount > 0 && `(${activeCount} filter${activeCount > 1 ? 's' : ''})`}
          </Button>
        </div>
      </div>
    </div>
  );
}
