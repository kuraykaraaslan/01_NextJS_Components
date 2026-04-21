'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { SearchBar } from '@/modules/ui/SearchBar';

export type Shipment = {
  id: string;
  trackingNo: string;
  origin: string;
  destination: string;
  carrier: string;
  status: 'in-transit' | 'delivered' | 'delayed' | 'pending' | 'failed';
  eta: string;
  weight?: string;
};

const statusConfig: Record<Shipment['status'], { variant: 'success' | 'primary' | 'error' | 'neutral' | 'warning'; label: string }> = {
  'in-transit': { variant: 'primary',  label: 'In transit' },
  'delivered':  { variant: 'success',  label: 'Delivered' },
  'delayed':    { variant: 'warning',  label: 'Delayed' },
  'pending':    { variant: 'neutral',  label: 'Pending' },
  'failed':     { variant: 'error',    label: 'Failed' },
};

export function ShipmentStatusBoard({
  shipments,
  className,
}: {
  shipments: Shipment[];
  className?: string;
}) {
  const [search, setSearch] = useState('');

  const delayed  = shipments.filter((s) => s.status === 'delayed');
  const failed   = shipments.filter((s) => s.status === 'failed');

  const filtered = shipments.filter((s) =>
    [s.trackingNo, s.origin, s.destination, s.carrier].join(' ').toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: 'trackingNo'  as const, header: 'Tracking #', render: (r: Shipment) => <span className="font-mono text-xs">{r.trackingNo}</span> },
    { key: 'origin'      as const, header: 'From → To', render: (r: Shipment) => <span className="text-sm">{r.origin} → {r.destination}</span> },
    { key: 'carrier'     as const, header: 'Carrier' },
    { key: 'status'      as const, header: 'Status', render: (r: Shipment) => (
      <Badge variant={statusConfig[r.status].variant} size="sm">{statusConfig[r.status].label}</Badge>
    )},
    { key: 'eta'         as const, header: 'ETA', render: (r: Shipment) => <span className="text-xs text-text-secondary">{r.eta}</span> },
  ];

  return (
    <div className={cn('space-y-3', className)}>
      {failed.length > 0 && (
        <AlertBanner variant="error" title={`${failed.length} shipment${failed.length > 1 ? 's' : ''} failed`}
          message="Review failed deliveries and take corrective action."
        />
      )}
      {delayed.length > 0 && (
        <AlertBanner variant="warning" message={`${delayed.length} shipment${delayed.length > 1 ? 's' : ''} delayed.`} />
      )}

      <SearchBar value={search} onChange={setSearch} placeholder="Search by tracking #, carrier, location…" />

      <AdvancedDataTable
        columns={columns}
        rows={filtered}
        selectable
        stickyHeader
        emptyMessage="No shipments match your search."
      />
    </div>
  );
}
