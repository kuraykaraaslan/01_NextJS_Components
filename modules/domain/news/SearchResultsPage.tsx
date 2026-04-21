'use client';
import { useState } from 'react';
import { SearchBar } from '@/modules/ui/SearchBar';
import { DataTable } from '@/modules/ui/DataTable';
import { Pagination } from '@/modules/ui/Pagination';
import { EmptyState } from '@/modules/ui/EmptyState';
import { Badge } from '@/modules/ui/Badge';
import type { TableColumn } from '@/modules/ui/DataTable';

type SearchResult = {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
};

const ALL_RESULTS: SearchResult[] = [
  { title: 'Climate Accord Signed by 147 Nations', category: 'World', author: 'S. Mitchell', date: 'Apr 21', readTime: '8 min' },
  { title: 'Carbon Markets Hit Record Volume', category: 'Finance', author: 'E. Vasquez', date: 'Apr 20', readTime: '5 min' },
  { title: 'Climate Tech Investment Surges to $2T', category: 'Technology', author: 'J. Thornton', date: 'Apr 19', readTime: '6 min' },
  { title: 'Arctic Ice Loss Accelerates Despite Pledges', category: 'Science', author: 'M. Webb', date: 'Apr 18', readTime: '7 min' },
  { title: 'Net Zero Pledges: Tracking Progress in 2026', category: 'Environment', author: 'P. Nair', date: 'Apr 17', readTime: '9 min' },
  { title: 'Renewable Energy Overtakes Coal Globally', category: 'Environment', author: 'O. Hassan', date: 'Apr 16', readTime: '5 min' },
  { title: 'Carbon Capture at Scale: Finally Feasible?', category: 'Science', author: 'M. Webb', date: 'Apr 15', readTime: '8 min' },
  { title: 'Green Bonds Market Reaches $3T Milestone', category: 'Finance', author: 'E. Vasquez', date: 'Apr 14', readTime: '4 min' },
];

const COLUMNS: TableColumn<SearchResult>[] = [
  {
    key: 'title',
    header: 'Article',
    sortable: true,
    render: (row) => (
      <span className="text-sm font-medium text-text-primary hover:text-primary cursor-pointer transition-colors">
        {row.title}
      </span>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    sortable: true,
    render: (row) => <Badge variant="neutral" size="sm">{row.category}</Badge>,
  },
  { key: 'author', header: 'Author', sortable: true },
  { key: 'date', header: 'Date', sortable: true },
  { key: 'readTime', header: 'Read time', align: 'right' },
];

export function SearchResultsPage({ className }: { className?: string }) {
  const [query, setQuery] = useState('climate');

  const filtered = query.trim()
    ? ALL_RESULTS.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase()) ||
        r.author.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_RESULTS;

  return (
    <div className={className}>
      <div className="space-y-4">
        <div>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search articles, topics, authors…"
          />
          {query.trim() && (
            <p className="text-xs text-text-secondary mt-2">
              <span className="font-semibold text-text-primary">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for{' '}
              <span className="font-semibold text-primary">&ldquo;{query}&rdquo;</span>
            </p>
          )}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No results found"
            description={`We couldn't find any articles matching "${query}". Try a different search term or browse by category.`}
            action={
              <button
                onClick={() => setQuery('')}
                className="text-sm font-medium text-primary hover:underline focus-visible:outline-none"
              >
                Browse all articles
              </button>
            }
          />
        ) : (
          <DataTable
            columns={COLUMNS}
            rows={filtered}
            caption="Search results"
            searchable={false}
            pageSize={5}
          />
        )}
      </div>
    </div>
  );
}
