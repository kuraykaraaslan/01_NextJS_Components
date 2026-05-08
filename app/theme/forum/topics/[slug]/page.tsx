import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { Button } from '@/modules/ui/Button';
import { Avatar } from '@/modules/ui/Avatar';
import { TopicStatusBadge } from '@/modules/domains/forum/topic/TopicStatusBadge';
import { PostStatusBadge } from '@/modules/domains/forum/post/PostStatusBadge';
import { ReactionTypeBadge } from '@/modules/domains/forum/reaction/ReactionTypeBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReply,
  faEye,
  faThumbsUp,
  faThumbtack,
  faLock,
  faArrowLeft,
  faFlag,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { TOPICS, POSTS, FORUM_CATEGORIES } from '../../forum.data';

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export default async function TopicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) notFound();

  const category = FORUM_CATEGORIES.find((c) => c.categoryId === topic.categoryId);
  const posts = POSTS.filter((p) => p.topicId === topic.topicId);

  const relatedTopics = TOPICS
    .filter((t) => t.topicId !== topic.topicId && t.categoryId === topic.categoryId)
    .slice(0, 3);

  return (
    <div className="bg-surface-base text-text-primary">
      {/* Sub-header */}
      <div className="border-b border-border bg-surface-raised">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <Breadcrumb
            items={[
              { label: 'Home',            href: '/theme/forum' },
              { label: 'Topics',          href: '/theme/forum/topics' },
              ...(category ? [{ label: category.title, href: `/theme/forum/topics?category=${category.slug}` }] : []),
              { label: topic.title },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* ── Topic header ── */}
        <div className="mb-6 space-y-3">
          <div className="flex items-start gap-3 flex-wrap">
            {topic.isPinned && (
              <FontAwesomeIcon icon={faThumbtack} className="w-4 h-4 text-primary mt-1 shrink-0" aria-label="Pinned" />
            )}
            {topic.isLocked && (
              <FontAwesomeIcon icon={faLock} className="w-4 h-4 text-warning mt-1 shrink-0" aria-label="Locked" />
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight flex-1">
              {topic.title}
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <TopicStatusBadge status={topic.status} size="sm" />
            <span className="flex items-center gap-1 text-sm text-text-secondary">
              <FontAwesomeIcon icon={faReply} className="w-3.5 h-3.5" aria-hidden="true" />
              {topic.replyCount} replies
            </span>
            <span className="flex items-center gap-1 text-sm text-text-secondary">
              <FontAwesomeIcon icon={faEye} className="w-3.5 h-3.5" aria-hidden="true" />
              {topic.viewCount.toLocaleString()} views
            </span>
            <span className="text-sm text-text-secondary">
              by <span className="font-medium text-text-primary">{topic.authorName}</span>
            </span>
          </div>
        </div>

        {/* ── Posts ── */}
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <article key={post.postId} className="rounded-xl border border-border bg-surface-raised overflow-hidden">
                {/* Post header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface-overlay/50">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={post.authorName}
                      size="sm"
                      className="shrink-0"
                    />
                    <div>
                      <span className="text-sm font-semibold text-text-primary">{post.authorName}</span>
                      <span className="text-xs text-text-secondary ml-2">
                        {post.authorPostCount} posts
                      </span>
                    </div>
                    {index === 0 && (
                      <span className="ml-1 text-xs font-medium text-primary bg-primary-subtle border border-primary/20 px-2 py-0.5 rounded-full">
                        OP
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <PostStatusBadge status={post.status} size="sm" />
                    <span className="text-xs text-text-secondary hidden sm:inline">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Post body */}
                <div className="px-5 py-4">
                  <p className="text-text-primary leading-relaxed text-sm">{post.content}</p>
                </div>

                {/* Post footer */}
                <div className="px-5 py-3 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ReactionTypeBadge type="LIKE" count={post.likeCount} size="sm" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="xs" iconOnly aria-label="Like post">
                      <FontAwesomeIcon icon={faThumbsUp} className="w-3.5 h-3.5" aria-hidden="true" />
                    </Button>
                    <Button variant="ghost" size="xs" iconOnly aria-label="Reply">
                      <FontAwesomeIcon icon={faReply} className="w-3.5 h-3.5" aria-hidden="true" />
                    </Button>
                    <Button variant="ghost" size="xs" iconOnly aria-label="Share">
                      <FontAwesomeIcon icon={faShare} className="w-3.5 h-3.5" aria-hidden="true" />
                    </Button>
                    <Button variant="ghost" size="xs" iconOnly aria-label="Report">
                      <FontAwesomeIcon icon={faFlag} className="w-3.5 h-3.5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-border bg-surface-raised p-8 text-center text-text-secondary text-sm">
              No replies yet. Be the first to respond!
            </div>
          )}
        </div>

        {/* ── Reply box (static) ── */}
        {topic.status === 'OPEN' && (
          <div className="mt-8 rounded-xl border border-border bg-surface-raised p-5 space-y-3">
            <h2 className="font-semibold text-text-primary text-sm">Post a Reply</h2>
            <textarea
              rows={4}
              placeholder="Share your thoughts…"
              className="w-full rounded-lg border border-border bg-surface-base text-sm text-text-primary placeholder:text-text-secondary px-3 py-2 focus:outline-none focus:ring-2 focus:ring-border-focus resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button variant="primary" size="sm">Post Reply</Button>
            </div>
          </div>
        )}

        {topic.status === 'LOCKED' && (
          <div className="mt-8 rounded-xl border border-warning/30 bg-warning-subtle p-4 flex items-center gap-3 text-sm text-text-secondary">
            <FontAwesomeIcon icon={faLock} className="w-4 h-4 text-warning shrink-0" aria-hidden="true" />
            This topic is locked. No new replies are allowed.
          </div>
        )}

        {/* ── Related topics ── */}
        {relatedTopics.length > 0 && (
          <section className="mt-12 pt-6 border-t border-border">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Related Topics</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              {relatedTopics.map((t) => (
                <div key={t.topicId} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0 hover:bg-surface-overlay transition-colors">
                  <a
                    href={`/theme/forum/topics/${t.slug}`}
                    className="text-sm font-medium text-text-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
                  >
                    {t.title}
                  </a>
                  <TopicStatusBadge status={t.status} size="sm" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Back link ── */}
        <a
          href="/theme/forum/topics"
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" aria-hidden="true" />
          Back to all topics
        </a>
      </div>
    </div>
  );
}
