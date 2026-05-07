'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/modules/ui/Button';
import { PaymentSummaryCard } from './PaymentSummaryCard';
import { AddressCard } from '@/modules/domains/common/address/AddressCard';
import type { PaymentBase } from '@/modules/domains/common/PaymentTypes';
import type { Address } from '@/modules/domains/common/AddressTypes';

type CheckoutSuccessStateProps = {
  payment: PaymentBase;
  address?: Address;
  onReset?: () => void;
  locale?: string;
};

export function CheckoutSuccessState({
  payment,
  address,
  onReset,
  locale = 'tr-TR',
}: CheckoutSuccessStateProps) {
  const fmt = new Intl.NumberFormat(locale, { style: 'currency', currency: payment.currency });

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center max-w-md mx-auto">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-success-subtle">
        <FontAwesomeIcon icon={faCheck} className="w-10 h-10 text-success" aria-hidden="true" />
      </span>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-text-primary">Payment successful!</h2>
        <p className="text-text-secondary">
          {fmt.format(payment.amount)} was charged. A receipt has been sent to your email.
        </p>
      </div>

      <div className="w-full space-y-4 text-left">
        <PaymentSummaryCard payment={payment} />

        {address && (
          <div className="rounded-xl border border-border bg-surface-raised p-4 space-y-2">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Delivering to</p>
            <AddressCard address={address} />
          </div>
        )}
      </div>

      {onReset && (
        <Button variant="outline" onClick={onReset}>
          Start over
        </Button>
      )}
    </div>
  );
}
