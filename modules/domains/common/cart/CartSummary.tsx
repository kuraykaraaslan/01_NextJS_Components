'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { CartItem } from './CartItem';
import { OrderTotalsCard } from '../money/OrderTotalsCard';
import { CouponInput } from '../discount/CouponInput';
import { Button } from '@/modules/ui/Button';
import type { Cart, CartItem as CartItemType } from '../CartTypes';

type CartSummaryProps = {
  cart: Cart;
  onQuantityChange?: (id: string, qty: number) => void;
  onRemove?: (id: string) => void;
  onCouponApply?: (code: string) => Promise<{ success: boolean; message?: string }>;
  onCouponRemove?: () => void;
  appliedCoupon?: string;
  onCheckout?: () => void;
  checkoutLabel?: string;
  showTotals?: boolean;
  showCoupon?: boolean;
  className?: string;
};

export function CartSummary({
  cart,
  onQuantityChange,
  onRemove,
  onCouponApply,
  onCouponRemove,
  appliedCoupon,
  onCheckout,
  checkoutLabel = 'Proceed to Checkout',
  showTotals = true,
  showCoupon = true,
  className,
}: CartSummaryProps) {
  if (cart.items.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-3 py-12 text-center', className)}>
        <span className="text-4xl" aria-hidden="true">🛒</span>
        <p className="font-medium text-text-primary">Your cart is empty</p>
        <p className="text-sm text-text-secondary">Add items to get started</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* item list */}
      <div className="divide-y divide-border">
        {cart.items.map((item) => (
          <CartItem
            key={item.cartItemId}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
            className="py-4 first:pt-0 last:pb-0"
          />
        ))}
      </div>

      {/* coupon */}
      {showCoupon && onCouponApply && (
        <CouponInput
          appliedCode={appliedCoupon}
          onApply={onCouponApply}
          onRemove={onCouponRemove}
        />
      )}

      {/* totals */}
      {showTotals && (
        <OrderTotalsCard totals={cart.totals} />
      )}

      {/* CTA */}
      {onCheckout && (
        <Button fullWidth onClick={onCheckout} className="h-11 font-semibold">
          {checkoutLabel}
        </Button>
      )}
    </div>
  );
}
