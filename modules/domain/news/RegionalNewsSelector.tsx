'use client';
import { useState } from 'react';
import { Select } from '@/modules/ui/Select';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { Badge } from '@/modules/ui/Badge';
import { Toggle } from '@/modules/ui/Toggle';
import { Card } from '@/modules/ui/Card';

const REGIONS = [
  { value: 'north-america', label: 'North America', count: 342, subRegions: ['United States', 'Canada', 'Mexico'] },
  { value: 'europe', label: 'Europe', count: 289, subRegions: ['Germany', 'France', 'UK', 'EU Brussels'] },
  { value: 'asia-pacific', label: 'Asia-Pacific', count: 267, subRegions: ['China', 'Japan', 'India', 'Australia'] },
  { value: 'middle-east', label: 'Middle East', count: 198, subRegions: ['Israel', 'Saudi Arabia', 'Iran', 'Turkey'] },
  { value: 'africa', label: 'Africa', count: 167, subRegions: ['Nigeria', 'South Africa', 'Egypt', 'Ethiopia'] },
  { value: 'latin-america', label: 'Latin America', count: 134, subRegions: ['Brazil', 'Argentina', 'Colombia', 'Chile'] },
];

const REGION_OPTIONS = REGIONS.map((r) => ({ value: r.value, label: r.label }));

const SORT_ITEMS: ButtonGroupItem[] = [
  { value: 'count', label: 'By volume' },
  { value: 'alpha', label: 'A–Z' },
];

export function RegionalNewsSelector({ className }: { className?: string }) {
  const [selected, setSelected] = useState('north-america');
  const [localNewsOnly, setLocalNewsOnly] = useState(false);
  const [sortMode, setSortMode] = useState('count');

  const currentRegion = REGIONS.find((r) => r.value === selected);
  const sorted = [...REGIONS].sort((a, b) =>
    sortMode === 'count' ? b.count - a.count : a.label.localeCompare(b.label)
  );

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised p-5 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-base font-bold text-text-primary">Regional News</h3>
          <Toggle
            id="local-news-toggle"
            label="Local news only"
            checked={localNewsOnly}
            onChange={(checked) => setLocalNewsOnly(checked)}
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-48">
            <Select
              id="region-select"
              label="Select region"
              options={REGION_OPTIONS}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            />
          </div>
          <div className="pt-5">
            <ButtonGroup items={SORT_ITEMS} value={sortMode} onChange={setSortMode} variant="outline" size="sm" />
          </div>
        </div>

        {currentRegion && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-primary">{currentRegion.label}</span>
                <Badge variant="info" size="sm">{currentRegion.count} articles</Badge>
                {localNewsOnly && <Badge variant="warning" size="sm">Local only</Badge>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {currentRegion.subRegions.map((sub) => (
                <button
                  key={sub}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-overlay border border-border hover:bg-surface-sunken transition-colors text-left text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <span>{sub}</span>
                  <span className="text-xs text-text-disabled">›</span>
                </button>
              ))}
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {sorted.map((region) => (
            <button
              key={region.value}
              onClick={() => setSelected(region.value)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                selected === region.value
                  ? 'bg-primary/10 border-primary text-primary font-semibold'
                  : 'bg-surface-overlay border-border text-text-primary hover:bg-surface-sunken'
              }`}
            >
              <span className="truncate">{region.label}</span>
              <Badge variant="neutral" size="sm">{region.count}</Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
