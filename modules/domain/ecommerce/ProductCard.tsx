'use client';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Tooltip } from '@/modules/ui/Tooltip';
import { Avatar } from '@/modules/ui/Avatar';

export type ProductCardItem = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  brand?: string;
  brandLogo?: string;
  badge?: string;
  badgeVariant?: 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'primary';
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  onAddToCart?: () => void;
  onWishlist?: () => void;
};

export function ProductCard({
  product,
  className,
}: {
  product: ProductCardItem;
  className?: string;
}) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Card className={className} hoverable>
      <div className="relative">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-44 object-cover" />
        ) : (
          <div className="w-full h-44 bg-surface-sunken flex items-center justify-center text-4xl text-text-disabled">
            🛍
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          {product.badge && (
            <Badge variant={product.badgeVariant ?? 'primary'} size="sm">{product.badge}</Badge>
          )}
          {discount && (
            <Badge variant="error" size="sm">-{discount}%</Badge>
          )}
          {product.inStock === false && (
            <Badge variant="neutral" size="sm">Out of stock</Badge>
          )}
        </div>
        {product.onWishlist && (
          <Tooltip content="Add to wishlist">
            <button
              type="button"
              onClick={product.onWishlist}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-surface-raised/80 hover:bg-surface-raised text-text-secondary hover:text-error transition-colors"
              aria-label="Add to wishlist"
            >
              ♡
            </button>
          </Tooltip>
        )}
      </div>

      <div className="p-4 space-y-3">
        {product.brand && (
          <div className="flex items-center gap-1.5">
            {product.brandLogo && <Avatar src={product.brandLogo} name={product.brand} size="xs" />}
            <span className="text-xs text-text-secondary">{product.brand}</span>
          </div>
        )}

        <h3 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2">
          {product.name}
        </h3>

        {product.rating != null && (
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <span className="text-warning">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span>({product.reviewCount ?? 0})</span>
          </div>
        )}

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-text-primary">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-text-disabled line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <Button
          variant="primary"
          size="sm"
          fullWidth
          disabled={product.inStock === false}
          onClick={product.onAddToCart}
          iconLeft="🛒"
        >
          {product.inStock === false ? 'Out of stock' : 'Add to cart'}
        </Button>
      </div>
    </Card>
  );
}
