'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Card } from '@/modules/ui/Card';
import { Table } from '@/modules/ui/Table';
import { DropdownMenu, type DropdownItem } from '@/modules/ui/DropdownMenu';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { Badge } from '@/modules/ui/Badge';

export type WorkOrder = {
  id: string;
  orderNo: string;
  product: string;
  quantity: number;
  completed: number;
  priority: 'high' | 'medium' | 'low';
  status: 'queued' | 'in-progress' | 'paused' | 'completed' | 'cancelled';
  dueDate: string;
  assignedLine?: string;
};

const priorityVariant: Record<WorkOrder['priority'], 'error' | 'warning' | 'neutral'> = {
  high:   'error',
  medium: 'warning',
  low:    'neutral',
};

const statusConfig: Record<WorkOrder['status'], { variant: 'neutral' | 'primary' | 'warning' | 'success' | 'error'; label: string }> = {
  queued:     { variant: 'neutral',  label: 'Queued'     },
  'in-progress': { variant: 'primary',  label: 'In progress' },
  paused:     { variant: 'warning',  label: 'Paused'     },
  completed:  { variant: 'success',  label: 'Completed'  },
  cancelled:  { variant: 'error',    label: 'Cancelled'  },
};

const VIEW_ITEMS: ButtonGroupItem[] = [
  { value: 'table', label: '☰ Table' },
  { value: 'cards', label: '⊞ Cards' },
];

export function WorkOrderBoard({
  orders,
  onStart,
  onPause,
  onCancel,
  className,
}: {
  orders: WorkOrder[];
  onStart?:  (id: string) => void;
  onPause?:  (id: string) => void;
  onCancel?: (id: string) => void;
  className?: string;
}) {
  const [view, setView] = useState('table');

  function menuFor(o: WorkOrder): DropdownItem[] {
    return [
      ...(onStart  && o.status === 'queued'       ? [{ label: 'Start',  icon: '▶', onClick: () => onStart(o.id)  }] : []),
      ...(onPause  && o.status === 'in-progress'  ? [{ label: 'Pause',  icon: '⏸', onClick: () => onPause(o.id)  }] : []),
      ...(onCancel && o.status !== 'completed'    ? [{ label: 'Cancel', icon: '✕', danger: true, onClick: () => onCancel(o.id) }] : []),
    ];
  }

  const columns = [
    { key: 'orderNo'  as const, header: 'Order #', render: (r: WorkOrder) => <span className="font-mono text-xs">{r.orderNo}</span> },
    { key: 'product'  as const, header: 'Product'  },
    { key: 'quantity' as const, header: 'Progress', render: (r: WorkOrder) => (
      <div className="space-y-1">
        <span className="text-sm text-text-primary">{r.completed}/{r.quantity}</span>
        <div className="h-1.5 w-24 rounded-full bg-surface-sunken">
          <div className="h-full rounded-full bg-primary" style={{ width: `${(r.completed / r.quantity) * 100}%` }} />
        </div>
      </div>
    )},
    { key: 'priority' as const, header: 'Priority', render: (r: WorkOrder) => (
      <Badge variant={priorityVariant[r.priority]} size="sm">{r.priority}</Badge>
    )},
    { key: 'status'   as const, header: 'Status', render: (r: WorkOrder) => (
      <Badge variant={statusConfig[r.status].variant} size="sm">{statusConfig[r.status].label}</Badge>
    )},
    { key: 'dueDate'  as const, header: 'Due', render: (r: WorkOrder) => <span className="text-xs text-text-secondary">{r.dueDate}</span> },
    { key: 'id' as const, header: '', render: (r: WorkOrder) => {
      const items = menuFor(r);
      return items.length > 0 ? (
        <DropdownMenu
          trigger={<button type="button" className="p-1 rounded hover:bg-surface-overlay text-text-secondary" aria-label="Options">⋮</button>}
          items={items}
          align="right"
        />
      ) : null;
    }},
  ];

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">{orders.length} work orders</p>
        <ButtonGroup items={VIEW_ITEMS} value={view} onChange={setView} variant="outline" size="sm" />
      </div>

      {view === 'table' ? (
        <Table columns={columns} rows={orders} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {orders.map((o) => (
            <Card key={o.id} variant="outline">
              <div className="p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs text-text-disabled">{o.orderNo}</span>
                    <p className="text-sm font-medium text-text-primary">{o.product}</p>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant={priorityVariant[o.priority]} size="sm">{o.priority}</Badge>
                    {menuFor(o).length > 0 && (
                      <DropdownMenu
                        trigger={<button type="button" className="p-0.5 rounded hover:bg-surface-overlay text-text-secondary text-xs" aria-label="Options">⋮</button>}
                        items={menuFor(o)}
                        align="right"
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>{o.completed}/{o.quantity} units</span>
                    <span>{Math.round((o.completed / o.quantity) * 100)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-sunken">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(o.completed / o.quantity) * 100}%` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant={statusConfig[o.status].variant} size="sm">{statusConfig[o.status].label}</Badge>
                  <span className="text-xs text-text-disabled">Due {o.dueDate}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
