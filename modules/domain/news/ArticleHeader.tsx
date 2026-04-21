'use client';
import { Badge } from '@/modules/ui/Badge';
import { Avatar } from '@/modules/ui/Avatar';
import { Button } from '@/modules/ui/Button';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';

export function ArticleHeader({
  title = 'Global Leaders Reach Landmark Climate Agreement at Geneva Summit',
  subtitle = 'After three days of intense negotiations, 147 nations signed the Geneva Carbon Accord — the most ambitious climate deal since Paris.',
  category = 'World',
  author = 'Sarah Mitchell',
  authorInitials = 'SM',
  authorTitle = 'Senior World Affairs Correspondent',
  publishedAt = 'April 21, 2026 at 10:30 AM GMT',
  updatedAt = 'April 21, 2026 at 2:45 PM GMT',
  readTime = '8 min read',
  className,
}: {
  title?: string;
  subtitle?: string;
  category?: string;
  author?: string;
  authorInitials?: string;
  authorTitle?: string;
  publishedAt?: string;
  updatedAt?: string;
  readTime?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="space-y-4 pb-6 border-b border-border">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'World', href: '/world' },
            { label: 'Climate' },
          ]}
        />

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="error" size="sm">{category}</Badge>
          <Badge variant="neutral" size="sm">{readTime}</Badge>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-text-primary leading-tight mb-3">
            {title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">{subtitle}</p>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Avatar name={author} size="md" />
            <div>
              <p className="text-sm font-semibold text-text-primary">{author}</p>
              <p className="text-xs text-text-secondary">{authorTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-text-disabled">Published</p>
              <p className="text-xs font-medium text-text-primary">{publishedAt}</p>
            </div>
            {updatedAt && (
              <div className="text-right">
                <p className="text-xs text-text-disabled">Updated</p>
                <p className="text-xs font-medium text-text-primary">{updatedAt}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="secondary" size="sm" iconLeft="🔗">Copy link</Button>
          <Button variant="ghost" size="sm" iconLeft="𝕏">Share on X</Button>
          <Button variant="ghost" size="sm" iconLeft="in">LinkedIn</Button>
          <Button variant="ghost" size="sm" iconLeft="📧">Email</Button>
        </div>
      </div>
    </div>
  );
}
