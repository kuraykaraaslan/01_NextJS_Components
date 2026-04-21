import { NewsCategoryPageHeader } from '@/modules/domain/news/NewsCategoryPageHeader';
import { TopicFilterBar } from '@/modules/domain/news/TopicFilterBar';
import { NewsFeedList } from '@/modules/domain/news/NewsFeedList';
import { FeaturedNewsGrid } from '@/modules/domain/news/FeaturedNewsGrid';
import { TrendingTopicsPanel } from '@/modules/domain/news/TrendingTopicsPanel';
import { TopStoriesList } from '@/modules/domain/news/TopStoriesList';
import { RegionalNewsSelector } from '@/modules/domain/news/RegionalNewsSelector';
import { NewsletterSignupCard } from '@/modules/domain/news/NewsletterSignupCard';
import { AdSlotBanner } from '@/modules/domain/news/AdSlotBanner';
import { PopularTagsCloud } from '@/modules/domain/news/PopularTagsCloud';
import { InfiniteNewsFeed } from '@/modules/domain/news/InfiniteNewsFeed';

export const metadata = {
  title: 'Technology News — NewsHub',
  description: 'Latest news, analysis, and insights from the world of technology, AI, and digital innovation.',
};

export default function CategoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Page header */}
      <NewsCategoryPageHeader
        category="Technology"
        articleCount={193}
        description="Latest news, analysis, and insights from the world of technology, AI, and digital innovation."
        filter="This Week"
      />

      {/* Filters */}
      <TopicFilterBar />

      {/* Featured in category */}
      <FeaturedNewsGrid />

      {/* Ad */}
      <AdSlotBanner />

      {/* Main content + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">

          {/* Paginated feed */}
          <div>
            <h3 className="text-base font-bold text-text-primary mb-4">Latest in Technology</h3>
            <NewsFeedList />
          </div>

          {/* Regional selector */}
          <RegionalNewsSelector />

          {/* Top stories in category */}
          <TopStoriesList />

          {/* Infinite load feed */}
          <div>
            <h3 className="text-base font-bold text-text-primary mb-4">More Stories</h3>
            <InfiniteNewsFeed />
          </div>

        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <TrendingTopicsPanel />
            <NewsletterSignupCard />
            <PopularTagsCloud />
            <AdSlotBanner />
          </div>
        </aside>
      </div>

    </div>
  );
}
