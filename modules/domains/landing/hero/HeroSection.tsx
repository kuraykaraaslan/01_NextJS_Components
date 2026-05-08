'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import type { Hero } from '../types';

type HeroSectionProps = {
  hero: Hero;
  className?: string;
};

export function HeroSection({ hero, className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-surface-base',
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_60%_0%,_var(--primary-subtle),_transparent_70%)]" />
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-info/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className={cn(
          'grid gap-12 items-center',
          hero.image ? 'lg:grid-cols-[1fr_1fr]' : 'max-w-3xl',
        )}>
          <div className="space-y-6">
            {hero.eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-3 py-1 text-xs font-medium text-text-secondary">
                {hero.eyebrow}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-tight">
              {hero.headline}
            </h1>

            {hero.subheadline && (
              <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
                {hero.subheadline}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {hero.primaryCta && (
                <a
                  href={hero.primaryCta.href}
                  target={hero.primaryCta.external ? '_blank' : undefined}
                  rel={hero.primaryCta.external ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                    'bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-active',
                  )}
                >
                  {hero.primaryCta.label}
                  <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}

              {hero.secondaryCta && (
                <a
                  href={hero.secondaryCta.href}
                  target={hero.secondaryCta.external ? '_blank' : undefined}
                  rel={hero.secondaryCta.external ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                    'bg-surface-base text-text-primary hover:bg-surface-overlay',
                  )}
                >
                  {hero.videoUrl && (
                    <FontAwesomeIcon icon={faPlay} className="w-3 h-3 text-primary" aria-hidden="true" />
                  )}
                  {hero.secondaryCta.label}
                </a>
              )}
            </div>
          </div>

          {hero.image && (
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />
              <img
                src={hero.image}
                alt=""
                aria-hidden="true"
                className="relative rounded-2xl border border-border shadow-2xl w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
