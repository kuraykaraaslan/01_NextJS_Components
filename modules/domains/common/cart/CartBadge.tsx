'use client';
import { cn } from '@/libs/utils/cn';
import type { Cart } from '../CartTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

type CartBadgeProps = {
  cart: Cart;
  onClick?: () => void;
  className?: string;
};

export function CartBadge({ cart, onClick, className }: CartBadgeProps) {
  const totalQty = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Cart — ${totalQty} item${totalQty !== 1 ? 's' : ''}`}
      className={cn(
        'relative inline-flex items-center justify-center h-10 w-10 rounded-full',
        'border border-border bg-surface-raised text-text-primary',
        'hover:bg-surface-overlay transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        className,
      )}
    >
      <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" aria-hidden="true" />
      {totalQty > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-fg tabular-nums shadow"
        >
          {totalQty > 99 ? '99+' : totalQty}
        </span>
      )}
    </button>
  );
}
