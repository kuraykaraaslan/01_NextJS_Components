'use client';
import { Badge } from '@/modules/ui/Badge';
import type { Currency } from '../types';

const currencyMeta: Record<Currency, { label: string; variant: 'info' | 'success' | 'primary' | 'neutral' | 'warning' | 'error' }> = {
  TRY: { label: 'TRY', variant: 'info' },
  USD: { label: 'USD', variant: 'success' },
  EUR: { label: 'EUR', variant: 'primary' },
  GBP: { label: 'GBP', variant: 'neutral' },
  BTC: { label: 'BTC', variant: 'warning' },
  ETH: { label: 'ETH', variant: 'neutral' },
};

type CurrencyBadgeProps = { currency: Currency; size?: 'sm' | 'md'; className?: string };

export function CurrencyBadge({ currency, size = 'md', className }: CurrencyBadgeProps) {
  const meta = currencyMeta[currency] ?? { label: currency, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} className={className}>
      {meta.label}
    </Badge>
  );
}
