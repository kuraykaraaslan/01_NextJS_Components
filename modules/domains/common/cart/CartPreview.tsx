'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { CartItem } from './CartItem';
import { PriceDisplay } from '../money/PriceDisplay';
import type { Cart } from '../CartTypes';

type CartPreviewProps = {
  cart: Cart;
  defaultOpen?: boolean;
  className?: string;
};

export function CartPreview({ cart, defaultOpen = false, className }: CartPreviewProps) {
  const [open, setOpen] = useState(defaultOpen);

  const totalQty   = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const itemLabel  = `${totalQty} item${totalQty !== 1 ? 's' : ''}`;

  return (
    <div className={cn('rounded-xl border border-border bg-surface-raised overflow-hidden', className)}>
      {/* toggle header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base" aria-hidden="true">🛒</span>
          <span className="text-sm font-semibold text-text-primary">Your order</span>
          <span className="text-xs text-text-secondary">({itemLabel})</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <PriceDisplay amount={cart.totals.total} currency={cart.totals.currency} size="sm" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className={cn('h-4 w-4 text-text-secondary transition-transform duration-200', open && 'rotate-180')}
          >
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {/* expanded item list */}
      {open && (
        <div className="border-t border-border px-4 py-3 space-y-3">
          {cart.items.length === 0 ? (
            <p className="text-sm text-text-secondary py-2 text-center">No items in cart.</p>
          ) : (
            cart.items.map((item, idx) => (
              <CartItem
                key={item.cartItemId}
                item={item}
                compact
                className={cn(idx > 0 && 'border-t border-border pt-3')}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
