'use client';
import { useState } from 'react';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import { Badge } from '@/modules/ui/Badge';
import { DatePicker } from '@/modules/ui/DatePicker';
import type { TableColumn } from '@/modules/ui/AdvancedDataTable';

type MaintenanceRecord = {
  id: string;
  asset: string;
  type: string;
  scheduledDate: Date | null;
  technician: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  priority: 'critical' | 'high' | 'normal';
};

const INITIAL_RECORDS: MaintenanceRecord[] = [
  { id: '1', asset: 'Transformer T-01', type: 'Inspection', scheduledDate: new Date('2026-04-25'), technician: 'J. Smith', status: 'scheduled', priority: 'high' },
  { id: '2', asset: 'Generator G-03', type: 'Overhaul', scheduledDate: new Date('2026-04-22'), technician: 'M. Chen', status: 'in-progress', priority: 'critical' },
  { id: '3', asset: 'Solar Panel Array', type: 'Cleaning', scheduledDate: new Date('2026-04-18'), technician: 'R. Patel', status: 'overdue', priority: 'normal' },
  { id: '4', asset: 'Substation SW-02', type: 'Testing', scheduledDate: new Date('2026-05-01'), technician: 'K. Lee', status: 'scheduled', priority: 'high' },
  { id: '5', asset: 'Wind Turbine W-07', type: 'Lubrication', scheduledDate: new Date('2026-04-30'), technician: 'A. Garcia', status: 'scheduled', priority: 'normal' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
  scheduled: 'neutral',
  'in-progress': 'warning',
  completed: 'success',
  overdue: 'error',
};

const priorityVariant: Record<string, 'error' | 'warning' | 'neutral'> = {
  critical: 'error',
  high: 'warning',
  normal: 'neutral',
};

export function MaintenanceScheduleTable() {
  const [records, setRecords] = useState<MaintenanceRecord[]>(INITIAL_RECORDS);

  function updateDate(id: string, date: Date | null) {
    setRecords((prev) => prev.map((r) => r.id === id ? { ...r, scheduledDate: date } : r));
  }

  const columns: TableColumn<MaintenanceRecord>[] = [
    { key: 'asset', header: 'Asset' },
    { key: 'type', header: 'Type', render: (r) => <Badge variant="primary" size="sm">{r.type}</Badge> },
    {
      key: 'scheduledDate', header: 'Scheduled',
      render: (r) => (
        <DatePicker
          id={`maint-date-${r.id}`}
          label=""
          value={r.scheduledDate}
          onChange={(d) => updateDate(r.id, d)}
        />
      ),
    },
    { key: 'technician', header: 'Technician' },
    { key: 'status', header: 'Status', render: (r) => <Badge variant={statusVariant[r.status]} size="sm">{r.status}</Badge> },
    { key: 'priority', header: 'Priority', render: (r) => <Badge variant={priorityVariant[r.priority]} size="sm">{r.priority}</Badge> },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-text-primary">Maintenance Schedule</h3>
      <AdvancedDataTable<MaintenanceRecord> columns={columns} rows={records} caption="Maintenance schedule" />
    </div>
  );
}
