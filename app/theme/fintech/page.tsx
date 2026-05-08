import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { WalletCard } from '@/modules/domains/fintech/wallet/WalletCard';
import { TransactionRow } from '@/modules/domains/fintech/transaction/TransactionRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faArrowDown,
  faCoins,
  faCreditCard,
  faArrowRight,
  faShieldHalved,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { WALLETS, TRANSACTIONS } from './fintech.data';

const QUICK_ACTIONS = [
  { label: 'Send',     icon: faPaperPlane, variant: 'primary' as const,  href: '/theme/fintech/transfer' },
  { label: 'Receive',  icon: faArrowDown,  variant: 'outline' as const,   href: '/theme/fintech/wallets' },
  { label: 'Exchange', icon: faCoins,      variant: 'outline' as const,   href: '/theme/fintech/transfer' },
  { label: 'Pay',      icon: faCreditCard, variant: 'outline' as const,   href: '/theme/fintech/transfer' },
];

function computeStats(transactions: typeof TRANSACTIONS) {
  const completed = transactions.filter((t) => t.status === 'COMPLETED');
  const totalIn = completed
    .filter((t) => t.type === 'DEPOSIT' || t.type === 'REFUND')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalOut = completed
    .filter((t) => t.type === 'WITHDRAW' || t.type === 'PAYMENT' || t.type === 'TRANSFER')
    .reduce((acc, t) => acc + t.amount, 0);

  const now = new Date();
  const thisMonth = completed.filter((t) => {
    const d = t.createdAt;
    return d && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const thisMonthNet = thisMonth.reduce((acc, t) => {
    if (t.type === 'DEPOSIT' || t.type === 'REFUND') return acc + t.amount;
    if (t.type === 'WITHDRAW' || t.type === 'PAYMENT' || t.type === 'TRANSFER') return acc - t.amount;
    return acc;
  }, 0);

  return { totalIn, totalOut, thisMonthNet };
}

export default function FintechDashboardPage() {
  const recentTransactions = TRANSACTIONS.slice(0, 5);
  const stats = computeStats(TRANSACTIONS);

  return (
    <div className="bg-surface-base text-text-primary">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface-raised">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_-10%,_var(--primary-subtle),_transparent_70%)]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <Badge variant="success" dot size="sm">All systems operational</Badge>
              <h1 className="text-3xl font-bold text-text-primary">Good morning, Alex</h1>
              <p className="text-text-secondary">Here is a summary of your financial activity.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <Button
                  key={action.label}
                  as="a"
                  href={action.href}
                  variant={action.variant}
                  size="sm"
                  iconLeft={<FontAwesomeIcon icon={action.icon} className="w-3.5 h-3.5" aria-hidden="true" />}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">

        {/* Stats strip */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-surface-raised p-5">
            <p className="text-xs text-text-secondary mb-1">Total Money In</p>
            <p className="text-2xl font-bold text-success-fg">
              +₺{stats.totalIn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-text-secondary mt-1">All time · completed</p>
          </div>
          <div className="rounded-xl border border-border bg-surface-raised p-5">
            <p className="text-xs text-text-secondary mb-1">Total Money Out</p>
            <p className="text-2xl font-bold text-error">
              -₺{stats.totalOut.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-text-secondary mt-1">All time · completed</p>
          </div>
          <div className="rounded-xl border border-border bg-surface-raised p-5">
            <p className="text-xs text-text-secondary mb-1">Net This Month</p>
            <p className={`text-2xl font-bold ${stats.thisMonthNet >= 0 ? 'text-success-fg' : 'text-error'}`}>
              {stats.thisMonthNet >= 0 ? '+' : ''}₺{Math.abs(stats.thisMonthNet).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-text-secondary mt-1">May 2026</p>
          </div>
        </section>

        {/* Wallets */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">My Wallets</h2>
            <a href="/theme/fintech/wallets" className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
              View all <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WALLETS.map((wallet) => (
              <WalletCard key={wallet.walletId} wallet={wallet} />
            ))}
          </div>
        </section>

        {/* Recent transactions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Recent Transactions</h2>
            <a href="/theme/fintech/transactions" className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
              View all <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="flex flex-col gap-2">
            {recentTransactions.map((tx) => (
              <TransactionRow key={tx.transactionId} transaction={tx} />
            ))}
          </div>
        </section>

        {/* Security CTA */}
        <section className="rounded-2xl border border-border bg-surface-raised p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-subtle flex-shrink-0">
            <FontAwesomeIcon icon={faShieldHalved} className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary">Enable Two-Factor Authentication</h3>
            <p className="text-sm text-text-secondary mt-0.5">
              Add an extra layer of security to protect your account and transactions.
            </p>
          </div>
          <Button variant="primary" size="sm" iconLeft={<FontAwesomeIcon icon={faBolt} className="w-3.5 h-3.5" aria-hidden="true" />}>
            Enable 2FA
          </Button>
        </section>

      </div>
    </div>
  );
}
