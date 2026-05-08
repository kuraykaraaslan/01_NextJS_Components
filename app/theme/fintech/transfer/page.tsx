'use client';
import { useState } from 'react';
import { Button } from '@/modules/ui/Button';
import { Input } from '@/modules/ui/Input';
import { Select } from '@/modules/ui/Select';
import { Badge } from '@/modules/ui/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faArrowRightArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import { WALLETS } from '../fintech.data';

const WALLET_OPTIONS = WALLETS
  .filter((w) => w.status === 'ACTIVE')
  .map((w) => ({
    value: w.walletId,
    label: `${w.currency} Wallet (•••• ${w.walletId.slice(-4).toUpperCase()}) — ${w.currency}${w.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
  }));

const CURRENCY_OPTIONS = [
  { value: 'TRY', label: '₺ Turkish Lira (TRY)' },
  { value: 'USD', label: '$ US Dollar (USD)' },
  { value: 'EUR', label: '€ Euro (EUR)' },
  { value: 'GBP', label: '£ British Pound (GBP)' },
];

export default function TransferPage() {
  const [fromWallet, setFromWallet] = useState('');
  const [toWallet, setToWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('TRY');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center space-y-4">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-success-subtle">
          <FontAwesomeIcon icon={faPaperPlane} className="w-7 h-7 text-success-fg" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-text-primary">Transfer Submitted</h2>
        <p className="text-text-secondary text-sm">
          Your transfer request has been submitted and is being processed. You will receive a confirmation shortly.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
            New Transfer
          </Button>
          <Button as="a" href="/theme/fintech/transactions" variant="primary" size="sm">
            View Transactions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-10 space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Send Money</h1>
        <p className="text-text-secondary mt-1">
          Transfer funds between your wallets or to another account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-2xl border border-border bg-surface-raised p-6 space-y-5">
          <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wide">Transfer Details</h2>

          {/* From wallet */}
          <Select
            id="from-wallet"
            label="From Wallet"
            options={WALLET_OPTIONS}
            placeholder="Select source wallet"
            value={fromWallet}
            onChange={(e) => setFromWallet(e.target.value)}
            required
          />

          {/* Swap icon */}
          <div className="flex justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-sunken">
              <FontAwesomeIcon icon={faArrowRightArrowLeft} className="w-3.5 h-3.5 text-text-secondary rotate-90" aria-hidden="true" />
            </div>
          </div>

          {/* To wallet */}
          <Select
            id="to-wallet"
            label="To Wallet"
            options={WALLET_OPTIONS}
            placeholder="Select destination wallet"
            value={toWallet}
            onChange={(e) => setToWallet(e.target.value)}
            required
          />

          {/* Amount + currency row */}
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Input
                id="amount"
                label="Amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            <div className="w-36">
              <Select
                id="currency"
                label="Currency"
                options={CURRENCY_OPTIONS}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </div>
          </div>

          {/* Note */}
          <Input
            id="note"
            label="Note (optional)"
            placeholder="What is this transfer for?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Fee notice */}
        <div className="flex items-start gap-2 rounded-xl border border-border bg-surface-raised px-4 py-3">
          <Badge variant="info" size="sm" className="mt-0.5 flex-shrink-0">Fee</Badge>
          <p className="text-sm text-text-secondary">
            A transfer fee of <span className="font-semibold text-text-primary">₺2.50</span> will be charged for this transaction.
          </p>
        </div>

        {/* Security notice */}
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5 text-success-fg" aria-hidden="true" />
          <span>This transfer is protected by end-to-end encryption.</span>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          iconRight={<FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" aria-hidden="true" />}
        >
          Confirm Transfer
        </Button>

        <p className="text-center text-xs text-text-secondary">
          By confirming, you agree to our{' '}
          <a href="/theme/fintech" className="underline hover:text-text-primary">Transfer Terms</a>.
        </p>
      </form>
    </div>
  );
}
