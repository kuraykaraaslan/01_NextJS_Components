'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';

export type HeroStory = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  imageColor?: string;
};

const DEFAULT_STORIES: HeroStory[] = [
  {
    id: '1',
    title: 'Global Leaders Convene for Emergency Climate Summit',
    subtitle: 'World leaders gather in Geneva to discuss unprecedented measures against rising sea levels and extreme weather patterns affecting millions.',
    category: 'World',
    author: 'Sarah Mitchell',
    publishedAt: '2 hours ago',
    readTime: '5 min read',
    imageColor: 'from-blue-600 to-blue-900',
  },
  {
    id: '2',
    title: 'Tech Giants Unveil Next-Gen AI Infrastructure at Annual Conference',
    subtitle: 'Major technology companies announce sweeping investments in AI computing infrastructure, reshaping the future of enterprise software.',
    category: 'Technology',
    author: 'James Thornton',
    publishedAt: '4 hours ago',
    readTime: '7 min read',
    imageColor: 'from-violet-600 to-purple-900',
  },
  {
    id: '3',
    title: 'Markets Rally as Fed Signals Pause in Rate Hikes',
    subtitle: 'Equities surged across global markets after the Federal Reserve hinted at holding interest rates steady through the remainder of the quarter.',
    category: 'Finance',
    author: 'Elena Vasquez',
    publishedAt: '6 hours ago',
    readTime: '4 min read',
    imageColor: 'from-emerald-600 to-green-900',
  },
];

export function NewsHeroSlider({
  stories = DEFAULT_STORIES,
  className,
}: {
  stories?: HeroStory[];
  className?: string;
}) {
  const [current, setCurrent] = useState(0);

  function prev() {
    setCurrent((c) => (c - 1 + stories.length) % stories.length);
  }
  function next() {
    setCurrent((c) => (c + 1) % stories.length);
  }

  const story = stories[current];

  return (
    <div className={className}>
      <Card className="overflow-hidden">
        <div
          className={`relative bg-gradient-to-br ${story.imageColor ?? 'from-gray-700 to-gray-900'} min-h-[360px] flex flex-col justify-end p-6 text-white`}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

          {/* Content */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="error" size="sm">{story.category}</Badge>
              <Tooltip content={`Published ${story.publishedAt}`}>
                <span className="text-xs text-white/70 cursor-default">{story.publishedAt}</span>
              </Tooltip>
            </div>
            <h2 className="text-2xl font-bold leading-tight max-w-2xl">{story.title}</h2>
            <p className="text-sm text-white/80 max-w-xl leading-relaxed">{story.subtitle}</p>
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs text-white/60">By {story.author}</span>
              <span className="text-xs text-white/60">{story.readTime}</span>
              <Button variant="primary" size="sm">Read story</Button>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-3 z-20">
            <Tooltip content="Previous story">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous story"
              >
                ‹
              </button>
            </Tooltip>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-3 z-20">
            <Tooltip content="Next story">
              <button
                onClick={next}
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next story"
              >
                ›
              </button>
            </Tooltip>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-4 right-4 flex gap-1.5 z-20">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to story ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  i === current ? 'bg-white w-5' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
