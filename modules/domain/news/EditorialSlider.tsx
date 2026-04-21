'use client';
import Link from 'next/link';
import { Slider } from '@/modules/ui/Slider';
import { Badge } from '@/modules/ui/Badge';
import { Avatar } from '@/modules/ui/Avatar';

export type EditorialSlide = {
  id: string;
  category: string;
  categoryVariant: 'error' | 'info' | 'warning' | 'success' | 'neutral';
  label?: string;
  title: string;
  subtitle: string;
  author: string;
  publishedAt: string;
  readTime: string;
  gradient: string;
  href?: string;
};

const DEFAULT_SLIDES: EditorialSlide[] = [
  {
    id: '1',
    category: 'Breaking',
    categoryVariant: 'error',
    label: 'EXCLUSIVE',
    title: 'Global Leaders Reach Landmark Climate Agreement at Geneva Summit',
    subtitle: 'After three days of intense negotiations, 147 nations signed the Geneva Carbon Accord — the most ambitious climate deal since Paris.',
    author: 'Sarah Mitchell',
    publishedAt: '2 hours ago',
    readTime: '8 min read',
    gradient: 'from-blue-700 via-blue-800 to-slate-900',
    href: '/theme/news/article/geneva-climate-accord',
  },
  {
    id: '2',
    category: 'Technology',
    categoryVariant: 'info',
    label: 'IN DEPTH',
    title: 'The AI Arms Race: How Big Tech is Reshaping Global Power Structures',
    subtitle: 'From semiconductor supply chains to neural infrastructure, a new geopolitical order is being written in silicon and code.',
    author: 'James Thornton',
    publishedAt: '5 hours ago',
    readTime: '12 min read',
    gradient: 'from-violet-700 via-purple-800 to-indigo-900',
    href: '/theme/news/article/ai-regulation-eu',
  },
  {
    id: '3',
    category: 'Finance',
    categoryVariant: 'success',
    label: 'ANALYSIS',
    title: 'Markets Rally as Federal Reserve Signals End of Rate Hike Cycle',
    subtitle: 'Global equities surged to 18-month highs after the Fed Chair hinted at rate cuts before year-end, catching markets off guard.',
    author: 'Elena Vasquez',
    publishedAt: '7 hours ago',
    readTime: '6 min read',
    gradient: 'from-emerald-700 via-teal-800 to-cyan-900',
    href: '/theme/news/article/fed-rate-pause',
  },
  {
    id: '4',
    category: 'Science',
    categoryVariant: 'warning',
    label: 'FIRST LOOK',
    title: "NASA Confirms Liquid Water Ocean Beneath Europa's Ice Shell",
    subtitle: 'New data from the Clipper probe reveals a vast subsurface ocean with chemical conditions favorable to life, scientists say.',
    author: 'Marcus Webb',
    publishedAt: '10 hours ago',
    readTime: '9 min read',
    gradient: 'from-sky-700 via-blue-800 to-indigo-900',
    href: '/theme/news/article/europa-ocean',
  },
  {
    id: '5',
    category: 'Health',
    categoryVariant: 'error',
    label: 'REPORT',
    title: 'mRNA Cancer Vaccine Shows 90% Efficacy in Global Phase-3 Trial',
    subtitle: 'Researchers at Oxford and BioNTech announce a personalized cancer vaccine that eliminated tumors in the majority of trial participants.',
    author: 'Dr. Anna Chen',
    publishedAt: '14 hours ago',
    readTime: '7 min read',
    gradient: 'from-rose-700 via-pink-800 to-red-900',
    href: '/theme/news/article/mrna-cancer-vaccine',
  },
];

function SlideCard({ slide }: { slide: EditorialSlide }) {
  return (
    <div className={`relative bg-gradient-to-br ${slide.gradient} min-h-[440px] sm:min-h-[500px] flex flex-col justify-end`}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />

      {/* Optional decorative pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 pb-14 sm:pb-16 pt-8 space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={slide.categoryVariant} size="sm">{slide.category}</Badge>
          {slide.label && (
            <span className="text-xs font-bold text-white/70 tracking-widest uppercase">{slide.label}</span>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {slide.title}
        </h2>

        <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl">
          {slide.subtitle}
        </p>

        <div className="flex items-center gap-4 pt-1 flex-wrap">
          <div className="flex items-center gap-2">
            <Avatar name={slide.author} size="xs" className="border border-white/30" />
            <span className="text-xs text-white/70">By {slide.author}</span>
          </div>
          <span className="text-xs text-white/50">{slide.publishedAt}</span>
          <span className="text-xs text-white/50">·</span>
          <span className="text-xs text-white/50">{slide.readTime}</span>
          <Link
            href={slide.href ?? '#'}
            className="ml-auto sm:ml-0 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-fg hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Read full story
          </Link>
        </div>
      </div>
    </div>
  );
}

export function EditorialSlider({
  slides = DEFAULT_SLIDES,
  autoPlay = true,
  className,
}: {
  slides?: EditorialSlide[];
  autoPlay?: boolean;
  className?: string;
}) {
  return (
    <Slider
      slides={slides.map((slide) => <SlideCard key={slide.id} slide={slide} />)}
      autoPlay={autoPlay}
      autoPlayInterval={5000}
      showDots
      showArrows
      loop
      className={className}
    />
  );
}
