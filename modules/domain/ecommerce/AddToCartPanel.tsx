'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Input } from '@/modules/ui/Input';
import { Button } from '@/modules/ui/Button';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Toast } from '@/modules/ui/Toast';

export function AddToCartPanel({
  productName,
  price,
  maxQuantity = 99,
  onAddToCart,
  className,
}: {
  productName: string;
  price: number;
  maxQuantity?: number;
  onAddToCart?: (qty: number) => Promise<void>;
  className?: string;
}) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const qtyError =
    qty < 1 ? 'Quantity must be at least 1' :
    qty > maxQuantity ? `Max quantity is ${maxQuantity}` : '';

  async function handleAdd() {
    if (qtyError) return;
    setLoading(true);
    setError('');
    try {
      await onAddToCart?.(qty);
      setSuccess(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not add to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {error && (
        <AlertBanner variant="error" message={error} dismissible />
      )}

      <div className="flex items-end gap-3">
        <div className="w-28">
          <Input
            id="add-to-cart-qty"
            label="Quantity"
            type="number"
            value={String(qty)}
            error={qtyError}
            onChange={(e) => setQty(Math.max(1, Math.min(maxQuantity, Number(e.target.value))))}
          />
        </div>
        <div className="flex-1">
          <p className="text-sm text-text-secondary mb-1">Total</p>
          <p className="text-xl font-bold text-text-primary">${(price * qty).toFixed(2)}</p>
        </div>
      </div>

      <Button
        variant="primary"
        fullWidth
        loading={loading}
        disabled={!!qtyError}
        onClick={handleAdd}
        iconLeft="🛒"
      >
        Add to cart
      </Button>

      {success && (
        <Toast
          variant="success"
          message={`${qty}× "${productName}" added to cart.`}
          onDismiss={() => setSuccess(false)}
        />
      )}
    </div>
  );
}
