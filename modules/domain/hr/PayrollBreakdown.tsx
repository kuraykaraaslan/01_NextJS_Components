import { cn } from '@/libs/utils/cn';
import { Table } from '@/modules/ui/Table';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';

export type PayrollLineItem = {
  id: string;
  description: string;
  type: 'earning' | 'deduction' | 'tax';
  amount: number;
  note?: string;
};

export function PayrollBreakdown({
  period,
  employeeName,
  currency = 'USD',
  items,
  className,
}: {
  period: string;
  employeeName: string;
  currency?: string;
  items: PayrollLineItem[];
  className?: string;
}) {
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format;

  const earnings   = items.filter((i) => i.type === 'earning');
  const deductions = items.filter((i) => i.type !== 'earning');
  const grossPay   = earnings.reduce((s, i)   => s + i.amount, 0);
  const totalDeduct = deductions.reduce((s, i) => s + i.amount, 0);
  const netPay     = grossPay - totalDeduct;

  const typeVariant: Record<PayrollLineItem['type'], 'success' | 'error' | 'warning'> = {
    earning:   'success',
    deduction: 'warning',
    tax:       'error',
  };

  const columns = [
    { key: 'description' as const, header: 'Description', render: (r: PayrollLineItem) => (
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-primary">{r.description}</span>
        {r.note && (
          <Tooltip content={r.note}>
            <span className="text-xs text-text-disabled cursor-help">ⓘ</span>
          </Tooltip>
        )}
      </div>
    )},
    { key: 'type'        as const, header: 'Type', render: (r: PayrollLineItem) => (
      <Badge variant={typeVariant[r.type]} size="sm">{r.type}</Badge>
    )},
    { key: 'amount'      as const, header: 'Amount', align: 'right' as const, render: (r: PayrollLineItem) => (
      <span className={cn('font-mono text-sm', r.type === 'earning' ? 'text-success-fg' : 'text-error-fg')}>
        {r.type === 'earning' ? '+' : '-'}{fmt(Math.abs(r.amount))}
      </span>
    )},
  ];

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-text-primary">{employeeName}</p>
          <p className="text-xs text-text-disabled">Pay period: {period}</p>
        </div>
      </div>

      <Table columns={columns} rows={items} />

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Gross pay', value: fmt(grossPay),     variant: 'success' as const },
          { label: 'Deductions', value: fmt(totalDeduct), variant: 'error'   as const },
          { label: 'Net pay',    value: fmt(netPay),      variant: 'primary' as const },
        ].map(({ label, value, variant }) => (
          <Card key={label} variant="flat">
            <div className="p-3 space-y-1">
              <div className="flex items-center gap-1">
                <p className="text-xs text-text-secondary">{label}</p>
                <Badge variant={variant} size="sm" dot>•</Badge>
              </div>
              <p className="text-base font-bold text-text-primary tabular-nums">{value}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
