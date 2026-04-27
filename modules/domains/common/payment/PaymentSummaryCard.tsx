'use client';
import { cn } from '@/libs/utils/cn';
import { PriceDisplay } from '../money/PriceDisplay';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import type { PaymentBase } from '../PaymentTypes';

type PaymentSummaryCardProps = {
  payment: PaymentBase;
  className?: string;
};

const METHOD_LABELS: Record<string, string> = {
  CREDIT_CARD:   'Credit Card',
  DEBIT_CARD:    'Debit Card',
  BANK_TRANSFER: 'Bank Transfer',
  CASH:          'Cash',
  WALLET:        'Digital Wallet',
  CRYPTO:        'Crypto',
};

export function PaymentSummaryCard({ payment, className }: PaymentSummaryCardProps) {
  return (
    <div className={cn('bg-surface-raised border border-border rounded-xl overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-overlay">
        <span className="text-sm font-semibold text-text-primary">Payment</span>
        <PaymentStatusBadge status={payment.status} size="sm" dot />
      </div>

      <div className="px-4 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Amount</span>
          <PriceDisplay amount={payment.amount} currency={payment.currency} size="lg" />
        </div>

        {payment.method && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Method</span>
            <span className="text-sm font-medium text-text-primary">
              {METHOD_LABELS[payment.method] ?? payment.method}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Provider</span>
          <span className="text-sm font-medium text-text-primary">{payment.provider}</span>
        </div>

        {payment.providerPaymentId && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-text-secondary shrink-0">Ref</span>
            <span className="text-xs font-mono text-text-secondary truncate text-right">
              {payment.providerPaymentId}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
