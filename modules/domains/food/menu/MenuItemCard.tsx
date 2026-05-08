'use client';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLeaf, faSeedling, faFire } from '@fortawesome/free-solid-svg-icons';
import type { MenuItemStatus } from '../types';

type MenuItemCardProps = {
  item: {
    menuItemId: string;
    name: string;
    description?: string | null;
    price: number;
    currency: string;
    imageUrl?: string | null;
    calories?: number | null;
    isVegetarian?: boolean;
    isVegan?: boolean;
    status: MenuItemStatus;
  };
  onAddToCart?: () => void;
  className?: string;
};

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
}

export function MenuItemCard({ item, onAddToCart, className }: MenuItemCardProps) {
  const isAvailable = item.status === 'AVAILABLE';

  return (
    <div
      className={cn(
        'group flex gap-4 rounded-xl border border-border bg-surface-raised p-4 transition-shadow',
        isAvailable && 'hover:shadow-md hover:border-border-focus',
        !isAvailable && 'opacity-60',
        className
      )}
    >
      {/* Image or placeholder */}
      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-surface-overlay">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-overlay to-surface-sunken">
            <FontAwesomeIcon icon={faFire} className="w-6 h-6 text-text-disabled" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-text-primary line-clamp-1 leading-snug">
            {item.name}
          </h3>
          {!isAvailable && (
            <Badge variant="neutral" size="sm" className="shrink-0">
              {item.status === 'OUT_OF_STOCK' ? 'Out of Stock' : 'Unavailable'}
            </Badge>
          )}
        </div>

        {item.description && (
          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Dietary + calories */}
        <div className="flex flex-wrap items-center gap-1.5">
          {item.isVegan && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success-subtle px-2 py-0.5 text-xs font-medium text-success-fg">
              <FontAwesomeIcon icon={faSeedling} className="w-3 h-3" aria-hidden="true" />
              Vegan
            </span>
          )}
          {!item.isVegan && item.isVegetarian && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success-subtle px-2 py-0.5 text-xs font-medium text-success-fg">
              <FontAwesomeIcon icon={faLeaf} className="w-3 h-3" aria-hidden="true" />
              Veg
            </span>
          )}
          {item.calories != null && (
            <span className="text-xs text-text-secondary">
              {item.calories} kcal
            </span>
          )}
        </div>

        {/* Price + add to cart */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <span className="text-sm font-bold text-text-primary">
            {formatPrice(item.price, item.currency)}
          </span>
          {onAddToCart && (
            <Button
              variant="primary"
              size="xs"
              disabled={!isAvailable}
              onClick={onAddToCart}
              aria-label={`Add ${item.name} to cart`}
              className="focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <FontAwesomeIcon icon={faPlus} className="w-3 h-3 mr-1" aria-hidden="true" />
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
