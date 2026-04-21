'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { cn } from '@/libs/utils/cn';

type Headline = {
  id: string;
  title: string;
  category: string;
  categoryVariant: 'error' | 'info' | 'warning' | 'success' | 'neutral';
  timestamp: string;
  isNew?: boolean;
  href?: string;
};

const DEFAULT_HEADLINES: Headline[] = [
  {
    id: '1',
    title: 'UN Security Council calls emergency session over escalating tensions in Eastern Europe',
    category: 'World',
    categoryVariant: 'info',
    timestamp: '3 min ago',
    isNew: true,
    href: '/theme/news/article/geneva-climate-accord',
  },
  {
    id: '2',
    title: 'Apple confirms acquisition of AI startup valued at $4.2 billion in all-cash deal',
    category: 'Technology',
    categoryVariant: 'neutral',
    timestamp: '11 min ago',
    isNew: true,
    href: '/theme/news/article/ai-regulation-eu',
  },
  {
    id: '3',
    title: 'S&P 500 closes at record high as tech earnings beat forecasts across the board',
    category: 'Finance',
    categoryVariant: 'success',
    timestamp: '24 min ago',
    href: '/theme/news/article/fed-rate-pause',
  },
  {
    id: '4',
    title: 'WHO declares end of mpox public health emergency after global case count falls 94%',
    category: 'Health',
    categoryVariant: 'error',
    timestamp: '38 min ago',
    href: '/theme/news/article/mrna-cancer-vaccine',
  },
  {
    id: '5',
    title: 'SpaceX Starship completes first fully-reusable commercial payload delivery to orbit',
    category: 'Science',
    categoryVariant: 'warning',
    timestamp: '55 min ago',
    href: '/theme/news/article/europa-ocean',
  },
  {
    id: '6',
    title: 'Germany announces €200B green infrastructure package ahead of federal election',
    category: 'World',
    categoryVariant: 'info',
    timestamp: '1h ago',
  },
  {
    id: '7',
    title: 'OPEC+ agrees to extend production cuts through Q3 amid demand uncertainty',
    category: 'Finance',
    categoryVariant: 'success',
    timestamp: '1h ago',
  },
  {
    id: '8',
    title: 'Meta rolls out end-to-end encrypted messaging across all platforms globally',
    category: 'Technology',
    categoryVariant: 'neutral',
    timestamp: '2h ago',
  },
];

const PAGE_SIZE = 5;

export function LatestHeadlines({
  headlines = DEFAULT_HEADLINES,
  className,
}: {
  headlines?: Headline[];
  className?: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? headlines : headlines.slice(0, PAGE_SIZE);

  return (
    <div className={cn('rounded-xl border border-border bg-surface-raised overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-overlay">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-text-primary">Latest Headlines</span>
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
        </div>
        <span className="text-xs text-text-disabled tabular-nums">Updated just now</span>
      </div>

      {/* List */}
      <ol className="divide-y divide-border">
        {visible.map((item, i) => {
          const inner = (
            <div className="flex items-start gap-3 px-4 py-3 hover:bg-surface-overlay transition-colors group">
              {/* Index */}
              <span className="text-xs font-black text-text-disabled w-4 shrink-0 pt-0.5 tabular-nums select-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <p className="text-sm font-semibold text-text-primary leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={item.categoryVariant} size="sm">{item.category}</Badge>
                  {item.isNew && (
                    <Badge variant="error" size="sm">New</Badge>
                  )}
                  <span className="text-xs text-text-disabled tabular-nums">{item.timestamp}</span>
                </div>
              </div>

              {/* Arrow */}
              <span className="text-text-disabled group-hover:text-primary transition-colors shrink-0 mt-0.5 text-sm" aria-hidden="true">
                →
              </span>
            </div>
          );

          return (
            <li key={item.id}>
              {item.href ? (
                <Link href={item.href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
                  {inner}
                </Link>
              ) : (
                <div className="cursor-pointer">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>

      {/* Show more */}
      {headlines.length > PAGE_SIZE && (
        <div className="px-4 py-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? 'Show less' : `Show ${headlines.length - PAGE_SIZE} more headlines`}
          </Button>
        </div>
      )}
    </div>
  );
}
