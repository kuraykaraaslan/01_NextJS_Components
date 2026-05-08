import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { ForumCategoryCard } from '@/modules/domains/forum/category/ForumCategoryCard';
import { FORUM_CATEGORIES } from '../forum.data';

export default function CategoriesPage() {
  return (
    <div className="bg-surface-base text-text-primary">
      {/* Sub-header */}
      <div className="border-b border-border bg-surface-raised">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <Breadcrumb
            items={[
              { label: 'Home',       href: '/theme/forum' },
              { label: 'Categories' },
            ]}
          />
          <div className="mt-3">
            <h1 className="text-2xl font-bold text-text-primary">Categories</h1>
            <p className="text-sm text-text-secondary mt-0.5">
              Browse all {FORUM_CATEGORIES.length} discussion categories
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FORUM_CATEGORIES.map((cat) => (
            <ForumCategoryCard
              key={cat.categoryId}
              category={cat}
              href={`/theme/forum/topics?category=${cat.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
