import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { Badge } from '@/modules/ui/Badge';
import { TopicRow } from '@/modules/domains/forum/topic/TopicRow';
import { TOPICS, FORUM_CATEGORIES } from '../forum.data';
import type { TopicStatus } from '@/modules/domains/forum/types';

const STATUSES: { value: TopicStatus | 'ALL'; label: string }[] = [
  { value: 'ALL',      label: 'All' },
  { value: 'OPEN',     label: 'Open' },
  { value: 'PINNED',   label: 'Pinned' },
  { value: 'LOCKED',   label: 'Locked' },
  { value: 'ARCHIVED', label: 'Archived' },
];

export default function TopicsPage() {
  return (
    <div className="bg-surface-base text-text-primary">
      {/* Sub-header */}
      <div className="border-b border-border bg-surface-raised">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <Breadcrumb
            items={[
              { label: 'Home',   href: '/theme/forum' },
              { label: 'Latest Topics' },
            ]}
          />
          <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Latest Topics</h1>
              <p className="text-sm text-text-secondary mt-0.5">{TOPICS.length} topics found</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-8">
          {/* ── Sidebar filters ── */}
          <aside className="hidden lg:block w-56 shrink-0 space-y-6">
            {/* Status filter */}
            <div>
              <p className="text-sm font-medium text-text-primary mb-2">Status</p>
              <div className="space-y-1">
                {STATUSES.map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-overlay cursor-pointer text-sm text-text-secondary hover:text-text-primary transition-colors">
                    <input type="radio" name="status" value={value} defaultChecked={value === 'ALL'} className="w-3.5 h-3.5 accent-primary" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div>
              <p className="text-sm font-medium text-text-primary mb-2">Category</p>
              <div className="space-y-1">
                {FORUM_CATEGORIES.map((cat) => {
                  const count = TOPICS.filter((t) => t.categoryId === cat.categoryId).length;
                  return (
                    <label key={cat.categoryId} className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-overlay cursor-pointer text-sm text-text-secondary hover:text-text-primary transition-colors">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-border text-primary focus:ring-border-focus w-3.5 h-3.5" />
                        {cat.title}
                      </span>
                      <Badge variant="neutral" size="sm">{count}</Badge>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ── Topic list ── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-text-secondary">
                Showing <span className="font-medium text-text-primary">{TOPICS.length}</span> topics
              </p>
              <select className="rounded-lg border border-border bg-surface-base text-sm text-text-primary px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-border-focus">
                <option>Latest Activity</option>
                <option>Most Replies</option>
                <option>Most Views</option>
                <option>Newest</option>
              </select>
            </div>

            <div className="rounded-xl border border-border overflow-hidden">
              {TOPICS.map((topic) => (
                <TopicRow
                  key={topic.topicId}
                  topic={topic}
                  href={`/theme/forum/topics/${topic.slug}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
