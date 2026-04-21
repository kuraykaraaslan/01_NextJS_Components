import { BreakingNewsTicker } from '@/modules/domain/news/BreakingNewsTicker';
import { EditorialSlider } from '@/modules/domain/news/EditorialSlider';
import { EditorialGrid } from '@/modules/domain/news/EditorialGrid';
import { FeaturedNewsGrid } from '@/modules/domain/news/FeaturedNewsGrid';
import { NewsFeedList } from '@/modules/domain/news/NewsFeedList';
import { TrendingTopicsPanel } from '@/modules/domain/news/TrendingTopicsPanel';
import { TopStoriesList } from '@/modules/domain/news/TopStoriesList';
import { NewsletterSignupCard } from '@/modules/domain/news/NewsletterSignupCard';
import { CategoryStrip } from '@/modules/domain/news/CategoryStrip';
import { AdSlotBanner } from '@/modules/domain/news/AdSlotBanner';
import { PopularTagsCloud } from '@/modules/domain/news/PopularTagsCloud';
import { LatestHeadlines } from '@/modules/domain/news/LatestHeadlines';

export const metadata = {
  title: 'NewsHub — Breaking News, World Events & Analysis',
  description: 'Independent journalism covering world affairs, technology, finance, science, and more.',
};

export default function NewsHomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">

      {/* Breaking news */}
      <BreakingNewsTicker />

      {/* Editorial full-width slider */}
      <EditorialSlider autoPlay />

      {/* Hero + Trending sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <EditorialGrid />
          <LatestHeadlines />
        </div>
        <div className="space-y-4">
          <TrendingTopicsPanel />
        </div>
      </div>

      {/* Ad banner */}
      <AdSlotBanner />

      {/* Featured grid */}
      <FeaturedNewsGrid />

      {/* Category strip */}
      <CategoryStrip />

      {/* Main feed + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-text-primary mb-4">Latest News</h3>
            <NewsFeedList />
          </div>
        </div>

        <aside className="space-y-6">
          <NewsletterSignupCard />
          <PopularTagsCloud />
          <AdSlotBanner />
        </aside>
      </div>

      {/* Top stories */}
      <TopStoriesList />

    </div>
  );
}
