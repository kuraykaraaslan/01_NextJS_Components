'use client';
import Link from 'next/link';
import { Badge } from '@/modules/ui/Badge';
import { Avatar } from '@/modules/ui/Avatar';
import { cn } from '@/libs/utils/cn';

type GridStory = {
  id: string;
  category: string;
  categoryVariant: 'error' | 'info' | 'warning' | 'success' | 'neutral';
  label?: string;
  title: string;
  summary?: string;
  author: string;
  publishedAt: string;
  readTime: string;
  gradient: string;
  href?: string;
};

const DEFAULT_STORIES: GridStory[] = [
  {
    id: '1',
    category: 'World',
    categoryVariant: 'info',
    label: 'EXCLUSIVE',
    title: 'Global Leaders Reach Landmark Climate Agreement at Geneva Summit',
    summary: 'After three days of marathon negotiations, 147 nations signed the Geneva Carbon Accord — committing to cut emissions by 60% before 2040 in the most ambitious deal since Paris.',
    author: 'Sarah Mitchell',
    publishedAt: '2h ago',
    readTime: '8 min',
    gradient: 'from-blue-700 via-blue-800 to-slate-900',
    href: '/theme/news/article/geneva-climate-accord',
  },
  {
    id: '2',
    category: 'Technology',
    categoryVariant: 'neutral',
    label: 'IN DEPTH',
    title: 'EU Passes World\'s First Comprehensive AI Regulation',
    summary: 'The landmark law classifies AI systems by risk and imposes strict testing requirements on frontier models.',
    author: 'James Thornton',
    publishedAt: '5h ago',
    readTime: '11 min',
    gradient: 'from-violet-700 via-purple-800 to-indigo-900',
    href: '/theme/news/article/ai-regulation-eu',
  },
  {
    id: '3',
    category: 'Health',
    categoryVariant: 'error',
    label: 'REPORT',
    title: 'mRNA Cancer Vaccine Shows 90% Efficacy in Global Phase-3 Trial',
    summary: 'A personalised vaccine from BioNTech eliminated tumours in 18 of 20 participants in the largest trial of its kind.',
    author: 'Dr. Anna Chen',
    publishedAt: '14h ago',
    readTime: '9 min',
    gradient: 'from-rose-700 via-pink-800 to-red-900',
    href: '/theme/news/article/mrna-cancer-vaccine',
  },
];

function MainStory({ story }: { story: GridStory }) {
  const content = (
    <div className={cn(
      'relative bg-gradient-to-br h-full min-h-[340px] flex flex-col justify-end overflow-hidden rounded-xl',
      story.gradient
    )}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" aria-hidden="true" />
      <div className="relative z-10 p-5 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={story.categoryVariant} size="sm">{story.category}</Badge>
          {story.label && (
            <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">{story.label}</span>
          )}
        </div>
        <h2 className="text-xl font-extrabold text-white leading-snug">
          {story.title}
        </h2>
        {story.summary && (
          <p className="text-sm text-white/70 leading-relaxed line-clamp-3">{story.summary}</p>
        )}
        <div className="flex items-center gap-3 pt-1 flex-wrap">
          <Avatar name={story.author} size="xs" className="border border-white/30" />
          <span className="text-xs text-white/60">{story.author}</span>
          <span className="text-xs text-white/40">{story.publishedAt}</span>
          <span className="text-xs text-white/40">· {story.readTime} read</span>
        </div>
      </div>
    </div>
  );

  if (story.href) {
    return (
      <Link href={story.href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl">
        {content}
      </Link>
    );
  }
  return content;
}

function SideStory({ story }: { story: GridStory }) {
  const content = (
    <div className="flex gap-3 group p-3 rounded-lg hover:bg-surface-overlay transition-colors">
      {/* Colour accent thumbnail */}
      <div className={cn(
        'shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br flex items-center justify-center overflow-hidden',
        story.gradient
      )}>
        <span className="text-white/25 text-2xl font-black select-none">
          {story.category.charAt(0)}
        </span>
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant={story.categoryVariant} size="sm">{story.category}</Badge>
          {story.label && (
            <span className="text-[10px] font-bold text-text-disabled tracking-widest uppercase">{story.label}</span>
          )}
        </div>
        <p className="text-sm font-semibold text-text-primary leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {story.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-text-disabled">
          <span>{story.author}</span>
          <span>·</span>
          <span>{story.publishedAt}</span>
          <span>·</span>
          <span>{story.readTime} read</span>
        </div>
      </div>
    </div>
  );

  if (story.href) {
    return (
      <Link href={story.href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-lg">
        {content}
      </Link>
    );
  }
  return content;
}

export function EditorialGrid({
  stories = DEFAULT_STORIES,
  className,
}: {
  stories?: GridStory[];
  className?: string;
}) {
  const [main, ...rest] = stories;
  if (!main) return null;

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-5 gap-3', className)}>
      {/* Main story — takes 3/5 */}
      <div className="sm:col-span-3">
        <MainStory story={main} />
      </div>

      {/* Side stories — take 2/5, stacked */}
      <div className="sm:col-span-2 flex flex-col justify-between gap-1 rounded-xl border border-border bg-surface-raised overflow-hidden">
        <div className="px-3 pt-3 pb-1 border-b border-border">
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Editor's Picks</span>
        </div>
        {rest.slice(0, 3).map((story, i, arr) => (
          <div key={story.id} className={cn('flex-1', i < arr.length - 1 && 'border-b border-border')}>
            <SideStory story={story} />
          </div>
        ))}
      </div>
    </div>
  );
}
