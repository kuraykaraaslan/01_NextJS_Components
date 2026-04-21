import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { DataTable } from '@/modules/ui/DataTable';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';
import { Pagination } from '@/modules/ui/Pagination';

export type FlightFare = {
  id: string;
  airline: string;
  flightNo: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  cabinClass: string;
  baggage?: string;
  refundable?: boolean;
};

const PAGE_SIZE = 8;

export function FareComparisonTable({
  fares,
  onSelect,
  className,
}: {
  fares: FlightFare[];
  onSelect?: (fare: FlightFare) => void;
  className?: string;
}) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(fares.length / PAGE_SIZE));
  const paged = fares.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const cheapest = Math.min(...fares.map((f) => f.price));

  const columns = [
    { key: 'airline'   as const, header: 'Airline', render: (r: FlightFare) => (
      <div>
        <p className="text-sm font-medium text-text-primary">{r.airline}</p>
        <p className="text-xs text-text-disabled font-mono">{r.flightNo}</p>
      </div>
    )},
    { key: 'departure' as const, header: 'Departs', render: (r: FlightFare) => (
      <span className="font-mono text-sm font-semibold text-text-primary">{r.departure}</span>
    )},
    { key: 'arrival'   as const, header: 'Arrives', render: (r: FlightFare) => (
      <span className="font-mono text-sm font-semibold text-text-primary">{r.arrival}</span>
    )},
    { key: 'duration'  as const, header: 'Duration' },
    { key: 'stops'     as const, header: 'Stops', render: (r: FlightFare) => (
      <Badge variant={r.stops === 0 ? 'success' : r.stops === 1 ? 'warning' : 'error'} size="sm">
        {r.stops === 0 ? 'Non-stop' : `${r.stops} stop${r.stops > 1 ? 's' : ''}`}
      </Badge>
    )},
    { key: 'price'     as const, header: 'Price', align: 'right' as const, render: (r: FlightFare) => (
      <div className="text-right">
        <Tooltip content={r.baggage ?? 'Baggage policy unavailable'}>
          <div>
            <p className="font-bold text-text-primary tabular-nums">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: r.currency }).format(r.price)}
            </p>
            <div className="flex justify-end gap-1">
              {r.price === cheapest && <Badge variant="success" size="sm">Best price</Badge>}
              {r.refundable && <Badge variant="info" size="sm">Refundable</Badge>}
            </div>
          </div>
        </Tooltip>
      </div>
    )},
  ];

  return (
    <div className={cn('space-y-3', className)}>
      <div onClick={(e) => {
        const row = (e.target as HTMLElement).closest('[data-row-index]');
        if (row && onSelect) onSelect(paged[Number(row.getAttribute('data-row-index'))]);
      }}>
        <DataTable columns={columns} rows={paged} className="cursor-pointer" />
      </div>
      <Pagination page={page} totalPages={pageCount} onPageChange={setPage} />
    </div>
  );
}
