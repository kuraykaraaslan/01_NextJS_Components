import { cn } from '@/libs/utils/cn';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Table } from '@/modules/ui/Table';

export type CartItem = {
  id: string;
  name: string;
  variant?: string;
  qty: number;
  unitPrice: number;
};

export function CartSummary({
  items,
  coupon,
  shippingCost = 0,
  onCheckout,
  onRemove,
  loading = false,
  className,
}: {
  items: CartItem[];
  coupon?: { code: string; discount: number };
  shippingCost?: number;
  onCheckout?: () => void;
  onRemove?: (id: string) => void;
  loading?: boolean;
  className?: string;
}) {
  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const discount = coupon?.discount ?? 0;
  const total = subtotal - discount + shippingCost;

  const columns = [
    {
      key: 'name' as const,
      header: 'Product',
      render: (row: CartItem) => (
        <div>
          <p className="text-sm font-medium text-text-primary">{row.name}</p>
          {row.variant && <p className="text-xs text-text-secondary">{row.variant}</p>}
        </div>
      ),
    },
    { key: 'qty' as const, header: 'Qty', align: 'center' as const },
    {
      key: 'unitPrice' as const,
      header: 'Price',
      align: 'right' as const,
      render: (row: CartItem) => `$${(row.qty * row.unitPrice).toFixed(2)}`,
    },
    ...(onRemove ? [{
      key: '_remove' as keyof CartItem,
      header: '',
      render: (row: CartItem) => (
        <button
          type="button"
          onClick={() => onRemove(row.id)}
          className="text-xs text-error hover:underline"
          aria-label={`Remove ${row.name}`}
        >
          ✕
        </button>
      ),
    }] : []),
  ];

  return (
    <div className={cn('space-y-4', className)}>
      <Table
        columns={columns}
        rows={items}
        caption={`${items.length} item${items.length !== 1 ? 's' : ''} in cart`}
      />

      <Card variant="outline">
        <div className="p-4 space-y-2">
          <div className="flex justify-between text-sm text-text-secondary">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {coupon && (
            <div className="flex justify-between text-sm text-success-fg">
              <span className="flex items-center gap-2">
                Coupon <Badge variant="success" size="sm">{coupon.code}</Badge>
              </span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-text-secondary">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-text-primary pt-2 border-t border-border">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="px-4 pb-4">
          <Button variant="primary" fullWidth onClick={onCheckout} loading={loading}>
            Proceed to checkout
          </Button>
        </div>
      </Card>
    </div>
  );
}
