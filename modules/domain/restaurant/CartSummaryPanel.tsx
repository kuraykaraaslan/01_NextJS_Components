'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Table } from '@/modules/ui/Table';
import { Button } from '@/modules/ui/Button';
import { Input } from '@/modules/ui/Input';
import { Badge } from '@/modules/ui/Badge';

type CartItem = {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
};

const DEFAULT_ITEMS: CartItem[] = [
  { id: 'i1', name: 'Bruschetta', qty: 2, unitPrice: 8 },
  { id: 'i2', name: 'Grilled Salmon', qty: 1, unitPrice: 26 },
  { id: 'i3', name: 'House Wine', qty: 2, unitPrice: 11 },
];

export function CartSummaryPanel() {
  const [items, setItems] = useState<CartItem[]>(DEFAULT_ITEMS);
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function applyPromo() {
    if (promo.toUpperCase() === 'SAVE10') {
      setDiscount(10);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }
  }

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);
  const tax = Math.round(subtotal * 0.08);
  const delivery = 4.99;
  const total = subtotal - discount + tax + delivery;

  const columns = [
    { key: 'name', header: 'Item' },
    { key: 'qty', header: 'Qty', align: 'center' as const },
    {
      key: 'unitPrice', header: 'Price', align: 'right' as const,
      render: (row: CartItem) => `$${(row.qty * row.unitPrice).toFixed(2)}`,
    },
    {
      key: 'actions', header: '', align: 'right' as const,
      render: (row: CartItem) => (
        <Button variant="ghost" size="sm" onClick={() => removeItem(row.id)}>✕</Button>
      ),
    },
  ];

  return (
    <Card className="max-w-lg">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-primary">Order Summary</h3>
          <Badge variant="neutral" size="sm">{items.length} items</Badge>
        </div>

        <Table columns={columns} rows={items} caption="Cart items" emptyMessage="Your cart is empty." />

        <div className="flex gap-2">
          <Input id="promo-code" label="" placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} error={promoError} className="flex-1" />
          <Button variant="outline" onClick={applyPromo} className="mt-0 self-end">Apply</Button>
        </div>

        <div className="space-y-1 text-sm border-t border-border pt-3">
          <div className="flex justify-between text-text-secondary">
            <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-success-fg">
              <span>Promo (SAVE10)</span><span>−${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-text-secondary">
            <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span>Delivery</span><span>${delivery.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-text-primary text-base pt-1 border-t border-border">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Button variant="primary" fullWidth disabled={items.length === 0}>
          Checkout
        </Button>
      </div>
    </Card>
  );
}
