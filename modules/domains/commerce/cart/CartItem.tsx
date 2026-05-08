'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type CartItemData = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  currency: string;
  image?: string | null;
};

type CartItemProps = {
  item: CartItemData;
  onRemove?: () => void;
  className?: string;
};

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);
}

export function CartItem({ item, onRemove, className }: CartItemProps) {
  const lineTotal = item.price * item.quantity;

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-xl border border-border bg-surface-raised p-3',
        className
      )}
    >
      {/* Product image */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-sunken">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-disabled">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Name + qty */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text-primary">{item.name}</p>
        <p className="mt-0.5 text-xs text-text-secondary">
          {formatPrice(item.price, item.currency)} &times; {item.quantity}
        </p>
      </div>

      {/* Line total */}
      <span className="shrink-0 text-sm font-bold text-text-primary">
        {formatPrice(lineTotal, item.currency)}
      </span>

      {/* Remove */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name} from cart`}
          className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-error-subtle hover:text-error transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
