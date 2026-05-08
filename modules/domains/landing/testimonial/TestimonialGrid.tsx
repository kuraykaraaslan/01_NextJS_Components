'use client';
import { cn } from '@/libs/utils/cn';
import { TestimonialCard } from './TestimonialCard';
import type { Testimonial } from '../types';

type TestimonialGridProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  className?: string;
};

export function TestimonialGrid({
  eyebrow,
  title,
  subtitle,
  testimonials,
  className,
}: TestimonialGridProps) {
  return (
    <section className={cn('py-16 lg:py-24 bg-surface-raised', className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          {eyebrow && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-3 text-base text-text-secondary leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.testimonialId}
              testimonial={t}
              className="break-inside-avoid"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
