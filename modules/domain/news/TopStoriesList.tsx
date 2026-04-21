'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Pagination } from '@/modules/ui/Pagination';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Badge } from '@/modules/ui/Badge';

export type TopStory = {
  id: string;
  title: string;
  category: string;
  source: string;
  publishedAt: string;
  views: string;
};

const DEFAULT_STORIES: TopStory[] = [
  { id: '1', title: 'Global Summit Reaches Historic Agreement on Carbon Emissions', category: 'World', source: 'Reuters', publishedAt: '1h ago', views: '142k' },
  { id: '2', title: 'SpaceX Successfully Launches Record-Breaking Starship Mission', category: 'Science', source: 'Space.com', publishedAt: '2h ago', views: '98k' },
  { id: '3', title: 'Central Banks Coordinate Response to Dollar Volatility', category: 'Finance', source: 'Bloomberg', publishedAt: '3h ago', views: '87k' },
  { id: '4', title: 'WHO Declares End of Mpox Public Health Emergency', category: 'Health', source: 'WHO', publishedAt: '4h ago', views: '76k' },
  { id: '5', title: 'AI Chip Export Controls Tightened Following Security Review', category: 'Technology', source: 'FT', publishedAt: '5h ago', views: '65k' },
  { id: '6', title: 'Record Wildfires Threaten Australian Coastal Communities', category: 'Environment', source: 'Guardian', publishedAt: '6h ago', views: '54k' },
  { id: '7', title: 'European Parliament Passes Digital Identity Regulation', category: 'Politics', source: 'Politico', publishedAt: '7h ago', views: '43k' },
  { id: '8', title: 'Nobel Prize in Chemistry Awarded for Protein Engineering', category: 'Science', source: 'Nobel', publishedAt: '8h ago', views: '38k' },
  { id: '9', title: 'Olympic Bid Cities Announced for 2036 Summer Games', category: 'Sport', source: 'AP', publishedAt: '9h ago', views: '31k' },
  { id: '10', title: 'Breakthrough Battery Technology Promises 5x Energy Density', category: 'Technology', source: 'MIT News', publishedAt: '10h ago', views: '29k' },
  { id: '11', title: 'IMF Upgrades Global Growth Forecast to 3.4%', category: 'Finance', source: 'IMF', publishedAt: '11h ago', views: '22k' },
  { id: '12', title: 'Arctic Sea Ice Reaches Record Low for Third Consecutive Year', category: 'Environment', source: 'NSIDC', publishedAt: '12h ago', views: '18k' },
];

const PAGE_SIZE = 5;

const catVariant: Record<string, 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
  World: 'info', Science: 'warning', Finance: 'success', Health: 'error',
  Technology: 'neutral', Environment: 'success', Politics: 'warning', Sport: 'info',
};

export function TopStoriesList({
  stories = DEFAULT_STORIES,
  className,
}: {
  stories?: TopStory[];
  className?: string;
}) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = stories.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.category.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleSearch(q: string) {
    setQuery(q);
    setPage(1);
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h3 className="text-lg font-bold text-text-primary">Top Stories</h3>
        <SearchBar
          value={query}
          onChange={handleSearch}
          placeholder="Search stories…"
          className="max-w-xs"
        />
      </div>
      <Card>
        <ol className="divide-y divide-border">
          {paged.length === 0 ? (
            <li className="px-5 py-8 text-center text-sm text-text-secondary">No stories match your search.</li>
          ) : (
            paged.map((story, idx) => {
              const rank = (safePage - 1) * PAGE_SIZE + idx + 1;
              return (
                <li
                  key={story.id}
                  className="flex items-start gap-4 px-5 py-4 hover:bg-surface-overlay transition-colors"
                >
                  <span className="text-2xl font-black text-text-disabled tabular-nums w-8 shrink-0 pt-0.5">
                    {String(rank).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary leading-snug mb-1.5">
                      {story.title}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={catVariant[story.category] ?? 'neutral'} size="sm">
                        {story.category}
                      </Badge>
                      <span className="text-xs text-text-disabled">{story.source}</span>
                      <span className="text-xs text-text-disabled">{story.publishedAt}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-xs font-semibold text-text-secondary">{story.views}</span>
                    <p className="text-xs text-text-disabled">views</p>
                  </div>
                </li>
              );
            })
          )}
        </ol>
      </Card>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
