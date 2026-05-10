'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { StockStatusBadge } from './StockStatusBadge';
import type { ProductType, StockStatus, ProductStatus } from '../types';

type ProductCardProduct = {
  productId: string;
  title: string;
  slug: string;
  basePrice: number;
  salePrice?: number | null;
  currency: string;
  image?: string | null;
  type: ProductType;
  stockStatus: StockStatus;
  status: ProductStatus;
  tags: string[];
  rating?: number;
  reviewCount?: number;
};

type ProductCardProps = {
  product: ProductCardProduct;
  href?: string;
  className?: string;
};

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {stars.map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
          return (
            <FontAwesomeIcon
              key={star}
              icon={filled ? faStar : half ? faStarHalfAlt : faStarEmpty}
              className={cn(
                'w-3 h-3',
                filled || half ? 'text-[var(--warning)]' : 'text-text-disabled'
              )}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <span className="text-xs text-primary hover:text-primary-hover hover:underline">
        {count.toLocaleString()}
      </span>
    </div>
  );
}

export function ProductCard({ product, href, className }: ProductCardProps) {
  const isInteractive = !!href;
  const discount = product.salePrice != null
    ? Math.round((1 - product.salePrice / product.basePrice) * 100)
    : null;

  const body = (
    <>
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-base flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-disabled bg-surface-sunken">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {discount != null && discount > 0 && (
          <span className="absolute top-2 left-2 rounded px-1.5 py-0.5 text-[10px] font-bold bg-error text-[var(--text-inverse)]">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 p-3">
        {/* Title */}
        <h3 className="text-sm font-medium text-text-primary line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating != null && product.reviewCount != null && (
          <StarRating rating={product.rating} count={product.reviewCount} />
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-0.5">
          {product.salePrice != null ? (
            <>
              <span className="text-sm text-text-secondary">
                <span className="text-[10px] align-top leading-none mr-0.5">$</span>
                <span className="text-lg font-bold text-text-primary">
                  {Math.floor(product.salePrice)}
                </span>
                <span className="text-xs">.{String(Math.round((product.salePrice % 1) * 100)).padStart(2, '0')}</span>
              </span>
              <span className="text-xs text-text-disabled line-through">
                {formatPrice(product.basePrice, product.currency)}
              </span>
            </>
          ) : (
            <span className="text-sm text-text-secondary">
              <span className="text-[10px] align-top leading-none mr-0.5">$</span>
              <span className="text-lg font-bold text-text-primary">
                {Math.floor(product.basePrice)}
              </span>
              <span className="text-xs">.{String(Math.round((product.basePrice % 1) * 100)).padStart(2, '0')}</span>
            </span>
          )}
        </div>

        {/* Free delivery for physical in-stock */}
        {product.type === 'PHYSICAL' && product.stockStatus === 'IN_STOCK' && (
          <p className="text-xs text-success flex items-center gap-1">
            <FontAwesomeIcon icon={faTruck} className="w-3 h-3" aria-hidden="true" />
            FREE delivery
          </p>
        )}

        {/* Stock status for non-standard states */}
        {(product.stockStatus === 'OUT_OF_STOCK' || product.stockStatus === 'LOW_STOCK' || product.stockStatus === 'BACKORDER') && (
          <StockStatusBadge status={product.stockStatus} size="sm" />
        )}
      </div>
    </>
  );

  const baseClass = cn(
    'group rounded border border-border bg-surface-base flex flex-col overflow-hidden',
    isInteractive && 'hover:shadow-lg hover:border-border-strong transition-all duration-200 cursor-pointer',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}
      >
        {body}
      </a>
    );
  }

  return <div className={baseClass}>{body}</div>;
}
