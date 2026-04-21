'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Spinner } from '@/modules/ui/Spinner';
import { SkeletonLine, SkeletonAvatar } from '@/modules/ui/Skeleton';
import { Toast } from '@/modules/ui/Toast';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';

type InlineArticle = {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
};

const ALL_ARTICLES: InlineArticle[] = [
  { id: 1, title: 'Climate Finance Gap Widens Despite COP Pledges', category: 'Environment', date: 'Apr 21', readTime: '5 min' },
  { id: 2, title: 'Quantum Computing Startup Raises $400M Series C', category: 'Technology', date: 'Apr 21', readTime: '3 min' },
  { id: 3, title: 'IMF Warns of Growing Debt Burden in Emerging Markets', category: 'Finance', date: 'Apr 20', readTime: '6 min' },
  { id: 4, title: 'WHO Fast-Tracks Approval for Dengue Vaccine', category: 'Health', date: 'Apr 20', readTime: '4 min' },
  { id: 5, title: 'Ocean Plastic Harvest Surpasses 10,000 Ton Milestone', category: 'Environment', date: 'Apr 19', readTime: '5 min' },
  { id: 6, title: 'Streaming Wars: Netflix Acquires Paramount for $35B', category: 'Entertainment', date: 'Apr 19', readTime: '4 min' },
  { id: 7, title: 'Deepfake Regulation Bill Passes US Senate Committee', category: 'Politics', date: 'Apr 18', readTime: '7 min' },
  { id: 8, title: 'Antarctic Ice Shelf Collapse Accelerates Sea Level Projections', category: 'Science', date: 'Apr 18', readTime: '8 min' },
  { id: 9, title: 'Electric Vehicle Sales Hit 50% Market Share in Europe', category: 'Business', date: 'Apr 17', readTime: '5 min' },
  { id: 10, title: 'CERN Confirms New Sub-Atomic Particle Discovery', category: 'Science', date: 'Apr 17', readTime: '6 min' },
  { id: 11, title: 'India Overtakes US as World\'s Second Largest Economy', category: 'Finance', date: 'Apr 16', readTime: '7 min' },
  { id: 12, title: 'Mars Sample Return Mission Launch Confirmed for 2028', category: 'Science', date: 'Apr 16', readTime: '5 min' },
];

const PAGE_SIZE = 4;

const catVariant: Record<string, 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
  Environment: 'success', Technology: 'neutral', Finance: 'success', Health: 'error',
  Entertainment: 'warning', Politics: 'warning', Science: 'info', Business: 'neutral',
};

export function InfiniteNewsFeed({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const visible = ALL_ARTICLES.slice(0, loaded);
  const hasMore = loaded < ALL_ARTICLES.length;

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoaded((prev) => Math.min(prev + PAGE_SIZE, ALL_ARTICLES.length));
      setLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  }

  return (
    <div className={className}>
      <div className="space-y-3">
        {visible.map((article) => (
          <Card key={article.id} className="hover:shadow-sm transition-shadow">
            <div className="p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">{article.id}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={catVariant[article.category] ?? 'neutral'} size="sm">
                    {article.category}
                  </Badge>
                  <span className="text-xs text-text-disabled">{article.date}</span>
                  <span className="text-xs text-text-disabled">· {article.readTime}</span>
                </div>
                <p className="text-sm font-semibold text-text-primary leading-snug">
                  {article.title}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {/* Skeleton placeholders while loading */}
        {loading && (
          <>
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Card key={`skel-${i}`}>
                <div className="p-4 flex items-start gap-4">
                  <SkeletonAvatar size="md" />
                  <div className="flex-1 space-y-2">
                    <SkeletonLine width="w-20" />
                    <SkeletonLine width="w-full" />
                    <SkeletonLine width="w-3/4" />
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}

        {/* Load more button */}
        {hasMore && !loading && (
          <div className="flex justify-center pt-2">
            <Button
              variant="secondary"
              onClick={handleLoadMore}
              iconLeft={loading ? undefined : '↓'}
            >
              Load more stories
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-4">
            <Spinner size="md" />
          </div>
        )}

        {!hasMore && (
          <p className="text-center text-sm text-text-disabled py-4">
            You&apos;ve reached the end of the feed.
          </p>
        )}
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast
            variant="success"
            message={`${PAGE_SIZE} more stories loaded!`}
            onDismiss={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
}
