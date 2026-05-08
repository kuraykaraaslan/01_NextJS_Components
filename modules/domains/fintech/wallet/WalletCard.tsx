'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faSnowflake, faLock } from '@fortawesome/free-solid-svg-icons';
import { WalletStatusBadge } from './WalletStatusBadge';
import { CurrencyBadge } from './CurrencyBadge';
import type { Wallet } from '../types';

const CURRENCY_SYMBOLS: Record<string, string> = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
  GBP: '£',
  BTC: '₿',
  ETH: 'Ξ',
};

const WALLET_TYPE_LABELS: Record<string, string> = {
  USER: 'Personal',
  SYSTEM: 'System',
  MERCHANT: 'Merchant',
};

function formatAmount(amount: number, currency: string): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function maskWalletId(id: string): string {
  if (id.length <= 4) return id;
  return `•••• ${id.slice(-4).toUpperCase()}`;
}

type WalletCardProps = {
  wallet: Wallet;
  className?: string;
};

export function WalletCard({ wallet, className }: WalletCardProps) {
  const isPrimary = wallet.type === 'USER';
  const symbol = CURRENCY_SYMBOLS[wallet.currency] ?? wallet.currency;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 flex flex-col gap-4',
        isPrimary
          ? 'bg-primary text-primary-fg'
          : 'bg-surface-raised border border-border text-text-primary',
        className
      )}
    >
      {/* Background decoration */}
      <div
        className={cn(
          'absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-10',
          isPrimary ? 'bg-primary-fg' : 'bg-primary'
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          'absolute -bottom-6 -right-4 h-20 w-20 rounded-full opacity-5',
          isPrimary ? 'bg-primary-fg' : 'bg-secondary'
        )}
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="relative flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-xl',
              isPrimary ? 'bg-primary-fg/15' : 'bg-primary-subtle'
            )}
          >
            <FontAwesomeIcon
              icon={wallet.status === 'FROZEN' ? faSnowflake : wallet.status === 'CLOSED' ? faLock : faWallet}
              className={cn('w-4 h-4', isPrimary ? 'text-primary-fg' : 'text-primary')}
              aria-hidden="true"
            />
          </div>
          <div>
            <p className={cn('text-xs font-medium', isPrimary ? 'text-primary-fg/70' : 'text-text-secondary')}>
              {WALLET_TYPE_LABELS[wallet.type] ?? wallet.type} Wallet
            </p>
            <p className={cn('text-xs font-mono', isPrimary ? 'text-primary-fg/50' : 'text-text-disabled')}>
              {maskWalletId(wallet.walletId)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <CurrencyBadge currency={wallet.currency} size="sm" />
          <WalletStatusBadge status={wallet.status} size="sm" />
        </div>
      </div>

      {/* Balance */}
      <div className="relative">
        <p className={cn('text-xs font-medium mb-0.5', isPrimary ? 'text-primary-fg/70' : 'text-text-secondary')}>
          Available Balance
        </p>
        <p className={cn('text-3xl font-bold tracking-tight', isPrimary ? 'text-primary-fg' : 'text-text-primary')}>
          {formatAmount(wallet.availableBalance, wallet.currency)}
        </p>
        {wallet.lockedBalance > 0 && (
          <p className={cn('text-xs mt-1', isPrimary ? 'text-primary-fg/60' : 'text-text-secondary')}>
            {symbol}{wallet.lockedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} locked
          </p>
        )}
      </div>

      {/* Footer: total balance */}
      <div
        className={cn(
          'relative border-t pt-3 flex items-center justify-between',
          isPrimary ? 'border-primary-fg/20' : 'border-border'
        )}
      >
        <span className={cn('text-xs', isPrimary ? 'text-primary-fg/70' : 'text-text-secondary')}>
          Total Balance
        </span>
        <span className={cn('text-sm font-semibold', isPrimary ? 'text-primary-fg' : 'text-text-primary')}>
          {formatAmount(wallet.balance, wallet.currency)}
        </span>
      </div>
    </div>
  );
}
