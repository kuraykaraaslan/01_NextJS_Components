'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import type { Feature } from '../types';

library.add(fas);

type FeatureCardProps = {
  feature: Feature;
  layout?: 'card' | 'inline';
  className?: string;
};

export function FeatureCard({ feature, layout = 'card', className }: FeatureCardProps) {
  if (layout === 'inline') {
    return (
      <div className={cn('flex items-start gap-4', className)}>
        {feature.icon && (
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary-subtle">
            <FontAwesomeIcon
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              icon={['fas', feature.icon as any]}
              className="w-4 h-4 text-primary"
              aria-hidden="true"
            />
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-text-primary">{feature.title}</h3>
          <p className="mt-1 text-sm text-text-secondary leading-relaxed">{feature.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group rounded-2xl border border-border bg-surface-raised p-6',
        'hover:border-primary/40 hover:shadow-md transition-all duration-200',
        className,
      )}
    >
      {feature.icon && (
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-subtle mb-4">
          <FontAwesomeIcon
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            icon={['fas', feature.icon as any]}
            className="w-5 h-5 text-primary"
            aria-hidden="true"
          />
        </div>
      )}
      {feature.image && !feature.icon && (
        <img
          src={feature.image}
          alt=""
          aria-hidden="true"
          className="w-12 h-12 rounded-xl object-cover mb-4"
        />
      )}
      <h3 className="text-base font-semibold text-text-primary">{feature.title}</h3>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">{feature.description}</p>
    </div>
  );
}
