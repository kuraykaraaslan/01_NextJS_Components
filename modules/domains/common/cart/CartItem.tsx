'use client';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';
import { PriceDisplay } from '../money/PriceDisplay';
import type { CartItem as CartItemType } from '../CartTypes';

type CartItemProps = {
  item: CartItemType;
  onQuantityChange?: (id: string, qty: number) => void;
  onRemove?: (id: string) => void;
  compact?: boolean;
  className?: string;
};

export function CartItem({
  item,
  onQuantityChange,
  onRemove,
  compact = false,
  className,
}: CartItemProps) {
  const canDecrement = item.quantity > 1;
  const canIncrement = item.maxQuantity == null || item.quantity < item.maxQuantity;

  return (
    <div className={cn('flex gap-3', className)}>
      {/* thumbnail */}
      <div className={cn(
        'shrink-0 rounded-lg border border-border bg-surface-overlay flex items-center justify-center text-text-disabled overflow-hidden',
        compact ? 'h-12 w-12' : 'h-16 w-16',
      )}>
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <span className={compact ? 'text-lg' : 'text-2xl'} aria-hidden="true">🛍</span>
        )}
      </div>

      {/* info */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className={cn('font-medium text-text-primary truncate', compact ? 'text-xs' : 'text-sm')}>
          {item.name}
        </p>
        {item.variant && (
          <p className="text-xs text-text-secondary truncate">{item.variant}</p>
        )}
        {item.description && !compact && (
          <p className="text-xs text-text-secondary line-clamp-1">{item.description}</p>
        )}

        <div className="flex items-center gap-2 pt-1 flex-wrap">
          {/* qty controls */}
          {onQuantityChange ? (
            <div className="flex items-center gap-1 rounded-md border border-border bg-surface-base">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={!canDecrement}
                onClick={() => onQuantityChange(item.cartItemId, item.quantity - 1)}
                className="flex h-6 w-6 items-center justify-center rounded-l-md text-text-secondary hover:bg-surface-overlay disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-bold"
              >
                −
              </button>
              <span className="w-6 text-center text-xs font-medium text-text-primary tabular-nums">
                {item.quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={!canIncrement}
                onClick={() => onQuantityChange(item.cartItemId, item.quantity + 1)}
                className="flex h-6 w-6 items-center justify-center rounded-r-md text-text-secondary hover:bg-surface-overlay disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-bold"
              >
                +
              </button>
            </div>
          ) : (
            <span className="text-xs text-text-secondary">Qty: {item.quantity}</span>
          )}

          {onRemove && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onRemove(item.cartItemId)}
              className="text-error hover:opacity-80 px-1"
            >
              Remove
            </Button>
          )}
        </div>
      </div>

      {/* price */}
      <div className="shrink-0 text-right space-y-0.5">
        <PriceDisplay
          amount={item.price * item.quantity}
          currency={item.currency}
          size={compact ? 'sm' : 'md'}
        />
        {item.quantity > 1 && (
          <p className="text-xs text-text-secondary">
            <PriceDisplay amount={item.price} currency={item.currency} size="sm" /> each
          </p>
        )}
      </div>
    </div>
  );
}
