'use client';
import { cn } from '@/libs/utils/cn';
import { PriceDisplay } from './PriceDisplay';
import type { OrderTotals } from '../MoneyTypes';

type OrderTotalsCardProps = {
  totals: OrderTotals;
  locale?: string;
  className?: string;
};

type LineItem = { label: string; amount: number; isDiscount?: boolean };

export function OrderTotalsCard({ totals, locale, className }: OrderTotalsCardProps) {
  const currency = totals.currency ?? 'TRY';

  const lines: LineItem[] = [
    { label: 'Subtotal',     amount: totals.subtotal },
    ...(totals.discountTotal && totals.discountTotal > 0 ? [{ label: 'Discount',    amount: -totals.discountTotal, isDiscount: true }] : []),
    ...(totals.taxTotal      && totals.taxTotal      > 0 ? [{ label: 'Tax',         amount: totals.taxTotal }] : []),
    ...(totals.serviceFee    && totals.serviceFee    > 0 ? [{ label: 'Service Fee', amount: totals.serviceFee }] : []),
    ...(totals.shippingTotal && totals.shippingTotal > 0 ? [{ label: 'Shipping',    amount: totals.shippingTotal }] : []),
  ];

  return (
    <div className={cn('rounded-lg border border-border bg-surface-raised p-4 space-y-2', className)}>
      {lines.map(({ label, amount, isDiscount }) => (
        <div key={label} className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">{label}</span>
          <PriceDisplay
            amount={Math.abs(amount)}
            currency={currency}
            locale={locale}
            className={cn(isDiscount && 'text-success-fg')}
          />
        </div>
      ))}

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-sm font-semibold text-text-primary">Total</span>
        <PriceDisplay amount={totals.total} currency={currency} locale={locale} size="lg" />
      </div>
    </div>
  );
}
