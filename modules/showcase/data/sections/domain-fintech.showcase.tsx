'use client';
import type { ShowcaseComponent } from '../showcase.types';
import { WalletStatusBadge } from '@/modules/domains/fintech/wallet/WalletStatusBadge';
import { CurrencyBadge } from '@/modules/domains/fintech/wallet/CurrencyBadge';
import { WalletCard } from '@/modules/domains/fintech/wallet/WalletCard';
import { TransactionTypeBadge } from '@/modules/domains/fintech/transaction/TransactionTypeBadge';
import { TransactionStatusBadge } from '@/modules/domains/fintech/transaction/TransactionStatusBadge';
import { TransactionRow } from '@/modules/domains/fintech/transaction/TransactionRow';
import type { Wallet, Transaction } from '@/modules/domains/fintech/types';

/* ─── demo data ─── */

const DEMO_WALLET_PRIMARY: Wallet = {
  walletId: 'wallet-demo-001',
  userId: 'user-demo',
  type: 'USER',
  status: 'ACTIVE',
  currency: 'TRY',
  balance: 24_850.75,
  availableBalance: 22_350.75,
  lockedBalance: 2_500.00,
  createdAt: new Date('2024-01-15'),
};

const DEMO_WALLET_USD: Wallet = {
  walletId: 'wallet-demo-002',
  userId: 'user-demo',
  type: 'USER',
  status: 'ACTIVE',
  currency: 'USD',
  balance: 3_420.00,
  availableBalance: 3_420.00,
  lockedBalance: 0,
  createdAt: new Date('2024-03-20'),
};

const DEMO_WALLET_FROZEN: Wallet = {
  walletId: 'wallet-demo-003',
  userId: 'user-demo',
  type: 'USER',
  status: 'FROZEN',
  currency: 'EUR',
  balance: 1_200.00,
  availableBalance: 0,
  lockedBalance: 1_200.00,
  createdAt: new Date('2024-06-10'),
};

const DEMO_TRANSACTION_DEPOSIT: Transaction = {
  transactionId: 'txn-demo-001',
  walletId: 'wallet-demo-001',
  type: 'DEPOSIT',
  status: 'COMPLETED',
  amount: 5_000.00,
  currency: 'TRY',
  fee: 0,
  description: 'Salary deposit from Acme Corp',
  createdAt: new Date('2026-05-01T09:15:00Z'),
  completedAt: new Date('2026-05-01T09:15:30Z'),
};

const DEMO_TRANSACTION_PAYMENT: Transaction = {
  transactionId: 'txn-demo-002',
  walletId: 'wallet-demo-001',
  type: 'PAYMENT',
  status: 'PENDING',
  amount: 349.99,
  currency: 'TRY',
  fee: 0,
  description: 'Netflix subscription',
  createdAt: new Date('2026-05-02T14:30:00Z'),
};

const DEMO_TRANSACTION_FAILED: Transaction = {
  transactionId: 'txn-demo-003',
  walletId: 'wallet-demo-001',
  type: 'TRANSFER',
  status: 'FAILED',
  amount: 1_000.00,
  currency: 'TRY',
  fee: 5.00,
  description: 'Transfer to savings',
  createdAt: new Date('2026-05-03T11:00:00Z'),
};

/* ─── builder ─── */

