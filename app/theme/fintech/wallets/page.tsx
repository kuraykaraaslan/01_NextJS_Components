import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { WalletCard } from '@/modules/domains/fintech/wallet/WalletCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faWallet } from '@fortawesome/free-solid-svg-icons';
import { WALLETS } from '../fintech.data';

const CURRENCY_SYMBOLS: Record<string, string> = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
  GBP: '£',
  BTC: '₿',
  ETH: 'Ξ',
};

export default function WalletsPage() {
  const totalWallets = WALLETS.length;
  const activeWallets = WALLETS.filter((w) => w.status === 'ACTIVE').length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Wallets</h1>
          <p className="text-text-secondary mt-1">
            Manage your digital wallets and balances.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          iconLeft={<FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" aria-hidden="true" />}
        >
          Add Wallet
        </Button>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-border bg-surface-raised">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-subtle">
          <FontAwesomeIcon icon={faWallet} className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-primary">{totalWallets} wallets total</p>
          <p className="text-xs text-text-secondary">{activeWallets} active</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {WALLETS.map((wallet) => (
            <span key={wallet.walletId} className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-text-primary">
                {CURRENCY_SYMBOLS[wallet.currency] ?? wallet.currency}
                {wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-text-secondary">{wallet.currency}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Wallet grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WALLETS.map((wallet) => (
          <WalletCard key={wallet.walletId} wallet={wallet} />
        ))}

        {/* Add wallet placeholder */}
        <div className="rounded-2xl border border-dashed border-border-strong bg-surface-raised flex flex-col items-center justify-center gap-3 p-8 text-center min-h-[200px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-sunken">
            <FontAwesomeIcon icon={faPlus} className="w-5 h-5 text-text-secondary" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">Add New Wallet</p>
            <p className="text-xs text-text-secondary mt-0.5">TRY, USD, EUR, GBP, BTC, ETH</p>
          </div>
          <Button variant="outline" size="sm">
            Open Wallet
          </Button>
        </div>
      </div>

      {/* Info banner */}
      <div className="rounded-xl border border-border bg-info-subtle p-4 flex items-start gap-3">
        <Badge variant="info" size="sm" className="mt-0.5 flex-shrink-0">Info</Badge>
        <p className="text-sm text-text-primary">
          Frozen wallets cannot send or receive funds. Contact support to unfreeze your wallet.
        </p>
      </div>
    </div>
  );
}
