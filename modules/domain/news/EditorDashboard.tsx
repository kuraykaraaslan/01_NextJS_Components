'use client';
import { DataTable } from '@/modules/ui/DataTable';
import { Badge } from '@/modules/ui/Badge';
import type { TableColumn } from '@/modules/ui/DataTable';

type Article = {
  title: string;
  author: string;
  category: string;
  status: string;
  wordCount: string;
  updatedAt: string;
};

const ARTICLES: Article[] = [
  { title: 'Geneva Climate Accord — Full Analysis', author: 'S. Mitchell', category: 'World', status: 'Published', wordCount: '2,400', updatedAt: 'Apr 21' },
  { title: 'AI Chip Export Ban Impact Assessment', author: 'J. Thornton', category: 'Technology', status: 'Review', wordCount: '1,850', updatedAt: 'Apr 21' },
  { title: 'Fed Rate Cut: What It Means for You', author: 'E. Vasquez', category: 'Finance', status: 'Draft', wordCount: '1,200', updatedAt: 'Apr 20' },
  { title: 'CRISPR Therapy Phase-3 Trial Results', author: 'A. Chen', category: 'Health', status: 'Published', wordCount: '1,600', updatedAt: 'Apr 20' },
  { title: 'SpaceX Starship Commercial Mission', author: 'M. Webb', category: 'Science', status: 'Published', wordCount: '1,100', updatedAt: 'Apr 19' },
  { title: 'EU Digital Markets Regulation Breakdown', author: 'L. Fernandez', category: 'Politics', status: 'Review', wordCount: '2,100', updatedAt: 'Apr 19' },
  { title: 'Arctic Ice 2026: A Visual Data Report', author: 'P. Nair', category: 'Environment', status: 'Draft', wordCount: '900', updatedAt: 'Apr 18' },
  { title: 'Quantum Computing Market Outlook', author: 'J. Thornton', category: 'Technology', status: 'Scheduled', wordCount: '1,750', updatedAt: 'Apr 18' },
  { title: 'Nobel Prize Chemistry — Protein Engineering', author: 'M. Webb', category: 'Science', status: 'Published', wordCount: '1,300', updatedAt: 'Apr 17' },
  { title: 'EV Market Share Hits 50% in Europe', author: 'O. Hassan', category: 'Business', status: 'Published', wordCount: '1,050', updatedAt: 'Apr 17' },
];

const statusVariant: Record<string, 'success' | 'info' | 'warning' | 'neutral' | 'error'> = {
  Published: 'success',
  Review: 'warning',
  Draft: 'neutral',
  Scheduled: 'info',
  Rejected: 'error',
};

const COLUMNS: TableColumn<Article>[] = [
  {
    key: 'title',
    header: 'Title',
    sortable: true,
    render: (row) => (
      <span className="text-sm font-medium text-text-primary hover:text-primary cursor-pointer transition-colors">
        {row.title}
      </span>
    ),
  },
  { key: 'author', header: 'Author', sortable: true },
  { key: 'category', header: 'Category', sortable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (row) => (
      <Badge variant={statusVariant[row.status] ?? 'neutral'} size="sm">
        {row.status}
      </Badge>
    ),
  },
  { key: 'wordCount', header: 'Words', align: 'right' },
  { key: 'updatedAt', header: 'Updated', sortable: true },
];

export function EditorDashboard({ className }: { className?: string }) {
  return (
    <div className={className}>
      <DataTable
        columns={COLUMNS}
        rows={ARTICLES}
        caption="Article management"
        searchPlaceholder="Search articles, authors…"
        pageSize={5}
      />
    </div>
  );
}
