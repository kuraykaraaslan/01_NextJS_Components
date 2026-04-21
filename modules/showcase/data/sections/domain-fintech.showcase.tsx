'use client';
import { AccountBalanceCard } from '@/modules/domain/fintech/AccountBalanceCard';
import { TransactionLedgerTable } from '@/modules/domain/fintech/TransactionLedgerTable';
import { TransferForm } from '@/modules/domain/fintech/TransferForm';
import { BeneficiaryPicker } from '@/modules/domain/fintech/BeneficiaryPicker';
import { SpendingCategoryChartPanel } from '@/modules/domain/fintech/SpendingCategoryChartPanel';
import { useState } from 'react';
import type { ShowcaseComponent } from '../showcase.types';

export function buildFintechData(): ShowcaseComponent[] {
  return [
    {
      id: 'ft-balance-card',
      title: 'AccountBalanceCard',
      category: 'Domain' as const,
      abbr: 'Ab',
      description: 'Bank account card with masked number, balance, 30-day change indicator, and health score bar.',
      filePath: 'modules/domain/fintech/AccountBalanceCard.tsx',
      sourceCode: `import { AccountBalanceCard } from '@/modules/domain/fintech/AccountBalanceCard';\n\n<AccountBalanceCard\n  accountName="Main Checking"\n  accountNumber="4242424242424242"\n  balance={12450.00}\n  type="checking"\n  change={+340.50}\n/>`,
      variants: [
        {
          title: 'Checking account card',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <AccountBalanceCard
                accountName="Main Checking"
                accountNumber="4242424242424242"
                balance={12450.00}
                type="checking"
                change={340.50}
              />
            </div>
          ),
          code: `<AccountBalanceCard\n  accountName="Main Checking"\n  accountNumber="4242424242424242"\n  balance={12450.00}\n  type="checking"\n  change={340.50}\n  changeLabel="30d change"\n/>`,
        },
      ],
    },

    {
      id: 'ft-ledger',
      title: 'TransactionLedgerTable',
      category: 'Domain' as const,
      abbr: 'Tl',
      description: 'Searchable, paginated transaction table with colored amounts, status badges, and category labels.',
      filePath: 'modules/domain/fintech/TransactionLedgerTable.tsx',
      sourceCode: `import { TransactionLedgerTable } from '@/modules/domain/fintech/TransactionLedgerTable';\n\n<TransactionLedgerTable transactions={transactions} />`,
      variants: [
        {
          title: 'Transaction ledger',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <TransactionLedgerTable transactions={[
                { id: '1', date: '2026-04-20', description: 'Salary deposit', category: 'Income', amount: 4500, status: 'completed', reference: 'SAL-0420' },
                { id: '2', date: '2026-04-19', description: 'Netflix subscription', category: 'Entertainment', amount: -15.99, status: 'completed' },
                { id: '3', date: '2026-04-18', description: 'Grocery store', category: 'Food', amount: -89.50, status: 'completed' },
                { id: '4', date: '2026-04-17', description: 'Refund – Online order', category: 'Shopping', amount: 49.99, status: 'refunded' },
                { id: '5', date: '2026-04-16', description: 'Electric bill', category: 'Utilities', amount: -120.00, status: 'pending' },
              ]} />
            </div>
          ),
          code: `<TransactionLedgerTable\n  transactions={[\n    { id: '1', date: '2026-04-20', description: 'Salary', category: 'Income', amount: 4500, status: 'completed' },\n    { id: '2', date: '2026-04-19', description: 'Netflix', category: 'Entertainment', amount: -15.99, status: 'completed' },\n  ]}\n/>`,
        },
      ],
    },

    {
      id: 'ft-transfer-form',
      title: 'TransferForm',
      category: 'Domain' as const,
      abbr: 'Tf',
      description: 'Bank transfer form with beneficiary ComboBox, amount, multi-currency select, reference note, and balance guard.',
      filePath: 'modules/domain/fintech/TransferForm.tsx',
      sourceCode: `import { TransferForm } from '@/modules/domain/fintech/TransferForm';\n\n<TransferForm\n  beneficiaryOptions={[{value:'b1',label:'Alice – ••4242'},{value:'b2',label:'Bob – ••8888'}]}\n  availableBalance={5000}\n  onSubmit={async (data) => { /* send transfer */ }}\n/>`,
      variants: [
        {
          title: 'Transfer form',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-md">
              <TransferForm
                beneficiaryOptions={[{ value: 'b1', label: 'Alice Johnson – ••4242' }, { value: 'b2', label: 'Bob Smith – ••8888' }]}
                availableBalance={5000}
              />
            </div>
          ),
          code: `<TransferForm\n  beneficiaryOptions={[{value:'b1',label:'Alice – ••4242'}]}\n  availableBalance={5000}\n  onSubmit={async ({ beneficiary, amount, currency, note }) => {\n    await api.transfer({ beneficiary, amount, currency, note });\n  }}\n/>`,
        },
      ],
    },

    {
      id: 'ft-beneficiary',
      title: 'BeneficiaryPicker',
      category: 'Domain' as const,
      abbr: 'Bp',
      description: 'Searchable beneficiary selector with account card preview, trusted badge, and edit/delete dropdown.',
      filePath: 'modules/domain/fintech/BeneficiaryPicker.tsx',
      sourceCode: `import { BeneficiaryPicker } from '@/modules/domain/fintech/BeneficiaryPicker';\n\n<BeneficiaryPicker\n  beneficiaries={beneficiaries}\n  selectedId={selectedId}\n  onSelect={setSelectedId}\n  onAdd={() => setAddModalOpen(true)}\n/>`,
      variants: [
        {
          title: 'Beneficiary picker',
          layout: 'stack' as const,
          preview: (() => {
            function Demo() {
              const [sel, setSel] = useState('b1');
              return (
                <div className="w-full max-w-sm">
                  <BeneficiaryPicker
                    beneficiaries={[
                      { id: 'b1', name: 'Alice Johnson', accountMask: '•••• 4242', bank: 'First National Bank', trusted: true },
                      { id: 'b2', name: 'Bob Smith', accountMask: '•••• 8888', bank: 'City Bank' },
                    ]}
                    selectedId={sel}
                    onSelect={setSel}
                    onAdd={() => {}}
                  />
                </div>
              );
            }
            return <Demo />;
          })(),
          code: `<BeneficiaryPicker\n  beneficiaries={[\n    { id: 'b1', name: 'Alice Johnson', accountMask: '•••• 4242', trusted: true },\n    { id: 'b2', name: 'Bob Smith', accountMask: '•••• 8888' },\n  ]}\n  selectedId={selectedId}\n  onSelect={setSelectedId}\n  onAdd={openAddModal}\n/>`,
        },
      ],
    },

    {
      id: 'ft-spending-chart',
      title: 'SpendingCategoryChartPanel',
      category: 'Domain' as const,
      abbr: 'Sc',
      description: 'Spending breakdown by category with period tabs, color-coded horizontal bars, and custom date range.',
      filePath: 'modules/domain/fintech/SpendingCategoryChartPanel.tsx',
      sourceCode: `import { SpendingCategoryChartPanel } from '@/modules/domain/fintech/SpendingCategoryChartPanel';\n\n<SpendingCategoryChartPanel periods={periods} currency="USD" />`,
      variants: [
        {
          title: 'Spending chart panel',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <SpendingCategoryChartPanel
                periods={[
                  { id: 'this-month', label: 'This month', categories: [
                    { name: 'Housing', amount: 1200, color: '#6366f1', icon: '🏠' },
                    { name: 'Food', amount: 450, color: '#f59e0b', icon: '🍔' },
                    { name: 'Transport', amount: 180, color: '#10b981', icon: '🚗' },
                    { name: 'Entertainment', amount: 120, color: '#ec4899', icon: '🎬' },
                  ]},
                  { id: 'last-month', label: 'Last month', categories: [
                    { name: 'Housing', amount: 1200, color: '#6366f1', icon: '🏠' },
                    { name: 'Food', amount: 390, color: '#f59e0b', icon: '🍔' },
                    { name: 'Transport', amount: 210, color: '#10b981', icon: '🚗' },
                  ]},
                ]}
              />
            </div>
          ),
          code: `<SpendingCategoryChartPanel\n  periods={[\n    { id: 'this-month', label: 'This month', categories: [\n      { name: 'Housing', amount: 1200, color: '#6366f1', icon: '🏠' },\n      { name: 'Food', amount: 450, color: '#f59e0b', icon: '🍔' },\n    ]},\n  ]}\n  currency="USD"\n/>`,
        },
      ],
    },
  ];
}
