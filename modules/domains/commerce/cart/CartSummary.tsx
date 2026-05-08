'use client';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import type { Cart, CartItem } from '@/modules/domains/commerce/types';

type CartSummaryProps = {
  cart: Cart;
  items?: CartItem[];
  onViewCart?: () => void;
  viewCartHref?: string;
  className?: string;
};

export function CartSummary({ cart, items, onViewCart, viewCartHref, className }: CartSummaryProps) {
  const itemCount = items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface-raised p-5 flex flex-col gap-4',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4 text-primary" aria-hidden="true" />
        <h2 className="text-base font-semibold text-text-primary">Your Cart</h2>
        {itemCount > 0 && (
          <span className="ml-auto inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-fg text-xs font-bold">
            {itemCount}
          </span>
        )}
      </div>

      {/* Line items summary */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span>{cart.currency} {cart.subtotal.toFixed(2)}</span>
        </div>
        {cart.discountTotal > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount</span>
            <span>- {cart.currency} {cart.discountTotal.toFixed(2)}</span>
          </div>
        )}
        {cart.shippingTotal > 0 && (
          <div className="flex justify-between text-text-secondary">
            <span>Shipping</span>
            <span>{cart.currency} {cart.shippingTotal.toFixed(2)}</span>
          </div>
        )}
        {cart.taxTotal > 0 && (
          <div className="flex justify-between text-text-secondary">
            <span>Tax</span>
            <span>{cart.currency} {cart.taxTotal.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-border pt-3 flex justify-between items-center">
        <span className="text-sm font-semibold text-text-primary">Total</span>
        <span className="text-lg font-bold text-text-primary">
          {cart.currency} {cart.total.toFixed(2)}
        </span>
      </div>

      {/* CTA */}
      {(onViewCart || viewCartHref) && (
        <Button
          as={viewCartHref ? 'a' : 'button'}
          href={viewCartHref}
          variant="primary"
          fullWidth
          onClick={onViewCart}
          iconLeft={<FontAwesomeIcon icon={faShoppingCart} className="w-3.5 h-3.5" aria-hidden="true" />}
        >
          View Cart
        </Button>
      )}
    </div>
  );
}
