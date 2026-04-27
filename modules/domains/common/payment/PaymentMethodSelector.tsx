'use client';
import { cn } from '@/libs/utils/cn';
import type { PaymentMethod } from '../PaymentTypes';

const METHOD_META: Record<PaymentMethod, { label: string; icon: string; description: string }> = {
  CREDIT_CARD:   { label: 'Credit Card',    icon: '💳', description: 'Visa, Mastercard, Amex' },
  DEBIT_CARD:    { label: 'Debit Card',     icon: '🏦', description: 'Direct from your bank' },
  BANK_TRANSFER: { label: 'Bank Transfer',  icon: '🔁', description: 'EFT / Wire transfer'    },
  CASH:          { label: 'Cash',           icon: '💵', description: 'Pay on delivery'         },
  WALLET:        { label: 'Digital Wallet', icon: '📱', description: 'Apple Pay, Google Pay'   },
  CRYPTO:        { label: 'Crypto',         icon: '₿',  description: 'BTC, ETH, USDT'          },
};

type PaymentMethodSelectorProps = {
  value?: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  methods?: PaymentMethod[];
  disabled?: boolean;
  className?: string;
};

const DEFAULT_METHODS: PaymentMethod[] = ['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'WALLET'];

export function PaymentMethodSelector({
  value,
  onChange,
  methods = DEFAULT_METHODS,
  disabled = false,
  className,
}: PaymentMethodSelectorProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-2', className)} role="radiogroup" aria-label="Payment method">
      {methods.map((method) => {
        const meta     = METHOD_META[method];
        const selected = value === method;
        return (
          <button
            key={method}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(method)}
            className={cn(
              'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              selected
                ? 'border-primary bg-primary-subtle'
                : 'border-border bg-surface-raised hover:border-border-strong hover:bg-surface-overlay'
            )}
          >
            <span className="text-xl shrink-0" aria-hidden="true">{meta.icon}</span>
            <div className="min-w-0">
              <p className={cn('text-sm font-medium', selected ? 'text-primary' : 'text-text-primary')}>
                {meta.label}
              </p>
              <p className="text-xs text-text-secondary truncate">{meta.description}</p>
            </div>
            <span
              className={cn(
                'ml-auto shrink-0 w-4 h-4 rounded-full border-2 transition-colors',
                selected ? 'border-primary bg-primary' : 'border-border'
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
