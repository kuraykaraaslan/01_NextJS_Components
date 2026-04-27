'use client';
import { cn } from '@/libs/utils/cn';
import type { DiscountType } from '../DiscountTypes';

type DiscountBadgeProps = {
  discountType: DiscountType;
  discountValue: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeMap = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2 py-0.5',
  lg: 'text-base px-2.5 py-1',
};

export function DiscountBadge({ discountType, discountValue, currency = 'TRY', size = 'md', className }: DiscountBadgeProps) {
  let label: string;
  if (discountType === 'PERCENTAGE') {
    label = `${discountValue}% off`;
  } else if (discountType === 'FIXED') {
    const formatted = new Intl.NumberFormat('tr-TR', { style: 'currency', currency, maximumFractionDigits: 0 }).format(discountValue);
    label = `${formatted} off`;
  } else {
    label = 'Free shipping';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full',
        'bg-error-subtle text-error border border-error/30',
        sizeMap[size],
        className
      )}
    >
      {label}
    </span>
  );
}
