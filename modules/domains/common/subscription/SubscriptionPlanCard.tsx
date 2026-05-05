'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/libs/utils/cn';

export type PlanInterval = 'MONTHLY' | 'YEARLY' | 'ONCE';

export type SubscriptionPlan = {
  planId: string;
  name: string;
  description?: string | null;
  price: number;
  currency?: string;
  interval?: PlanInterval;
  features?: string[];
  isPopular?: boolean;
  isActive?: boolean;
};

type SubscriptionPlanCardProps = {
  plan: SubscriptionPlan;
  isCurrent?: boolean;
  isSelected?: boolean;
  onSelect?: (planId: string) => void;
  loading?: boolean;
  className?: string;
};

const INTERVAL_LABEL: Record<PlanInterval, string> = {
  MONTHLY: '/ month',
  YEARLY:  '/ year',
  ONCE:    'one-time',
};

export function SubscriptionPlanCard({
  plan,
  isCurrent = false,
  isSelected = false,
  onSelect,
  loading = false,
  className,
}: SubscriptionPlanCardProps) {
  const interval = plan.interval ?? 'MONTHLY';
  const currency = plan.currency ?? 'USD';

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: plan.price % 100 === 0 ? 0 : 2,
  }).format(plan.price / 100);

  const highlighted = plan.isPopular || isSelected || isCurrent;

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border p-6 transition-shadow',
        highlighted
          ? 'border-primary shadow-md shadow-primary/10'
          : 'border-border shadow-sm hover:shadow-md',
        className,
      )}
    >
      {plan.isPopular && !isCurrent && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-fg">
          <FontAwesomeIcon icon={faStar} className="w-2.5 h-2.5" />
          Popular
        </span>
      )}

      {isCurrent && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-success px-3 py-0.5 text-xs font-semibold text-white">
          <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5" />
          Current Plan
        </span>
      )}

      <div className="mb-4">
        <h3 className="text-base font-semibold text-text-primary">{plan.name}</h3>
        {plan.description && (
          <p className="mt-1 text-xs text-text-secondary">{plan.description}</p>
        )}
      </div>

      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-text-primary tracking-tight">{formattedPrice}</span>
        <span className="text-sm text-text-secondary">{INTERVAL_LABEL[interval]}</span>
      </div>

      {plan.features && plan.features.length > 0 && (
        <ul className="mb-6 flex-1 space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-text-primary">
              <FontAwesomeIcon
                icon={faCheck}
                className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        disabled={isCurrent || loading || !onSelect}
        onClick={() => onSelect?.(plan.planId)}
        className={cn(
          'mt-auto w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
          isCurrent
            ? 'bg-surface-raised text-text-secondary cursor-default'
            : 'bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-active disabled:opacity-50 disabled:cursor-not-allowed',
        )}
      >
        {isCurrent ? 'Current Plan' : loading ? 'Processing…' : `Choose ${plan.name}`}
      </button>
    </div>
  );
}
