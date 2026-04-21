'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { Pagination } from '@/modules/ui/Pagination';

export type FeedArticle = {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
};

const DEFAULT_ARTICLES: FeedArticle[] = [
  { id: '1', title: 'Global Summit Reaches Historic Agreement on Carbon Emissions', summary: 'After three grueling days of negotiations, world leaders signed the Geneva Carbon Accord, pledging to reduce emissions by 60% before 2040.', category: 'World', author: 'Sarah Mitchell', authorInitials: 'SM', date: 'Apr 21, 2026', readTime: '5 min' },
  { id: '2', title: 'AI Model Achieves Human-Level Reasoning in Medical Diagnostics', summary: 'A joint study between Stanford and MIT reveals that their latest model outperforms radiologists in early-stage cancer detection.', category: 'Technology', author: 'James Thornton', authorInitials: 'JT', date: 'Apr 21, 2026', readTime: '7 min' },
  { id: '3', title: 'Fed Signals Rate Cut as Inflation Reaches 2-Year Low', summary: 'Consumer price index data released Tuesday showed inflation cooling to 2.1%, opening the door for the first rate reduction since 2023.', category: 'Finance', author: 'Elena Vasquez', authorInitials: 'EV', date: 'Apr 20, 2026', readTime: '4 min' },
  { id: '4', title: 'CRISPR Therapy Shows 90% Success Rate in Sickle Cell Trial', summary: 'Gene-editing therapy developed by Vertex Pharmaceuticals eliminates pain crises in 18 of 20 patients in latest phase-3 results.', category: 'Health', author: 'Dr. Anna Chen', authorInitials: 'AC', date: 'Apr 20, 2026', readTime: '6 min' },
  { id: '5', title: 'SpaceX Starship Completes First Commercial Payload Delivery', summary: 'The reusable heavy-lift rocket delivered a communications satellite to geosynchronous orbit, marking a new era in commercial spaceflight.', category: 'Science', author: 'Marcus Webb', authorInitials: 'MW', date: 'Apr 19, 2026', readTime: '5 min' },
  { id: '6', title: 'EU Parliament Passes Landmark Digital Markets Regulation', summary: 'The sweeping regulation targets online platforms with over 100 million users, mandating data portability and interoperability requirements.', category: 'Politics', author: 'Luisa Fernandez', authorInitials: 'LF', date: 'Apr 19, 2026', readTime: '8 min' },
  { id: '7', title: 'Saharan Solar Megaproject Begins Construction Phase', summary: 'The 15 GW solar farm spanning Morocco, Algeria and Tunisia will supply power to 30 million European homes via undersea cable.', category: 'Environment', author: 'Omar Hassan', authorInitials: 'OH', date: 'Apr 18, 2026', readTime: '6 min' },
  { id: '8', title: 'Apple Unveils Foldable iPhone with Revolutionary Display Tech', summary: 'The long-rumored device features a crease-free quantum dot display and a new form factor that doubles as an iPad mini.', category: 'Technology', author: 'James Thornton', authorInitials: 'JT', date: 'Apr 18, 2026', readTime: '5 min' },
];

const PAGE_SIZE = 4;

const catVariant: Record<string, 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
  World: 'info', Technology: 'neutral', Finance: 'success', Health: 'error',
  Science: 'warning', Politics: 'warning', Environment: 'success',
};

export function NewsFeedList({
  articles = DEFAULT_ARTICLES,
  className,
}: {
  articles?: FeedArticle[];
  className?: string;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = articles.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className={className}>
      <div className="space-y-3">
        {paged.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-4 flex gap-4">
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={catVariant[article.category] ?? 'neutral'} size="sm">
                    {article.category}
                  </Badge>
                  <span className="text-xs text-text-disabled">{article.readTime} read</span>
                </div>
                <h4 className="text-sm font-semibold text-text-primary leading-snug">
                  {article.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                  {article.summary}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Avatar name={article.author} size="xs" />
                  <span className="text-xs font-medium text-text-primary">{article.author}</span>
                  <span className="text-xs text-text-disabled">·</span>
                  <span className="text-xs text-text-disabled">{article.date}</span>
                </div>
              </div>
              {/* Thumbnail placeholder */}
              <div className="w-20 h-20 shrink-0 rounded-lg bg-gradient-to-br from-surface-overlay to-surface-sunken flex items-center justify-center text-text-disabled font-bold">
                {article.category.charAt(0)}
              </div>
            </div>
          </Card>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
