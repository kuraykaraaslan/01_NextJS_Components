'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faArrowRightArrowLeft,
  faCreditCard,
  faRotateLeft,
  faCoins,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { TransactionTypeBadge } from './TransactionTypeBadge';
import { TransactionStatusBadge } from './TransactionStatusBadge';
import type { Transaction, TransactionType } from '../types';

const CURRENCY_SYMBOLS: Record<string, string> = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
  GBP: '£',
  BTC: '₿',
  ETH: 'Ξ',
};

const TYPE_ICONS: Record<TransactionType, IconDefinition> = {
  DEPOSIT:  faArrowDown,
  WITHDRAW: faArrowUp,
  TRANSFER: faArrowRightArrowLeft,
  PAYMENT:  faCreditCard,
  REFUND:   faRotateLeft,
  FX:       faCoins,
  FEE:      faReceipt,
};

const TYPE_ICON_COLORS: Record<TransactionType, string> = {
  DEPOSIT:  'text-success bg-success-subtle',
  WITHDRAW: 'text-error bg-error-subtle',
  TRANSFER: 'text-info bg-info-subtle',
  PAYMENT:  'text-primary bg-primary-subtle',
  REFUND:   'text-warning bg-warning-subtle',
  FX:       'text-text-secondary bg-surface-sunken',
  FEE:      'text-text-secondary bg-surface-sunken',
};

const AMOUNT_POSITIVE_TYPES: TransactionType[] = ['DEPOSIT', 'REFUND'];

function formatAmount(amount: number, currency: string): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${symbol}${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date?: Date): string {
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

type TransactionRowProps = {
  transaction: Transaction;
  className?: string;
};

export function TransactionRow({ transaction, className }: TransactionRowProps) {
  const icon = TYPE_ICONS[transaction.type] ?? faReceipt;
  const iconColors = TYPE_ICON_COLORS[transaction.type] ?? 'text-text-secondary bg-surface-sunken';
  const isPositive = AMOUNT_POSITIVE_TYPES.includes(transaction.type);
  const description = transaction.description ?? transaction.reference ?? `${transaction.type} transaction`;

  return (
    <div
      className={cn(
        'flex items-center gap-3 py-3 px-4 rounded-xl border border-border bg-surface-raised',
        'hover:shadow-sm hover:border-border-strong transition-all duration-150',
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
          iconColors
        )}
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
      </div>

      {/* Description + date */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-text-primary truncate">{description}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <TransactionTypeBadge type={transaction.type} size="sm" />
          <span className="text-xs text-text-secondary">{formatDate(transaction.createdAt)}</span>
        </div>
      </div>

      {/* Amount + status */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span
          className={cn(
            'text-sm font-semibold',
            isPositive ? 'text-success-fg' : 'text-error'
          )}
        >
          {isPositive ? '+' : '-'}{formatAmount(transaction.amount, transaction.currency)}
        </span>
        <TransactionStatusBadge status={transaction.status} size="sm" />
      </div>
    </div>
  );
}
