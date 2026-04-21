'use client';
import { useState } from 'react';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import { Badge } from '@/modules/ui/Badge';
import { ButtonGroup } from '@/modules/ui/ButtonGroup';
import { Toast } from '@/modules/ui/Toast';
import type { TableColumn } from '@/modules/ui/AdvancedDataTable';

type KitchenOrder = {
  id: string;
  orderNo: string;
  table: string;
  items: string;
  elapsedMin: number;
  status: 'pending' | 'in-progress' | 'done';
};

const INITIAL_ORDERS: KitchenOrder[] = [
  { id: '1', orderNo: '#4821', table: 'T4', items: 'Salmon, Wine ×2', elapsedMin: 8, status: 'in-progress' },
  { id: '2', orderNo: '#4822', table: 'T7', items: 'Bruschetta, Tacos ×3', elapsedMin: 18, status: 'pending' },
  { id: '3', orderNo: '#4823', table: 'T2', items: 'Risotto, Beer', elapsedMin: 3, status: 'pending' },
  { id: '4', orderNo: '#4820', table: 'T9', items: 'Tiramisu ×2, Coffee', elapsedMin: 22, status: 'done' },
];

const STATUS_ITEMS = [
  { value: 'pending', label: 'Start' },
  { value: 'in-progress', label: 'Done' },
];

export function KitchenQueueBoard() {
  const [orders, setOrders] = useState<KitchenOrder[]>(INITIAL_ORDERS);
  const [toastMsg, setToastMsg] = useState('');

  function handleAction(id: string, nextStatus: string) {
    setOrders((prev) =>
      prev.map((o) => o.id === id ? { ...o, status: nextStatus as KitchenOrder['status'] } : o)
    );
    setToastMsg(nextStatus === 'in-progress' ? 'Order started!' : 'Order completed!');
  }

  const columns: TableColumn<KitchenOrder>[] = [
    { key: 'orderNo', header: 'Order' },
    { key: 'table', header: 'Table' },
    { key: 'items', header: 'Items' },
    {
      key: 'elapsedMin',
      header: 'Elapsed',
      render: (row) => (
        <Badge variant={row.elapsedMin > 15 ? 'error' : 'neutral'} size="sm">
          {row.elapsedMin}m {row.elapsedMin > 15 ? '⚠' : ''}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'done' ? 'success' : row.status === 'in-progress' ? 'warning' : 'neutral'} size="sm">
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (row) =>
        row.status !== 'done' ? (
          <ButtonGroup
            items={[
              { value: 'in-progress', label: 'Start', disabled: row.status === 'in-progress' },
              { value: 'done', label: 'Done' },
            ]}
            value={row.status}
            onChange={(v) => handleAction(row.id, v)}
            size="sm"
          />
        ) : (
          <Badge variant="success" size="sm">✓ Done</Badge>
        ),
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Kitchen Queue</h3>
        <Badge variant="warning" size="sm">{orders.filter((o) => o.status !== 'done').length} active orders</Badge>
      </div>
      {toastMsg && <Toast variant="success" message={toastMsg} onDismiss={() => setToastMsg('')} duration={2000} />}
      <AdvancedDataTable<KitchenOrder> columns={columns} rows={orders} caption="Kitchen order queue" />
    </div>
  );
}
