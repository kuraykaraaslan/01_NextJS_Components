'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Pagination } from '@/modules/ui/Pagination';

type RelatedArticle = {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  imageColor: string;
};

const DEFAULT_RELATED: RelatedArticle[] = [
  { id: '1', title: 'What the Geneva Accord Means for Fossil Fuel Companies', category: 'Finance', date: 'Apr 21, 2026', readTime: '6 min', imageColor: 'from-orange-400 to-red-600' },
  { id: '2', title: 'A History of Failed Climate Deals — and Why This One Might Stick', category: 'World', date: 'Apr 20, 2026', readTime: '10 min', imageColor: 'from-sky-400 to-blue-600' },
  { id: '3', title: 'Carbon Capture Technology Finally Ready for Scale', category: 'Science', date: 'Apr 19, 2026', readTime: '7 min', imageColor: 'from-green-400 to-teal-600' },
  { id: '4', title: 'Renewables Overtake Coal Globally for First Time in History', category: 'Environment', date: 'Apr 18, 2026', readTime: '5 min', imageColor: 'from-yellow-400 to-orange-500' },
  { id: '5', title: 'Inside the Youth Climate Movement That Changed Negotiations', category: 'World', date: 'Apr 17, 2026', readTime: '8 min', imageColor: 'from-violet-400 to-purple-600' },
  { id: '6', title: 'The Role of Private Finance in the New Climate Economy', category: 'Finance', date: 'Apr 16, 2026', readTime: '9 min', imageColor: 'from-rose-400 to-pink-600' },
];

const PAGE_SIZE = 3;

const catVariant: Record<string, 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
  Finance: 'success', World: 'info', Science: 'warning', Environment: 'success',
};

export function RelatedArticles({
  articles = DEFAULT_RELATED,
  className,
}: {
  articles?: RelatedArticle[];
  className?: string;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = articles.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className={className}>
      <h3 className="text-base font-bold text-text-primary mb-4">You may also like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paged.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className={`h-28 bg-gradient-to-br ${article.imageColor} flex items-center justify-center`}>
              <span className="text-white/40 text-3xl font-bold">{article.category.charAt(0)}</span>
            </div>
            <div className="p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant={catVariant[article.category] ?? 'neutral'} size="sm">{article.category}</Badge>
                <span className="text-xs text-text-disabled">{article.readTime}</span>
              </div>
              <p className="text-sm font-semibold text-text-primary leading-snug line-clamp-2">{article.title}</p>
              <p className="text-xs text-text-disabled">{article.date}</p>
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
