'use client';
import { useState } from 'react';
import { DataTable } from '@/modules/ui/DataTable';
import { Badge } from '@/modules/ui/Badge';
import { Toggle } from '@/modules/ui/Toggle';
import type { TableColumn } from '@/modules/ui/DataTable';

type Episode = {
  id: string;
  ep: number;
  title: string;
  duration: string;
  rating: string;
  watched: boolean;
};

const EPISODES: Episode[] = [
  { id: 'e1', ep: 1, title: 'The Beginning', duration: '45m', rating: '8.4', watched: true },
  { id: 'e2', ep: 2, title: 'Into the Deep', duration: '52m', rating: '8.7', watched: true },
  { id: 'e3', ep: 3, title: 'The Turning Point', duration: '48m', rating: '9.1', watched: false },
  { id: 'e4', ep: 4, title: 'Breaking Boundaries', duration: '55m', rating: '8.9', watched: false },
  { id: 'e5', ep: 5, title: 'Final Chapter', duration: '61m', rating: '9.5', watched: false },
];

export function EpisodeListPanel() {
  const [episodes, setEpisodes] = useState<Episode[]>(EPISODES);

  function toggleWatched(id: string, checked: boolean) {
    setEpisodes((prev) => prev.map((e) => e.id === id ? { ...e, watched: checked } : e));
  }

  const columns: TableColumn<Episode>[] = [
    { key: 'ep', header: 'Ep.', sortable: true },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'duration', header: 'Duration', render: (r) => <Badge variant="neutral" size="sm">{r.duration}</Badge> },
    { key: 'rating', header: 'Rating', sortable: true, render: (r) => <Badge variant={Number(r.rating) >= 9 ? 'success' : 'primary'} size="sm">⭐ {r.rating}</Badge> },
    {
      key: 'watched', header: 'Watched', align: 'center',
      render: (r) => (
        <Toggle
          id={`watch-${r.id}`}
          label="Watched"
          checked={r.watched}
          onChange={(checked) => toggleWatched(r.id, checked)}
          size="sm"
        />
      ),
    },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-text-primary">Episodes — Season 1</h3>
      <DataTable<Episode> columns={columns} rows={episodes} pageSize={5} searchPlaceholder="Search episodes…" caption="Episode list" />
    </div>
  );
}
