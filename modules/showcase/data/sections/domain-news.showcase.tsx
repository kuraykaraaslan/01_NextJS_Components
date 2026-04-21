'use client';
import { NewsHeroSlider } from '@/modules/domain/news/NewsHeroSlider';
import { BreakingNewsTicker } from '@/modules/domain/news/BreakingNewsTicker';
import { FeaturedNewsGrid } from '@/modules/domain/news/FeaturedNewsGrid';
import { TopStoriesList } from '@/modules/domain/news/TopStoriesList';
import { CategoryStrip } from '@/modules/domain/news/CategoryStrip';
import { NewsCategoryPageHeader } from '@/modules/domain/news/NewsCategoryPageHeader';
import { NewsFeedList } from '@/modules/domain/news/NewsFeedList';
import { InfiniteNewsFeed } from '@/modules/domain/news/InfiniteNewsFeed';
import { TrendingTopicsPanel } from '@/modules/domain/news/TrendingTopicsPanel';
import { TopicFilterBar } from '@/modules/domain/news/TopicFilterBar';
import { ArticleHeader } from '@/modules/domain/news/ArticleHeader';
import { ArticleBody } from '@/modules/domain/news/ArticleBody';
import { ArticleGallery } from '@/modules/domain/news/ArticleGallery';
import { RelatedArticles } from '@/modules/domain/news/RelatedArticles';
import { AuthorCard } from '@/modules/domain/news/AuthorCard';
import { LiveUpdatePanel } from '@/modules/domain/news/LiveUpdatePanel';
import { SourceCitationBox } from '@/modules/domain/news/SourceCitationBox';
import { CommentList } from '@/modules/domain/news/CommentList';
import { CommentComposer } from '@/modules/domain/news/CommentComposer';
import { ReactionsBar } from '@/modules/domain/news/ReactionsBar';
import { SharePanel } from '@/modules/domain/news/SharePanel';
import { SaveForLaterButton } from '@/modules/domain/news/SaveForLaterButton';
import { SearchResultsPage } from '@/modules/domain/news/SearchResultsPage';
import { AdvancedSearchFilters } from '@/modules/domain/news/AdvancedSearchFilters';
import { TopicExplorer } from '@/modules/domain/news/TopicExplorer';
import { PopularTagsCloud } from '@/modules/domain/news/PopularTagsCloud';
import { RegionalNewsSelector } from '@/modules/domain/news/RegionalNewsSelector';
import { NewsletterSignupCard } from '@/modules/domain/news/NewsletterSignupCard';
import { SubscriptionPaywallModal } from '@/modules/domain/news/SubscriptionPaywallModal';
import { SubscriptionPlanCards } from '@/modules/domain/news/SubscriptionPlanCards';
import { ConsentPreferences } from '@/modules/domain/news/ConsentPreferences';
import { AdSlotBanner } from '@/modules/domain/news/AdSlotBanner';
import { SponsoredContentCard } from '@/modules/domain/news/SponsoredContentCard';
import { DonationCTA } from '@/modules/domain/news/DonationCTA';
import { EditorDashboard } from '@/modules/domain/news/EditorDashboard';
import { ArticleDraftEditor } from '@/modules/domain/news/ArticleDraftEditor';
import { PublishingScheduler } from '@/modules/domain/news/PublishingScheduler';
import { ReviewApprovalPanel } from '@/modules/domain/news/ReviewApprovalPanel';
import { BreakingNewsComposer } from '@/modules/domain/news/BreakingNewsComposer';
import { BreadcrumbNav } from '@/modules/domain/news/BreadcrumbNav';
import { ReadingProgressBar } from '@/modules/domain/news/ReadingProgressBar';
import { TableOfContents } from '@/modules/domain/news/TableOfContents';
import { AccessibilitySkipLink } from '@/modules/domain/news/AccessibilitySkipLink';
import { ErrorOrEmptyState } from '@/modules/domain/news/ErrorOrEmptyState';
import type { ShowcaseComponent } from '../showcase.types';

