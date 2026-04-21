import { ReadingProgressBar } from '@/modules/domain/news/ReadingProgressBar';
import { ArticleHeader } from '@/modules/domain/news/ArticleHeader';
import { ArticleBody } from '@/modules/domain/news/ArticleBody';
import { TableOfContents } from '@/modules/domain/news/TableOfContents';
import { ArticleGallery } from '@/modules/domain/news/ArticleGallery';
import { ReactionsBar } from '@/modules/domain/news/ReactionsBar';
import { SharePanel } from '@/modules/domain/news/SharePanel';
import { AuthorCard } from '@/modules/domain/news/AuthorCard';
import { RelatedArticles } from '@/modules/domain/news/RelatedArticles';
import { CommentList } from '@/modules/domain/news/CommentList';
import { CommentComposer } from '@/modules/domain/news/CommentComposer';
import { LiveUpdatePanel } from '@/modules/domain/news/LiveUpdatePanel';
import { SourceCitationBox } from '@/modules/domain/news/SourceCitationBox';
import { SaveForLaterButton } from '@/modules/domain/news/SaveForLaterButton';
import { NewsletterSignupCard } from '@/modules/domain/news/NewsletterSignupCard';
import { AdSlotBanner } from '@/modules/domain/news/AdSlotBanner';
import { TrendingTopicsPanel } from '@/modules/domain/news/TrendingTopicsPanel';

export const metadata = {
  title: 'Global Leaders Reach Landmark Climate Agreement — NewsHub',
  description: 'After three days of intense negotiations, 147 nations signed the Geneva Carbon Accord — the most ambitious climate deal since Paris.',
};

export default function ArticlePage() {
  return (
    <>
      <ReadingProgressBar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Article main column */}
          <div className="lg:col-span-3 space-y-8">

            {/* Header */}
            <ArticleHeader />

            {/* Hero image placeholder */}
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-900 h-72 flex flex-col items-center justify-center gap-3">
              <span className="text-white/20 text-6xl font-black">W</span>
              <span className="text-white/60 text-sm font-medium">World · Climate Summit · Geneva</span>
            </div>

            {/* Live updates */}
            <LiveUpdatePanel />

            {/* Article body */}
            <ArticleBody />

            {/* Source citations */}
            <SourceCitationBox />

            {/* Gallery */}
            <ArticleGallery />

            {/* Reactions + actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <ReactionsBar className="flex-1" />
              <div className="flex items-center gap-2 shrink-0">
                <SaveForLaterButton />
              </div>
            </div>

            {/* Share */}
            <SharePanel />

            {/* Author */}
            <AuthorCard />

            {/* Ad */}
            <AdSlotBanner />

            {/* Related articles */}
            <RelatedArticles />

            {/* Comments */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-text-primary">Comments</h3>
              <CommentComposer />
              <CommentList />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <TableOfContents />
              <NewsletterSignupCard />
              <TrendingTopicsPanel />
              <AdSlotBanner />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
