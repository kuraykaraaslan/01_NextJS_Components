'use client';
import { Badge } from '@/modules/ui/Badge';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';

export function NewsCategoryPageHeader({
  category = 'Technology',
  articleCount = 193,
  description = 'Latest news, analysis, and insights from the world of technology, AI, and digital innovation.',
  filter = 'This Week',
  className,
}: {
  category?: string;
  articleCount?: number;
  description?: string;
  filter?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="space-y-3 pb-5 border-b border-border">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'News', href: '/news' },
            { label: category },
          ]}
        />
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-text-primary leading-tight">{category}</h1>
              <Badge variant="info" size="sm">{articleCount} articles</Badge>
              <Badge variant="neutral" size="sm">{filter}</Badge>
            </div>
            {description && (
              <p className="text-sm text-text-secondary mt-1 max-w-xl">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
