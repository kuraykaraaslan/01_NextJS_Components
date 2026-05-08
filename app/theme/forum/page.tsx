import { Button } from '@/modules/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faUsers,
  faComments,
  faFileLines,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { TopicRow } from '@/modules/domains/forum/topic/TopicRow';
import { ForumCategoryCard } from '@/modules/domains/forum/category/ForumCategoryCard';
import { TOPICS, FORUM_CATEGORIES } from './forum.data';

const STATS = [
  { label: 'Members',     value: '18,400+', icon: faUsers },
  { label: 'Topics',      value: '784+',    icon: faComments },
  { label: 'Posts',       value: '10,680+', icon: faFileLines },
];

export default function ForumHomePage() {
  const recentTopics = TOPICS.slice(0, 5);
  const popularCategories = FORUM_CATEGORIES.slice(0, 3);

  return (
    <div className="bg-surface-base text-text-primary">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_30%_-5%,_var(--primary-subtle),_transparent_70%)]" />
          <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-40 -left-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-subtle px-3 py-1 text-sm font-medium text-primary">
              <FontAwesomeIcon icon={faUsers} className="w-3.5 h-3.5" aria-hidden="true" />
              18,400+ members worldwide
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
              Join the<br />
              <span className="text-primary">Community</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Ask questions, share projects, and connect with thousands of developers, designers, and makers who love building things.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Button
                as="a"
                href="/theme/forum/topics"
                variant="primary"
                size="lg"
                iconRight={<FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />}
              >
                Browse Topics
              </Button>
              <Button
                as="a"
                href="/theme/forum"
                variant="outline"
                size="lg"
                iconLeft={<FontAwesomeIcon icon={faPenToSquare} className="w-3.5 h-3.5" aria-hidden="true" />}
              >
                Start a Discussion
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-border bg-surface-raised">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="grid grid-cols-3 divide-x divide-border">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-4 text-center">
                <FontAwesomeIcon icon={stat.icon} className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                <span className="text-xs text-text-secondary">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent topics ── */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Recent Topics</h2>
          <a
            href="/theme/forum/topics"
            className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
          >
            View all <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          {recentTopics.map((topic) => (
            <TopicRow
              key={topic.topicId}
              topic={topic}
              href={`/theme/forum/topics/${topic.slug}`}
            />
          ))}
        </div>
      </section>

      {/* ── Popular categories ── */}
      <section className="bg-surface-raised border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Popular Categories</h2>
            <a
              href="/theme/forum/categories"
              className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
            >
              All categories <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularCategories.map((cat) => (
              <ForumCategoryCard
                key={cat.categoryId}
                category={cat}
                href={`/theme/forum/topics?category=${cat.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-primary px-8 py-10 text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary-fg">Ready to join the conversation?</h2>
          <p className="text-primary-fg/80 max-w-md mx-auto text-sm leading-relaxed">
            Create a free account and start contributing to thousands of discussions with developers around the world.
          </p>
          <Button variant="secondary" size="lg">Create Free Account</Button>
        </div>
      </section>
    </div>
  );
}
