'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { CheckboxGroup } from '@/modules/ui/CheckboxGroup';
import { Button } from '@/modules/ui/Button';
import { Toast } from '@/modules/ui/Toast';
import { Select } from '@/modules/ui/Select';
import { Badge } from '@/modules/ui/Badge';

type WatchlistItem = {
  id: string;
  title: string;
  genre: string;
};

const ALL_ITEMS: WatchlistItem[] = [
  { id: 'w1', title: 'State of AI 2026', genre: 'Technology' },
  { id: 'w2', title: 'Design Systems Deep Dive', genre: 'Design' },
  { id: 'w3', title: 'Rust for Web Developers', genre: 'Programming' },
  { id: 'w4', title: 'The Startup Playbook', genre: 'Business' },
  { id: 'w5', title: 'Modern CSS Architecture', genre: 'Design' },
  { id: 'w6', title: 'AI Ethics in Practice', genre: 'Technology' },
];

const GENRE_OPTIONS = [
  { value: 'all', label: 'All genres' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Design', label: 'Design' },
  { value: 'Programming', label: 'Programming' },
  { value: 'Business', label: 'Business' },
];

export function WatchlistManager() {
  const [items, setItems] = useState<WatchlistItem[]>(ALL_ITEMS);
  const [selected, setSelected] = useState<string[]>([]);
  const [genre, setGenre] = useState('all');
  const [toastMsg, setToastMsg] = useState('');

  const filtered = genre === 'all' ? items : items.filter((i) => i.genre === genre);
  const filteredTitles = filtered.map((i) => i.title);

  function handleRemove() {
    const count = selected.length;
    setItems((prev) => prev.filter((i) => !selected.includes(i.title)));
    setSelected([]);
    setToastMsg(`Removed ${count} item${count !== 1 ? 's' : ''} from watchlist.`);
  }

  return (
    <Card className="max-w-sm">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">My Watchlist</h3>
          <Badge variant="neutral" size="sm">{items.length} titles</Badge>
        </div>

        {toastMsg && <Toast variant="info" message={toastMsg} onDismiss={() => setToastMsg('')} duration={3000} />}

        <Select id="watchlist-genre" label="Filter by genre" options={GENRE_OPTIONS} value={genre} onChange={(e) => { setGenre(e.target.value); setSelected([]); }} />

        {filteredTitles.length > 0 ? (
          <CheckboxGroup
            legend="Select titles to remove"
            options={filteredTitles}
            selected={selected}
            onChange={setSelected}
          />
        ) : (
          <p className="text-sm text-text-secondary">No titles in this genre.</p>
        )}

        <Button variant="danger" fullWidth disabled={selected.length === 0} onClick={handleRemove}>
          Remove selected ({selected.length})
        </Button>
      </div>
    </Card>
  );
}
