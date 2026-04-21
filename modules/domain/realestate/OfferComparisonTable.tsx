import { cn } from '@/libs/utils/cn';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import { Badge } from '@/modules/ui/Badge';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { Tooltip } from '@/modules/ui/Tooltip';
import { useState } from 'react';

export type PropertyOffer = {
  id: string;
  buyerName: string;
  offerAmount: number;
  earnestMoney: number;
  closingDate: string;
  contingencies: string[];
  financing: 'cash' | 'conventional' | 'fha' | 'va';
  status: 'pending' | 'countered' | 'accepted' | 'rejected';
  notes?: string;
};

const statusConfig: Record<PropertyOffer['status'], { variant: 'warning' | 'primary' | 'success' | 'error'; label: string }> = {
  pending:    { variant: 'warning', label: 'Pending'   },
  countered:  { variant: 'primary', label: 'Countered' },
  accepted:   { variant: 'success', label: 'Accepted'  },
  rejected:   { variant: 'error',   label: 'Rejected'  },
};

const SORT_ITEMS: ButtonGroupItem[] = [
  { value: 'amount',  label: 'By price' },
  { value: 'date',    label: 'By date'  },
];

export function OfferComparisonTable({
  offers,
  currency = 'USD',
  onAccept,
  onReject,
  className,
}: {
  offers: PropertyOffer[];
  currency?: string;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  className?: string;
}) {
  const [sortBy, setSortBy] = useState('amount');
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format;

  const sorted = [...offers].sort((a, b) =>
    sortBy === 'amount' ? b.offerAmount - a.offerAmount :
    new Date(b.closingDate).getTime() - new Date(a.closingDate).getTime()
  );

  const highest = Math.max(...offers.map((o) => o.offerAmount));

  const columns = [
    { key: 'buyerName'    as const, header: 'Buyer', render: (r: PropertyOffer) => <span className="text-sm font-medium text-text-primary">{r.buyerName}</span> },
    { key: 'offerAmount'  as const, header: 'Offer', align: 'right' as const, render: (r: PropertyOffer) => (
      <div className="flex items-center justify-end gap-1.5">
        <span className="font-mono font-bold text-text-primary">{fmt(r.offerAmount)}</span>
        {r.offerAmount === highest && <Badge variant="success" size="sm">Highest</Badge>}
      </div>
    )},
    { key: 'financing'    as const, header: 'Financing', render: (r: PropertyOffer) => (
      <Badge variant={r.financing === 'cash' ? 'success' : 'neutral'} size="sm">{r.financing.toUpperCase()}</Badge>
    )},
    { key: 'contingencies' as const, header: 'Contingencies', render: (r: PropertyOffer) => (
      r.contingencies.length === 0 ? (
        <span className="text-xs text-success-fg">None</span>
      ) : (
        <Tooltip content={r.contingencies.join(', ')}>
          <Badge variant="warning" size="sm">{r.contingencies.length} contingencies</Badge>
        </Tooltip>
      )
    )},
    { key: 'closingDate'  as const, header: 'Closing', render: (r: PropertyOffer) => <span className="text-xs text-text-secondary">{r.closingDate}</span> },
    { key: 'status'       as const, header: 'Status', render: (r: PropertyOffer) => (
      <Badge variant={statusConfig[r.status].variant} size="sm">{statusConfig[r.status].label}</Badge>
    )},
  ];

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">{offers.length} offer{offers.length !== 1 ? 's' : ''}</p>
        <ButtonGroup items={SORT_ITEMS} value={sortBy} onChange={setSortBy} variant="outline" size="sm" />
      </div>
      <AdvancedDataTable
        columns={columns}
        rows={sorted}
        selectable
        emptyMessage="No offers received yet."
      />
    </div>
  );
}
