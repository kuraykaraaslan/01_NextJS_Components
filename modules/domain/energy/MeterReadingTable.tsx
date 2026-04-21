'use client';
import { useState } from 'react';
import { DataTable } from '@/modules/ui/DataTable';
import { Badge } from '@/modules/ui/Badge';
import { DateRangePicker, type DateRange } from '@/modules/ui/DateRangePicker';
import type { TableColumn } from '@/modules/ui/DataTable';

type MeterReading = {
  id: string;
  date: string;
  meterId: string;
  reading: string;
  unit: string;
  variance: 'high' | 'normal' | 'low';
};

const ALL_READINGS: MeterReading[] = [
  { id: 'r1', date: '2026-04-21', meterId: 'MTR-001', reading: '48,342', unit: 'kWh', variance: 'normal' },
  { id: 'r2', date: '2026-04-20', meterId: 'MTR-002', reading: '12,890', unit: 'kWh', variance: 'high' },
  { id: 'r3', date: '2026-04-20', meterId: 'MTR-001', reading: '48,190', unit: 'kWh', variance: 'normal' },
  { id: 'r4', date: '2026-04-19', meterId: 'MTR-003', reading: '5,420', unit: 'kWh', variance: 'low' },
  { id: 'r5', date: '2026-04-19', meterId: 'MTR-002', reading: '12,614', unit: 'kWh', variance: 'normal' },
  { id: 'r6', date: '2026-04-18', meterId: 'MTR-001', reading: '47,960', unit: 'kWh', variance: 'high' },
  { id: 'r7', date: '2026-04-18', meterId: 'MTR-003', reading: '5,380', unit: 'kWh', variance: 'normal' },
];

const varianceMap: Record<string, 'error' | 'success' | 'neutral'> = {
  high: 'error',
  normal: 'neutral',
  low: 'success',
};

const COLUMNS: TableColumn<MeterReading>[] = [
  { key: 'date', header: 'Date', sortable: true },
  { key: 'meterId', header: 'Meter ID', sortable: true },
  { key: 'reading', header: 'Reading' },
  { key: 'unit', header: 'Unit', render: (r) => <Badge variant="primary" size="sm">{r.unit}</Badge> },
  { key: 'variance', header: 'Variance', render: (r) => <Badge variant={varianceMap[r.variance]} size="sm">{r.variance}</Badge> },
];

export function MeterReadingTable() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Meter Readings</h3>
      </div>
      <DateRangePicker id="meter-range" label="Filter by date range" value={range} onChange={setRange} />
      <DataTable<MeterReading>
        columns={COLUMNS}
        rows={ALL_READINGS}
        pageSize={5}
        searchPlaceholder="Search readings…"
        caption="Meter readings table"
      />
    </div>
  );
}
