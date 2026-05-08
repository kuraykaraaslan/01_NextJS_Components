'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import type { HowItWorksStep } from '../types';

library.add(fas);

type HowItWorksSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  steps: HowItWorksStep[];
  layout?: 'horizontal' | 'vertical';
  className?: string;
};

export function HowItWorksSection({
  eyebrow,
  title,
  subtitle,
  steps,
  layout = 'horizontal',
  className,
}: HowItWorksSectionProps) {
  const sorted = [...steps].sort((a, b) => a.order - b.order);

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

        {layout === 'horizontal' ? (
          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((step, idx) => (
              <div key={step.stepId} className="relative flex flex-col items-center text-center">
                {idx < sorted.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px border-t-2 border-dashed border-border"
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-subtle mb-5 ring-4 ring-surface-base">
                  {step.icon ? (
                    <FontAwesomeIcon
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      icon={['fas', step.icon as any]}
                      className="w-5 h-5 text-primary"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="text-lg font-bold text-primary">{step.order}</span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-0">
            {sorted.map((step, idx) => (
              <div key={step.stepId} className="relative flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-subtle ring-4 ring-surface-base flex-shrink-0 z-10">
                    {step.icon ? (
                      <FontAwesomeIcon
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        icon={['fas', step.icon as any]}
                        className="w-4 h-4 text-primary"
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="text-sm font-bold text-primary">{step.order}</span>
                    )}
                  </div>
                  {idx < sorted.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1 mb-1" aria-hidden="true" />
                  )}
                </div>
                <div className={cn('pb-8', idx === sorted.length - 1 && 'pb-0')}>
                  <h3 className="text-sm font-semibold text-text-primary">{step.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
