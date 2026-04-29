'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { CartItem } from './CartItem';
import { PriceDisplay } from '../money/PriceDisplay';
import type { Cart } from '../CartTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon icon={faCartShopping} className="w-4 h-4 text-text-secondary" aria-hidden="true" />
          <span className="text-sm font-semibold text-text-primary">Your order</span>
          <span className="text-xs text-text-secondary">({itemLabel})</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <PriceDisplay amount={cart.totals.total} currency={cart.totals.currency} size="sm" />
          <FontAwesomeIcon
            icon={faChevronDown}
            className={cn('h-3.5 w-3.5 text-text-secondary transition-transform duration-200', open && 'rotate-180')}
            aria-hidden="true"
          />
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
