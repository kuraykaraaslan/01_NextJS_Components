'use client';
import { cn } from '@/libs/utils/cn';
import type { EventSectionPricing } from './types';

type Props = {
  pricing: EventSectionPricing;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  selected?: boolean;
  maxPerOrder?: number;
  className?: string;
};

const FMT = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 });

export function SectionPricingCard({
  pricing,
  quantity,
  onQuantityChange,
  selected = false,
  maxPerOrder = 8,
  className,
}: Props) {
  const remaining = pricing.capacity != null ? pricing.capacity - pricing.soldCount : null;
  const soldOut = remaining != null && remaining <= 0;
  const max = Math.min(maxPerOrder, remaining ?? maxPerOrder);

  function dec() { if (quantity > 0) onQuantityChange(quantity - 1); }
  function inc() { if (quantity < max && !soldOut) onQuantityChange(quantity + 1); }

  return (
    <div
      className={cn(
        'rounded-xl border p-4 transition-all',
        soldOut
          ? 'border-border bg-surface-raised opacity-60 cursor-not-allowed'
          : selected
            ? 'border-primary bg-primary-subtle shadow-sm'
            : 'border-border bg-surface-raised hover:border-border-strong',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-text-primary text-sm">{pricing.name}</p>
          {pricing.description && (
            <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{pricing.description}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-lg font-bold text-text-primary">{FMT.format(pricing.price)}</span>
            {remaining != null && remaining > 0 && remaining <= 20 && (
              <span className="text-xs font-medium text-warning bg-warning-subtle px-2 py-0.5 rounded-full">
                Son {remaining} koltuk
              </span>
            )}
            {soldOut && (
              <span className="text-xs font-semibold text-error">Tükendi</span>
            )}
          </div>
        </div>

        {/* quantity picker */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={dec}
            disabled={quantity === 0}
            aria-label="Azalt"
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
              quantity === 0
                ? 'border-border text-text-disabled cursor-not-allowed'
                : 'border-border-strong text-text-primary hover:bg-surface-overlay',
            )}
          >
            −
          </button>
          <span
            className={cn(
              'w-6 text-center text-sm font-semibold tabular-nums',
              quantity > 0 ? 'text-primary' : 'text-text-disabled',
            )}
          >
            {quantity}
          </span>
          <button
            onClick={inc}
            disabled={soldOut || quantity >= max}
            aria-label="Artır"
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
              soldOut || quantity >= max
                ? 'border-border text-text-disabled cursor-not-allowed'
                : 'border-primary bg-primary text-primary-fg hover:bg-primary-hover',
            )}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
