'use client';
import { cn } from '@/libs/utils/cn';
import { FeatureCard } from './FeatureCard';
import type { Feature } from '../types';

type FeatureGridProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  layout?: 'card' | 'inline';
  columns?: 2 | 3 | 4;
  className?: string;
};

const COLUMN_CLASSES: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export function FeatureGrid({
  eyebrow,
  title,
  subtitle,
  features,
  layout = 'card',
  columns = 3,
  className,
}: FeatureGridProps) {
  return (
    <section className={cn('py-16 lg:py-24', className)}>
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

        <div className={cn('grid grid-cols-1 gap-6', COLUMN_CLASSES[columns])}>
          {features.map((feature) => (
            <FeatureCard key={feature.featureId} feature={feature} layout={layout} />
          ))}
        </div>
      </div>
    </section>
  );
}
