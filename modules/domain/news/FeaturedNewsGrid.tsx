'use client';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Avatar } from '@/modules/ui/Avatar';
import { Button } from '@/modules/ui/Button';

export type FeaturedArticle = {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
  imageColor: string;
};

const DEFAULT_ARTICLES: FeaturedArticle[] = [
  {
    id: '1',
    title: 'Inside the Push to Rewild Europe\'s Largest River Deltas',
    summary: 'Scientists and activists join forces in an ambitious restoration project spanning 12 countries to reverse decades of ecological damage.',
    category: 'Environment',
    author: 'Clara Hoffmann',
    authorInitials: 'CH',
    date: 'Apr 21, 2026',
    readTime: '8 min',
    imageColor: 'bg-gradient-to-br from-green-400 to-teal-600',
  },
  {
    id: '2',
    title: 'The Quiet Revolution: How Small Modular Reactors are Changing Energy',
    summary: 'A new generation of compact nuclear plants promises clean energy at scale — but regulatory hurdles remain daunting.',
    category: 'Science',
    author: 'Marcus Webb',
    authorInitials: 'MW',
    date: 'Apr 20, 2026',
    readTime: '6 min',
    imageColor: 'bg-gradient-to-br from-yellow-400 to-orange-600',
  },
  {
    id: '3',
    title: 'Urban Heat Islands: Cities Fight Back With Green Infrastructure',
    summary: 'From rooftop gardens to cool pavements, mayors are deploying every tool available to reduce urban temperatures by 2°C.',
    category: 'Cities',
    author: 'Priya Nair',
    authorInitials: 'PN',
    date: 'Apr 19, 2026',
    readTime: '5 min',
    imageColor: 'bg-gradient-to-br from-sky-400 to-blue-600',
  },
  {
    id: '4',
    title: 'The Race to Map Every Protein in the Human Body',
    summary: 'AlphaFold successors are unlocking drug discovery pathways that were unimaginable just three years ago.',
    category: 'Health',
    author: 'David Kim',
    authorInitials: 'DK',
    date: 'Apr 18, 2026',
    readTime: '9 min',
    imageColor: 'bg-gradient-to-br from-pink-400 to-rose-600',
  },
];

const categoryVariant: Record<string, 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
  Environment: 'success',
  Science: 'warning',
  Cities: 'info',
  Health: 'error',
};

export function FeaturedNewsGrid({
  articles = DEFAULT_ARTICLES,
  className,
}: {
  articles?: FeaturedArticle[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-text-primary">Featured Stories</h3>
        <Button variant="ghost" size="sm">View all</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
            {/* Image placeholder */}
            <div className={`h-36 ${article.imageColor} flex items-center justify-center`}>
              <span className="text-white/40 text-4xl font-bold">
                {article.category.charAt(0)}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant={categoryVariant[article.category] ?? 'neutral'}
                  size="sm"
                >
                  {article.category}
                </Badge>
                <span className="text-xs text-text-disabled">{article.readTime}</span>
              </div>
              <h4 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2">
                {article.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                {article.summary}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Avatar name={article.author} size="xs" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">{article.author}</p>
                  <p className="text-xs text-text-disabled">{article.date}</p>
                </div>
                <Button variant="ghost" size="sm">Read</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
