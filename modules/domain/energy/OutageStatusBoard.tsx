'use client';
import { useState } from 'react';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Table } from '@/modules/ui/Table';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Toast } from '@/modules/ui/Toast';

type OutageZone = {
  id: string;
  zone: string;
  status: 'active' | 'resolved' | 'scheduled';
  restoreTime: string;
  affected: number;
};

const OUTAGES: OutageZone[] = [
  { id: 'o1', zone: 'District North', status: 'active', restoreTime: '6:00 PM', affected: 2400 },
  { id: 'o2', zone: 'Industrial Park', status: 'active', restoreTime: '7:30 PM', affected: 890 },
  { id: 'o3', zone: 'Riverside', status: 'scheduled', restoreTime: '2:00 AM', affected: 150 },
  { id: 'o4', zone: 'Downtown Core', status: 'resolved', restoreTime: '—', affected: 3200 },
  { id: 'o5', zone: 'Suburb East', status: 'resolved', restoreTime: '—', affected: 540 },
];

const statusVariant: Record<string, 'error' | 'warning' | 'success'> = {
  active: 'error',
  scheduled: 'warning',
  resolved: 'success',
};

export function OutageStatusBoard() {
  const [showToast, setShowToast] = useState(false);
  const activeCount = OUTAGES.filter((o) => o.status === 'active').length;

  return (
    <div className="space-y-4">
      {activeCount > 0 && (
        <AlertBanner
          variant="error"
          title={`${activeCount} active outage${activeCount !== 1 ? 's' : ''}`}
          message="Field crews are working to restore power. Estimated restore times shown below."
        />
      )}

      {showToast && (
        <Toast variant="info" message="Status refreshed." onDismiss={() => setShowToast(false)} duration={2000} />
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Outage Status Board</h3>
        <Button variant="outline" size="sm" onClick={() => setShowToast(true)}>↻ Refresh</Button>
      </div>

      <Table
        caption="Outage zones"
        columns={[
          { key: 'zone', header: 'Zone' },
          { key: 'status', header: 'Status', render: (r) => <Badge variant={statusVariant[r.status]} size="sm">{r.status}</Badge> },
          { key: 'restoreTime', header: 'Est. Restore' },
          { key: 'affected', header: 'Affected', align: 'right', render: (r) => r.affected.toLocaleString() },
        ]}
        rows={OUTAGES}
      />
    </div>
  );
}
