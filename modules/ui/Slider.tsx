'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/libs/utils/cn';

type SliderProps = {
  slides: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  className?: string;
  slideClassName?: string;
};

export function Slider({
  slides,
  autoPlay = false,
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
  loop = true,
  className,
  slideClassName,
}: SliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setCurrent(loop ? ((index + total) % total) : Math.max(0, Math.min(index, total - 1)));
      setTimeout(() => setIsTransitioning(false), 350);
    },
    [current, isTransitioning, loop, total]
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, autoPlayInterval, total]);

  if (total === 0) return null;

  const canPrev = loop || current > 0;
  const canNext = loop || current < total - 1;

  return (
    <div
      className={cn('relative overflow-hidden rounded-xl', className)}
      role="region"
      aria-label="Content slider"
      aria-roledescription="carousel"
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-350 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}`}
            aria-hidden={i !== current}
            className={cn('w-full shrink-0', slideClassName)}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Prev arrow */}
      {showArrows && canPrev && (
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          ‹
        </button>
      )}

      {/* Next arrow */}
      {showArrows && canNext && (
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          ›
        </button>
      )}

      {/* Dots */}
      {showDots && total > 1 && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10"
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                i === current
                  ? 'w-5 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
