'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { DataTable } from '@/modules/ui/DataTable';
import { Input } from '@/modules/ui/Input';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Button } from '@/modules/ui/Button';

export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  currentStock: number;
  reorderPoint: number;
  reorderQty: number;
  unit: string;
  supplier?: string;
  leadDays?: number;
};

export function InventoryReorderPanel({
  items,
  onReorder,
  className,
}: {
  items: InventoryItem[];
  onReorder?: (orders: Record<string, number>) => Promise<void>;
  className?: string;
}) {
  const [qtys,    setQtys]    = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const critical = items.filter((i) => i.currentStock <= i.reorderPoint);
  const selected = Object.keys(qtys).filter((id) => qtys[id] && Number(qtys[id]) > 0);

  async function handleReorder() {
    if (selected.length === 0) { setError('Set quantities for at least one item'); return; }
    setLoading(true); setError('');
    try {
      const orders = Object.fromEntries(selected.map((id) => [id, Number(qtys[id])]));
      await onReorder?.(orders);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Reorder failed');
    } finally { setLoading(false); }
  }

  const columns = [
    { key: 'sku'           as const, header: 'SKU',  render: (r: InventoryItem) => <span className="font-mono text-xs">{r.sku}</span> },
    { key: 'name'          as const, header: 'Item', render: (r: InventoryItem) => (
      <div>
        <p className="text-sm text-text-primary">{r.name}</p>
        {r.supplier && <p className="text-xs text-text-disabled">{r.supplier}</p>}
      </div>
    )},
    { key: 'currentStock'  as const, header: 'Stock', render: (r: InventoryItem) => (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm">{r.currentStock} {r.unit}</span>
        <Badge variant={r.currentStock <= r.reorderPoint ? 'error' : r.currentStock <= r.reorderPoint * 1.5 ? 'warning' : 'success'} size="sm">
          {r.currentStock <= r.reorderPoint ? 'Critical' : r.currentStock <= r.reorderPoint * 1.5 ? 'Low' : 'OK'}
        </Badge>
      </div>
    )},
    { key: 'reorderPoint'  as const, header: 'Reorder point', render: (r: InventoryItem) => (
      <span className="font-mono text-xs text-text-secondary">{r.reorderPoint} {r.unit}</span>
    )},
    { key: 'reorderQty'    as const, header: 'Order qty', render: (r: InventoryItem) => (
      <Input
        id={`reorder-${r.id}`}
        label=""
        type="number"
        placeholder={String(r.reorderQty)}
        value={qtys[r.id] ?? ''}
        onChange={(e) => setQtys((p) => ({ ...p, [r.id]: e.target.value }))}
        className="w-24"
      />
    )},
    { key: 'leadDays' as const, header: 'Lead time', render: (r: InventoryItem) => (
      r.leadDays ? <span className="text-xs text-text-secondary">{r.leadDays} days</span> : <span className="text-xs text-text-disabled">—</span>
    )},
  ];

  return (
    <div className={cn('space-y-3', className)}>
      {critical.length > 0 && (
        <AlertBanner
          variant="error"
          title={`${critical.length} item${critical.length > 1 ? 's' : ''} below reorder point`}
          message={critical.map((i) => i.name).join(', ')}
        />
      )}

      {error && <AlertBanner variant="error" message={error} dismissible />}

      <DataTable columns={columns} rows={items} />

      <div className="flex items-center justify-between">
        <p className="text-xs text-text-secondary">
          {selected.length > 0 ? `${selected.length} item${selected.length > 1 ? 's' : ''} selected for reorder` : 'Enter quantities to reorder'}
        </p>
        <Button
          variant="primary"
          onClick={handleReorder}
          loading={loading}
          disabled={selected.length === 0}
          iconLeft="🔄"
        >
          Place reorder
        </Button>
      </div>
    </div>
  );
}