export function buildNewsData(): ShowcaseComponent[] {
  return [
    // ── Group 1: Home Page ────────────────────────────────────────────────────
    {
      id: 'nw-news-hero-slider',
      title: 'NewsHeroSlider',
      category: 'Domain' as const,
      abbr: 'Nh',
      description: 'Hero section with featured article cards, prev/next navigation buttons, dot indicators, and category badge. Cycles through multiple featured stories.',
      filePath: 'modules/domain/news/NewsHeroSlider.tsx',
      sourceCode: `import { NewsHeroSlider } from '@/modules/domain/news/NewsHeroSlider';\n\n<NewsHeroSlider stories={stories} />`,
      variants: [
        {
          title: 'Hero slider',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <NewsHeroSlider />
            </div>
          ),
          code: `<NewsHeroSlider stories={[\n  { id: '1', title: 'Global Climate Summit', subtitle: 'World leaders gather...', category: 'World', author: 'Sarah Mitchell', publishedAt: '2h ago', readTime: '5 min', imageColor: 'from-blue-600 to-blue-900' },\n  { id: '2', title: 'AI Infrastructure', subtitle: 'Tech giants announce...', category: 'Technology', author: 'James Thornton', publishedAt: '4h ago', readTime: '7 min', imageColor: 'from-violet-600 to-purple-900' },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-breaking-ticker',
      title: 'BreakingNewsTicker',
      category: 'Domain' as const,
      abbr: 'Bt',
      description: 'Horizontal scrolling ticker for breaking news items with timestamps and a pulsing LIVE badge. Uses AlertBanner for the editorial context note.',
      filePath: 'modules/domain/news/BreakingNewsTicker.tsx',
      sourceCode: `import { BreakingNewsTicker } from '@/modules/domain/news/BreakingNewsTicker';\n\n<BreakingNewsTicker items={items} />`,
      variants: [
        {
          title: 'Breaking news ticker',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <BreakingNewsTicker />
            </div>
          ),
          code: `<BreakingNewsTicker items={[\n  { id: '1', text: 'UN Security Council calls emergency session', timestamp: '10:42 AM' },\n  { id: '2', text: 'Federal Reserve Chair signals rate cut', timestamp: '10:15 AM' },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-featured-grid',
      title: 'FeaturedNewsGrid',
      category: 'Domain' as const,
      abbr: 'Fg',
      description: 'Grid of featured story cards with image placeholders, category badges, author avatars, and read time indicators.',
      filePath: 'modules/domain/news/FeaturedNewsGrid.tsx',
      sourceCode: `import { FeaturedNewsGrid } from '@/modules/domain/news/FeaturedNewsGrid';\n\n<FeaturedNewsGrid articles={articles} />`,
      variants: [
        {
          title: 'Featured grid',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <FeaturedNewsGrid />
            </div>
          ),
          code: `<FeaturedNewsGrid articles={[\n  { id: '1', title: 'Inside the Push to Rewild...', category: 'Environment', author: 'Clara Hoffmann', readTime: '8 min', ... },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-top-stories',
      title: 'TopStoriesList',
      category: 'Domain' as const,
      abbr: 'Ts',
      description: 'Numbered list of top stories with view counts, pagination, and keyword search filtering.',
      filePath: 'modules/domain/news/TopStoriesList.tsx',
      sourceCode: `import { TopStoriesList } from '@/modules/domain/news/TopStoriesList';\n\n<TopStoriesList stories={stories} />`,
      variants: [
        {
          title: 'Top stories list',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <TopStoriesList />
            </div>
          ),
          code: `<TopStoriesList stories={[\n  { id: '1', title: 'Global Summit Reaches...', category: 'World', source: 'Reuters', publishedAt: '1h ago', views: '142k' },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-category-strip',
      title: 'CategoryStrip',
      category: 'Domain' as const,
      abbr: 'Cs',
      description: 'Horizontal tab strip for news categories with article count badges and a sort toggle inside each tab panel.',
      filePath: 'modules/domain/news/CategoryStrip.tsx',
      sourceCode: `import { CategoryStrip } from '@/modules/domain/news/CategoryStrip';\n\n<CategoryStrip />`,
      variants: [
        {
          title: 'Category strip',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <CategoryStrip />
            </div>
          ),
          code: `<CategoryStrip />`,
        },
      ],
    },

    // ── Group 2: News Listing ─────────────────────────────────────────────────
    {
      id: 'nw-category-header',
      title: 'NewsCategoryPageHeader',
      category: 'Domain' as const,
      abbr: 'Ch',
      description: 'Category page header with category name, article count badge, filter badge, and breadcrumb navigation.',
      filePath: 'modules/domain/news/NewsCategoryPageHeader.tsx',
      sourceCode: `import { NewsCategoryPageHeader } from '@/modules/domain/news/NewsCategoryPageHeader';\n\n<NewsCategoryPageHeader category="Technology" articleCount={193} />`,
      variants: [
        {
          title: 'Category page header',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <NewsCategoryPageHeader />
            </div>
          ),
          code: `<NewsCategoryPageHeader\n  category="Technology"\n  articleCount={193}\n  description="Latest news, analysis, and insights from the world of technology..."\n  filter="This Week"\n/>`,
        },
      ],
    },
    {
      id: 'nw-feed-list',
      title: 'NewsFeedList',
      category: 'Domain' as const,
      abbr: 'Fl',
      description: 'Paginated news feed with author avatar, publication date, category badge, and article summary. Supports multiple articles per page.',
      filePath: 'modules/domain/news/NewsFeedList.tsx',
      sourceCode: `import { NewsFeedList } from '@/modules/domain/news/NewsFeedList';\n\n<NewsFeedList articles={articles} />`,
      variants: [
        {
          title: 'News feed list',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <NewsFeedList />
            </div>
          ),
          code: `<NewsFeedList articles={[\n  { id: '1', title: '...', summary: '...', category: 'World', author: 'Sarah Mitchell', date: 'Apr 21, 2026', readTime: '5 min' },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-infinite-feed',
      title: 'InfiniteNewsFeed',
      category: 'Domain' as const,
      abbr: 'If',
      description: 'Infinite scroll feed simulation with a load-more button, skeleton card placeholders during loading, and a success toast on load completion.',
      filePath: 'modules/domain/news/InfiniteNewsFeed.tsx',
      sourceCode: `import { InfiniteNewsFeed } from '@/modules/domain/news/InfiniteNewsFeed';\n\n<InfiniteNewsFeed />`,
      variants: [
        {
          title: 'Infinite feed',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <InfiniteNewsFeed />
            </div>
          ),
          code: `<InfiniteNewsFeed />`,
        },
      ],
    },
    {
      id: 'nw-trending-panel',
      title: 'TrendingTopicsPanel',
      category: 'Domain' as const,
      abbr: 'Tp',
      description: 'Panel showing trending topic pills with rank numbers, trend direction indicators, and a time filter toggle (24h/7d/30d).',
      filePath: 'modules/domain/news/TrendingTopicsPanel.tsx',
      sourceCode: `import { TrendingTopicsPanel } from '@/modules/domain/news/TrendingTopicsPanel';\n\n<TrendingTopicsPanel />`,
      variants: [
        {
          title: 'Trending topics',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <TrendingTopicsPanel />
            </div>
          ),
          code: `<TrendingTopicsPanel />`,
        },
      ],
    },
    {
      id: 'nw-topic-filter',
      title: 'TopicFilterBar',
      category: 'Domain' as const,
      abbr: 'Tf',
      description: 'Advanced filter bar for the news feed: keyword search, category select, multi-tag select, and date range picker — with active filter count.',
      filePath: 'modules/domain/news/TopicFilterBar.tsx',
      sourceCode: `import { TopicFilterBar } from '@/modules/domain/news/TopicFilterBar';\n\n<TopicFilterBar />`,
      variants: [
        {
          title: 'Topic filter bar',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <TopicFilterBar />
            </div>
          ),
          code: `<TopicFilterBar />`,
        },
      ],
    },

    // ── Group 3: Article Detail ───────────────────────────────────────────────
    {
      id: 'nw-article-header',
      title: 'ArticleHeader',
      category: 'Domain' as const,
      abbr: 'Ah',
      description: 'Full article header: title, subtitle, author with avatar, publish/update dates, read time, category badge, and social share buttons.',
      filePath: 'modules/domain/news/ArticleHeader.tsx',
      sourceCode: `import { ArticleHeader } from '@/modules/domain/news/ArticleHeader';\n\n<ArticleHeader title="Global Leaders Reach..." category="World" author="Sarah Mitchell" publishedAt="April 21, 2026" />`,
      variants: [
        {
          title: 'Article header',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ArticleHeader />
            </div>
          ),
          code: `<ArticleHeader\n  title="Global Leaders Reach Landmark Climate Agreement"\n  subtitle="After three days of negotiations..."\n  category="World"\n  author="Sarah Mitchell"\n  authorTitle="Senior World Affairs Correspondent"\n  publishedAt="April 21, 2026 at 10:30 AM GMT"\n  readTime="8 min read"\n/>`,
        },
      ],
    },
    {
      id: 'nw-article-body',
      title: 'ArticleBody',
      category: 'Domain' as const,
      abbr: 'Ab',
      description: 'Rich article body with inline pull quotes, footnote tooltips, annotation badges, and interactive fact-check tooltips on key data points.',
      filePath: 'modules/domain/news/ArticleBody.tsx',
      sourceCode: `import { ArticleBody } from '@/modules/domain/news/ArticleBody';\n\n<ArticleBody />`,
      variants: [
        {
          title: 'Article body',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-2xl">
              <ArticleBody />
            </div>
          ),
          code: `<ArticleBody />`,
        },
      ],
    },
    {
      id: 'nw-article-gallery',
      title: 'ArticleGallery',
      category: 'Domain' as const,
      abbr: 'Ag',
      description: 'Photo gallery grid with modal lightbox, caption tooltips, and previous/next navigation inside the expanded view.',
      filePath: 'modules/domain/news/ArticleGallery.tsx',
      sourceCode: `import { ArticleGallery } from '@/modules/domain/news/ArticleGallery';\n\n<ArticleGallery images={images} />`,
      variants: [
        {
          title: 'Article gallery',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ArticleGallery />
            </div>
          ),
          code: `<ArticleGallery images={[\n  { id: '1', color: 'from-blue-400 to-blue-700', caption: 'World leaders arrive...', credit: 'Reuters', altText: '...' },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-related-articles',
      title: 'RelatedArticles',
      category: 'Domain' as const,
      abbr: 'Ra',
      description: '"You may also like" section displaying 3 related article cards per page with category badges and pagination.',
      filePath: 'modules/domain/news/RelatedArticles.tsx',
      sourceCode: `import { RelatedArticles } from '@/modules/domain/news/RelatedArticles';\n\n<RelatedArticles articles={articles} />`,
      variants: [
        {
          title: 'Related articles',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <RelatedArticles />
            </div>
          ),
          code: `<RelatedArticles articles={[\n  { id: '1', title: 'What the Geneva Accord Means...', category: 'Finance', date: 'Apr 21', readTime: '6 min' },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-author-card',
      title: 'AuthorCard',
      category: 'Domain' as const,
      abbr: 'Ac',
      description: 'Author bio card with avatar, name, title, article count, follower count, follow/unfollow button, and social links.',
      filePath: 'modules/domain/news/AuthorCard.tsx',
      sourceCode: `import { AuthorCard } from '@/modules/domain/news/AuthorCard';\n\n<AuthorCard name="Sarah Mitchell" title="Senior Correspondent" articleCount={847} followerCount={24300} />`,
      variants: [
        {
          title: 'Author card',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <AuthorCard />
            </div>
          ),
          code: `<AuthorCard\n  name="Sarah Mitchell"\n  title="Senior World Affairs Correspondent"\n  bio="Sarah has covered international diplomacy for over 12 years..."\n  articleCount={847}\n  followerCount={24300}\n/>`,
        },
      ],
    },
    {
      id: 'nw-live-update',
      title: 'LiveUpdatePanel',
      category: 'Domain' as const,
      abbr: 'Lu',
      description: 'Timestamped live updates panel with a pulsing LIVE badge, contextual AlertBanner, and a refresh button that triggers a toast notification.',
      filePath: 'modules/domain/news/LiveUpdatePanel.tsx',
      sourceCode: `import { LiveUpdatePanel } from '@/modules/domain/news/LiveUpdatePanel';\n\n<LiveUpdatePanel updates={updates} />`,
      variants: [
        {
          title: 'Live update panel',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <LiveUpdatePanel />
            </div>
          ),
          code: `<LiveUpdatePanel updates={[\n  { id: 'u5', time: '14:45 GMT', title: 'Summit officially closes', body: '...', isBreaking: false },\n  { id: 'u4', time: '13:20 GMT', title: 'US and China sign...', body: '...', isBreaking: true },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-source-citation',
      title: 'SourceCitationBox',
      category: 'Domain' as const,
      abbr: 'Sc',
      description: 'Collapsible citations box with credibility badges, URL tooltips, and numbered publisher cards for each source.',
      filePath: 'modules/domain/news/SourceCitationBox.tsx',
      sourceCode: `import { SourceCitationBox } from '@/modules/domain/news/SourceCitationBox';\n\n<SourceCitationBox citations={citations} />`,
      variants: [
        {
          title: 'Source citations',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <SourceCitationBox />
            </div>
          ),
          code: `<SourceCitationBox citations={[\n  { id: '1', publisher: 'United Nations', title: 'Geneva Carbon Accord...', url: 'https://un.org/...', credibility: 'high' },\n]} />`,
        },
      ],
    },

    // ── Group 4: Interaction ──────────────────────────────────────────────────
    {
      id: 'nw-comment-list',
      title: 'CommentList',
      category: 'Domain' as const,
      abbr: 'Cl',
      description: 'Threaded comment list with author avatars, like buttons with badge counts, staff labels, and pagination.',
      filePath: 'modules/domain/news/CommentList.tsx',
      sourceCode: `import { CommentList } from '@/modules/domain/news/CommentList';\n\n<CommentList comments={comments} />`,
      variants: [
        {
          title: 'Comment list',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <CommentList />
            </div>
          ),
          code: `<CommentList comments={[\n  { id: 'c1', author: 'Thomas Eriksson', text: '...', likes: 214, replies: [] },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-comment-composer',
      title: 'CommentComposer',
      category: 'Domain' as const,
      abbr: 'Cc',
      description: 'Comment input form with name, email, comment body, terms checkbox, and animated success confirmation on submit.',
      filePath: 'modules/domain/news/CommentComposer.tsx',
      sourceCode: `import { CommentComposer } from '@/modules/domain/news/CommentComposer';\n\n<CommentComposer />`,
      variants: [
        {
          title: 'Comment composer',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <CommentComposer />
            </div>
          ),
          code: `<CommentComposer />`,
        },
      ],
    },
    {
      id: 'nw-reactions-bar',
      title: 'ReactionsBar',
      category: 'Domain' as const,
      abbr: 'Rb',
      description: 'Article reaction buttons (👍❤️😮😢) with live-updating counts shown as badges and tooltip labels. Only one reaction can be selected at a time.',
      filePath: 'modules/domain/news/ReactionsBar.tsx',
      sourceCode: `import { ReactionsBar } from '@/modules/domain/news/ReactionsBar';\n\n<ReactionsBar />`,
      variants: [
        {
          title: 'Reactions bar',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ReactionsBar />
            </div>
          ),
          code: `<ReactionsBar reactions={[\n  { emoji: '👍', label: 'Helpful', count: 1247 },\n  { emoji: '❤️', label: 'Love this', count: 893 },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-share-panel',
      title: 'SharePanel',
      category: 'Domain' as const,
      abbr: 'Sp',
      description: 'Share panel with copy-link button (shows "Copied!" state), social share dropdown menu, and a live share count badge.',
      filePath: 'modules/domain/news/SharePanel.tsx',
      sourceCode: `import { SharePanel } from '@/modules/domain/news/SharePanel';\n\n<SharePanel shareCount={4821} articleUrl="https://..." />`,
      variants: [
        {
          title: 'Share panel',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <SharePanel />
            </div>
          ),
          code: `<SharePanel shareCount={4821} articleUrl="https://thenewsroom.com/articles/geneva-climate-accord-2026" />`,
        },
      ],
    },
    {
      id: 'nw-save-later',
      title: 'SaveForLaterButton',
      category: 'Domain' as const,
      abbr: 'Sl',
      description: 'Save/unsave article button with dynamic save count badge and a success/info toast notification on toggle.',
      filePath: 'modules/domain/news/SaveForLaterButton.tsx',
      sourceCode: `import { SaveForLaterButton } from '@/modules/domain/news/SaveForLaterButton';\n\n<SaveForLaterButton articleTitle="Climate Summit" savedCount={3241} />`,
      variants: [
        {
          title: 'Save for later',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <SaveForLaterButton />
            </div>
          ),
          code: `<SaveForLaterButton articleTitle="Global Leaders Reach Landmark Climate Agreement" savedCount={3241} />`,
        },
      ],
    },

    // ── Group 5: Category & Discovery ─────────────────────────────────────────
    {
      id: 'nw-search-results',
      title: 'SearchResultsPage',
      category: 'Domain' as const,
      abbr: 'Sr',
      description: 'Search results page with live query display, result count, sortable DataTable of articles, and an EmptyState when no results match.',
      filePath: 'modules/domain/news/SearchResultsPage.tsx',
      sourceCode: `import { SearchResultsPage } from '@/modules/domain/news/SearchResultsPage';\n\n<SearchResultsPage />`,
      variants: [
        {
          title: 'Search results',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <SearchResultsPage />
            </div>
          ),
          code: `<SearchResultsPage />`,
        },
      ],
    },
    {
      id: 'nw-advanced-search',
      title: 'AdvancedSearchFilters',
      category: 'Domain' as const,
      abbr: 'As',
      description: 'Advanced search form with keyword input, category select, multi-tag select, date range picker, and region checkbox group.',
      filePath: 'modules/domain/news/AdvancedSearchFilters.tsx',
      sourceCode: `import { AdvancedSearchFilters } from '@/modules/domain/news/AdvancedSearchFilters';\n\n<AdvancedSearchFilters />`,
      variants: [
        {
          title: 'Advanced search filters',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AdvancedSearchFilters />
            </div>
          ),
          code: `<AdvancedSearchFilters />`,
        },
      ],
    },
    {
      id: 'nw-topic-explorer',
      title: 'TopicExplorer',
      category: 'Domain' as const,
      abbr: 'Te',
      description: 'Topic explorer with tabs for each major news category. Each tab shows a card grid of the most relevant articles.',
      filePath: 'modules/domain/news/TopicExplorer.tsx',
      sourceCode: `import { TopicExplorer } from '@/modules/domain/news/TopicExplorer';\n\n<TopicExplorer />`,
      variants: [
        {
          title: 'Topic explorer',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <TopicExplorer />
            </div>
          ),
          code: `<TopicExplorer />`,
        },
      ],
    },
    {
      id: 'nw-popular-tags',
      title: 'PopularTagsCloud',
      category: 'Domain' as const,
      abbr: 'Pt',
      description: 'Tag cloud showing popular topic tags as badge pills with article counts. Sort by popularity or alphabetically. Add custom tags with TagInput.',
      filePath: 'modules/domain/news/PopularTagsCloud.tsx',
      sourceCode: `import { PopularTagsCloud } from '@/modules/domain/news/PopularTagsCloud';\n\n<PopularTagsCloud />`,
      variants: [
        {
          title: 'Popular tags cloud',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <PopularTagsCloud />
            </div>
          ),
          code: `<PopularTagsCloud />`,
        },
      ],
    },
    {
      id: 'nw-regional-news',
      title: 'RegionalNewsSelector',
      category: 'Domain' as const,
      abbr: 'Rn',
      description: 'Regional news selector with country/region select dropdown, sort toggle, local-news-only toggle, and sub-region drill-down.',
      filePath: 'modules/domain/news/RegionalNewsSelector.tsx',
      sourceCode: `import { RegionalNewsSelector } from '@/modules/domain/news/RegionalNewsSelector';\n\n<RegionalNewsSelector />`,
      variants: [
        {
          title: 'Regional news selector',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <RegionalNewsSelector />
            </div>
          ),
          code: `<RegionalNewsSelector />`,
        },
      ],
    },

    // ── Group 6: Subscription ─────────────────────────────────────────────────
    {
      id: 'nw-newsletter-signup',
      title: 'NewsletterSignupCard',
      category: 'Domain' as const,
      abbr: 'Ns',
      description: 'Newsletter signup card with email input, delivery frequency select, consent checkbox, and an AlertBanner success confirmation.',
      filePath: 'modules/domain/news/NewsletterSignupCard.tsx',
      sourceCode: `import { NewsletterSignupCard } from '@/modules/domain/news/NewsletterSignupCard';\n\n<NewsletterSignupCard />`,
      variants: [
        {
          title: 'Newsletter signup',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <NewsletterSignupCard />
            </div>
          ),
          code: `<NewsletterSignupCard />`,
        },
      ],
    },
    {
      id: 'nw-paywall-modal',
      title: 'SubscriptionPaywallModal',
      category: 'Domain' as const,
      abbr: 'Pm',
      description: 'Paywall modal triggered after reaching free article limit. Shows benefit badges and a subscribe CTA with AlertBanner status.',
      filePath: 'modules/domain/news/SubscriptionPaywallModal.tsx',
      sourceCode: `import { SubscriptionPaywallModal } from '@/modules/domain/news/SubscriptionPaywallModal';\n\n<SubscriptionPaywallModal />`,
      variants: [
        {
          title: 'Paywall modal',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <SubscriptionPaywallModal />
            </div>
          ),
          code: `<SubscriptionPaywallModal />`,
        },
      ],
    },
    {
      id: 'nw-plan-cards',
      title: 'SubscriptionPlanCards',
      category: 'Domain' as const,
      abbr: 'Pc',
      description: 'Three subscription tier cards (Free / Standard / Premium) with feature lists, pricing, billing toggle, and highlighted recommended plan.',
      filePath: 'modules/domain/news/SubscriptionPlanCards.tsx',
      sourceCode: `import { SubscriptionPlanCards } from '@/modules/domain/news/SubscriptionPlanCards';\n\n<SubscriptionPlanCards />`,
      variants: [
        {
          title: 'Subscription plan cards',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <SubscriptionPlanCards />
            </div>
          ),
          code: `<SubscriptionPlanCards />`,
        },
      ],
    },
    {
      id: 'nw-consent-prefs',
      title: 'ConsentPreferences',
      category: 'Domain' as const,
      abbr: 'Cp',
      description: 'Cookie/consent preferences modal with category toggles, accept-all / reject-optional shortcuts, and a save confirmation.',
      filePath: 'modules/domain/news/ConsentPreferences.tsx',
      sourceCode: `import { ConsentPreferences } from '@/modules/domain/news/ConsentPreferences';\n\n<ConsentPreferences />`,
      variants: [
        {
          title: 'Consent preferences',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ConsentPreferences />
            </div>
          ),
          code: `<ConsentPreferences />`,
        },
      ],
    },

    // ── Group 7: Ads & Monetization ────────────────────────────────────────────
    {
      id: 'nw-ad-slot',
      title: 'AdSlotBanner',
      category: 'Domain' as const,
      abbr: 'Ad',
      description: 'Ad slot placeholder card with "Advertisement" label, close button, sponsor CTA, and an editorial disclaimer AlertBanner.',
      filePath: 'modules/domain/news/AdSlotBanner.tsx',
      sourceCode: `import { AdSlotBanner } from '@/modules/domain/news/AdSlotBanner';\n\n<AdSlotBanner sponsorName="Acme Corp" ctaText="Learn more" />`,
      variants: [
        {
          title: 'Ad slot banner',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-md">
              <AdSlotBanner />
            </div>
          ),
          code: `<AdSlotBanner sponsorName="Acme Corp" ctaText="Learn more" ctaUrl="https://acme.com" />`,
        },
      ],
    },
    {
      id: 'nw-sponsored-card',
      title: 'SponsoredContentCard',
      category: 'Domain' as const,
      abbr: 'Sp',
      description: 'Sponsored content card with a "Sponsored" badge, tooltip explaining the sponsorship, article summary, and byline.',
      filePath: 'modules/domain/news/SponsoredContentCard.tsx',
      sourceCode: `import { SponsoredContentCard } from '@/modules/domain/news/SponsoredContentCard';\n\n<SponsoredContentCard sponsorName="GreenTech Solutions" title="How Renewable Energy..." />`,
      variants: [
        {
          title: 'Sponsored content card',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <SponsoredContentCard />
            </div>
          ),
          code: `<SponsoredContentCard\n  sponsorName="GreenTech Solutions"\n  title="How Renewable Energy Is Reshaping the Global Supply Chain"\n  category="Energy"\n  readTime="4 min"\n/>`,
        },
      ],
    },
    {
      id: 'nw-donation-cta',
      title: 'DonationCTA',
      category: 'Domain' as const,
      abbr: 'Dc',
      description: 'Donation CTA with preset amount buttons, custom amount input, donate button, and animated thank-you confirmation with supporter count badge.',
      filePath: 'modules/domain/news/DonationCTA.tsx',
      sourceCode: `import { DonationCTA } from '@/modules/domain/news/DonationCTA';\n\n<DonationCTA supporterCount={28741} />`,
      variants: [
        {
          title: 'Donation CTA',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <DonationCTA />
            </div>
          ),
          code: `<DonationCTA supporterCount={28741} />`,
        },
      ],
    },

    // ── Group 8: Editorial ─────────────────────────────────────────────────────
    {
      id: 'nw-editor-dashboard',
      title: 'EditorDashboard',
      category: 'Domain' as const,
      abbr: 'Ed',
      description: 'Editor overview dashboard with a searchable, sortable DataTable of articles showing status badges, author, and word count.',
      filePath: 'modules/domain/news/EditorDashboard.tsx',
      sourceCode: `import { EditorDashboard } from '@/modules/domain/news/EditorDashboard';\n\n<EditorDashboard />`,
      variants: [
        {
          title: 'Editor dashboard',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <EditorDashboard />
            </div>
          ),
          code: `<EditorDashboard />`,
        },
      ],
    },
    {
      id: 'nw-draft-editor',
      title: 'ArticleDraftEditor',
      category: 'Domain' as const,
      abbr: 'De',
      description: 'Article draft editor with title input, body textarea, tag input, and a live SEO ContentScoreBar that evaluates the content in real-time.',
      filePath: 'modules/domain/news/ArticleDraftEditor.tsx',
      sourceCode: `import { ArticleDraftEditor } from '@/modules/domain/news/ArticleDraftEditor';\n\n<ArticleDraftEditor />`,
      variants: [
        {
          title: 'Article draft editor',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ArticleDraftEditor />
            </div>
          ),
          code: `<ArticleDraftEditor />`,
        },
      ],
    },
    {
      id: 'nw-publish-scheduler',
      title: 'PublishingScheduler',
      category: 'Domain' as const,
      abbr: 'Ps',
      description: 'Schedule article publishing with date picker, time select, timezone select, and distribution channel select.',
      filePath: 'modules/domain/news/PublishingScheduler.tsx',
      sourceCode: `import { PublishingScheduler } from '@/modules/domain/news/PublishingScheduler';\n\n<PublishingScheduler />`,
      variants: [
        {
          title: 'Publishing scheduler',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <PublishingScheduler />
            </div>
          ),
          code: `<PublishingScheduler />`,
        },
      ],
    },
    {
      id: 'nw-review-approval',
      title: 'ReviewApprovalPanel',
      category: 'Domain' as const,
      abbr: 'Ra',
      description: 'Editorial review workflow stepper (Draft → Review → Approved → Published) with approve/reject buttons and AlertBanner status updates.',
      filePath: 'modules/domain/news/ReviewApprovalPanel.tsx',
      sourceCode: `import { ReviewApprovalPanel } from '@/modules/domain/news/ReviewApprovalPanel';\n\n<ReviewApprovalPanel />`,
      variants: [
        {
          title: 'Review approval panel',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ReviewApprovalPanel />
            </div>
          ),
          code: `<ReviewApprovalPanel />`,
        },
      ],
    },
    {
      id: 'nw-breaking-composer',
      title: 'BreakingNewsComposer',
      category: 'Domain' as const,
      abbr: 'Bc',
      description: 'Breaking news quick-composer with headline input, body textarea, BREAKING toggle, and a publish toast notification.',
      filePath: 'modules/domain/news/BreakingNewsComposer.tsx',
      sourceCode: `import { BreakingNewsComposer } from '@/modules/domain/news/BreakingNewsComposer';\n\n<BreakingNewsComposer />`,
      variants: [
        {
          title: 'Breaking news composer',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <BreakingNewsComposer />
            </div>
          ),
          code: `<BreakingNewsComposer />`,
        },
      ],
    },

    // ── Group 9: SEO & Utility ────────────────────────────────────────────────
    {
      id: 'nw-breadcrumb-nav',
      title: 'BreadcrumbNav',
      category: 'Domain' as const,
      abbr: 'Bn',
      description: 'Breadcrumb navigation with structured data tooltip explaining SEO benefits and a "schema.org active" badge.',
      filePath: 'modules/domain/news/BreadcrumbNav.tsx',
      sourceCode: `import { BreadcrumbNav } from '@/modules/domain/news/BreadcrumbNav';\n\n<BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'World' }]} />`,
      variants: [
        {
          title: 'Breadcrumb nav',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <BreadcrumbNav />
            </div>
          ),
          code: `<BreadcrumbNav items={[\n  { label: 'Home', href: '/' },\n  { label: 'World', href: '/world' },\n  { label: 'Climate', href: '/world/climate' },\n  { label: 'Geneva Summit 2026' },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-reading-progress',
      title: 'ReadingProgressBar',
      category: 'Domain' as const,
      abbr: 'Rp',
      description: 'Article reading progress tracker using ContentScoreBar, with simulated progress levels, word count, and reading time badges.',
      filePath: 'modules/domain/news/ReadingProgressBar.tsx',
      sourceCode: `import { ReadingProgressBar } from '@/modules/domain/news/ReadingProgressBar';\n\n<ReadingProgressBar title="Article title" totalWords={2847} readTime="8 min read" />`,
      variants: [
        {
          title: 'Reading progress bar',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ReadingProgressBar />
            </div>
          ),
          code: `<ReadingProgressBar\n  title="Global Leaders Reach Landmark Climate Agreement"\n  totalWords={2847}\n  readTime="8 min read"\n/>`,
        },
      ],
    },
    {
      id: 'nw-toc',
      title: 'TableOfContents',
      category: 'Domain' as const,
      abbr: 'Tc',
      description: 'Table of contents sidebar with section headings, active highlight, estimated reading time per section, and a "jump to" tab for main sections.',
      filePath: 'modules/domain/news/TableOfContents.tsx',
      sourceCode: `import { TableOfContents } from '@/modules/domain/news/TableOfContents';\n\n<TableOfContents sections={sections} />`,
      variants: [
        {
          title: 'Table of contents',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <TableOfContents />
            </div>
          ),
          code: `<TableOfContents sections={[\n  { id: 's1', title: 'Opening: A Historic Night', level: 1, estimated: '1 min' },\n  { id: 's2', title: 'Background', level: 2, estimated: '2 min' },\n]} />`,
        },
      ],
    },
    {
      id: 'nw-a11y-skiplink',
      title: 'AccessibilitySkipLink',
      category: 'Domain' as const,
      abbr: 'Al',
      description: 'Accessibility demo with SkipLink components, ARIA live region announcer, and informational tooltips explaining each WCAG criterion.',
      filePath: 'modules/domain/news/AccessibilitySkipLink.tsx',
      sourceCode: `import { AccessibilitySkipLink } from '@/modules/domain/news/AccessibilitySkipLink';\n\n<AccessibilitySkipLink />`,
      variants: [
        {
          title: 'Accessibility skip link',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <AccessibilitySkipLink />
            </div>
          ),
          code: `<AccessibilitySkipLink />`,
        },
      ],
    },
    {
      id: 'nw-error-empty',
      title: 'ErrorOrEmptyState',
      category: 'Domain' as const,
      abbr: 'Ee',
      description: 'Switchable error/empty state component with three variants: empty feed, 404 article, and network error — each with an EmptyState and AlertBanner.',
      filePath: 'modules/domain/news/ErrorOrEmptyState.tsx',
      sourceCode: `import { ErrorOrEmptyState } from '@/modules/domain/news/ErrorOrEmptyState';\n\n<ErrorOrEmptyState />`,
      variants: [
        {
          title: 'Error or empty state',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ErrorOrEmptyState />
            </div>
          ),
          code: `<ErrorOrEmptyState />`,
        },
      ],
    },
  ];
}
