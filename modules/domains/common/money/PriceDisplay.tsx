'use client';
import { cn } from '@/libs/utils/cn';

type PriceDisplayProps = {
  amount: number;
  currency?: string;
  locale?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  strikethrough?: boolean;
  className?: string;
};

const sizeMap: Record<NonNullable<PriceDisplayProps['size']>, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl font-semibold',
  xl: 'text-3xl font-bold',
};

export function PriceDisplay({
  amount,
  currency = 'TRY',
  locale = 'tr-TR',
  size = 'md',
  strikethrough = false,
  className,
}: PriceDisplayProps) {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <span
      className={cn(
        'tabular-nums',
        sizeMap[size],
        strikethrough && 'line-through text-text-secondary',
        className
      )}
    >
      {formatted}
    </span>
  );
}
