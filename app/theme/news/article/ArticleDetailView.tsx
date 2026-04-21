'use client';
import { type ArticleData } from './articles.data';
import { ReadingProgressBar } from '@/modules/domain/news/ReadingProgressBar';
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
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { Badge } from '@/modules/ui/Badge';
import { Avatar } from '@/modules/ui/Avatar';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import { Tooltip } from '@/modules/ui/Tooltip';

type Props = { article: ArticleData };

function ArticleHero({ article }: Props) {
  return (
    <div className="space-y-5 pb-6 border-b border-border">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/theme/news' },
          { label: article.category, href: '/theme/news/category' },
        ]}
      />

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant={article.categoryVariant} size="sm">{article.category}</Badge>
        <Badge variant="neutral" size="sm">{article.readTime}</Badge>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold text-text-primary leading-tight mb-3">
          {article.title}
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">{article.subtitle}</p>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Avatar name={article.author} size="md" />
          <div>
            <p className="text-sm font-semibold text-text-primary">{article.author}</p>
            <p className="text-xs text-text-secondary">{article.authorTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="text-right">
            <p className="text-xs text-text-disabled">Published</p>
            <p className="text-xs font-medium text-text-primary">{article.publishedAt}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-disabled">Updated</p>
            <p className="text-xs font-medium text-text-primary">{article.updatedAt}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="secondary" size="sm" iconLeft="🔗">Copy link</Button>
        <Button variant="ghost" size="sm" iconLeft="𝕏">Share on X</Button>
        <Button variant="ghost" size="sm" iconLeft="in">LinkedIn</Button>
        <Button variant="ghost" size="sm" iconLeft="📧">Email</Button>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap pt-1">
        {article.tags.map((tag) => (
          <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
        ))}
      </div>
    </div>
  );
}

function ArticleBodyCustom({ article }: Props) {
  return (
    <div>
      <article className="prose-like space-y-5 text-text-primary">
        <p className="text-base leading-relaxed">{article.body.lead}</p>

        <Card className="border-l-4 !border-l-primary bg-primary-subtle/10 p-5">
          <blockquote className="space-y-2">
            <p className="text-lg font-semibold text-text-primary leading-snug italic">
              {article.body.pullQuote}
            </p>
            <footer className="text-sm text-text-secondary">
              {article.body.pullQuoteAuthor}
            </footer>
          </blockquote>
        </Card>

        <p className="text-base leading-relaxed">{article.body.para1}</p>

        <div className="flex flex-wrap gap-2 my-4">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="info" size="sm">{tag}</Badge>
          ))}
        </div>

        <p className="text-base leading-relaxed">{article.body.para2}</p>

        <p className="text-base leading-relaxed">{article.body.para3}</p>
      </article>
    </div>
  );
}

export function ArticleDetailView({ article }: Props) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Main column */}
          <div className="lg:col-span-3 space-y-8">
            <ArticleHero article={article} />

            {/* Hero image */}
            <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${article.gradient} h-72 flex flex-col items-center justify-center gap-3`}>
              <span className="text-white/20 text-6xl font-black">{article.category.charAt(0)}</span>
              <span className="text-white/60 text-sm font-medium">{article.category} · {article.author}</span>
            </div>

            <LiveUpdatePanel />

            <ArticleBodyCustom article={article} />

            <SourceCitationBox />

            <ArticleGallery />

            <div className="flex flex-col sm:flex-row gap-4">
              <ReactionsBar className="flex-1" />
              <div className="flex items-center gap-2 shrink-0">
                <SaveForLaterButton />
              </div>
            </div>

            <SharePanel />

            <AuthorCard
              name={article.author}
              title={article.authorTitle}
              bio={article.authorBio}
              articleCount={article.authorArticleCount}
              followerCount={article.authorFollowerCount}
            />

            <AdSlotBanner />

            <RelatedArticles />

            <div className="space-y-6">
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
