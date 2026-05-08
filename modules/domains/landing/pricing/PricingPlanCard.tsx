'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import type { PricingPlan } from '../types';

type PricingPlanCardProps = {
  plan: PricingPlan;
  className?: string;
};

const INTERVAL_LABEL: Record<string, string> = {
  MONTHLY: '/ mo',
  YEARLY: '/ yr',
  ONCE: 'one-time',
};

export function PricingPlanCard({ plan, className }: PricingPlanCardProps) {
  const interval = plan.interval ?? 'MONTHLY';
  const currency = plan.currency ?? 'USD';

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(plan.price);

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border p-7 transition-shadow',
        plan.isPopular
          ? 'border-primary shadow-lg shadow-primary/10 bg-surface-raised'
          : 'border-border bg-surface-base hover:shadow-md',
        className,
      )}
    >
      {plan.isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-fg">
          <FontAwesomeIcon icon={faStar} className="w-2.5 h-2.5" aria-hidden="true" />
          Most Popular
        </span>
      )}

      <div className="mb-5">
        <h3 className="text-lg font-bold text-text-primary">{plan.name}</h3>
        {plan.description && (
          <p className="mt-1 text-sm text-text-secondary">{plan.description}</p>
        )}
      </div>

      <div className="mb-6 flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold text-text-primary tracking-tight">{formattedPrice}</span>
        <span className="text-sm text-text-secondary">{INTERVAL_LABEL[interval]}</span>
      </div>

      {plan.features.length > 0 && (
        <ul className="mb-8 flex-1 space-y-3">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-sm text-text-primary">
              <FontAwesomeIcon
                icon={faCheck}
                className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      )}

      {plan.cta && (
        <a
          href={plan.cta.href}
          className={cn(
            'mt-auto inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
            plan.isPopular
              ? 'bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-active'
              : 'border border-border bg-surface-base text-text-primary hover:bg-surface-overlay',
          )}
        >
          {plan.cta.label}
        </a>
      )}
    </div>
  );
}
