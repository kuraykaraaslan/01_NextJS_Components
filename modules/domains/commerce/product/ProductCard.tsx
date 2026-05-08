'use client';
import { cn } from '@/libs/utils/cn';
import { StockStatusBadge } from './StockStatusBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import type { ProductWithData } from '@/modules/domains/commerce/types';

type ProductCardProps = {
  product: ProductWithData;
  href?: string;
  onClick?: () => void;
  className?: string;
};

function StarRating({ rating }: { rating: number }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {stars.map((star) => {
        if (rating >= star) {
          return (
            <FontAwesomeIcon
              key={star}
              icon={faStar}
              className="w-3 h-3 text-warning"
              aria-hidden="true"
            />
          );
        }
        if (rating >= star - 0.5) {
          return (
            <FontAwesomeIcon
              key={star}
              icon={faStarHalfStroke}
              className="w-3 h-3 text-warning"
              aria-hidden="true"
            />
          );
        }
        return (
          <FontAwesomeIcon
            key={star}
            icon={faStarEmpty}
            className="w-3 h-3 text-text-disabled"
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

export function ProductCard({ product, href, onClick, className }: ProductCardProps) {
  const isInteractive = !!(href || onClick);

  const displayPrice = product.salePrice ?? product.basePrice;
  const hasSale = product.salePrice != null && product.salePrice < product.basePrice;

  const body = (
    <>
      {/* Image */}
      <div className="relative aspect-square bg-surface-overlay overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-disabled text-xs">
            No image
          </div>
        )}
        <div className="absolute top-2 left-2">
          <StockStatusBadge status={product.stockStatus} size="sm" />
        </div>
        {hasSale && (
          <div className="absolute top-2 right-2">
            <span className="inline-block rounded-full bg-error text-white text-xs font-semibold px-2 py-0.5">
              Sale
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {product.brand && (
          <p className="text-xs text-text-secondary truncate">{product.brand.name}</p>
        )}
        <h3 className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={4.2} />
          <span className="text-xs text-text-secondary">(48)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-base font-bold text-text-primary">
            {product.currency} {displayPrice.toFixed(2)}
          </span>
          {hasSale && (
            <span className="text-xs text-text-secondary line-through">
              {product.currency} {product.basePrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </>
  );

  const baseClass = cn(
    'group rounded-xl border border-border bg-surface-raised flex flex-col overflow-hidden',
    isInteractive && 'hover:shadow-md hover:border-border-focus transition-all duration-200',
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {body}
      </a>
    );
  }
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          baseClass,
          'text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus'
        )}
      >
        {body}
      </button>
    );
  }
  return <div className={baseClass}>{body}</div>;
}