export function buildFintechDomainData(): ShowcaseComponent[] {
  return [
    {
      id: 'fintech-wallet-status-badge',
      title: 'WalletStatusBadge',
      category: 'Domain',
      abbr: 'WS',
      description: 'Displays wallet status with semantic colour coding: ACTIVE, FROZEN, CLOSED.',
      filePath: 'modules/domains/fintech/wallet/WalletStatusBadge.tsx',
      sourceCode: `import { WalletStatusBadge } from '@/modules/domains/fintech/wallet/WalletStatusBadge';
<WalletStatusBadge status="ACTIVE" />`,
      variants: [
        {
          title: 'All statuses',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['ACTIVE', 'FROZEN', 'CLOSED'] as const).map((s) => (
                <WalletStatusBadge key={s} status={s} />
              ))}
            </div>
          ),
          code: `{(['ACTIVE', 'FROZEN', 'CLOSED'] as const).map((s) => (
  <WalletStatusBadge key={s} status={s} />
))}`,
        },
        {
          title: 'Sizes',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              <WalletStatusBadge status="ACTIVE" size="sm" />
              <WalletStatusBadge status="ACTIVE" size="md" />
            </div>
          ),
          code: `<WalletStatusBadge status="ACTIVE" size="sm" />
<WalletStatusBadge status="ACTIVE" size="md" />`,
        },
      ],
    },
    {
      id: 'fintech-currency-badge',
      title: 'CurrencyBadge',
      category: 'Domain',
      abbr: 'CB',
      description: 'Currency code badge with distinct colour per currency: TRY, USD, EUR, GBP, BTC, ETH.',
      filePath: 'modules/domains/fintech/wallet/CurrencyBadge.tsx',
      sourceCode: `import { CurrencyBadge } from '@/modules/domains/fintech/wallet/CurrencyBadge';
<CurrencyBadge currency="USD" />`,
      variants: [
        {
          title: 'All currencies',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['TRY', 'USD', 'EUR', 'GBP', 'BTC', 'ETH'] as const).map((c) => (
                <CurrencyBadge key={c} currency={c} />
              ))}
            </div>
          ),
          code: `{(['TRY', 'USD', 'EUR', 'GBP', 'BTC', 'ETH'] as const).map((c) => (
  <CurrencyBadge key={c} currency={c} />
))}`,
        },
        {
          title: 'Small size',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['TRY', 'USD', 'EUR'] as const).map((c) => (
                <CurrencyBadge key={c} currency={c} size="sm" />
              ))}
            </div>
          ),
          code: `<CurrencyBadge currency="TRY" size="sm" />
<CurrencyBadge currency="USD" size="sm" />
<CurrencyBadge currency="EUR" size="sm" />`,
        },
      ],
    },
    {
      id: 'fintech-transaction-type-badge',
      title: 'TransactionTypeBadge',
      category: 'Domain',
      abbr: 'TT',
      description: 'Colour-coded badge for transaction type: DEPOSIT, WITHDRAW, TRANSFER, PAYMENT, REFUND, FX, FEE.',
      filePath: 'modules/domains/fintech/transaction/TransactionTypeBadge.tsx',
      sourceCode: `import { TransactionTypeBadge } from '@/modules/domains/fintech/transaction/TransactionTypeBadge';
<TransactionTypeBadge type="DEPOSIT" />`,
      variants: [
        {
          title: 'All types',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['DEPOSIT', 'WITHDRAW', 'TRANSFER', 'PAYMENT', 'REFUND', 'FX', 'FEE'] as const).map((t) => (
                <TransactionTypeBadge key={t} type={t} />
              ))}
            </div>
          ),
          code: `{(['DEPOSIT', 'WITHDRAW', 'TRANSFER', 'PAYMENT', 'REFUND', 'FX', 'FEE'] as const).map((t) => (
  <TransactionTypeBadge key={t} type={t} />
))}`,
        },
        {
          title: 'Small size',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['DEPOSIT', 'PAYMENT', 'REFUND'] as const).map((t) => (
                <TransactionTypeBadge key={t} type={t} size="sm" />
              ))}
            </div>
          ),
          code: `<TransactionTypeBadge type="DEPOSIT" size="sm" />
<TransactionTypeBadge type="PAYMENT" size="sm" />
<TransactionTypeBadge type="REFUND" size="sm" />`,
        },
      ],
    },
    {
      id: 'fintech-transaction-status-badge',
      title: 'TransactionStatusBadge',
      category: 'Domain',
      abbr: 'TS',
      description: 'Status badge tracking a transaction lifecycle: PENDING, COMPLETED, FAILED, CANCELLED.',
      filePath: 'modules/domains/fintech/transaction/TransactionStatusBadge.tsx',
      sourceCode: `import { TransactionStatusBadge } from '@/modules/domains/fintech/transaction/TransactionStatusBadge';
<TransactionStatusBadge status="COMPLETED" />`,
      variants: [
        {
          title: 'All statuses',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'] as const).map((s) => (
                <TransactionStatusBadge key={s} status={s} />
              ))}
            </div>
          ),
          code: `{(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'] as const).map((s) => (
  <TransactionStatusBadge key={s} status={s} />
))}`,
        },
        {
          title: 'Small size',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              <TransactionStatusBadge status="COMPLETED" size="sm" />
              <TransactionStatusBadge status="PENDING" size="sm" />
              <TransactionStatusBadge status="FAILED" size="sm" />
            </div>
          ),
          code: `<TransactionStatusBadge status="COMPLETED" size="sm" />
<TransactionStatusBadge status="PENDING" size="sm" />
<TransactionStatusBadge status="FAILED" size="sm" />`,
        },
      ],
    },
    {
      id: 'fintech-wallet-card',
      title: 'WalletCard',
      category: 'Domain',
      abbr: 'WC',
      description: 'Wallet card displaying balance, currency, status, and account reference with a premium gradient look.',
      filePath: 'modules/domains/fintech/wallet/WalletCard.tsx',
      sourceCode: `import { WalletCard } from '@/modules/domains/fintech/wallet/WalletCard';
<WalletCard wallet={wallet} />`,
      variants: [
        {
          title: 'Active primary (TRY)',
          preview: (
            <div className="max-w-sm w-full">
              <WalletCard wallet={DEMO_WALLET_PRIMARY} />
            </div>
          ),
          code: `<WalletCard wallet={wallet} />`,
        },
        {
          title: 'Frozen wallet (EUR)',
          preview: (
            <div className="max-w-sm w-full">
              <WalletCard wallet={DEMO_WALLET_FROZEN} />
            </div>
          ),
          code: `<WalletCard wallet={{ ...wallet, status: 'FROZEN' }} />`,
        },
        {
          title: 'USD wallet',
          preview: (
            <div className="max-w-sm w-full">
              <WalletCard wallet={DEMO_WALLET_USD} />
            </div>
          ),
          code: `<WalletCard wallet={usdWallet} />`,
        },
      ],
    },
    {
      id: 'fintech-transaction-row',
      title: 'TransactionRow',
      category: 'Domain',
      abbr: 'TR',
      description: 'Transaction list row with icon, description, date, amount (coloured by direction), and status badge.',
      filePath: 'modules/domains/fintech/transaction/TransactionRow.tsx',
      sourceCode: `import { TransactionRow } from '@/modules/domains/fintech/transaction/TransactionRow';
<TransactionRow transaction={transaction} />`,
      variants: [
        {
          title: 'Completed deposit',
          layout: 'stack',
          preview: (
            <div className="w-full max-w-lg">
              <TransactionRow transaction={DEMO_TRANSACTION_DEPOSIT} />
            </div>
          ),
          code: `<TransactionRow transaction={depositTransaction} />`,
        },
        {
          title: 'Mixed statuses',
          layout: 'stack',
          preview: (
            <div className="w-full max-w-lg flex flex-col gap-2">
              <TransactionRow transaction={DEMO_TRANSACTION_DEPOSIT} />
              <TransactionRow transaction={DEMO_TRANSACTION_PAYMENT} />
              <TransactionRow transaction={DEMO_TRANSACTION_FAILED} />
            </div>
          ),
          code: `<TransactionRow transaction={depositTx} />
<TransactionRow transaction={paymentTx} />
<TransactionRow transaction={failedTx} />`,
        },
      ],
    },
  ];
}
