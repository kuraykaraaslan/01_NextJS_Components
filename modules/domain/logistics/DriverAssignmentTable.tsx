'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { DataTable } from '@/modules/ui/DataTable';
import { ComboBox, type ComboBoxOption } from '@/modules/ui/ComboBox';
import { AvatarGroup } from '@/modules/ui/Avatar';
import { Pagination } from '@/modules/ui/Pagination';
import { Button } from '@/modules/ui/Button';

export type DriverRow = {
  id: string;
  routeId: string;
  origin: string;
  destination: string;
  assignedDrivers: { name: string; avatar?: string }[];
  status: string;
};

const PAGE_SIZE = 5;

export function DriverAssignmentTable({
  rows,
  driverOptions,
  onAssign,
  className,
}: {
  rows: DriverRow[];
  driverOptions: ComboBoxOption[];
  onAssign?: (routeId: string, driverId: string) => void;
  className?: string;
}) {
  const [page, setPage]             = useState(1);
  const [assigning, setAssigning]   = useState<Record<string, string>>({});

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const paged = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { key: 'routeId'   as const, header: 'Route', render: (r: DriverRow) => <span className="font-mono text-xs">{r.routeId}</span> },
    { key: 'origin'    as const, header: 'Route path', render: (r: DriverRow) => <span className="text-sm">{r.origin} → {r.destination}</span> },
    { key: 'assignedDrivers' as const, header: 'Assigned', render: (r: DriverRow) => (
      <AvatarGroup avatars={r.assignedDrivers.map((d) => ({ name: d.name, src: d.avatar }))} max={3} size="sm" />
    )},
    { key: 'status' as const, header: 'Assign driver', render: (r: DriverRow) => (
      <div className="flex items-center gap-2 min-w-[14rem]">
        <div className="flex-1">
          <ComboBox
            id={`assign-${r.routeId}`}
            label=""
            options={driverOptions}
            value={assigning[r.routeId] ?? ''}
            onChange={(v) => setAssigning((p) => ({ ...p, [r.routeId]: v }))}
            placeholder="Pick driver…"
          />
        </div>
        <Button
          variant="primary" size="sm"
          disabled={!assigning[r.routeId]}
          onClick={() => {
            onAssign?.(r.routeId, assigning[r.routeId]);
            setAssigning((p) => { const n = { ...p }; delete n[r.routeId]; return n; });
          }}
        >
          Assign
        </Button>
      </div>
    )},
  ];

  return (
    <div className={cn('space-y-3', className)}>
      <DataTable columns={columns} rows={paged} />
      <Pagination page={page} totalPages={pageCount} onPageChange={setPage} />
    </div>
  );
}
